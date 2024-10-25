const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function handleRegister(req,res) {

    const { name, username, password } = req.body;
    try {
        const user = new User({ name, username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

async function handleLogin(req,res) {

    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

module.exports = {
    handleLogin,
    handleRegister
  };