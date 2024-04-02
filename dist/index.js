// index.ts
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors module
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());
// Enable CORS middleware
app.use(cors());
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map