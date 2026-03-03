import { model, Schema } from "mongoose";

interface IUser {
  email: string;
  password: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await Bun.password.hash(this.password, {
    algorithm: "argon2id",
    timeCost: 3,
    memoryCost: 65536,
  });
  next();
});

userSchema.methods.verifyPasswd = async function (passwd: string) {
  return await Bun.password.verify(this.password, passwd);
};

export const User = model<IUser>("User", userSchema);
