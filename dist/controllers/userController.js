import User from '../models/userModel.js';
export const getAllUsers = async (req, res) => {
    try {
        console.log("getAllUsers");
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        let query = {};
        // Filtering logic
        const { domain, gender, available } = req.query;
        if (domain)
            query.domain = domain;
        if (gender)
            query.gender = gender;
        if (available !== undefined)
            query.available = available;
        // Searching logic
        const { search } = req.query;
        if (search) {
            query.$or = [
                { first_name: { $regex: new RegExp(search, 'i') } },
                { last_name: { $regex: new RegExp(search, 'i') } }
            ];
        }
        console.log(query);
        const users = await User.find(query).skip(skip).limit(limit);
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createUser = async (req, res) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    console.log(req.body);
    const user = new User({
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Update an existing user
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
        const user = await User.findByIdAndUpdate(userId, { first_name, last_name, email, gender, avatar, domain, available }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//# sourceMappingURL=userController.js.map