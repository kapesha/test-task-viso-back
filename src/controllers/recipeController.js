import { createRecipe, getRecipe, getRecipes, getUserRecipes } from '../services/recipeService.js';


export async function getAllRecipes(req, res) {
  try {
    const result = await getRecipes();
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: `server error: ${error}` })
  }
}

export async function getAllUserRecipes(req, res) {
  try {
    const userId = req.user.id
    const result = await getUserRecipes({ userId })
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `server error: ${error}` })
  }
}

export async function getSingleRecipe(req, res) {
  try {
    const recipeId = req.params.id
    const result = await getRecipe({ recipeId })

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: `server error: ${error}` })
  }
}

export async function createSingleRecipe(req, res) {
  try {
    const userId = req.user.id;
    const recipe = await createRecipe({ ...req.body, userId });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `server error: ${error}` });
  }
}

