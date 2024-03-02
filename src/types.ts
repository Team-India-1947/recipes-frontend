export interface Recipe {
  id: number;
  title: string;
  timestamp: number;
  body: string;
  vegetarian: boolean;
}

export interface RecipeGeneration {
  image: Uint8Array;
  vegetarian: boolean;
}

export interface RecipeGenerationResponse {
  title: string;
  body: string;
  ingredients: string[];
}
