import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    addressLine1: {
      type: String,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    pincode: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const customerSnapshotSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    contactPerson: String,

    email: String,

    phone: String,

    gstin: String,

    pan: String,

    billingAddress: addressSchema,

    shippingAddress: addressSchema,
  },
  {
    _id: false,
  },
);

const itemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    hsnSacCode: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const taxSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["CGST", "SGST", "IGST", "UTGST", "CESS"],
    },

    percentage: {
      type: Number,
      required: true,
      min: 0,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const documentSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
      enum: ["INVOICE", "PROFORMA", "CREDIT_NOTE"],
    },

    documentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    documentDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: Date,

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    customerSnapshot: {
      type: customerSnapshotSchema,
      required: true,
    },

    items: {
      type: [itemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "At least one item is required",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    taxes: {
      type: [taxSchema],
      default: [],
    },

    totalTax: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    pdf: {
      fileName: {
        type: String,
        default: "",
      },

      filePath: {
        type: String,
        default: "",
      },

      generatedAt: {
        type: Date,
      },
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deletedAt: Date,

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

documentSchema.index({
  documentNumber: 1,
});

documentSchema.index({
  customerId: 1,
});

documentSchema.index({
  documentType: 1,
});

documentSchema.index({
  documentDate: -1,
});

documentSchema.index({
  isDeleted: 1,
});

documentSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

documentSchema.set("toObject", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Document", documentSchema);
