'use strict';
import express from "express";
import cors from 'cors';
import path from 'path';
import recipeRoutes from './routes/recipeRoute.js';
import authRoutes from './routes/authRoute.js';

export function createServer() {

  const app = express();
  app.use('/uploads', express.static(path.resolve('uploads')));
  app.use(cors());
  app.use(express.json());
  app.use('/',recipeRoutes)
  app.use('/', authRoutes);

  return app
}