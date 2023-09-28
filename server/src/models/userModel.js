const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Full name"]

    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, "Please enter your mobile number"],
        maxLength: 10

    },
    password: {
        type: String,
        required: [true, "Please create a strong password"],
        minLength: [8, "Password must be atleast 8 character"]

    },
    role: {
        type: String,
        enum: ["0", "1", "2"],
        default: "2"
    }

},
    {
        timestamps: true,
        versionKey: false
    }
)


module.exports = mongoose.model("user", userSchema);