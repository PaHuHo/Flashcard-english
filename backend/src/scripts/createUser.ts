import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
  .then(async () => {
    const passwordHash = await bcrypt.hash('123456', 10);

    const user = new User({
      username: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
      role: 0
    });

    await user.save();
    console.log('User created!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
