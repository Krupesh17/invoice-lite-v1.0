import { BASE_HEIGHT, PAGE_PADDING, currencyMap } from "@/constants";

export function formatAmount(amount = 0, currency = "USD") {
  return `${currencyMap[currency]}${Number(amount).toFixed(2)}`;
}

export function formatDate(str) {
  const d = new Date(str);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export const formatPx = (value, scale) => `${value * scale}px`;

// ─── Page Layout Calculator ───────────────────────────────────────────────────
// Given real measured heights, returns an array of page descriptors.
// Each page: { items: [...], showHeader, showFooter }
export function buildPageLayout({
  invoice,
  headerH,
  tableHeadH,
  footerH,
  rowHeights,
}) {
  const avail = BASE_HEIGHT - PAGE_PADDING * 2;
  const pages = [];
  let remRows =
    invoice?.invoiceItems?.map((item, i) => ({
      item,
      h: rowHeights[i] || 46,
    })) ?? [];

  // ── Page 1 ──
  // Available for rows on page 1 = total - header - tableHead - footer
  let used1 = headerH + tableHeadH;
  const page1Items = [];

  for (let i = 0; i < remRows.length; i++) {
    const rowH = remRows[i].h;
    // Check if this row + footer still fits
    if (used1 + rowH + footerH <= avail) {
      page1Items.push(remRows[i].item);
      used1 += rowH;
    } else {
      // Check if row fits without footer (footer goes to next page)
      if (used1 + rowH <= avail) {
        page1Items.push(remRows[i].item);
        used1 += rowH;
      } else {
        break; // row doesn't fit at all
      }
    }
  }
  remRows = remRows.slice(page1Items.length);

  // Does footer fit after page1 items?
  const footerFitsOnPage1 = remRows.length === 0 && used1 + footerH <= avail;
  pages.push({
    items: page1Items,
    showHeader: true,
    showFooter: footerFitsOnPage1 && remRows.length === 0,
  });

  // ── Continuation pages ──
  while (remRows.length > 0) {
    let usedN = tableHeadH;
    const pageItems = [];

    for (let i = 0; i < remRows.length; i++) {
      const rowH = remRows[i].h;
      if (usedN + rowH + footerH <= avail) {
        pageItems.push(remRows[i].item);
        usedN += rowH;
      } else {
        if (usedN + rowH <= avail) {
          pageItems.push(remRows[i].item);
          usedN += rowH;
        } else {
          break;
        }
      }
    }

    if (pageItems.length === 0) {
      // Edge case: even a single row + footer won't fit — force 1 row
      pageItems.push(remRows[0].item);
      usedN += remRows[0].h;
    }

    remRows = remRows.slice(pageItems.length);
    const isLast = remRows.length === 0;
    const footerFits = isLast && usedN + footerH <= avail;
    pages.push({
      items: pageItems,
      showHeader: false,
      showFooter: footerFits && isLast,
    });
  }

  // ── Footer page ──
  // If footer didn't fit on last page, add a dedicated page for it
  const lastPage = pages[pages.length - 1];
  if (!lastPage.showFooter) {
    // Check if footer fits on last page after its items
    const lastUsed =
      (lastPage.showHeader ? headerH : tableHeadH) +
      lastPage.items.reduce((s, item) => {
        const idx = invoice?.invoiceItems?.findIndex((i) => i.id === item.id);
        return s + (rowHeights[idx] || 46);
      }, 0);
    if (lastUsed + footerH <= avail) {
      lastPage.showFooter = true;
    } else {
      // Add a footer-only page
      pages.push({ items: [], showHeader: false, showFooter: true });
    }
  }

  return pages;
}

export function computeTotals(invoice) {
  const subtotal = invoice?.invoiceItems?.reduce(
    (s, i) => s + i?.quantity * i?.unitPrice,
    0,
  );
  const extras = invoice?.invoiceDetails?.billingDetails?.map((b) => ({
    ...b,
    amount: b.type === "percentage" ? (subtotal * b.value) / 100 : b.value,
  }));
  const total = subtotal + extras.reduce((s, e) => s + e.amount, 0);
  return { subtotal, extras, total };
}
