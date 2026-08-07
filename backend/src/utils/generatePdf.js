import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import sharp from "sharp";

const generatePdf = async ({ document, company }) => {
  const directory = path.join(process.cwd(), "src", "pdfs", "invoices");

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const fileName = `${document.documentNumber}.pdf`;

  const relativePath = path.join("pdfs", "invoices", fileName);

  const filePath = path.join(process.cwd(), "src", relativePath);

  const pdf = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  const stream = fs.createWriteStream(filePath);

  const upiId = company.bankDetails?.upiId;

  const upiUrl =
    upiId &&
    `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
      company.companyName,
    )}&am=${document.totalAmount.toFixed(
      2,
    )}&cu=INR&tn=${encodeURIComponent(document.documentNumber)}`;

  let qrBuffer = null;

  if (upiUrl) {
    qrBuffer = await QRCode.toBuffer(upiUrl, {
      width: 180,
      margin: 1,
    });
  }

  pdf.pipe(stream);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const documentTitle = {
    INVOICE: "INVOICE",
    PROFORMA: "PROFORMA INVOICE",
    CREDIT_NOTE: "CREDIT NOTE",
  }[document.documentType];

  pdf
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#111111")
    .text(documentTitle, 40, 25, {
      align: "center",
    });

  pdf.moveDown(1);

  /* ========================================================== */
  /*                       COMPANY DETAILS                      */
  /* ========================================================== */

  const logoPath = company.logoUrl
    ? path.join(process.cwd(), company.logoUrl.replace(/^\/+/, ""))
    : null;

  const rawHasLogo = logoPath && fs.existsSync(logoPath);
  let logoBuffer = null;
  let hasLogo = false;

  if (rawHasLogo) {
    try {
      const ext = path.extname(logoPath).toLowerCase();
      if (ext === ".webp") {
        logoBuffer = await sharp(logoPath).png().toBuffer();
      } else {
        logoBuffer = logoPath;
      }
      hasLogo = true;
    } catch (err) {
      console.error("Failed to load or convert company logo for PDF:", err.message);
      logoBuffer = null;
      hasLogo = false;
    }
  }

  const address = company.addresses?.registeredOffice;

  // ===========================================================
  // LOGO
  // ===========================================================

  const logoX = 40;
  const logoY = 60;
  const logoSize = 55;

  // Only render logo if it actually exists and is valid
  if (hasLogo && logoBuffer) {
    try {
      pdf.image(logoBuffer, logoX, logoY, {
        fit: [logoSize, logoSize],
        align: "center",
        valign: "center",
      });
    } catch (err) {
      console.error("Failed to embed logo into PDF:", err.message);
      hasLogo = false;
    }
  }

  // ===========================================================
  // COMPANY DETAILS
  // ===========================================================

  // If logo exists, company details start after logo.
  // Otherwise use the empty logo space so layout stays consistent.
  const textX = hasLogo ? 125 : 40;

  pdf
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#111111")
    .text(company.companyName?.toUpperCase() || "-", textX, 62);

  pdf.font("Helvetica").fontSize(9).fillColor("#444444");

  if (address) {
    const addressLine = `${address.addressLine1 || ""}${
      address.addressLine2 ? ", " + address.addressLine2 : ""
    }`;

    if (addressLine.trim()) {
      pdf.text(addressLine, textX);
    }

    const cityLine = [address.city, address.state, address.country]
      .filter(Boolean)
      .join(", ");

    const locationLine = address.pincode
      ? `${cityLine}${cityLine ? " - " : ""}${address.pincode}`
      : cityLine;

    if (locationLine) {
      pdf.text(locationLine, textX);
    }
  }

  pdf.moveDown(0.25);

  // ===========================================================
  // DOCUMENT DETAILS - RIGHT SIDE
  // ===========================================================

  const infoX = 395;
  let infoY = 73;

  const documentLabel = {
    INVOICE: "Invoice No",
    PROFORMA: "Proforma No",
    CREDIT_NOTE: "Credit Note No",
  }[document.documentType];

  const drawInfo = (label, value) => {
    pdf
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#111111")
      .text(label || "-", infoX, infoY, {
        width: 72,
      });

    pdf.text(":", infoX + 74, infoY);

    pdf
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#111111")
      .text(value || "-", infoX + 84, infoY);

    infoY += 15;
  };

  drawInfo(documentLabel || "Document No", document.documentNumber);

  drawInfo(
    "Date",
    document.documentDate ? formatDate(document.documentDate) : "-",
  );

  drawInfo("Due Date", document.dueDate ? formatDate(document.dueDate) : "-");

  drawInfo("PAN", company.pan);

  drawInfo("Email", company.email);

  // ===========================================================
  // COMPANY ADDITIONAL INFORMATION - LEFT SIDE
  // ===========================================================

  // Keep this aligned with company details.
  const leftInfoX = textX;

  let companyInfoY = 105;

  // GSTIN
  pdf
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#111111")
    .text("GSTIN :", leftInfoX, companyInfoY);

  pdf
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#111111")
    .text(company.gstin || "-", leftInfoX + 42, companyInfoY);

  companyInfoY += 14;

  // Phone
  pdf
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#111111")
    .text("Phone :", leftInfoX, companyInfoY);

  pdf
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#111111")
    .text(company.phone || "-", leftInfoX + 42, companyInfoY);

  companyInfoY += 14;

  // Website
  if (company.website) {
    pdf
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#111111")
      .text("Website :", leftInfoX, companyInfoY);

    pdf
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#2563eb")
      .text(company.website, leftInfoX + 52, companyInfoY, {
        link: company.website,
        underline: false,
      });
  }

  // Reset text color
  pdf.fillColor("#111111");

  // ===========================================================
  // HEADER DIVIDER
  // ===========================================================

  pdf.y = 155;

  pdf
    .save()
    .strokeColor("#B5B5B5")
    .lineWidth(0.8)
    .moveTo(40, pdf.y)
    .lineTo(555, pdf.y)
    .stroke()
    .restore();

  pdf.moveDown(0.8);

  /* ========================================================== */
  /*                    CUSTOMER DETAILS                        */
  /* ========================================================== */

  const leftX = 40;
  const rightX = 310;

  const labelWidth = 95;
  const lineGap = 13;

  const startY = pdf.y;

  const boxWidth = 240;
  const boxHeight = 110;

  const drawField = (x, y, label, value, valueWidth = 125) => {
    if (!value) return false;

    pdf
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#555555")
      .text(label, x, y, {
        width: labelWidth,
      });

    pdf.text(":", x + labelWidth + 5, y);

    pdf
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#111111")
      .text(String(value), x + labelWidth + 15, y, {
        width: valueWidth,
      });
    return true;
  };

  // Left Card

  pdf
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#1f2937")
    .text("Bill To", leftX, startY);

  let leftY = startY + 28;

  if (document.customerSnapshot.customerCode) {
    drawField(
      leftX,
      leftY,
      "Customer Code",
      document.customerSnapshot.customerCode,
    );

    leftY += lineGap;
  }

  if (document.customerSnapshot.customerName) {
    drawField(leftX, leftY, "Customer", document.customerSnapshot.customerName);

    leftY += lineGap;
  }

  if (document.customerSnapshot.contactPerson) {
    drawField(leftX, leftY, "Contact", document.customerSnapshot.contactPerson);

    leftY += lineGap;
  }

  if (document.customerSnapshot.email) {
    drawField(leftX, leftY, "Email", document.customerSnapshot.email);

    leftY += lineGap;
  }

  if (document.customerSnapshot.phone) {
    drawField(leftX, leftY, "Phone", document.customerSnapshot.phone);

    leftY += lineGap;
  }

  if (document.customerSnapshot.gstin) {
    drawField(leftX, leftY, "GSTIN", document.customerSnapshot.gstin);

    leftY += lineGap;
  }

  const billing = document.customerSnapshot.billingAddress;

  if (
    billing &&
    (billing.addressLine1 ||
      billing.addressLine2 ||
      billing.city ||
      billing.state ||
      billing.country ||
      billing.pincode)
  ) {
    const billingAddress = [
      billing.addressLine1,
      billing.addressLine2,
      billing.city,
      billing.state,
      billing.country,
      billing.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    drawField(leftX, leftY, "Address", billingAddress, 135);

    leftY = pdf.y + 4;
  }

  /* ---------------- RIGHT ---------------- */

  pdf
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#1f2937")
    .text("Shipping To", rightX, startY);

  let rightY = startY + 28;

  const shippingAddress = document.customerSnapshot.shippingAddress || {};

  const isSameAddress =
    (billing?.addressLine1 || "") === (shippingAddress.addressLine1 || "") &&
    (billing?.addressLine2 || "") === (shippingAddress.addressLine2 || "") &&
    (billing?.city || "") === (shippingAddress.city || "") &&
    (billing?.state || "") === (shippingAddress.state || "") &&
    (billing?.country || "") === (shippingAddress.country || "") &&
    (billing?.pincode || "") === (shippingAddress.pincode || "");

  if (isSameAddress) {
    pdf
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#111111")
      .text("Same as Bill To", rightX, rightY);

    rightY += lineGap;
  } else if (
    shippingAddress.addressLine1 ||
    shippingAddress.addressLine2 ||
    shippingAddress.city ||
    shippingAddress.state ||
    shippingAddress.country ||
    shippingAddress.pincode
  ) {
    const address = [
      shippingAddress.addressLine1,
      shippingAddress.addressLine2,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.country,
      shippingAddress.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    drawField(rightX, rightY, "Address", address);

    rightY = pdf.y + 4;
  }

  pdf.y = Math.max(leftY, rightY) + 25;

  pdf
    .lineWidth(0.8)
    .strokeColor("#bcbcbc")
    .moveTo(40, pdf.y)
    .lineTo(555, pdf.y)
    .stroke();

  pdf.moveDown(0.6);

  /* ========================================================== */
  /*                          ITEMS                            */
  /* ========================================================== */

  pdf.font("Helvetica-Bold").fontSize(11);

  pdf.text("Items", 40);

  pdf.moveDown(0.5);

  const tableTop = pdf.y;
  const rowHeight = 24;

  const noX = 45;
  const descX = 75;
  const hsnX = 340;
  const amountX = 435;

  // Header
  pdf.rect(40, tableTop, 515, rowHeight).fillAndStroke("#f3f4f6", "#d1d5db");

  pdf.fillColor("black");

  pdf.font("Helvetica-Bold").fontSize(9).fillColor("#555555");

  pdf.text("#", noX, tableTop + 7);

  pdf.text("Description", descX, tableTop + 7);

  pdf.text("HSN/SAC", hsnX, tableTop + 7);

  pdf.text("Amount", amountX, tableTop + 7, {
    width: 90,
    align: "right",
  });

  let currentY = tableTop + rowHeight;

  pdf.font("Helvetica");

  document.items.forEach((item, index) => {
    if (index % 2 === 0) {
      pdf.rect(40, currentY, 515, rowHeight).fill("#fafafa");

      pdf.fillColor("black");
    }

    pdf.text(index + 1, noX, currentY + 7);

    pdf.text(item.description, descX, currentY + 7, {
      width: 240,
    });

    pdf.text(item.hsnSacCode || "-", hsnX, currentY + 7);

    pdf.text(`Rs. ${Number(item.amount).toFixed(2)}`, amountX, currentY + 7, {
      width: 90,
      align: "right",
    });

    pdf
      .moveTo(40, currentY + rowHeight)
      .lineTo(555, currentY + rowHeight)
      .strokeColor("#e5e7eb")
      .stroke();

    currentY += rowHeight;
  });

  pdf.y = currentY + 15;

  /* ========================================================== */
  /*                    TAX SUMMARY & TOTALS                    */
  /* ========================================================== */

  pdf.moveDown();

  const summaryX = 320;
  const summaryWidth = 235;
  const summaryRowHeight = 22;

  let summaryY = pdf.y;

  pdf
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("black")
    .text("Summary", summaryX, summaryY);

  summaryY += 20;

  // Calculate box height dynamically
  const boxHeightC = (document.taxes.length + 3) * summaryRowHeight + 16;

  // Outer Box
  pdf.roundedRect(summaryX, summaryY, summaryWidth, boxHeightC, 4).stroke();

  // ---------- Subtotal ----------

  let rowY = summaryY + 9;

  pdf.font("Helvetica");

  pdf.text("Subtotal", summaryX + 9, rowY);

  pdf.text(`Rs. ${document.subtotal.toFixed(2)}`, summaryX + 120, rowY, {
    width: 90,
    align: "right",
  });

  rowY += summaryRowHeight;

  // ---------- Taxes ----------

  document.taxes.forEach((tax) => {
    pdf.text(`${tax.name} (${tax.percentage}%)`, summaryX + 9, rowY);

    pdf.text(`Rs. ${tax.amount.toFixed(2)}`, summaryX + 118, rowY, {
      width: 90,
      align: "right",
    });

    rowY += summaryRowHeight;
  });

  // Divider
  pdf
    .moveTo(summaryX + 9, rowY)
    .lineTo(summaryX + summaryWidth - 9, rowY)
    .stroke();

  rowY += 8;

  // ---------- Total Tax ----------

  pdf.font("Helvetica-Bold");

  pdf.text("Total Tax", summaryX + 9, rowY);

  pdf.text(`Rs. ${document.totalTax.toFixed(2)}`, summaryX + 120, rowY, {
    width: 90,
    align: "right",
  });

  rowY += summaryRowHeight + 3;

  // ---------- Grand Total ----------

  pdf
    .save()
    .fillColor("#273142")
    .roundedRect(summaryX + 1, rowY - 4, summaryWidth - 2, 28, 3)
    .fill()
    .restore();

  pdf.font("Helvetica-Bold").fontSize(9).fillColor("white");

  pdf.text("Grand Total", summaryX + 9, rowY + 3);

  pdf.text(`Rs. ${document.totalAmount.toFixed(2)}`, summaryX + 120, rowY + 3, {
    width: 90,
    align: "right",
  });

  // Reset
  pdf.fillColor("black");

  pdf.y = summaryY + boxHeightC + 25;

  /* ========================================================== */
  /*                  PAYMENT DETAILS (LEFT SIDE)                */
  /* ========================================================== */

  const paymentX = 40;
  const paymentY = summaryY;
  const paymentWidth = 250;

  const bank = company.bankDetails || {};

  pdf
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#111111")
    .text("Payment Details", paymentX, paymentY);

  let currentPaymentY = paymentY + 28;

  const drawPaymentField = (label, value) => {
    if (!value) return;

    pdf
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#555555")
      .text(label, paymentX + 10, currentPaymentY);

    pdf
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#111111")
      .text(value, paymentX + 90, currentPaymentY);

    currentPaymentY += 15;
  };

  drawPaymentField("Bank Name", bank.bankName);
  drawPaymentField("Account Name", bank.accountName);
  drawPaymentField("Account No.", bank.accountNumber);
  drawPaymentField("IFSC", bank.ifscCode);
  drawPaymentField("Branch", bank.branch);
  drawPaymentField("UPI ID", bank.upiId);

  /* ---------------- QR CODE ---------------- */

  if (qrBuffer) {
    const qrSize = 70;

    const qrX = paymentX + 80; // Center under payment details
    const qrY = currentPaymentY + 8;

    pdf
      .roundedRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 20, 4)
      .lineWidth(0.5)
      .strokeColor("#dddddd")
      .stroke();

    pdf.image(qrBuffer, qrX, qrY, {
      width: qrSize,
      height: qrSize,
    });

    pdf
      .font("Helvetica")
      .fontSize(7)
      .fillColor("#666666")
      .text("Scan & Pay", qrX, qrY + qrSize + 4, {
        width: qrSize,
        align: "center",
      });

    currentPaymentY = qrY + qrSize + 18;
  }

  /* ========================================================== */
  /*                         NOTES                              */
  /* ========================================================== */

  // Bottom of Summary
  const summaryBottom = summaryY + boxHeightC;

  const notesTop = Math.max(currentPaymentY, summaryBottom) + 15;
  const notesHeight = 60;

  // Draw Notes Box...

  // Bottom of Payment Details
  const paymentBottom = notesTop + notesHeight;

  // Footer starts after whichever section is lower
  const footerY = Math.max(paymentBottom, summaryBottom) + 35;

  pdf
    .roundedRect(40, notesTop, 515, notesHeight, 4)
    .lineWidth(0.7)
    .strokeColor("#d6d6d6")
    .stroke();

  pdf
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#111111")
    .text("Notes", 50, notesTop + 10);

  pdf
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333333")
    .text(document.notes || "No additional notes.", 50, notesTop + 28, {
      width: 495,
      height: 30,
    });

  /* ========================================================== */
  /*                         FOOTER                             */
  /* ========================================================== */

  // Divider
  pdf
    .strokeColor("#d6d6d6")
    .lineWidth(0.8)
    .moveTo(40, footerY)
    .lineTo(555, footerY)
    .stroke();

  // Footer message
  pdf
    .font("Helvetica-Oblique")
    .fontSize(9)
    .fillColor("#666666")
    .text(
      "This is a system-generated document and does not require a physical signature.",
      40,
      footerY + 10,
      {
        width: 515,
        align: "center",
      },
    );

  pdf.fillColor("black");

  pdf.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return {
    fileName,
    filePath: relativePath,
  };
};

export default generatePdf;
