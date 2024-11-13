export type ExerciseType = 'single' | 'double' | 'triple' | 'quadruple';
export type OperationType = 'addition' | 'subtraction' | 'mixed';
export type Mode = 'visual' | 'listening';

export interface Exercise {
  rows: number;
  type: ExerciseType;
  operation: OperationType;
  mode: Mode;
  timeLimit?: number;
}

export interface Problem {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
  userAnswer?: number;
}

export interface ExerciseSet {
  problems: Problem[];
  timeLimit: number;
  startTime?: Date;
  endTime?: Date;
  isComplete: boolean;
  score: number;
}