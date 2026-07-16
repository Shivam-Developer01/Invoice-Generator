import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    gstin: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    pan: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    addresses: {
      registeredOffice: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },

      corporateOffice: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },
    },

    bankDetails: {
      bankName: String,
      accountName: String,
      accountNumber: String,
      ifscCode: String,
      branch: String,
    },

    logoUrl: {
      type: String,
      default: "",
    },

    gstOptions: [
      {
        code: {
          type: String,
          enum: ["CGST", "SGST", "IGST", "UTGST", "CESS"],
          required: true,
        },

        label: {
          type: String,
          required: true,
        },

        percentage: {
          type: Number,
          required: true,
        },

        active: {
          type: Boolean,
          default: true,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

companySchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

companySchema.set("toObject", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Company", companySchema);
