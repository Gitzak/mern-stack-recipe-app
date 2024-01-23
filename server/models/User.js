const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Client", "Admin"],
            default: "Client",
        },
        profilePicture: {
            type: String,
            default: "",
        },
        savedRecipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
