import mongoose from "mongoose";

const documentPrefixSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["INVOICE", "PROFORMA", "CREDIT_NOTE"],
      required: true,
    },

    prefix: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const documentSettingsSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      unique: true,
      index: true,
    },
    
    companyPrefix: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "RKI",
    },

    separator: {
      type: String,
      default: "-",
    },

    financialYear: {
      type: String,
      required: true,
      default: "26",
    },

    currentSequence: {
      type: Number,
      default: 1,
      min: 1,
    },

    documentPrefixes: {
      type: [documentPrefixSchema],
      default: [
        {
          type: "INVOICE",
          prefix: "I",
        },
        {
          type: "PROFORMA",
          prefix: "P",
        },
        {
          type: "CREDIT_NOTE",
          prefix: "C",
        },
      ],
    },

    resetYearly: {
      type: Boolean,
      default: true,
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

documentSettingsSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    delete ret.currentSequence;
    return ret;
  },
});

export default mongoose.model("DocumentSettings", documentSettingsSchema);
