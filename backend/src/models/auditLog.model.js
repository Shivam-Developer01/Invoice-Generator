import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    action: {
      type: String,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "CHANGE_PASSWORD",
        "REGENERATE_PDF",
      ],
      required: true,
      index: true,
    },

    entityType: {
      type: String,
      enum: [
        "USER",
        "COMPANY",
        "CUSTOMER",
        "DOCUMENT",
        "DOCUMENT_SETTINGS",
      ],
      required: true,
      index: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

auditLogSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

auditLogSchema.set("toObject", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("AuditLog", auditLogSchema);