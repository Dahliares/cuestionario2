import { Question } from "./question.model";

export interface Tema {
  tema: string;
  enunciadoTema: string;
  preguntas: Question[];
}
