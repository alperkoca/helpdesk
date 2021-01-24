const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstLastName: {
        type: String,
        required: [true, "Please prove a Name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "Please try different email"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: [true, "Please provide a password"],
        select: false
    },
    profile_image: {
        type:String
    },
    roles: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    defaultList: String
});

UserSchema.methods.generateJwtFromUser = function()
{
    const payLoad = {
        id : this._id,
        name : this.name
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
    return token;
}



UserSchema.pre("save", function (next) {
    if(!this.isModified("password"))
    {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err)
        {
            next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err)
            {
                next(err);
            }   
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);