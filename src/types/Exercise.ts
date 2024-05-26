// src/types/Exercise.ts
export type Exercise = {
    id: string;
    name: string;
    bodyPart: string;
    target: string;
    equipment: string;
    gifUrl: string;
    reps?: number;  // Optional since reps are set in the UI
    sets?: number;  // Optional since sets are set in the UI
};
