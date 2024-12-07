const db = require('../config/database');

async function bookSeat(req, res) {
  const client = await db.pool.connect();

  try {
    const { train_id, seats_to_book } = req.body;
    const user_id = req.user.id;

    await client.query('BEGIN');

    // Check seat availability with row-level locking
    const trainResult = await client.query(
      'SELECT available_seats FROM trains WHERE id = $1 FOR UPDATE',
      [train_id]
    );

    const train = trainResult.rows[0];
    if (train.available_seats < seats_to_book) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Update available seats
    await client.query(
      'UPDATE trains SET available_seats = available_seats - $1 WHERE id = $2',
      [seats_to_book, train_id]
    );

    // Create booking
    const bookingResult = await client.query(
      'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES ($1, $2, $3) RETURNING *',
      [user_id, train_id, seats_to_book]
    );

    await client.query('COMMIT');

    res.status(201).json(bookingResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Booking failed', error: error.message });
  } finally {
    client.release();
  }
}

async function getBookingDetails(req, res) {
  try {
    const user_id = req.user.id;

    const result = await db.query(
      `SELECT b.id, t.train_name, t.source, t.destination, b.seats_booked, b.booking_date 
       FROM bookings b 
       JOIN trains t ON b.train_id = t.id 
       WHERE b.user_id = $1`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking details', error: error.message });
  }
}

module.exports = { bookSeat, getBookingDetails };