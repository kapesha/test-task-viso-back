import express from 'express';
import { createSingleRecipe, getAllRecipes, getAllUserRecipes, getSingleRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../midlewares/authMiddleware.js';
import { rateRecipeHandler } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/recipes', authenticateToken, createSingleRecipe)
router.get('/recipes', getAllRecipes)
router.get('/recipes/user', authenticateToken, getAllUserRecipes)
router.post('/recipes/:id/rate', authenticateToken, rateRecipeHandler);
router.get('/recipes/:id', getSingleRecipe);

export default router;