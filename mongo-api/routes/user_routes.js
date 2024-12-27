const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Game = require('../models/Game');

// Base url: http://localhost:3000/api/users/

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create one user
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function gameExists(gameId) {
  const game = await Game.findOne({ id: gameId });
  return game !== null;
}

// Add game to favorites
router.post('/:id/favorites', getUser, async (req, res) => {
  const gameId = req.body.id;
  
  try {
    const exists = await gameExists(gameId);
    if (!exists) {
      return res.status(404).json({ message: 'Game with id ' + gameId + ' not found' });
    }

    if (!res.user.favorites.includes(gameId)) {
      res.user.favorites.push(gameId);
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } else {
      res.json(res.user);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove game from favorites
router.delete('/:id/favorites', getUser, async (req, res) => {
  const gameId = req.body.id;

  try {
    const exists = await gameExists(gameId);
    if (!exists) {
      return res.status(404).json({ message: 'Game with id ' + gameId + ' not found' });
    }

    // Check if the game is in the user's favorites list
    if (!res.user.favorites.includes(gameId)) {
      return res.status(404).json({ message: 'Game with id ' + gameId + ' is not in the favorites list' });
    }

    // Remove the game from the favorites list
    res.user.favorites = res.user.favorites.filter(id => id !== gameId);
    const updatedUser = await res.user.save();
    res.json(updatedUser);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's favorite games
router.get('/:id/favorites', getUser, async (req, res) => {
  try {
    const favorites = await Game.find({ id: { $in: res.user.favorites } });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User with id ' + req.params.id + ' deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user with id ' + req.params.id });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;