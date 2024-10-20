import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean | null;
  image?: string;
  tenantId?: string;
  verificationToken?: string;
  accessToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Date,
    default: null
  },
  image: String,
  tenantId: String,
  verificationToken: String,
  accessToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar el campo `updatedAt` cada vez que se guarda un documento
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const getUserModel = (): Model<IUser> => {
  return mongoose.models.User || mongoose.model<IUser>('User', userSchema);
};
