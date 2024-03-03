import jsonServerProvider from "ra-data-json-server";
import { DataProvider, fetchUtils, Options } from "react-admin";
import type { RecipeGeneration, RecipeGenerationResponse } from "./types";
import { JWT } from "./authProvider";

function httpClient(url: string, options: Options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  //@ts-ignore
  options.headers.set("Authorization", `Bearer ${JWT.getToken()}`);
  return fetchUtils.fetchJson(url, options);
}

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
function convertFileToBase64(file: any): Promise<string> {
  if (file === undefined) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

function addUploadFeature(dataProvider: DataProvider) {
  const { create } = dataProvider;
  const customCreate: typeof create<RecipeGeneration> = async (
    resource,
    params
  ) => {
    if (resource !== "recipes") return dataProvider.create(resource, params);
    const base64Image = await convertFileToBase64(params.data.image);
    if (!base64Image) return Promise.reject("Error: No image");
    const response = await fetchUtils.fetchJson(
      import.meta.env.VITE_FLASK_SERVER_URL + "/recipes",
      {
        method: "POST",
        body: JSON.stringify({
          image: base64Image.substring(22),
          vegetarian: params.data.vegetarian,
        }),
      }
    );
    const json: RecipeGenerationResponse = response.json;
    const ingredients = json.ingredients
      .map((ingredient) => ingredient.trim())
      .join("\n");
    const data = {
      title: json.title,
      body: `Ingredients:\n${ingredients}\n\n${json.body}`,
      vegetarian: params.data.vegetarian,
    };
    console.log(data);

    return create(resource, {
      ...params,
      data,
    });
  };
  return { ...dataProvider, create: customCreate } as DataProvider;
}

export const dataProvider = addUploadFeature(
  jsonServerProvider(import.meta.env.VITE_JSON_SERVER_URL, httpClient)
);
