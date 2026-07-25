import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

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

  /* ========================================================== */
  /*                       COMPANY DETAILS                      */
  /* ========================================================== */

  const centerX = 297;

  const logoPath = company.logoUrl
    ? path.join(process.cwd(), company.logoUrl.replace(/^\/+/, ""))
    : null;

  const hasLogo = logoPath && fs.existsSync(logoPath);

  const address = company.addresses?.registeredOffice;

  if (hasLogo) {
    const logoX = 40;
    const logoY = 35;
    const logoSize = 70;

    pdf.image(logoPath, logoX, logoY, {
      fit: [logoSize, logoSize],
      align: "center",
      valign: "center",
    });

    const textX = 125;

    pdf
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("#111111")
      .text(company.companyName.toUpperCase(), textX, 40);

    pdf.font("Helvetica").fontSize(10).fillColor("#444444");

    if (address) {
      pdf.text(
        `${address.addressLine1}${
          address.addressLine2 ? ", " + address.addressLine2 : ""
        }`,
        textX,
      );

      pdf.text(
        `${address.city}, ${address.state}, ${address.country} - ${address.pincode}`,
        textX,
      );
    }

    let infoY = 105;

    pdf
      .font("Helvetica-Bold")
      .fillColor("#111111")
      .text("GSTIN :", textX, infoY);

    pdf.font("Helvetica").text(company.gstin || "-", textX + 45, infoY);

    pdf.font("Helvetica-Bold").text("PAN :", 330, infoY);

    pdf.font("Helvetica").text(company.pan || "-", 365, infoY);

    infoY += 18;

    pdf.font("Helvetica-Bold").text("Phone :", textX, infoY);

    pdf.font("Helvetica").text(company.phone || "-", textX + 45, infoY);

    pdf.font("Helvetica-Bold").text("Email :", 330, infoY);

    pdf.font("Helvetica").text(company.email || "-", 370, infoY);

    infoY += 18;

    if (company.website) {
      pdf
        .font("Helvetica-Bold")
        .fillColor("#111111")
        .text("Website :", textX, infoY);

      pdf
        .font("Helvetica")
        .fillColor("#2563eb")
        .text(company.website, textX + 60, infoY);
    }

    pdf.y = 155;
  } else {
    pdf
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("#111111")
      .text(company.companyName.toUpperCase(), {
        align: "center",
      });

    pdf.moveDown(0.6);

    pdf.font("Helvetica").fontSize(10).fillColor("#444444");

    if (address) {
      pdf.text(
        `${address.addressLine1}${
          address.addressLine2 ? ", " + address.addressLine2 : ""
        }`,
        {
          align: "center",
        },
      );

      pdf.text(
        `${address.city}, ${address.state}, ${address.country} - ${address.pincode}`,
        {
          align: "center",
        },
      );
    }

    pdf.moveDown(0.9);

    const leftInfoX = 90;
    const rightInfoX = 310;

    pdf
      .font("Helvetica-Bold")
      .fillColor("#111111")
      .text("GSTIN :", leftInfoX, pdf.y);

    pdf.font("Helvetica").text(company.gstin, leftInfoX + 45, pdf.y - 11);

    pdf.font("Helvetica-Bold").text("PAN :", rightInfoX, pdf.y - 11);

    pdf.font("Helvetica").text(company.pan, rightInfoX + 35, pdf.y - 11);

    pdf.moveDown(0.6);

    pdf.font("Helvetica-Bold").text("Phone :", leftInfoX, pdf.y);

    pdf
      .font("Helvetica")
      .text(company.phone || "-", leftInfoX + 45, pdf.y - 11);

    pdf.font("Helvetica-Bold").text("Email :", rightInfoX, pdf.y - 11);

    pdf
      .font("Helvetica")
      .text(company.email || "-", rightInfoX + 42, pdf.y - 11);

    pdf.moveDown(0.6);

    if (company.website) {
      pdf.font("Helvetica-Bold").text("Website :", leftInfoX, pdf.y);

      pdf
        .font("Helvetica")
        .fillColor("#2563eb")
        .text(company.website, leftInfoX + 60, pdf.y - 11);
    }

    pdf.moveDown(1);
  }

  pdf.fillColor("#111111");

  // Divider
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
  /*               DOCUMENT & CUSTOMER DETAILS                  */
  /* ========================================================== */

  const leftX = 40;
  const rightX = 310;

  const labelWidth = 85;
  const lineGap = 18;

  const startY = pdf.y;

  const boxWidth = 240;
  const boxHeight = 110;

  // Left Card

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  const drawField = (x, y, label, value) => {
    pdf.font("Helvetica-Bold").fontSize(9).fillColor("#555555");

    pdf.text(label, x, y, {
      width: labelWidth,
    });

    pdf.text(":", x + labelWidth + 5, y);

    pdf.font("Helvetica").fontSize(10).fillColor("#000000");

    pdf.text(value || "-", x + labelWidth + 15, y);
  };

  // ---------------- LEFT ----------------

  pdf;
  pdf
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#1f2937")
    .text("Document Details", leftX, startY);

  let leftY = startY + 28;

  drawField(
    leftX,
    leftY,
    "Type",
    document.documentType
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  leftY += lineGap;

  drawField(leftX, leftY, "Number", document.documentNumber);

  leftY += lineGap;

  drawField(leftX, leftY, "Date", formatDate(document.documentDate));

  leftY += lineGap;

  drawField(leftX, leftY, "Due Date", formatDate(document.dueDate));

  // ---------------- RIGHT ----------------

  pdf
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#1f2937")
    .text("Bill To", rightX, startY);

  let rightY = startY + 28;

  drawField(rightX, rightY, "Company", document.customerSnapshot.customerName);

  rightY += lineGap;

  drawField(rightX, rightY, "Contact", document.customerSnapshot.contactPerson);

  rightY += lineGap;

  drawField(rightX, rightY, "Email", document.customerSnapshot.email);

  rightY += lineGap;

  drawField(rightX, rightY, "Phone", document.customerSnapshot.phone);

  rightY += lineGap;

  drawField(rightX, rightY, "GSTIN", document.customerSnapshot.gstin);

  pdf.y = Math.max(leftY, rightY) + 25;

  pdf
    .lineWidth(0.8)
    .strokeColor("#bcbcbc")
    .moveTo(40, pdf.y)
    .lineTo(555, pdf.y)
    .stroke();

  pdf.moveDown(0.8);

  /* ========================================================== */
  /*                          ITEMS                            */
  /* ========================================================== */

  pdf.font("Helvetica-Bold").fontSize(12);

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

  pdf.font("Helvetica-Bold").fontSize(10).fillColor("white");

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

  const maskAccount = (account) => {
    if (!account) return "-";

    return account.length > 4
      ? "*".repeat(account.length - 4) + account.slice(-4)
      : account;
  };

  pdf
    .font("Helvetica-Bold")
    .fontSize(12)
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
      .fontSize(10)
      .fillColor("#111111")
      .text(value, paymentX + 90, currentPaymentY);

    currentPaymentY += 18;
  };

  drawPaymentField("Bank Name", bank.bankName);
  drawPaymentField("Account Name", bank.accountName);
  drawPaymentField("Account No.", maskAccount(bank.accountNumber));
  drawPaymentField("IFSC", bank.ifscCode);
  drawPaymentField("Branch", bank.branch);
  drawPaymentField("UPI ID", bank.upiId);

  /* ---------------- QR CODE ---------------- */

  /* ---------------- QR CODE ---------------- */

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
