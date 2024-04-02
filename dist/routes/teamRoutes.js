// routes/teamRoutes.ts
import express from 'express';
import { createTeam, getAllTeams, getTeamById } from '../controllers/teamController.js';
const router = express.Router();
// Create a new team
router.post('/', createTeam);
// Retrieve the details of a specific team by ID
router.get('/:id', getTeamById);
router.get('/get/all', getAllTeams);
export default router;
//# sourceMappingURL=teamRoutes.js.map