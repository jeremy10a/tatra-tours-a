const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For Vercel deployment, serve from public directory
if (process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    app.use(express.static('.'));
}

// For Vercel, use /tmp directory for temporary storage
const BOOKINGS_FILE = process.env.VERCEL 
    ? path.join('/tmp', 'bookings.json')
    : path.join(__dirname, 'data', 'bookings.json');

async function ensureBookingsFile() {
    try {
        await fs.ensureFile(BOOKINGS_FILE);
        const exists = await fs.pathExists(BOOKINGS_FILE);
        if (exists) {
            const content = await fs.readFile(BOOKINGS_FILE, 'utf8');
            if (!content.trim()) {
                await fs.writeJson(BOOKINGS_FILE, []);
            }
        }
    } catch (error) {
        console.error('Error ensuring bookings file:', error);
        await fs.writeJson(BOOKINGS_FILE, []);
    }
}

app.post('/api/bookings', async (req, res) => {
    try {
        await ensureBookingsFile();
        const bookings = await fs.readJson(BOOKINGS_FILE);
        
        const newBooking = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        
        bookings.push(newBooking);
        await fs.writeJson(BOOKINGS_FILE, bookings, { spaces: 2 });
        
        res.json({ success: true, booking: newBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, error: 'Failed to save booking' });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        await ensureBookingsFile();
        const bookings = await fs.readJson(BOOKINGS_FILE);
        res.json(bookings);
    } catch (error) {
        console.error('Error reading bookings:', error);
        res.json([]);
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    try {
        await ensureBookingsFile();
        const bookings = await fs.readJson(BOOKINGS_FILE);
        const index = bookings.findIndex(b => b.id === req.params.id);
        
        if (index !== -1) {
            bookings[index] = { ...bookings[index], ...req.body };
            await fs.writeJson(BOOKINGS_FILE, bookings, { spaces: 2 });
            res.json({ success: true, booking: bookings[index] });
        } else {
            res.status(404).json({ success: false, error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ success: false, error: 'Failed to update booking' });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        await ensureBookingsFile();
        const bookings = await fs.readJson(BOOKINGS_FILE);
        const filteredBookings = bookings.filter(b => b.id !== req.params.id);
        
        if (filteredBookings.length !== bookings.length) {
            await fs.writeJson(BOOKINGS_FILE, filteredBookings, { spaces: 2 });
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ success: false, error: 'Failed to delete booking' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});