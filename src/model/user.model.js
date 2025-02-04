import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    isOwner: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: function() { return this.isOwner; }
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


userSchema.methods.isPasswordCorrect = async(password)=>{
    return bcrypt.compare(password,this.password)
}
export const User = mongoose.model('PortfolioOwner', userSchema);
