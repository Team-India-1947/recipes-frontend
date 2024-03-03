import {
  BooleanInput,
  Create,
  FormDataConsumer,
  ImageField,
  ImageInput,
  SaveButton,
  SimpleForm,
  required,
  useCreate,
  useRedirect,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import type { RecipeGeneration } from "../types";
import { useCallback } from "react";

const Placeholder = <p>Click or drag an image here</p>;
const Empty = <></>;

function valiateRecipeCreation(values: any) {
  const errors: { image?: string } = {};
  console.log(values);
  if (!values.image) errors.image = "The firstName is required";
  return errors;
}

export default function CreateCompositionButton() {
  const redirect = useRedirect();
  const [create] = useCreate<RecipeGeneration>();

  const onSubmit = useCallback(
    (data: RecipeGeneration) => {
      create(
        "recipes",
        {
          data: {
            image: data.image,
            vegetarian: data.vegetarian,
          },
        },
        {
          onSuccess: (data) => {
            redirect(`/recipes/${data.id}`);
          },
        }
      );
    },
    [create, redirect]
  );

  return (
    <Create>
      <Typography
        variant="body1"
        color="text.secondary"
        flex={1}
        textAlign="center"
      >
        Upload an image to get a new recipe
      </Typography>
      <SimpleForm
        toolbar={Empty}
        validate={valiateRecipeCreation}
        // @ts-ignore
        onSubmit={onSubmit}
      >
        <ImageInput
          source="image"
          label={false}
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          placeholder={Placeholder}
          validate={required()}
        >
          <ImageField source="src" title="title" />
        </ImageInput>

        <Box
          width="100%"
          display="flex"
          flexDirection="row-reverse"
          justifyContent="space-between"
        >
          <BooleanInput
            source="vegetarian"
            label="Vegetarian"
            sx={{ display: "none" }}
          />
          <SaveButton icon={<FileUploadIcon />} variant="text" label="Upload" />
        </Box>
      </SimpleForm>
    </Create>
  );
}
