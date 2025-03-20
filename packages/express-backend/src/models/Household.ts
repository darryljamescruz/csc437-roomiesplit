// /packages/express-backend/src/models/Household.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IHousehold extends Document {
  user: mongoose.Types.ObjectId; // reference to the household "owner" i.e. whoever created it
  householdName: string;
  roommates: {
    name: string;
    email: string;
  }[];
}

const HouseholdSchema: Schema<IHousehold> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  householdName: { type: String, required: true },
  roommates: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
    }
  ],
});

const Household = mongoose.model<IHousehold>('Household', HouseholdSchema);
export default Household;