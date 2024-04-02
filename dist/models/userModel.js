// models/userModel.ts
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean
});
// Define model for user document
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=userModel.js.map