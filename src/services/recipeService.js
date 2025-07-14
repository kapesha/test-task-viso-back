import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function getRecipes() {
  const recipes = await prisma.recipe.findMany();
  return recipes.map(({ userId, ...rest }) => rest);
}

export async function getUserRecipes({ userId }) {
  const recipes = await prisma.recipe.findMany({
    where: { userId }
  })

  return recipes.map(({ userId, ...rest }) => rest);
}

export async function getRecipe({ recipeId }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId
    }
  })

  return recipe
}

export async function createRecipe(data) {
  const newRecipe = await prisma.recipe.create({
    data: {
      id: uuidv4(),
      ...data,
    },
  });

  return newRecipe;
}


