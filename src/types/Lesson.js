export type Lesson = {
  name: string,
  principles: [Principle],
};

export type Principle = {
  name: string,
  doctrine: {
    markdown: string,
  },
  teach: {
    instruction: {
      markdown: string,
    },
    pointsToTeach: {
      markdown: string,
    },
  },
  videos: EmbeddableVideo[],
  scriptureGroups: ScriptureGroup[],
};

export type EmbeddableVideo = {
  id: string,
  title: string,
  embedHtml: string,
  poster: string,
};

export type Scripture = {
  id: string,
  displayText: string,
  book: '',
  subBook: string,
  chapter: String,
  verse: String,
};

export type ScriptureGroup = {
  id: string,
  title: string,
  scriptures: Scripture[],
};

export type Quiz = {
  questions: QuizQuestion[],
};

export type QuizQuestion = {
  type: 'multiple_choice' | 'free_response',
  question: string,
};

export type MultipleChoiceQuestion = QuizQuestion & {
  type: 'multiple_choice',
  options: MultipleChoiceOption[],
  correctAnswerId: string,
};

export type MultipleChoiceOption = {
  id: string,
  text: string,
};

export type FreeResponseQuestion = {
  type: 'free_response',
};
