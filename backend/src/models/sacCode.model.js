import mongoose from "mongoose";

const sacCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: 20,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

sacCodeSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

sacCodeSchema.set("toObject", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("SacCode", sacCodeSchema);
