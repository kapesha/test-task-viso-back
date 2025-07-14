import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(username, password) {
  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    throw new Error('user already existed');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword, id: uuidv4() },
  });
  return user;
}

export async function loginUser(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error('data is not valid');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('data is not valid');
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '241h' });
  return token;
}