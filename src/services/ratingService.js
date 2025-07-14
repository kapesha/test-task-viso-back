import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function rateRecipe(userId, recipeId, rating) {
  const existing = await prisma.recipeRating.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
  });

  if (existing) {
    await prisma.recipeRating.update({
      where: {
        userId_recipeId: { userId, recipeId },
      },
      data: { rating },
    });
  } else {
    await prisma.recipeRating.create({
      data: { userId, recipeId, rating, id: uuidv4() },
    });
  }

  await updateRecipeAverageRate(recipeId);
}

export async function updateRecipeAverageRate(recipeId) {
  const ratings = await prisma.recipeRating.findMany({
    where: { recipeId },
  });

  const avg = ratings.length > 0
    ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
    : 0;
  await prisma.recipe.update({
    where: { id: recipeId },
    data: { rate: avg },
  });
}