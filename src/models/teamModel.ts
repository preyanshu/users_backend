// models/teamModel.ts
import mongoose, { Document } from 'mongoose';

// Define interface for team document
interface ITeam extends Document {
  teamName: string;
  userIds: string[]; // Assuming user IDs are stored as strings
  uniqueDomains: string[];
  uniqueAvailabilities: boolean[];
}

const teamSchema = new mongoose.Schema({
  teamName: String,
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to User model
  uniqueDomains: [String],
  uniqueAvailabilities: [Boolean]
});

// Define model for team document
const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
