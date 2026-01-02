import mongoose, { Schema } from "mongoose";

const RegistrationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
