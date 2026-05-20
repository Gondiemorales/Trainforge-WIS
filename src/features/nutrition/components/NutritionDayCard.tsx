"use client";

import { useState } from "react";

import type { DayPlan } from "@/features/nutrition/types/nutrition.types";

export function NutritionDayCard({ day }: { day: DayPlan }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-base-100 shadow-md overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between p-5 text-left hover:bg-base-200/50 transition-colors"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="flex items-center gap-4">
          <span className="text-lg font-black w-28">{day.day}</span>

          <div className="flex gap-3 text-sm text-base-content/60">
            <span className="font-semibold text-primary">{day.dailyTotals.calories} kcal</span>
            <span>{day.dailyTotals.protein}g protein</span>
            <span className="hidden sm:inline">{day.dailyTotals.carbs}g carbs</span>
            <span className="hidden sm:inline">{day.dailyTotals.fat}g fat</span>
          </div>
        </div>

        <span className="text-base-content/40 text-lg">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen ? (
        <div className="border-t border-base-200 divide-y divide-base-200">
          {day.meals.map((meal, i) => (
            <div key={i} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold">{meal.name}</span>
                  {meal.time ? (
                    <span className="ml-2 text-sm text-base-content/50">{meal.time}</span>
                  ) : null}
                </div>

                <div className="flex gap-3 text-xs text-base-content/60">
                  <span className="font-semibold text-primary">{meal.calories} kcal</span>
                  <span>{meal.protein}g P</span>
                  <span>{meal.carbs}g C</span>
                  <span>{meal.fat}g F</span>
                </div>
              </div>

              <ul className="mt-2 space-y-0.5">
                {meal.ingredients.map((ing, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-base-content/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    {ing}
                  </li>
                ))}
              </ul>

              {meal.notes ? (
                <p className="mt-2 text-xs italic text-base-content/50">{meal.notes}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
