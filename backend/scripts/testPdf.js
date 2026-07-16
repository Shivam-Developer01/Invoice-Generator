import generatePdf from "../src/utils/generatePdf.js";

const company = {
  companyName: "Ravikiran Infotech",

  gstin: "09ABCDE1234F1Z5",

  pan: "ABCDE1234F",

  email: "info@ravikiraninfotech.com",

  phone: "9876543210",

  website: "www.ravikiraninfotech.com",

  addresses: {
    registeredOffice: {
      addressLine1: "Sector 62",
      addressLine2: "Tower B",
      city: "Noida",
      state: "Uttar Pradesh",
      country: "India",
      pincode: "201309",
    },

    corporateOffice: {
      addressLine1: "Electronic City",
      addressLine2: "Phase 1",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560100",
    },
  },

  bankDetails: {
    bankName: "State Bank of India",
    accountName: "Ravikiran Infotech",
    accountNumber: "123456789012",
    ifscCode: "SBIN0001234",
    branch: "Noida",
  },
};

const document = {
  documentType: "INVOICE",

  documentNumber: "RKI-I-26001",

  documentDate: new Date(),

  dueDate: new Date(),

  customerSnapshot: {
    customerName: "ABC Technologies Pvt Ltd",

    contactPerson: "Rahul Sharma",

    email: "rahul@abctech.com",

    phone: "9876543210",

    gstin: "07ABCDE1234F1Z5",

    pan: "ABCDE1234F",
  },

  items: [
    {
      description: "ERP Development",

      hsnSacCode: "998314",

      amount: 50000,
    },

    {
      description: "Support Charges",

      hsnSacCode: "998314",

      amount: 10000,
    },
  ],

  taxes: [
    {
      name: "CGST",

      percentage: 9,

      amount: 5400,
    },

    {
      name: "SGST",

      percentage: 9,

      amount: 5400,
    },
  ],

  subtotal: 60000,

  totalTax: 10800,

  totalAmount: 70800,

  notes: "Thank you for your business.",
};

try {
  const pdf = await generatePdf({
    document,
    company,
  });

} catch (error) {
  console.error("❌ PDF Generation Failed");

  console.error(error);
}