require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/Game'); 
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamevault';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Seed initial data (uncomment to run on startup)
async function seedInitialData() {
  try {
    // Check if any games exist
    const gameCount = await Game.countDocuments();
    if (gameCount === 0) { 
      // List of App IDs
      const appIds = [
        '1245620', // Elden Ring
        '730',     // Counter-Strike 2
        
      ];

      const initialGames = [];
      for (const appId of appIds) {
        try {
          const response = await axios.get(`http://steam-games-api:8000/games/game/${appId}`); 
          const gameData = response.data;

          initialGames.push({
            id: gameData.id, 
            name: gameData.name, 
            description: gameData.description, 
            genre: gameData.genre, 
            age_rating: gameData.age_rating, 
            developer: gameData.developer 
          });
        } catch (error) {
          console.error(`Error fetching game data for appID ${appId}: ${error}`);
        }
      }

      // Insert initial games into the database
      await Game.insertMany(initialGames);
      console.log('Initial game data seeded successfully.');

    } else {
      console.log('Database already contains game data.');
    }
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}

// Call the seed function (uncomment to run on startup)
seedInitialData(); 

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GameVault API' });
});

// Routes
const gamesRouter = require('./routes/game_routes');
const usersRouter = require('./routes/user_routes');

app.use('/api/games', gamesRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});