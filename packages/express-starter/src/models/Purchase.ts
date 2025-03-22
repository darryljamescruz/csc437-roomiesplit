import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchase extends Document {
  date: string;
  name: string;
  cost: number;
  category: string;
  person: string;
  assignees: string[];
}

const PurchaseSchema: Schema<IPurchase> = new Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: String, required: true },
  person: { type: String, required: true },
  assignees: { type: [String], required: true },
});


PurchaseSchema.virtual('id').get(function (this: IPurchase) {
  return (this._id as mongoose.Types.ObjectId).toString();
});
PurchaseSchema.set('toJSON', { virtuals: true });

const Purchase = mongoose.model<IPurchase>('Purchase', PurchaseSchema);
export default Purchase;