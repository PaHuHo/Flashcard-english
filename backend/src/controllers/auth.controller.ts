import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const login = async (req: Request, res: Response) => {
  const jwt_secret = process.env.JWT_SECRET as string;
  console.log("JWT_SECRET =", jwt_secret);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Email or password is incorrect" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Email or password is incorrect" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwt_secret,
      { expiresIn: '8h' }
    );
    console.log(token)

    return res.status(201).json({
      token: token,
      message: "Login Success",
      user: {
        id:user._id,
        email:user.email,
        username:user.username,
        role:user.role
      }
    });
  } catch (err) {
    console.error("JWT sign error:", err);
    res.status(500).json({ error: err });
  }
};


export const register = async (req: Request, res: Response) => {
  
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    role: req.body.role
  })

  await user.save();
  res.status(201).json({
    message: "Register successfully",

  });
};