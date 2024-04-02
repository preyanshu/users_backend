// models/teamModel.ts
import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    teamName: String,
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to User model
    uniqueDomains: [String],
    uniqueAvailabilities: [Boolean]
});
// Define model for team document
const Team = mongoose.model('Team', teamSchema);
export default Team;
//# sourceMappingURL=teamModel.js.map