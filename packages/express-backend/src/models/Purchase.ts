// /packages/express-backend/src/models/Purchase.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchase extends Document {
  date: string;
  name: string;
  cost: number;
  category: string;
  person: string;
  assignees: string[];
  household?: mongoose.Types.ObjectId; // optional
}

const PurchaseSchema: Schema<IPurchase> = new Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: String, required: true },
  person: { type: String, required: true },
  assignees: { type: [String], required: true },
  household: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Household', 
    required: false  // Explicitly mark as optional
  }
});

const Purchase = mongoose.model<IPurchase>('Purchase', PurchaseSchema);
export default Purchase;