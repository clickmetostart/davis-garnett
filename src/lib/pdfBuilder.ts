import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";

export interface PdfSectionInput {
  heading: string;
  body: string;
  bullets?: string[];
  metaLine?: string;
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

export interface BrandedPdfInput {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  authorLine: string;
  createdDateLabel: string;
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
const FOOTER_Y = 30;
const MIN_CONTENT_Y = 64;

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
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(sanitizeWinAnsi(`${input.title} — Davis & Garnett Advisory Workbook`));
  pdfDoc.setAuthor(sanitizeWinAnsi(input.authorLine));
  pdfDoc.setSubject(sanitizeWinAnsi(input.category));
  pdfDoc.setCreator("Davis & Garnett — Align Right Realty Carrollwood");

  const serifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const serifRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const sansRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ── PAGE 1: BRANDED COVER PAGE ──
  const cover = pdfDoc.addPage([PAGE_W, PAGE_H]);

  // Top obsidian banner
  cover.drawRectangle({
    x: 0,
    y: PAGE_H - 275,
    width: PAGE_W,
    height: 275,
    color: COLORS.obsidian,
  });
  cover.drawRectangle({
    x: 0,
    y: PAGE_H - 279,
    width: PAGE_W,
    height: 4,
    color: COLORS.gold,
  });

  // Brand header line
  cover.drawText(sanitizeWinAnsi("DAVIS & GARNETT  |  COMMERCIAL & RESIDENTIAL ADVISORS"), {
    x: MARGIN_X,
    y: PAGE_H - 54,
    size: 9.5,
    font: sansBold,
    color: COLORS.gold,
  });
  cover.drawText(sanitizeWinAnsi("Align Right Realty Carrollwood  *  FL Lic #BK3401606"), {
    x: MARGIN_X,
    y: PAGE_H - 70,
    size: 8.5,
    font: sansRegular,
    color: rgb(0.75, 0.75, 0.75),
  });

  // Category pill
  const catText = sanitizeWinAnsi(input.category.toUpperCase());
  const catW = Math.min(CONTENT_W, sansBold.widthOfTextAtSize(catText, 8.5) + 20);
  cover.drawRectangle({
    x: MARGIN_X,
    y: PAGE_H - 110,
    width: catW,
    height: 18,
    color: COLORS.gold,
  });
  cover.drawText(catText, {
    x: MARGIN_X + 10,
    y: PAGE_H - 104,
    size: 8.5,
    font: sansBold,
    color: COLORS.obsidian,
  });

  // Cover Title + Subtitle
  const titleLines = wrapText(input.title, serifBold, 26, CONTENT_W).slice(0, 3);
  let titleY = PAGE_H - 144;
  for (const line of titleLines) {
    cover.drawText(line, {
      x: MARGIN_X,
      y: titleY,
      size: 26,
      font: serifBold,
      color: COLORS.white,
    });
    titleY -= 31;
  }

  const subLines = wrapText(input.subtitle, sansRegular, 11.5, CONTENT_W).slice(0, 3);
  let subY = titleY - 6;
  for (const line of subLines) {
    cover.drawText(line, {
      x: MARGIN_X,
      y: subY,
      size: 11.5,
      font: sansRegular,
      color: rgb(0.84, 0.84, 0.84),
    });
    subY -= 16;
  }

  // Host & Personalized Recipient Box
  let coverY = PAGE_H - 315;
  cover.drawRectangle({
    x: MARGIN_X,
    y: coverY - 58,
    width: CONTENT_W,
    height: 68,
    color: COLORS.cream,
    borderColor: COLORS.gold,
    borderWidth: 1,
  });
  cover.drawText(
    sanitizeWinAnsi(`PREPARED BY: ${input.authorLine}`),
    { x: MARGIN_X + 14, y: coverY - 10, size: 9.5, font: sansBold, color: COLORS.obsidian }
  );
  const recipientLine = input.workbook?.preparedForName
    ? `PREPARED FOR: ${input.workbook.preparedForName}  *  CREATED: ${input.createdDateLabel}`
    : `ORIGINAL INTERACTIVE WORKBOOK EDITION  *  CREATED: ${input.createdDateLabel}`;
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

  // Route Summary on Cover if Tour
  if (input.routeMeta) {
    const routeBoxH = 88;
    cover.drawRectangle({
      x: MARGIN_X,
      y: coverY - routeBoxH,
      width: CONTENT_W,
      height: routeBoxH,
      color: COLORS.obsidian,
    });
    cover.drawText("SEQUENTIAL DRIVING TOUR SUMMARY", {
      x: MARGIN_X + 14,
      y: coverY - 18,
      size: 8.5,
      font: sansBold,
      color: COLORS.gold,
    });
    cover.drawText(
      sanitizeWinAnsi(`${input.routeMeta.duration}  *  ${input.routeMeta.distanceSummary}`),
      { x: MARGIN_X + 14, y: coverY - 34, size: 10.5, font: sansBold, color: COLORS.white }
    );
    const startLines = wrapText(`Start Point: ${input.routeMeta.startAddress}`, sansRegular, 9, CONTENT_W - 28).slice(0, 2);
    let sy = coverY - 50;
    for (const sl of startLines) {
      cover.drawText(sl, { x: MARGIN_X + 14, y: sy, size: 9, font: sansRegular, color: rgb(0.85, 0.85, 0.85) });
      sy -= 13;
    }
    const dirLines = wrapText(input.routeMeta.routeDirectionNote, sansRegular, 8.5, CONTENT_W - 28).slice(0, 1);
    if (dirLines[0]) {
      cover.drawText(dirLines[0], { x: MARGIN_X + 14, y: coverY - 76, size: 8.5, font: sansRegular, color: COLORS.gold });
    }
    coverY -= routeBoxH + 18;
  }

  // What's Inside / Contents Summary on Cover
  if (coverY > 140) {
    cover.drawText("INCLUDED INSIDE THIS WORKBOOK", {
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
    p.drawText(sanitizeWinAnsi("DAVIS & GARNETT  *  INTERACTIVE FIELD WORKBOOK"), {
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
      page.drawText("YOUR SAVED WORKBOOK NOTES:", {
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
      page.drawText("[  ] Checked / Visited    WORKBOOK & TOUR NOTES (JOT HIGHLIGHTS BELOW):", {
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

  // Final Advisor Callout Card
  guaranteeSpace(76);
  page.drawRectangle({
    x: MARGIN_X,
    y: cursorY - 70,
    width: CONTENT_W,
    height: 70,
    color: COLORS.obsidian,
  });
  page.drawText("READY FOR A LIVE SHOWING OR PRIVATE GUIDED TOUR?", {
    x: MARGIN_X + 14,
    y: cursorY - 19,
    size: 9,
    font: sansBold,
    color: COLORS.gold,
  });
  page.drawText("Mark Davis (FL Lic #3209459): 941-737-4127   |   Rachael Garnett (FL Lic #3378601): 727-808-3344", {
    x: MARGIN_X + 14,
    y: cursorY - 36,
    size: 9,
    font: sansBold,
    color: COLORS.white,
  });
  page.drawText("Align Right Realty Carrollwood  *  3903 Northdale Blvd Suite 115W, Tampa FL 33624  *  davisgarnettsells.com", {
    x: MARGIN_X + 14,
    y: cursorY - 52,
    size: 8.2,
    font: sansRegular,
    color: rgb(0.8, 0.8, 0.8),
  });

  // ── STAMP CONSISTENT SMALL FOOTER ON EVERY PAGE ──
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  const shortFooterTitle = sanitizeWinAnsi(
    input.title.length > 48 ? `${input.title.slice(0, 45)}...` : input.title
  );
  const copyrightLeft = sanitizeWinAnsi(
    `${shortFooterTitle}  *  Created: ${input.createdDateLabel}`
  );
  const copyrightRightPrefix = sanitizeWinAnsi(
    "(c) 2026 Davis & Garnett - Align Right Realty Carrollwood"
  );

  for (let pIdx = 0; pIdx < totalPages; pIdx++) {
    const p = pages[pIdx];
    p.drawLine({
      start: { x: MARGIN_X, y: FOOTER_Y + 14 },
      end: { x: PAGE_W - MARGIN_X, y: FOOTER_Y + 14 },
      thickness: 0.5,
      color: COLORS.borderLight,
    });
    p.drawText(copyrightLeft, {
      x: MARGIN_X,
      y: FOOTER_Y,
      size: 7.5,
      font: sansRegular,
      color: COLORS.textMuted,
    });
    const pageNumStr = `${copyrightRightPrefix}  |  Page ${pIdx + 1} of ${totalPages}`;
    const rightW = sansRegular.widthOfTextAtSize(pageNumStr, 7.5);
    p.drawText(pageNumStr, {
      x: Math.max(MARGIN_X + 210, PAGE_W - MARGIN_X - rightW),
      y: FOOTER_Y,
      size: 7.5,
      font: sansRegular,
      color: COLORS.textMuted,
    });
  }

  return pdfDoc.save();
}

