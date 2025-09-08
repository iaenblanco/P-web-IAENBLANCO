export interface Background {
  id: string;
  name: string;
  class: string;
}

export interface BusinessIdea {
  name: string;
  summary: string;
  features: string[];
}

export interface LearningStep {
  title: string;
  description: string;
  resources: string[];
}

export interface GeminiIdeasResponse {
  ideas: BusinessIdea[];
  error?: string;
}

export interface GeminiLearningPathResponse {
  learningPath: LearningStep[];
  error?: string;
}

export interface GeminiApiPayload {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
  generationConfig: {
    responseMimeType: string;
    responseSchema: {
      type: string;
      items: {
        type: string;
        properties: Record<string, any>;
        required: string[];
      };
    };
  };
}
