//packages/express-backend/dist/models/User.js
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// interface defiinition for Users
export interface IUser extends Document {
    fullName: string;
    email: string;
    password:string;

    comparePassword(candidatePassword: string): Promise<Boolean>;
}

// user schema defintion
const userSchema: Schema<IUser> = new Schema({
    email: {
        type:String,
        required:true,
        unique: true,
        lowercase: true,
    },
    password: {
        type:String,
        required: true,
    }
})

// presave hook to has password before saviing
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) { 
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as any);
    }
});

// method to compare provided pw with stored hash
userSchema.methods.comparePassword = async function (candidatePassword:string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

// create and export user model
const User = mongoose.model<IUser>('User', userSchema);
export default User;