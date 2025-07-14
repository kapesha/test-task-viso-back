import { rateRecipe } from '../services/ratingService.js';

export async function rateRecipeHandler(req, res) {
  try {
    const { id: recipeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    await rateRecipe(userId, recipeId, rating);

    res.json({ message: 'Rate updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sercer Error' });
  }
}