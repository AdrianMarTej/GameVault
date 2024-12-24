const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Base url: http://localhost:3000/api/games/

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one game
router.get('/:id', getGame, (req, res) => {
  res.json(res.game);
});

// Create one game
router.post('/', async (req, res) => {
  const game = new Game({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    genre: req.body.genre,
    age_rating: req.body.age_rating,
    developer: req.body.developer
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one game
router.patch('/:id', getGame, async (req, res) => {
  if (req.body.name != null) {
    res.game.name = req.body.name;
  }
  if (req.body.description != null) {
    res.game.description = req.body.description;
  }
  if (req.body.genre != null) {
    res.game.genre = req.body.genre;
  }
  if (req.body.age_rating != null) {
    res.game.age_rating = req.body.age_rating;
  }
  if (req.body.developer != null) {
    res.game.developer = req.body.developer;
  }

  try {
    const updatedGame = await res.game.save();
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one game
router.delete('/:id', getGame, async (req, res) => {
  try {
    await res.game.remove();
    res.json({ message: 'Game with id ' + req.params.id + ' deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get game by ID
async function getGame(req, res, next) {
  let game;
  try {
    game = await Game.findOne({ id: req.params.id });
    if (game == null) {
      return res.status(404).json({ message: 'Cannot find game with id ' + req.params.id });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.game = game;
  next();
}

module.exports = router;

