export type ExamKind = "eksamen" | "eksempel";
export type TaskKind = "interaktiv" | "skrive";

export type ExamTask = {
  number: number;
  title: string;
  kind: TaskKind;
  needsFigure: boolean;
  prompt: string;
};

export type ExamSet = {
  slug: string;
  label: string;
  season: "H" | "V" | null;
  year: number | null;
  kind: ExamKind;
  complete: boolean;
  officialUrl: string;
  /** Whether interactive keys were checked against published Udir forhåndssensur/sensorveiledning. */
  fasitSource: "udir" | "eget";
  themes: string[];
  tasks: ExamTask[];
};
