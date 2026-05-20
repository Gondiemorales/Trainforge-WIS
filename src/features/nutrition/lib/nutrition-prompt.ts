import type { CaloricGoal } from "@/generated/prisma/enums";

type PromptParams = {
  caloricGoal: CaloricGoal;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  allergies?: string;
  dietaryPreferences?: string;
  currentWeightKg?: number;
};

const CALORIC_GOAL_DESCRIPTIONS: Record<CaloricGoal, string> = {
  DEFICIT: "caloric deficit (reduce body fat, lose weight)",
  MAINTENANCE: "caloric maintenance (sustain current body weight)",
  SURPLUS: "caloric surplus (build muscle mass, gain weight)",
};

export function buildNutritionPrompt(params: PromptParams): string {
  const goalDescription = CALORIC_GOAL_DESCRIPTIONS[params.caloricGoal];
  const weightInfo = params.currentWeightKg
    ? `Client current weight: ${params.currentWeightKg} kg.`
    : "Client weight: not specified.";

  return `You are a professional sports nutritionist AI assistant. Generate a complete, personalized 7-day weekly meal plan.

${weightInfo}
Caloric objective: ${goalDescription}
Macronutrient distribution: Protein ${params.proteinPct}%, Carbohydrates ${params.carbsPct}%, Fat ${params.fatPct}%
Food allergies or intolerances: ${params.allergies || "none"}
Dietary preferences or restrictions: ${params.dietaryPreferences || "none"}

Guidelines:
- Each day must include at least 4 meals: breakfast, lunch, dinner and one snack.
- Every meal must list specific ingredients with quantities (e.g. "Chicken breast 150g", "Brown rice 80g").
- Calorie and macro estimates must be realistic and consistent with the stated goal.
- Adapt the plan strictly to the listed allergies and dietary preferences.
- Vary the meals across the 7 days to avoid repetition.
- Use common, accessible ingredients.

You must respond ONLY with a valid JSON object using exactly this structure (no extra text, no markdown):

{
  "days": [
    {
      "day": "Monday",
      "meals": [
        {
          "name": "Breakfast",
          "time": "08:00",
          "ingredients": ["Ingredient 1 quantity", "Ingredient 2 quantity"],
          "calories": 450,
          "protein": 30,
          "carbs": 45,
          "fat": 10,
          "notes": "Optional preparation tip"
        }
      ],
      "dailyTotals": {
        "calories": 2000,
        "protein": 150,
        "carbs": 200,
        "fat": 67
      }
    }
  ],
  "weeklyAverage": {
    "calories": 2000,
    "protein": 150,
    "carbs": 200,
    "fat": 67
  },
  "summary": "Brief description of the plan approach and key nutritional strategy (2-3 sentences)."
}`;
}
