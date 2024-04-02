
import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Team from '../models/teamModel.js';
import User from '../models/userModel.js';



export const createTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userIds, teamName } = req.body;

    // Check if exactly two userIds are provided
    if (userIds.length !== 2) {
      res.status(400).json({ message: 'Team must consist of exactly two members' });
      return;
    }

    // Get user documents
    const users = await User.find({ _id: { $in: userIds } });

    // Check if both users exist
    if (users.length !== 2) {
      res.status(400).json({ message: 'Invalid user IDs provided' });
      return;
    }

    // Check if users have different availabilities
    if (users[0].available === users[1].available) {
      res.status(400).json({ message: 'Users must have different availabilities' });
      return;
    }

    // Check if users have different domains
    if (users[0].domain === users[1].domain) {
      res.status(400).json({ message: 'Users must have different domains' });
      return;
    }

    // Create team
    const team = new Team({
      teamName,
      userIds,
      uniqueDomains: [users[0].domain, users[1].domain],
      uniqueAvailabilities: [users[0].available, users[1].available]
    });

    // Save the team
    const newTeam = await team.save();

    // Populate the user IDs in the newTeam object
    await newTeam.populate('userIds', '-_id');

    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Retrieve the details of a specific team by ID
export const getTeamById = async (req: Request, res: Response): Promise<void> => {
    try {
      const teamId = req.params.id;
  
      // Check if teamId is a valid ObjectId
      if (!isValidObjectId(teamId)) {
        res.status(400).json({ message: 'Invalid team ID provided' });
        return;
      }
  
      const team = await Team.findById(teamId);
  
      // Check if team exists
      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }
  
      res.json(team);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const getAllTeams = async (req: Request, res: Response): Promise<void> => {
    try {
        const teams = await Team.find().populate('userIds');
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
