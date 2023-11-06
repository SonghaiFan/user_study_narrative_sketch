export type Chapter = {
  id: string;
  title: string;
  time_period: string[];
  themes: string[];
  entity: string[];
  content: string;
};

export type Story = {
  name: string;
  section: string;
  structure: string;
  seed: number;
  description?: string;
  chapters: Chapter[];
};

export type Stories = Story[];
