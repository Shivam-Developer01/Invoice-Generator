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

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    gstin: {
      type: String,
      uppercase: true,
      trim: true,
    },

    pan: {
      type: String,
      uppercase: true,
      trim: true,
    },

    billingAddress: addressSchema,

    shippingAddress: addressSchema,

    isActive: {
      type: Boolean,
      default: true,
    },

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

customerSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

customerSchema.set("toObject", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

customerSchema.index({
  customerName: "text",
  contactPerson: "text",
  email: "text",
});

customerSchema.index({
  phone: 1,
});

customerSchema.index({
  isActive: 1,
});

export default mongoose.model("Customer", customerSchema);
