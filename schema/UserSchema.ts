import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  verificationToken?: string; // Agrega este campo opcional
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
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
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar el campo updatedAt antes de cada save
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date(); // Corregido para ser de tipo Date
  next();
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
