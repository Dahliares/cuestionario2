import { Question } from "./question.model";

export interface Tema {
  tema: string;
  preguntas: Question[];
}
