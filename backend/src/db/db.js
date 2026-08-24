const mongoose = require('mongoose');
const userModel = require('../auth/models/user.model');
const bcrypt = require('bcryptjs');

async function seedDefaultAdmin() {
    try {
        const adminCount = await userModel.countDocuments({ role: 'Super Admin' });
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('password', 10);
            await userModel.create({
                username: 'admin',
                email: 'admin@medicos.com',
                password: hashedPassword,
                name: 'John Mitchell',
                phone: '+1 555-0101',
                role: 'Super Admin',
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=John+Mitchell&background=0F6CBD&color=fff'
            });
            console.log('Default admin seeded successfully: admin@medicos.com / password');
        }
    } catch (err) {
        console.error('Error seeding default admin:', err);
    }
}

async function connectDB() {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        if (db) {
            console.log("Connected to database successfully");
            await seedDefaultAdmin();
        }
    } catch (e) {
        throw new Error("Error Connecting to the Database ...");
    }
}

module.exports = connectDB;

