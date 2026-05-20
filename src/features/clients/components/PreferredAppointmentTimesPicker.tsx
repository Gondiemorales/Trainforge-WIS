"use client";

import { useMemo, useState } from "react";

const DAYS = [
  ["MONDAY", "Mon"],
  ["TUESDAY", "Tue"],
  ["WEDNESDAY", "Wed"],
  ["THURSDAY", "Thu"],
  ["FRIDAY", "Fri"],
  ["SATURDAY", "Sat"],
  ["SUNDAY", "Sun"],
] as const;

const HOURS = Array.from({ length: 14 }, (_, index) => {
  const hour = String(index + 7).padStart(2, "0");
  return `${hour}:00`;
});

type DayValue = (typeof DAYS)[number][0];

type PickerProps = {
  name?: string;
  defaultValue?: string | null;
  error?: string;
};

type StoredDay = {
  day: DayValue;
  times: string[];
};

function parseInitialValue(value?: string | null) {
  const selected = new Set<string>();

  if (!value) {
    return selected;
  }

  try {
    const parsed = JSON.parse(value) as StoredDay[];

    if (!Array.isArray(parsed)) {
      return selected;
    }

    for (const item of parsed) {
      if (!item.day || !Array.isArray(item.times)) {
        continue;
      }

      for (const time of item.times) {
        selected.add(`${item.day}-${time}`);
      }
    }
  } catch {
    return selected;
  }

  return selected;
}

function serializeValue(selected: Set<string>) {
  const grouped = DAYS.map(([day]) => {
    const times = HOURS.filter((time) => selected.has(`${day}-${time}`));

    return {
      day,
      times,
    };
  }).filter((item) => item.times.length > 0);

  return JSON.stringify(grouped);
}

export function PreferredAppointmentTimesPicker({
  name = "preferredAppointmentTimes",
  defaultValue,
  error,
}: PickerProps) {
  const [selected, setSelected] = useState(() =>
    parseInitialValue(defaultValue),
  );

  const serializedValue = useMemo(
    () => serializeValue(selected),
    [selected],
  );

  function toggleSlot(day: DayValue, time: string) {
    const key = `${day}-${time}`;

    setSelected((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={serializedValue} />

      <div>
        <h3 className="text-sm font-semibold">
          Preferred appointment times
        </h3>

        <p className="text-sm text-base-content/60">
          Select the weekly time slots by clicking on the hours.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 p-3">
        <div className="grid min-w-[760px] grid-cols-7 gap-3">
          {DAYS.map(([day, label]) => (
            <div key={day} className="space-y-2">
              <div className="rounded-xl bg-base-200 py-2 text-center text-sm font-bold">
                {label}
              </div>

              <div className="grid gap-2">
                {HOURS.map((time) => {
                  const isSelected = selected.has(`${day}-${time}`);

                  return (
                    <button
                      key={time}
                      type="button"
                      aria-pressed={isSelected}
                      className={[
                        "btn btn-xs",
                        isSelected ? "btn-primary" : "btn-outline",
                      ].join(" ")}
                      onClick={() => toggleSlot(day, time)}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected.size > 0 ? (
        <p className="text-sm text-base-content/60">
          {selected.size} selected slot{selected.size === 1 ? "" : "s"}.
        </p>
      ) : (
        <p className="text-sm text-base-content/40">
          No preferred time slots selected yet.
        </p>
      )}

      {error ? <p className="text-sm text-error">{error}</p> : null}
    </div>
  );
}