import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Agregar la propiedad `id`
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  tenantId: string;
  verificationToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString() // Genera un ID único
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
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: ''
  },
  tenantId: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    default: Date.now
  }
});

// Middleware para actualizar el campo `updatedAt` cada vez que se guarda un documento
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const getUserModel = (): Model<IUser> => {
  return mongoose.models.User || mongoose.model<IUser>('User', userSchema);
};
