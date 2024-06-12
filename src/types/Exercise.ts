import { Key } from "react";


export type Exercise = {
    exerciseName: any;
    exerciseId: Key | null | undefined;
    id: string;
    name: string;
    bodyPart: string;
    target: string;
    equipment: string;
    gifUrl: string;
    reps?: number;  
    sets?: number;  
};
