const db = require('../config/database');

async function addTrain(req, res) {
  try {
    const { train_name, source, destination, total_seats } = req.body;

    const result = await db.query(
      'INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *',
      [train_name, source, destination, total_seats]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error adding train', error: error.message });
  }
}

async function getTrainAvailability(req, res) {
  try {
    const { source, destination } = req.query;

    const result = await db.query(
      'SELECT id, train_name, source, destination, available_seats FROM trains WHERE source = $1 AND destination = $2',
      [source, destination]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching train availability', error: error.message });
  }
}

module.exports = { addTrain, getTrainAvailability };