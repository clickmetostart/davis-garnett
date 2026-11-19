<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>XML Sitemap — Davis &amp; Garnett Real Estate Advisors</title>
        <style>
          :root {
            --dg-obsidian: #0c0b09;
            --dg-ink: #111111;
            --dg-ivory: #f5f3ef;
            --dg-gold: #d4af37;
            --dg-gold-dark: #9a7d3a;
            --dg-orange: #ef5728;
            --dg-border: rgba(17, 17, 17, 0.1);
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: var(--dg-ivory);
            color: var(--dg-ink);
            line-height: 1.5;
          }
          .hero {
            background: var(--dg-obsidian);
            color: #ffffff;
            border-bottom: 2px solid rgba(212, 175, 55, 0.35);
            padding: 36px 20px 32px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .eyebrow {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: var(--dg-gold);
            margin-bottom: 8px;
          }
          .hero-top {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
          }
          h1 {
            margin: 0 0 8px;
            font-family: Georgia, "Times New Roman", serif;
            font-size: clamp(28px, 4vw, 42px);
            font-weight: 600;
            letter-spacing: -0.01em;
          }
          .subtitle {
            margin: 0;
            color: rgba(255, 255, 255, 0.72);
            font-size: 14px;
            max-width: 680px;
          }
          .stat-pill {
            background: rgba(212, 175, 55, 0.12);
            border: 1px solid rgba(212, 175, 55, 0.45);
            border-radius: 12px;
            padding: 12px 18px;
            text-align: right;
            min-width: 150px;
          }
          .stat-num {
            display: block;
            font-family: Georgia, serif;
            font-size: 28px;
            font-weight: 700;
            color: var(--dg-gold);
            line-height: 1.1;
          }
          .stat-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 700;
          }
          .main {
            padding: 28px 20px 64px;
          }
          .toolbar {
            background: #ffffff;
            border: 1px solid var(--dg-border);
            border-radius: 16px;
            padding: 18px;
            margin-bottom: 22px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          }
          .search-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
          }
          .search-input {
            flex: 1 1 280px;
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid rgba(17, 17, 17, 0.16);
            font-size: 14px;
            outline: none;
            background: #fbfbf9;
          }
          .search-input:focus {
            border-color: var(--dg-gold);
            background: #ffffff;
          }
          .home-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 16px;
            border-radius: 10px;
            background: var(--dg-obsidian);
            color: var(--dg-gold);
            text-decoration: none;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.14em;
          }
          .home-link:hover {
            background: var(--dg-gold);
            color: var(--dg-obsidian);
          }
          .hub-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .hub-tab {
            border: 1px solid rgba(17, 17, 17, 0.12);
            background: var(--dg-ivory);
            color: var(--dg-ink);
            border-radius: 999px;
            padding: 7px 13px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            transition: all 0.15s ease;
          }
          .hub-tab:hover {
            border-color: var(--dg-gold);
          }
          .hub-tab.active {
            background: var(--dg-obsidian);
            color: #ffffff;
            border-color: var(--dg-gold);
          }
          .hub-tab .count {
            background: rgba(212, 175, 55, 0.2);
            color: var(--dg-gold-dark);
            border-radius: 999px;
            padding: 1px 7px;
            font-size: 11px;
            font-weight: 700;
          }
          .hub-tab.active .count {
            background: var(--dg-gold);
            color: var(--dg-obsidian);
          }
          .table-card {
            background: #ffffff;
            border: 1px solid var(--dg-border);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          }
          .table-wrap {
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          thead {
            background: #141310;
            color: var(--dg-gold);
          }
          th {
            padding: 13px 16px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-weight: 700;
            white-space: nowrap;
          }
          td {
            padding: 11px 16px;
            border-bottom: 1px solid rgba(17, 17, 17, 0.06);
            font-size: 13px;
            vertical-align: middle;
          }
          tr:hover td {
            background: #faf8f3;
          }
          .url-link {
            color: var(--dg-ink);
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          .url-link:hover {
            color: var(--dg-gold-dark);
            text-decoration: underline;
          }
          .hub-badge {
            display: inline-block;
            padding: 3px 9px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            white-space: nowrap;
            background: #f5f3ef;
            color: var(--dg-gold-dark);
            border: 1px solid rgba(212, 175, 55, 0.35);
          }
          .hub-badge[data-hub="commercial-residential"] {
            background: #111111;
            color: var(--dg-gold);
            border-color: var(--dg-gold);
          }
          .hub-badge[data-hub="portfolio"] {
            background: rgba(239, 87, 40, 0.1);
            color: #b93a14;
            border-color: rgba(239, 87, 40, 0.35);
          }
          .hub-badge[data-hub="trending"] {
            background: rgba(212, 175, 55, 0.18);
            color: #7c6222;
          }
          .hub-badge[data-hub="knowledge"] {
            background: #eef4f8;
            color: #1e3a5f;
            border-color: rgba(30, 58, 95, 0.25);
          }
          .hub-badge[data-hub="areas-tours"] {
            background: #eef6f0;
            color: #1f5c35;
            border-color: rgba(31, 92, 53, 0.25);
          }
          .hub-badge[data-hub="tools-glossary"] {
            background: #f6f2fb;
            color: #553586;
            border-color: rgba(85, 53, 134, 0.25);
          }
          .date-cell {
            color: rgba(17, 17, 17, 0.55);
            font-size: 12px;
            white-space: nowrap;
          }
          .footer-note {
            margin-top: 18px;
            font-size: 12px;
            color: rgba(17, 17, 17, 0.6);
            text-align: center;
          }
        </style>
      </head>
      <body>
        <header class="hero">
          <div class="container hero-top">
            <div>
              <div class="eyebrow">Davis &amp; Garnett · Align Right Realty Carrollwood</div>
              <h1>Site Architecture &amp; XML Sitemap</h1>
              <p class="subtitle">
                Clean, search-engine-readable XML sitemap styled for human review. Filter by hub or view all indexed pages across Tampa Bay commercial &amp; residential real estate.
              </p>
            </div>
            <div class="stat-pill">
              <span class="stat-num" id="visible-count">
                <xsl:value-of select="count(sm:urlset/sm:url)" />
              </span>
              <span class="stat-label">Indexed URLs</span>
            </div>
          </div>
        </header>

        <main class="main">
          <div class="container">
            <div class="toolbar">
              <div class="search-row">
                <input
                  id="sitemap-search"
                  class="search-input"
                  type="search"
                  placeholder="Filter URLs by neighborhood, guide, listing, calculator, or keyword..."
                />
                <a class="home-link" href="/">← Return to Website</a>
              </div>
              <div class="hub-tabs" id="hub-tabs">
                <button type="button" class="hub-tab active" data-filter="all">
                  All Hubs <span class="count" id="count-all"><xsl:value-of select="count(sm:urlset/sm:url)" /></span>
                </button>
                <button type="button" class="hub-tab" data-filter="core">
                  Core &amp; Team <span class="count" id="count-core">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="commercial-residential">
                  Residential &amp; Commercial <span class="count" id="count-commercial-residential">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="portfolio">
                  Portfolio &amp; Listings <span class="count" id="count-portfolio">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="trending">
                  Trending &amp; Developments <span class="count" id="count-trending">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="knowledge">
                  Knowledge Hub &amp; Guides <span class="count" id="count-knowledge">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="areas-tours">
                  Areas &amp; Tours <span class="count" id="count-areas-tours">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="tools-glossary">
                  Calculators &amp; Glossary <span class="count" id="count-tools-glossary">0</span>
                </button>
                <button type="button" class="hub-tab" data-filter="legal">
                  Legal &amp; Compliance <span class="count" id="count-legal">0</span>
                </button>
              </div>
            </div>

            <div class="table-card">
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 48px;">#</th>
                      <th>Hub</th>
                      <th>URL</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody id="sitemap-tbody">
                    <xsl:for-each select="sm:urlset/sm:url">
                      <tr class="sitemap-row">
                        <td class="date-cell">
                          <xsl:value-of select="position()" />
                        </td>
                        <td>
                          <span class="hub-badge">Hub</span>
                        </td>
                        <td>
                          <a class="url-link" href="{sm:loc}">
                            <xsl:value-of select="sm:loc" />
                          </a>
                        </td>
                        <td class="date-cell">
                          <xsl:value-of select="substring(sm:lastmod, 1, 10)" />
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </div>

            <p class="footer-note">
              Standard XML Sitemap Protocol (sitemaps.org) with XSLT presentation—fully readable by Google Search Console, Bing Webmaster Tools, and AI crawlers.
            </p>
          </div>
        </main>

        <script>
          (function () {
            var LABELS = {
              "core": "Core &amp; Team",
              "commercial-residential": "Residential &amp; Commercial",
              "portfolio": "Portfolio &amp; Listings",
              "trending": "Trending &amp; Developments",
              "knowledge": "Knowledge Hub",
              "areas-tours": "Areas &amp; Tours",
              "tools-glossary": "Tools &amp; Glossary",
              "legal": "Legal &amp; Compliance"
            };

            function classifyPath(urlText) {
              var path = "/";
              try {
                path = new URL(urlText).pathname || "/";
              } catch (e) {
                path = urlText;
              }
              if (path === "/privacy-policy" || path === "/terms-of-service" || path === "/fair-housing" || path === "/accessibility") return "legal";
              if (path.indexOf("/tools/") === 0 || path === "/glossary" || path.indexOf("/glossary/") === 0) return "tools-glossary";
              if (path.indexOf("/knowledge-hub/areas/") === 0 || path === "/tours" || path.indexOf("/tours/") === 0) return "areas-tours";
              if (path === "/knowledge-hub" || path.indexOf("/knowledge-hub/") === 0 || path === "/market-reports" || path.indexOf("/market-reports/") === 0) return "knowledge";
              if (path === "/developments" || path.indexOf("/developments/") === 0) return "trending";
              if (path === "/properties" || path.indexOf("/listings/") === 0 || path === "/search-mls") return "portfolio";
              if (path === "/residential" || path.indexOf("/residential/") === 0 || path === "/commercial" || path.indexOf("/commercial/") === 0 || path.indexOf("/services/") === 0 || path.indexOf("/hub/") === 0) return "commercial-residential";
              return "core";
            }

            var rows = Array.prototype.slice.call(document.querySelectorAll(".sitemap-row"));
            var counts = {
              "core": 0,
              "commercial-residential": 0,
              "portfolio": 0,
              "trending": 0,
              "knowledge": 0,
              "areas-tours": 0,
              "tools-glossary": 0,
              "legal": 0
            };

            rows.forEach(function (row) {
              var link = row.querySelector(".url-link");
              var badge = row.querySelector(".hub-badge");
              var urlText = link ? link.textContent.trim() : "";
              var hub = classifyPath(urlText);
              row.setAttribute("data-hub", hub);
              row.setAttribute("data-url", urlText.toLowerCase());
              if (badge) {
                badge.setAttribute("data-hub", hub);
                badge.innerHTML = LABELS[hub] || "Core";
              }
              if (counts.hasOwnProperty(hub)) counts[hub]++;
            });

            Object.keys(counts).forEach(function (key) {
              var el = document.getElementById("count-" + key);
              if (el) el.textContent = counts[key];
            });

            var activeFilter = "all";
            var searchInput = document.getElementById("sitemap-search");
            var visibleEl = document.getElementById("visible-count");

            function applyFilters() {
              var q = (searchInput &amp;&amp; searchInput.value ? searchInput.value : "").trim().toLowerCase();
              var shown = 0;
              rows.forEach(function (row) {
                var matchHub = activeFilter === "all" || row.getAttribute("data-hub") === activeFilter;
                var matchQuery = !q || (row.getAttribute("data-url") || "").indexOf(q) !== -1;
                if (matchHub &amp;&amp; matchQuery) {
                  row.style.display = "";
                  shown++;
                } else {
                  row.style.display = "none";
                }
              });
              if (visibleEl) visibleEl.textContent = shown;
            }

            var tabs = Array.prototype.slice.call(document.querySelectorAll(".hub-tab"));
            tabs.forEach(function (tab) {
              tab.addEventListener("click", function () {
                tabs.forEach(function (t) { t.classList.remove("active"); });
                tab.classList.add("active");
                activeFilter = tab.getAttribute("data-filter") || "all";
                applyFilters();
              });
            });

            if (searchInput) {
              searchInput.addEventListener("input", applyFilters);
            }
          })();
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

