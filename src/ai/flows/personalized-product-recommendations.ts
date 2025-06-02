// This is an AI-powered code! Do not edit, except under strict guidance from the Genkit framework team.
'use server';
/**
 * @fileOverview Personalized product recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized product recommendations to users.
 * It takes user preferences as input and returns a list of product recommendations.
 *
 * @module src/ai/flows/personalized-product-recommendations
 *
 * @public
 *
 * @interface PersonalizedProductRecommendationsInput - The input type for the personalizedProductRecommendations function.
 * @interface PersonalizedProductRecommendationsOutput - The output type for the personalizedProductRecommendations function.
 * @function personalizedProductRecommendations - A function that handles the product recommendation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedProductRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user provided to the model, including past purchases, browsing history, and any explicitly stated preferences.'
    ),
});
export type PersonalizedProductRecommendationsInput = z.infer<typeof PersonalizedProductRecommendationsInputSchema>;

const PersonalizedProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of product recommendations personalized for the user.'),
});
export type PersonalizedProductRecommendationsOutput = z.infer<typeof PersonalizedProductRecommendationsOutputSchema>;

export async function personalizedProductRecommendations(
  input: PersonalizedProductRecommendationsInput
): Promise<PersonalizedProductRecommendationsOutput> {
  return personalizedProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedProductRecommendationsPrompt',
  input: {schema: PersonalizedProductRecommendationsInputSchema},
  output: {schema: PersonalizedProductRecommendationsOutputSchema},
  prompt: `You are an e-commerce recommendation expert.

Based on the user's preferences, provide a list of personalized product recommendations.

User Preferences: {{{userPreferences}}}

Return a list of product names that the user might be interested in.`,
});

const personalizedProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedProductRecommendationsFlow',
    inputSchema: PersonalizedProductRecommendationsInputSchema,
    outputSchema: PersonalizedProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
