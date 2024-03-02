import {
  BooleanInput,
  Create,
  FormDataConsumer,
  ImageField,
  ImageInput,
  SimpleForm,
  useCreate,
  useRedirect,
} from "react-admin";
import { Box, IconButton, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { RecipeGeneration } from "../types";

const Placeholder = <p>Click or drag an image here</p>;
const Empty = <></>;

export default function CreateCompositionButton() {
  const redirect = useRedirect();
  const [create] = useCreate<RecipeGeneration>();
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
      <SimpleForm toolbar={Empty}>
        <ImageInput
          source="image"
          label={false}
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          placeholder={Placeholder}
        >
          <ImageField source="src" title="title" />
        </ImageInput>

        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <BooleanInput source="vegetarian" label="Vegetarian" />

          <FormDataConsumer>
            {({ formData }) => (
              <IconButton
                onClick={() =>
                  create(
                    "recipes",
                    {
                      data: {
                        image: formData.image,
                        vegetarian: formData.vegetarian,
                      },
                    },
                    {
                      onSuccess: (data) => {
                        redirect(`/recipes/${data.id}`);
                      },
                    }
                  )
                }
                size="small"
              >
                <FileUploadIcon fontSize="small" />
              </IconButton>
            )}
          </FormDataConsumer>
        </Box>
      </SimpleForm>
    </Create>
  );
}
