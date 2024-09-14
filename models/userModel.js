const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email add"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email Address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: [6, "Password should be atleast 6 character"],
    },
    role: {
      type: String,
      required: true,
      default: "subscriber",
    },
    photo: {
      type: String,
      required: [true, "Please provide your photo"],
      default: "www.abc.com",
    },
    phone: {
      type: String,
      default: "9999999999",
    },
    bio: {
      type: String,
      required: true,
      default: "This is my BIO",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userAgent: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    minimize: true,
  }
);

//This is a kind middleware which convert the string password to hashed password with help of bcrypt library
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //Hash the Password
  const encryptPassword = await bcrypt.hashSync(this.password, 10);
  this.password = encryptPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
