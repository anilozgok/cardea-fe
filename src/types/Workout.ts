import { Key } from "react";

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    equipment: string;
    gifUrl: string;
  }
  
  export interface Workout {
    userId: string;
    workoutId: Key | null | undefined;
    id: string;
    date: string;
    name: string;
    exercises: Exercise[];
  }
  