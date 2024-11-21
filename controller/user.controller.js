const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json(user);
};

module.exports = {
    getAllUsers,
    registerUser,
};

