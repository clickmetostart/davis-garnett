import fs from "fs/promises";
import path from "path";
import { PDFDocument, PDFFont, PDFImage, PDFPage, PDFString, StandardFonts, rgb } from "pdf-lib";
import type {
  DiscoveryAnswersState,
  DiscoveryCard,
  RecommendedResource,
} from "@/data/discoveryDecks";

export interface PdfSectionInput {
  heading: string;
  body: string;
  bullets?: string[];
  metaLine?: string;
  mapUrl?: string;
  userNote?: string;
  checked?: boolean;
  isFavorite?: boolean;
}

export interface PdfWorkbookState {
  preparedForName?: string;
  checkedItems?: string[];
  favoriteKeys?: string[];
  notesByKey?: Record<string, string>;
  generalNotes?: string;
}

export interface PdfRelatedLink {
  label: string;
  url: string;
}

export interface BrandedPdfInput {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  authorLine: string;
  createdDateLabel: string;
  pageUrl?: string;
  relatedLinks?: PdfRelatedLink[];
  quickAnswer?: string;
  keyTakeaways?: string[];
  sections: PdfSectionInput[];
  howWeHandleIt?: string;
  sources?: string[];
  routeMeta?: {
    duration: string;
    distanceSummary: string;
    startAddress: string;
    routeDirectionNote: string;
    googleMapsUrl?: string;
  };
  workbook?: PdfWorkbookState;
  discoveryChecklist?: {
    mode: "blank" | "filled";
    cards: DiscoveryCard[];
    state?: DiscoveryAnswersState;
    recommendations?: RecommendedResource[];
  };
}

const COLORS = {
  obsidian: rgb(0.067, 0.067, 0.067),
  gold: rgb(0.831, 0.686, 0.216),
  darkGold: rgb(0.55, 0.43, 0.16),
  cream: rgb(0.961, 0.953, 0.937),
  textDark: rgb(0.12, 0.12, 0.12),
  textMuted: rgb(0.38, 0.38, 0.38),
  borderLight: rgb(0.86, 0.85, 0.82),
  white: rgb(1, 1, 1),
  noteBg: rgb(0.985, 0.98, 0.965),
};

const PAGE_W = 612; // US Letter width (pt)
const PAGE_H = 792; // US Letter height (pt)
const MARGIN_X = 52;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const FOOTER_Y = 26;
const MIN_CONTENT_Y = 74;

const SITE_ORIGIN = "https://www.davisgarnettsells.com";

function toAbsoluteWebsiteUrl(rawUrl?: string): string {
  if (!rawUrl) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
  return `${SITE_ORIGIN}${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`;
}

function addUriLink(
  pdfDoc: PDFDocument,
  page: PDFPage,
  url: string,
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (!url || !/^https?:\/\//i.test(url) || width <= 0 || height <= 0) return;
  const linkAnnot = pdfDoc.context.register(
    pdfDoc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      A: {
        Type: "Action",
        S: "URI",
        URI: PDFString.of(url),
      },
    })
  );
  page.node.addAnnot(linkAnnot);
}

function drawClickableLinkText(
  pdfDoc: PDFDocument,
  page: PDFPage,
  text: string,
  url: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color = rgb(0.118, 0.227, 0.373)
): number {
  const safe = sanitizeWinAnsi(text);
  const w = font.widthOfTextAtSize(safe, size);
  page.drawText(safe, { x, y, size, font, color });
  page.drawLine({
    start: { x, y: y - 1.5 },
    end: { x: x + w, y: y - 1.5 },
    thickness: 0.6,
    color,
  });
  addUriLink(pdfDoc, page, url, x - 2, y - 3, w + 4, size + 5);
  return w;
}

async function embedPublicPng(pdfDoc: PDFDocument, relPath: string): Promise<PDFImage | null> {
  try {
    const absPath = path.join(process.cwd(), "public", relPath);
    const bytes = await fs.readFile(absPath);
    return await pdfDoc.embedPng(bytes);
  } catch {
    return null;
  }
}

/**
 * Normalizes Unicode punctuation to safe WinAnsi characters for pdf-lib StandardFonts.
 */
function sanitizeWinAnsi(raw: string): string {
  return String(raw || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "*")
    .replace(/\u2192/g, "->")
    .replace(/\u2265/g, ">=")
    .replace(/\u2264/g, "<=")
    .replace(/\u00F7/g, "/")
    .replace(/\u00AE/g, "(R)")
    .replace(/\u2122/g, "(TM)")
    .replace(/[\u2605\u2606\u2726\u2727]/g, "*")
    .replace(/[^\x20-\x7E\xA0-\xFF\n]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const clean = sanitizeWinAnsi(text);
  if (!clean) return [];

  const paragraphs = clean.split(/\n+/);
  const allLines: string[] = [];

  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;

    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
        current = candidate;
      } else {
        if (current) allLines.push(current);
        // Handle single very long URL/token
        if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
          let chunk = "";
          for (const ch of word) {
            if (font.widthOfTextAtSize(chunk + ch, fontSize) <= maxWidth) {
              chunk += ch;
            } else {
              if (chunk) allLines.push(chunk);
              chunk = ch;
            }
          }
          current = chunk;
        } else {
          current = word;
        }
      }
    }
    if (current) allLines.push(current);
  }
  return allLines;
}

export async function generateBrandedGuidePdf(input: BrandedPdfInput): Promise<Uint8Array> {
  const isTour = Boolean(input.routeMeta);
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(
    sanitizeWinAnsi(`${input.title} — Davis & Garnett ${isTour ? "Self-Guided Tour Guide" : "Advisory Workbook"}`)
  );
  pdfDoc.setAuthor(sanitizeWinAnsi(input.authorLine));
  pdfDoc.setSubject(sanitizeWinAnsi(input.category));
  pdfDoc.setCreator("Davis & Garnett — Align Right Realty Carrollwood");

  const serifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const serifRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const sansRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const dgHeaderLogo = await embedPublicPng(
    pdfDoc,
    "davis-garnett-logo-png-mobile-for-light-backgrounds.png"
  );
  const dgFavicon = await embedPublicPng(pdfDoc, "dg-favicon-fat.png");
  const alignRightLogo = await embedPublicPng(pdfDoc, "align-right-email-logo.png");

  // ── PAGE 1: PRINTER-FRIENDLY BRANDED COVER PAGE ──
  const cover = pdfDoc.addPage([PAGE_W, PAGE_H]);

  // Top gold accent rule + white paper hero (zero heavy ink fill)
  cover.drawRectangle({
    x: 0,
    y: PAGE_H - 6,
    width: PAGE_W,
    height: 6,
    color: COLORS.gold,
  });

  const livePageUrl = toAbsoluteWebsiteUrl(input.pageUrl);

  if (dgHeaderLogo) {
    const dims = dgHeaderLogo.scaleToFit(245, 58);
    const imgY = PAGE_H - 28 - dims.height;
    cover.drawImage(dgHeaderLogo, {
      x: MARGIN_X,
      y: imgY,
      width: dims.width,
      height: dims.height,
    });
    addUriLink(pdfDoc, cover, SITE_ORIGIN, MARGIN_X, imgY, dims.width, dims.height);
  } else {
    cover.drawText(sanitizeWinAnsi("DAVIS & GARNETT  |  COMMERCIAL & RESIDENTIAL ADVISORS"), {
      x: MARGIN_X,
      y: PAGE_H - 54,
      size: 10,
      font: sansBold,
      color: COLORS.obsidian,
    });
  }

  const brokerHeaderRight = sanitizeWinAnsi("Align Right Realty Carrollwood  *  FL Lic #BK3401606");
  const bhW = sansBold.widthOfTextAtSize(brokerHeaderRight, 8.2);
  cover.drawText(brokerHeaderRight, {
    x: PAGE_W - MARGIN_X - bhW,
    y: PAGE_H - 46,
    size: 8.2,
    font: sansBold,
    color: COLORS.darkGold,
  });
  const addrRight = sanitizeWinAnsi("3903 Northdale Blvd Suite 115W, Tampa FL 33624");
  const arW = sansRegular.widthOfTextAtSize(addrRight, 7.8);
  cover.drawText(addrRight, {
    x: PAGE_W - MARGIN_X - arW,
    y: PAGE_H - 59,
    size: 7.8,
    font: sansRegular,
    color: COLORS.textMuted,
  });
  const onlineLinkLabel = "Open Interactive Guide at davisgarnettsells.com ->";
  const olW = sansBold.widthOfTextAtSize(onlineLinkLabel, 7.8);
  drawClickableLinkText(
    pdfDoc,
    cover,
    onlineLinkLabel,
    livePageUrl,
    PAGE_W - MARGIN_X - olW,
    PAGE_H - 74,
    7.8,
    sansBold,
    COLORS.darkGold
  );

  // Clean gold divider under logo hero
  cover.drawLine({
    start: { x: MARGIN_X, y: PAGE_H - 96 },
    end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 96 },
    thickness: 1.5,
    color: COLORS.gold,
  });

  // Category pill (light fill + gold border for clean printing)
  const catText = sanitizeWinAnsi(input.category.toUpperCase());
  const catW = Math.min(CONTENT_W, sansBold.widthOfTextAtSize(catText, 8.5) + 20);
  cover.drawRectangle({
    x: MARGIN_X,
    y: PAGE_H - 130,
    width: catW,
    height: 19,
    color: COLORS.cream,
    borderColor: COLORS.gold,
    borderWidth: 1,
  });
  cover.drawText(catText, {
    x: MARGIN_X + 10,
    y: PAGE_H - 123,
    size: 8.5,
    font: sansBold,
    color: COLORS.obsidian,
  });

  // Cover Title + Subtitle on clean white page
  const titleLines = wrapText(input.title, serifBold, 25, CONTENT_W).slice(0, 3);
  let titleY = PAGE_H - 166;
  for (const line of titleLines) {
    cover.drawText(line, {
      x: MARGIN_X,
      y: titleY,
      size: 25,
      font: serifBold,
      color: COLORS.obsidian,
    });
    titleY -= 30;
  }

  const subLines = wrapText(input.subtitle, sansRegular, 11.2, CONTENT_W).slice(0, 3);
  let subY = titleY - 6;
  for (const line of subLines) {
    cover.drawText(line, {
      x: MARGIN_X,
      y: subY,
      size: 11.2,
      font: sansRegular,
      color: COLORS.textMuted,
    });
    subY -= 16;
  }

  // Hero divider before personalized box
  const heroDividerY = Math.min(subY - 12, PAGE_H - 275);
  cover.drawRectangle({
    x: MARGIN_X,
    y: heroDividerY,
    width: CONTENT_W,
    height: 3,
    color: COLORS.gold,
  });

  // Host & Personalized Recipient Box
  let coverY = heroDividerY - 26;
  cover.drawRectangle({
    x: MARGIN_X,
    y: coverY - 58,
    width: CONTENT_W,
    height: 68,
    color: COLORS.white,
    borderColor: COLORS.gold,
    borderWidth: 1.2,
  });
  cover.drawText(
    sanitizeWinAnsi(`PREPARED BY: ${input.authorLine}`),
    { x: MARGIN_X + 14, y: coverY - 10, size: 9.5, font: sansBold, color: COLORS.obsidian }
  );
  const recipientLine = input.workbook?.preparedForName
    ? `PREPARED FOR: ${input.workbook.preparedForName}  *  CREATED: ${input.createdDateLabel}`
    : `${isTour ? "ORIGINAL SELF-GUIDED TOUR EDITION" : "ORIGINAL INTERACTIVE WORKBOOK EDITION"}  *  CREATED: ${input.createdDateLabel}`;
  cover.drawText(sanitizeWinAnsi(recipientLine), {
    x: MARGIN_X + 14,
    y: coverY - 28,
    size: 9,
    font: sansRegular,
    color: COLORS.darkGold,
  });
  cover.drawText(
    sanitizeWinAnsi("Questions on the road? Call/Text Mark (941-737-4127) or Rachael (727-808-3344)"),
    { x: MARGIN_X + 14, y: coverY - 45, size: 8.5, font: sansRegular, color: COLORS.textMuted }
  );

  coverY -= 82;

  // Quick Answer / Summary on Cover
  if (input.quickAnswer) {
    const qaLines = wrapText(input.quickAnswer, sansRegular, 10.5, CONTENT_W - 24).slice(0, 6);
    const boxH = qaLines.length * 15 + 34;
    cover.drawRectangle({
      x: MARGIN_X,
      y: coverY - boxH,
      width: CONTENT_W,
      height: boxH,
      color: COLORS.noteBg,
      borderColor: COLORS.borderLight,
      borderWidth: 1,
    });
    cover.drawRectangle({
      x: MARGIN_X,
      y: coverY - boxH,
      width: 4,
      height: boxH,
      color: COLORS.gold,
    });
    cover.drawText("QUICK OVERVIEW & KEY INSIGHT", {
      x: MARGIN_X + 14,
      y: coverY - 18,
      size: 8.5,
      font: sansBold,
      color: COLORS.darkGold,
    });
    let qy = coverY - 36;
    for (const l of qaLines) {
      cover.drawText(l, { x: MARGIN_X + 14, y: qy, size: 10.5, font: sansRegular, color: COLORS.textDark });
      qy -= 15;
    }
    coverY -= boxH + 18;
  }

  // Route Summary on Cover if Tour (printer-friendly light outline box with gold divider bar)
  if (input.routeMeta) {
    const routeBoxH = input.routeMeta.googleMapsUrl ? 104 : 88;
    cover.drawRectangle({
      x: MARGIN_X,
      y: coverY - routeBoxH,
      width: CONTENT_W,
      height: routeBoxH,
      color: COLORS.white,
      borderColor: COLORS.gold,
      borderWidth: 1.2,
    });
    cover.drawRectangle({
      x: MARGIN_X,
      y: coverY - routeBoxH,
      width: 4,
      height: routeBoxH,
      color: COLORS.gold,
    });
    cover.drawText("SEQUENTIAL DRIVING TOUR SUMMARY", {
      x: MARGIN_X + 14,
      y: coverY - 18,
      size: 8.5,
      font: sansBold,
      color: COLORS.darkGold,
    });
    cover.drawText(
      sanitizeWinAnsi(`${input.routeMeta.duration}  *  ${input.routeMeta.distanceSummary}`),
      { x: MARGIN_X + 14, y: coverY - 34, size: 10.5, font: sansBold, color: COLORS.obsidian }
    );
    const startLines = wrapText(`Start Point: ${input.routeMeta.startAddress}`, sansRegular, 9, CONTENT_W - 28).slice(0, 2);
    let sy = coverY - 50;
    for (const sl of startLines) {
      cover.drawText(sl, { x: MARGIN_X + 14, y: sy, size: 9, font: sansRegular, color: COLORS.textDark });
      sy -= 13;
    }
    const dirLines = wrapText(input.routeMeta.routeDirectionNote, sansRegular, 8.5, CONTENT_W - 28).slice(0, 1);
    if (dirLines[0]) {
      cover.drawText(dirLines[0], { x: MARGIN_X + 14, y: coverY - 76, size: 8.5, font: sansRegular, color: COLORS.darkGold });
    }
    if (input.routeMeta.googleMapsUrl) {
      drawClickableLinkText(
        pdfDoc,
        cover,
        "Click to Open Full Driving Route in Google Maps ->",
        input.routeMeta.googleMapsUrl,
        MARGIN_X + 14,
        coverY - 94,
        9,
        sansBold
      );
    }
    coverY -= routeBoxH + 18;
  }

  // What's Inside / Contents Summary on Cover
  if (coverY > 140) {
    cover.drawText(isTour ? "INCLUDED ON THIS TOUR" : "INCLUDED INSIDE THIS WORKBOOK", {
      x: MARGIN_X,
      y: coverY,
      size: 8.5,
      font: sansBold,
      color: COLORS.darkGold,
    });
    coverY -= 16;
    const previewTitles = input.sections.slice(0, 6).map((s, idx) => `${idx + 1}. ${s.heading}`);
    for (const pt of previewTitles) {
      if (coverY < 90) break;
      const lines = wrapText(pt, sansRegular, 9.5, CONTENT_W).slice(0, 1);
      if (lines[0]) {
        cover.drawText(lines[0], { x: MARGIN_X, y: coverY, size: 9.5, font: sansRegular, color: COLORS.textDark });
        coverY -= 15;
      }
    }
  }

  // ── INTERIOR WORKBOOK PAGES ──
  let page: PDFPage = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let cursorY = PAGE_H - 54;

  const ensureSpace = (needed: number) => {
    if (cursorY - needed < MIN_CONTENT_Y) {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      cursorY = PAGE_H - 54;
    }
  };

  const drawTopRunningHeader = (p: PDFPage) => {
    p.drawText(
      sanitizeWinAnsi(
        isTour
          ? "DAVIS & GARNETT  *  SELF-GUIDED TOUR GUIDE & DAY ITINERARY"
          : "DAVIS & GARNETT  *  INTERACTIVE FIELD WORKBOOK"
      ),
      {
      x: MARGIN_X,
      y: PAGE_H - 32,
      size: 8,
      font: sansBold,
      color: COLORS.darkGold,
    });
    p.drawLine({
      start: { x: MARGIN_X, y: PAGE_H - 38 },
      end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 38 },
      thickness: 0.75,
      color: COLORS.gold,
    });
  };
  drawTopRunningHeader(page);

  const nextPage = () => {
    page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawTopRunningHeader(page);
    cursorY = PAGE_H - 58;
  };

  const guaranteeSpace = (needed: number) => {
    if (cursorY - needed < MIN_CONTENT_Y) {
      nextPage();
    }
  };

  // Key Takeaways / Tour Checkpoints
  if (input.keyTakeaways && input.keyTakeaways.length > 0) {
    guaranteeSpace(90);
    page.drawText("KEY TAKEAWAYS & FIELD CHECKLIST", {
      x: MARGIN_X,
      y: cursorY,
      size: 10,
      font: sansBold,
      color: COLORS.darkGold,
    });
    cursorY -= 18;

    const checkedSet = new Set(input.workbook?.checkedItems || []);
    for (const kt of input.keyTakeaways) {
      const isChecked = checkedSet.has(kt);
      const boxMark = isChecked ? "[X]" : "[  ]";
      const ktLines = wrapText(`${boxMark}  ${kt}`, sansRegular, 10, CONTENT_W - 8);
      guaranteeSpace(ktLines.length * 14 + 6);
      for (const line of ktLines) {
        page.drawText(line, { x: MARGIN_X + 4, y: cursorY, size: 10, font: sansRegular, color: COLORS.textDark });
        cursorY -= 14;
      }
      cursorY -= 3;
    }
    cursorY -= 12;
  }

  // Sections / Stops + Interactive Notes
  const checkedSet = new Set(input.workbook?.checkedItems || []);
  const favoriteSet = new Set(input.workbook?.favoriteKeys || []);

  for (let i = 0; i < input.sections.length; i++) {
    const sec = input.sections[i];
    const key = `sec-${i}`;
    const isChecked = sec.checked ?? checkedSet.has(key);
    const isFav = sec.isFavorite ?? favoriteSet.has(key);
    const noteText =
      sec.userNote ?? input.workbook?.notesByKey?.[key] ?? "";

    const headLines = wrapText(
      `${isChecked ? "[VISITED / DONE] " : ""}${sec.heading}${isFav ? "  * TOP PICK" : ""}`,
      serifBold,
      14.5,
      CONTENT_W
    );
    guaranteeSpace(headLines.length * 18 + 60);

    for (const hl of headLines) {
      page.drawText(hl, { x: MARGIN_X, y: cursorY, size: 14.5, font: serifBold, color: COLORS.obsidian });
      cursorY -= 18;
    }

    if (sec.metaLine) {
      const metaLines = wrapText(sec.metaLine, sansBold, 8.8, CONTENT_W);
      for (const ml of metaLines) {
        guaranteeSpace(13);
        page.drawText(ml, { x: MARGIN_X, y: cursorY, size: 8.8, font: sansBold, color: COLORS.darkGold });
        cursorY -= 13;
      }
      cursorY -= 2;
    }

    if (sec.mapUrl) {
      guaranteeSpace(15);
      drawClickableLinkText(
        pdfDoc,
        page,
        "Open This Stop in Google Maps ->",
        sec.mapUrl,
        MARGIN_X,
        cursorY,
        8.6,
        sansBold
      );
      cursorY -= 14;
    }

    page.drawLine({
      start: { x: MARGIN_X, y: cursorY + 4 },
      end: { x: PAGE_W - MARGIN_X, y: cursorY + 4 },
      thickness: 0.5,
      color: COLORS.borderLight,
    });
    cursorY -= 8;

    const bodyLines = wrapText(sec.body, sansRegular, 10.2, CONTENT_W);
    for (const bl of bodyLines) {
      guaranteeSpace(15);
      page.drawText(bl, { x: MARGIN_X, y: cursorY, size: 10.2, font: sansRegular, color: COLORS.textDark });
      cursorY -= 14.5;
    }

    if (sec.bullets && sec.bullets.length > 0) {
      cursorY -= 4;
      for (const b of sec.bullets) {
        const bLines = wrapText(`* ${b}`, sansRegular, 9.6, CONTENT_W - 14);
        for (const bl of bLines) {
          guaranteeSpace(14);
          page.drawText(bl, { x: MARGIN_X + 10, y: cursorY, size: 9.6, font: sansRegular, color: COLORS.textDark });
          cursorY -= 13.5;
        }
        cursorY -= 2;
      }
    }

    // Interactive / Printable Workbook Note Box
    cursorY -= 6;
    if (noteText.trim()) {
      const nLines = wrapText(noteText, sansRegular, 9.5, CONTENT_W - 22);
      const noteBoxH = nLines.length * 13.5 + 26;
      guaranteeSpace(noteBoxH + 10);
      page.drawRectangle({
        x: MARGIN_X,
        y: cursorY - noteBoxH,
        width: CONTENT_W,
        height: noteBoxH,
        color: COLORS.cream,
        borderColor: COLORS.gold,
        borderWidth: 0.8,
      });
      page.drawText(isTour ? "YOUR SAVED TOUR NOTES:" : "YOUR SAVED WORKBOOK NOTES:", {
        x: MARGIN_X + 10,
        y: cursorY - 14,
        size: 8,
        font: sansBold,
        color: COLORS.darkGold,
      });
      let ny = cursorY - 28;
      for (const nl of nLines) {
        page.drawText(nl, { x: MARGIN_X + 10, y: ny, size: 9.5, font: sansRegular, color: COLORS.obsidian });
        ny -= 13.5;
      }
      cursorY -= noteBoxH + 14;
    } else {
      // Blank printable lined note box for pen-on-paper tour use
      const blankH = 56;
      guaranteeSpace(blankH + 10);
      page.drawRectangle({
        x: MARGIN_X,
        y: cursorY - blankH,
        width: CONTENT_W,
        height: blankH,
        color: COLORS.noteBg,
        borderColor: COLORS.borderLight,
        borderWidth: 0.75,
      });
      page.drawText(
        isTour
          ? "[  ] Checked / Visited    STOP NOTES (JOT HIGHLIGHTS BELOW):"
          : "[  ] Checked / Reviewed    WORKBOOK NOTES (JOT HIGHLIGHTS BELOW):",
        {
        x: MARGIN_X + 10,
        y: cursorY - 14,
        size: 7.8,
        font: sansBold,
        color: COLORS.textMuted,
      });
      page.drawLine({
        start: { x: MARGIN_X + 10, y: cursorY - 31 },
        end: { x: PAGE_W - MARGIN_X - 10, y: cursorY - 31 },
        thickness: 0.5,
        color: COLORS.borderLight,
      });
      page.drawLine({
        start: { x: MARGIN_X + 10, y: cursorY - 47 },
        end: { x: PAGE_W - MARGIN_X - 10, y: cursorY - 47 },
        thickness: 0.5,
        color: COLORS.borderLight,
      });
      cursorY -= blankH + 14;
    }
  }

  // General Notes Block (if filled online)
  if (input.workbook?.generalNotes?.trim()) {
    const gLines = wrapText(input.workbook.generalNotes, sansRegular, 9.8, CONTENT_W - 22);
    const gh = gLines.length * 14 + 30;
    guaranteeSpace(gh + 12);
    page.drawRectangle({
      x: MARGIN_X,
      y: cursorY - gh,
      width: CONTENT_W,
      height: gh,
      color: COLORS.cream,
      borderColor: COLORS.gold,
      borderWidth: 1,
    });
    page.drawText("OVERALL BUYER / TOUR SUMMARY NOTES", {
      x: MARGIN_X + 10,
      y: cursorY - 15,
      size: 8.5,
      font: sansBold,
      color: COLORS.darkGold,
    });
    let gy = cursorY - 30;
    for (const gl of gLines) {
      page.drawText(gl, { x: MARGIN_X + 10, y: gy, size: 9.8, font: sansRegular, color: COLORS.obsidian });
      gy -= 14;
    }
    cursorY -= gh + 14;
  }

  // Interactive Discovery Flashcards & Printable Questionnaire Block (Blank or Pre-Filled)
  if (input.discoveryChecklist && input.discoveryChecklist.cards.length > 0) {
    const { mode, cards, state, recommendations } = input.discoveryChecklist;
    const isFilled = mode === "filled";
    const selections = state?.selections || {};
    const notesByCard = state?.notesByCard || {};
    const contact = state?.contact;

    const drawDiscoveryStartPage = () => {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      page.drawRectangle({
        x: 0,
        y: PAGE_H - 4,
        width: PAGE_W,
        height: 4,
        color: COLORS.gold,
      });
      page.drawText("DAVIS & GARNETT  |  DISCOVERY WORKBOOK & QUESTIONNAIRE", {
        x: MARGIN_X,
        y: PAGE_H - 28,
        size: 8.2,
        font: sansBold,
        color: COLORS.darkGold,
      });
      page.drawLine({
        start: { x: MARGIN_X, y: PAGE_H - 36 },
        end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 36 },
        thickness: 0.75,
        color: COLORS.borderLight,
      });
      cursorY = PAGE_H - 58;
    };

    const ensureChecklistSpace = (neededH: number) => {
      if (cursorY - neededH < MIN_CONTENT_Y) {
        drawDiscoveryStartPage();
      }
    };

    // Start Discovery Questionnaire cleanly on a fresh page so it doubles as an easy-to-hand-out packet
    drawDiscoveryStartPage();

    page.drawText(
      isFilled
        ? "YOUR PERSONALIZED DISCOVERY QUESTIONNAIRE SUMMARY"
        : "CLIENT DISCOVERY QUESTIONNAIRE (IN-PERSON & SELF-PREP WORKSHEET)",
      {
        x: MARGIN_X,
        y: cursorY,
        size: 13.5,
        font: serifBold,
        color: COLORS.obsidian,
      }
    );
    cursorY -= 16;

    const introNote = isFilled
      ? "Every choice and workbook note you completed online is checked off below so you and your advisor share the exact same roadmap."
      : "Use this matching worksheet during a coffee meeting or fill it out at home before we tour. Check every box that fits and jot your notes below each card.";
    for (const line of wrapText(introNote, sansRegular, 9.4, CONTENT_W)) {
      page.drawText(line, { x: MARGIN_X, y: cursorY, size: 9.4, font: sansRegular, color: COLORS.textMuted });
      cursorY -= 13;
    }
    cursorY -= 8;

    // Client info box (Pre-filled or neat blank lines for pen)
    const infoBoxH = 62;
    page.drawRectangle({
      x: MARGIN_X,
      y: cursorY - infoBoxH,
      width: CONTENT_W,
      height: infoBoxH,
      color: COLORS.noteBg,
      borderColor: COLORS.gold,
      borderWidth: 1,
    });
    const nameStr = contact?.fullName ? sanitizeWinAnsi(contact.fullName) : "____________________________________";
    const phoneStr = contact?.phone ? sanitizeWinAnsi(contact.phone) : "___________________________";
    const emailStr = contact?.email ? sanitizeWinAnsi(contact.email) : "____________________________________";
    const prefStr = contact?.preferredMethod ? sanitizeWinAnsi(contact.preferredMethod) : "Call  /  Text  /  Email  /  Coffee";

    page.drawText(`Client Name: ${nameStr}`, {
      x: MARGIN_X + 12,
      y: cursorY - 20,
      size: 9.2,
      font: sansBold,
      color: COLORS.obsidian,
    });
    page.drawText(`Best Phone: ${phoneStr}`, {
      x: MARGIN_X + CONTENT_W / 2 + 6,
      y: cursorY - 20,
      size: 9.2,
      font: sansRegular,
      color: COLORS.textDark,
    });
    page.drawText(`Email: ${emailStr}`, {
      x: MARGIN_X + 12,
      y: cursorY - 40,
      size: 9.2,
      font: sansRegular,
      color: COLORS.textDark,
    });
    page.drawText(`Preferred: ${prefStr}`, {
      x: MARGIN_X + CONTENT_W / 2 + 6,
      y: cursorY - 40,
      size: 9.2,
      font: sansRegular,
      color: COLORS.textDark,
    });
    cursorY -= infoBoxH + 16;

    // Draw each Discovery Card cleanly with 2-column checkboxes and note box
    for (const card of cards) {
      const cardHeaderLines = wrapText(`${card.stepNumber}. ${card.title}`, serifBold, 12.2, CONTENT_W - 20);
      const cardSubLines = wrapText(card.subtitle, sansRegular, 8.8, CONTENT_W - 20);
      const userCardNote = notesByCard[card.id]?.trim() || "";
      const noteLines = userCardNote
        ? wrapText(userCardNote, sansRegular, 9, CONTENT_W - 24)
        : [];

      // Estimate card height accurately before drawing so cards rarely split awkwardly
      let estOptionsH = 0;
      for (const q of card.questions) {
        estOptionsH += 18;
        const rows = Math.ceil(q.options.length / 2);
        estOptionsH += rows * 17 + 8;
      }
      const noteBlockH = userCardNote ? Math.max(34, noteLines.length * 12 + 24) : 44;
      const totalCardH = cardHeaderLines.length * 15 + cardSubLines.length * 11 + estOptionsH + noteBlockH + 26;

      ensureChecklistSpace(Math.min(totalCardH, 240));

      // Card header strip
      const stripH = cardHeaderLines.length * 15 + 8;
      page.drawRectangle({
        x: MARGIN_X,
        y: cursorY - stripH,
        width: CONTENT_W,
        height: stripH,
        color: COLORS.cream,
        borderColor: COLORS.gold,
        borderWidth: 0.9,
      });
      let hy = cursorY - 14;
      for (const hl of cardHeaderLines) {
        page.drawText(hl, { x: MARGIN_X + 10, y: hy, size: 12.2, font: serifBold, color: COLORS.obsidian });
        hy -= 15;
      }
      cursorY -= stripH + 8;

      for (const sl of cardSubLines) {
        ensureChecklistSpace(16);
        page.drawText(sl, { x: MARGIN_X + 4, y: cursorY, size: 8.8, font: sansRegular, color: COLORS.textMuted });
        cursorY -= 12;
      }
      cursorY -= 4;

      const colW = (CONTENT_W - 14) / 2;
      for (const q of card.questions) {
        ensureChecklistSpace(34);
        const qModeHint = q.selectionMode === "single" ? "(pick one)" : "(check all that apply)";
        page.drawText(sanitizeWinAnsi(`${q.prompt} ${qModeHint}`), {
          x: MARGIN_X + 4,
          y: cursorY,
          size: 8.8,
          font: sansBold,
          color: COLORS.darkGold,
        });
        cursorY -= 14;

        const selectedSet = new Set(selections[q.id] || []);
        for (let idx = 0; idx < q.options.length; idx += 2) {
          ensureChecklistSpace(18);
          for (let col = 0; col < 2; col++) {
            const opt = q.options[idx + col];
            if (!opt) continue;
            const ox = MARGIN_X + 6 + col * (colW + 10);
            const isChecked = isFilled && selectedSet.has(opt.id);

            // Checkbox square
            page.drawRectangle({
              x: ox,
              y: cursorY - 1.5,
              width: 9,
              height: 9,
              color: isChecked ? COLORS.gold : COLORS.white,
              borderColor: isChecked ? COLORS.obsidian : COLORS.textMuted,
              borderWidth: 0.9,
            });
            if (isChecked) {
              page.drawText("X", {
                x: ox + 2,
                y: cursorY - 0.5,
                size: 7.5,
                font: sansBold,
                color: COLORS.obsidian,
              });
            }

            const optText = sanitizeWinAnsi(opt.label);
            const clipped = optText.length > 39 ? `${optText.slice(0, 36)}...` : optText;
            page.drawText(clipped, {
              x: ox + 14,
              y: cursorY,
              size: 8.7,
              font: isChecked ? sansBold : sansRegular,
              color: isChecked ? COLORS.obsidian : COLORS.textDark,
            });
          }
          cursorY -= 16;
        }
        cursorY -= 4;
      }

      // Card workbook notes box (ruled lines when blank, printed text when filled)
      const actualNoteH = userCardNote ? Math.max(36, noteLines.length * 12 + 24) : 44;
      ensureChecklistSpace(actualNoteH + 14);
      page.drawRectangle({
        x: MARGIN_X,
        y: cursorY - actualNoteH,
        width: CONTENT_W,
        height: actualNoteH,
        color: COLORS.white,
        borderColor: COLORS.borderLight,
        borderWidth: 0.9,
      });
      page.drawText(sanitizeWinAnsi(`Notes — ${card.notePrompt}`), {
        x: MARGIN_X + 8,
        y: cursorY - 13,
        size: 7.8,
        font: sansBold,
        color: COLORS.darkGold,
      });

      if (userCardNote) {
        let ny = cursorY - 26;
        for (const nl of noteLines) {
          page.drawText(nl, { x: MARGIN_X + 8, y: ny, size: 8.9, font: sansRegular, color: COLORS.obsidian });
          ny -= 12;
        }
      } else {
        // Two clean writing lines for pen input during in-person meetings
        page.drawLine({
          start: { x: MARGIN_X + 8, y: cursorY - 26 },
          end: { x: PAGE_W - MARGIN_X - 8, y: cursorY - 26 },
          thickness: 0.5,
          color: COLORS.borderLight,
        });
        page.drawLine({
          start: { x: MARGIN_X + 8, y: cursorY - 38 },
          end: { x: PAGE_W - MARGIN_X - 8, y: cursorY - 38 },
          thickness: 0.5,
          color: COLORS.borderLight,
        });
      }
      cursorY -= actualNoteH + 14;
    }

    // Personalized Recommendations Summary if Filled
    if (isFilled && recommendations && recommendations.length > 0) {
      const recH = recommendations.length * 16 + 34;
      ensureChecklistSpace(recH + 12);
      page.drawRectangle({
        x: MARGIN_X,
        y: cursorY - recH,
        width: CONTENT_W,
        height: recH,
        color: COLORS.cream,
        borderColor: COLORS.gold,
        borderWidth: 1,
      });
      page.drawText("TAILORED HUBS, TOOLS & TOURS MATCHED TO YOUR ANSWERS:", {
        x: MARGIN_X + 12,
        y: cursorY - 16,
        size: 8.5,
        font: sansBold,
        color: COLORS.darkGold,
      });
      let ry = cursorY - 32;
      for (const rec of recommendations) {
        drawClickableLinkText(
          pdfDoc,
          page,
          `[${rec.kind}] ${rec.label} ->`,
          toAbsoluteWebsiteUrl(rec.href),
          MARGIN_X + 12,
          ry,
          8.8,
          sansBold
        );
        ry -= 15;
      }
      cursorY -= recH + 14;
    }
  }

  // How Mark & Rachael Handle It + Sources + Contact Strip
  if (input.howWeHandleIt) {
    const hLines = wrapText(input.howWeHandleIt, sansRegular, 9.8, CONTENT_W - 24);
    const boxH = hLines.length * 14 + 34;
    guaranteeSpace(boxH + 14);
    page.drawRectangle({
      x: MARGIN_X,
      y: cursorY - boxH,
      width: CONTENT_W,
      height: boxH,
      color: COLORS.cream,
      borderColor: COLORS.gold,
      borderWidth: 1,
    });
    page.drawText("HOW MARK & RACHAEL GUIDE YOU ON THIS STEP", {
      x: MARGIN_X + 12,
      y: cursorY - 16,
      size: 8.5,
      font: sansBold,
      color: COLORS.darkGold,
    });
    let hy = cursorY - 31;
    for (const hl of hLines) {
      page.drawText(hl, { x: MARGIN_X + 12, y: hy, size: 9.8, font: sansRegular, color: COLORS.textDark });
      hy -= 14;
    }
    cursorY -= boxH + 14;
  }

  if (input.sources && input.sources.length > 0) {
    const srcText = `Verified Sources: ${input.sources.join("  |  ")}`;
    const sLines = wrapText(srcText, sansRegular, 8.2, CONTENT_W);
    guaranteeSpace(sLines.length * 11 + 12);
    for (const sl of sLines) {
      page.drawText(sl, { x: MARGIN_X, y: cursorY, size: 8.2, font: sansRegular, color: COLORS.textMuted });
      cursorY -= 11;
    }
    cursorY -= 10;
  }

  // Active Hyperlinks Back to Davis & Garnett Website
  const websiteLinks: PdfRelatedLink[] = [
    {
      label: isTour ? "Open Interactive Tour & Map Online" : "Open Live Online Edition",
      url: livePageUrl,
    },
    ...(input.relatedLinks || []).map((rl) => ({
      label: rl.label,
      url: toAbsoluteWebsiteUrl(rl.url),
    })),
    { label: "Search Live Tampa Bay MLS", url: `${SITE_ORIGIN}/search-mls` },
    { label: "Contact Mark Davis & Rachael Garnett", url: `${SITE_ORIGIN}/contact` },
  ];
  const dedupedLinks: PdfRelatedLink[] = [];
  const seenUrls = new Set<string>();
  for (const l of websiteLinks) {
    if (!seenUrls.has(l.url)) {
      seenUrls.add(l.url);
      dedupedLinks.push(l);
    }
  }
  const topLinks = dedupedLinks.slice(0, 6);
  const linksBoxH = topLinks.length * 15 + 32;
  guaranteeSpace(linksBoxH + 14);
  page.drawRectangle({
    x: MARGIN_X,
    y: cursorY - linksBoxH,
    width: CONTENT_W,
    height: linksBoxH,
    color: COLORS.noteBg,
    borderColor: COLORS.borderLight,
    borderWidth: 0.9,
  });
  page.drawText("ACTIVE LINKS BACK TO DAVISGARNETTSELLS.COM (CLICK IN PDF READER):", {
    x: MARGIN_X + 12,
    y: cursorY - 16,
    size: 8.2,
    font: sansBold,
    color: COLORS.darkGold,
  });
  let linkY = cursorY - 32;
  for (const itemLink of topLinks) {
    drawClickableLinkText(
      pdfDoc,
      page,
      `*  ${itemLink.label} ->`,
      itemLink.url,
      MARGIN_X + 12,
      linkY,
      8.8,
      sansBold
    );
    linkY -= 15;
  }
  cursorY -= linksBoxH + 14;

  // Final Advisor Callout Card (printer-friendly white card with gold border & accent bar)
  guaranteeSpace(78);
  page.drawRectangle({
    x: MARGIN_X,
    y: cursorY - 70,
    width: CONTENT_W,
    height: 70,
    color: COLORS.white,
    borderColor: COLORS.gold,
    borderWidth: 1.5,
  });
  page.drawRectangle({
    x: MARGIN_X,
    y: cursorY - 70,
    width: 4,
    height: 70,
    color: COLORS.gold,
  });
  page.drawText("READY FOR A LIVE SHOWING OR PRIVATE GUIDED TOUR?", {
    x: MARGIN_X + 14,
    y: cursorY - 19,
    size: 9,
    font: sansBold,
    color: COLORS.darkGold,
  });
  page.drawText("Mark Davis (FL Lic #3209459): 941-737-4127   |   Rachael Garnett (FL Lic #3378601): 727-808-3344", {
    x: MARGIN_X + 14,
    y: cursorY - 36,
    size: 9,
    font: sansBold,
    color: COLORS.obsidian,
  });
  const cardAddr = "Align Right Realty Carrollwood  *  3903 Northdale Blvd Suite 115W, Tampa FL 33624  *  ";
  page.drawText(cardAddr, {
    x: MARGIN_X + 14,
    y: cursorY - 52,
    size: 8.2,
    font: sansRegular,
    color: COLORS.textMuted,
  });
  const cardAddrW = sansRegular.widthOfTextAtSize(cardAddr, 8.2);
  drawClickableLinkText(
    pdfDoc,
    page,
    "davisgarnettsells.com",
    SITE_ORIGIN,
    MARGIN_X + 14 + cardAddrW,
    cursorY - 52,
    8.2,
    sansBold,
    COLORS.darkGold
  );

  // ── STAMP BRANDED PRINTER-FRIENDLY FOOTER ON EVERY PAGE (DG Favicon Bottom-Left + Orange Align Right Bottom-Right) ──
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  const shortFooterTitle = sanitizeWinAnsi(
    input.title.length > 42 ? `${input.title.slice(0, 39)}...` : input.title
  );
  const copyrightLeft = sanitizeWinAnsi(
    `${shortFooterTitle}  *  ${input.createdDateLabel}`
  );
  const copyrightSub = sanitizeWinAnsi(
    "(c) 2026 Davis & Garnett - Align Right Realty Carrollwood"
  );

  for (let pIdx = 0; pIdx < totalPages; pIdx++) {
    const p = pages[pIdx];
    p.drawLine({
      start: { x: MARGIN_X, y: 52 },
      end: { x: PAGE_W - MARGIN_X, y: 52 },
      thickness: 0.75,
      color: COLORS.gold,
    });

    // Bottom-left DG Favicon + compact copyright text
    let leftTextX = MARGIN_X;
    if (dgFavicon) {
      const favDims = dgFavicon.scaleToFit(24, 24);
      p.drawImage(dgFavicon, {
        x: MARGIN_X,
        y: 18,
        width: favDims.width,
        height: favDims.height,
      });
      leftTextX = MARGIN_X + favDims.width + 8;
    }

    p.drawText(copyrightLeft, {
      x: leftTextX,
      y: FOOTER_Y + 6,
      size: 7.4,
      font: sansBold,
      color: COLORS.textDark,
    });
    p.drawText(copyrightSub, {
      x: leftTextX,
      y: FOOTER_Y - 5,
      size: 7.2,
      font: sansRegular,
      color: COLORS.textMuted,
    });

    // Bottom-right Orange Align Right Realty logo + Page X of Y
    const pageStr = `Page ${pIdx + 1} of ${totalPages}`;
    const pageStrW = sansBold.widthOfTextAtSize(pageStr, 7.6);
    if (alignRightLogo) {
      const arDims = alignRightLogo.scaleToFit(90, 26);
      const arX = PAGE_W - MARGIN_X - arDims.width;
      p.drawImage(alignRightLogo, {
        x: arX,
        y: 17,
        width: arDims.width,
        height: arDims.height,
      });
      p.drawText(pageStr, {
        x: arX - pageStrW - 10,
        y: FOOTER_Y,
        size: 7.6,
        font: sansBold,
        color: COLORS.textMuted,
      });
    } else {
      p.drawText(pageStr, {
        x: PAGE_W - MARGIN_X - pageStrW,
        y: FOOTER_Y,
        size: 7.6,
        font: sansBold,
        color: COLORS.textMuted,
      });
    }
  }

  return pdfDoc.save();
}

