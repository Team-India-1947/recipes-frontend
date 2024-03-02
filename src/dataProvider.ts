import jsonServerProvider from "ra-data-json-server";
import { DataProvider } from "react-admin";
import { RecipeGeneration } from "./types";

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
function convertFileToBase64(file: any): Promise<string> {
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
    return await create(resource, {
      ...params,
      data: {
        ...params.data,
        image: base64Image.substring(22),
      },
    });
  };
  return { ...dataProvider, create: customCreate };
}

export const dataProvider = addUploadFeature(
  jsonServerProvider(import.meta.env.VITE_JSON_SERVER_URL)
);
