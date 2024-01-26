const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: {
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
        last_login: {
            type: Date,
            default: null
        },
        active: {
            type: Boolean,
            default: false,
        },
    },{ timestamps: true })

    userSchema.methods.updateLastLogin = function () {
        this.last_login = new Date();
        return this.save();
    };

module.exports = mongoose.model("User", userSchema);
