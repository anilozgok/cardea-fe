import { Key } from "react";

// src/types/Workout.ts
export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  equipment: string;
  gifUrl: string;
}

export interface Workout {
  userId: number;
  workoutId: Key | null | undefined;
  id: string;
  date: string;
  name: string;
  exercises: Exercise[];
}
