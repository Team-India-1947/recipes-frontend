import { EditBase, Form, TextInput } from "react-admin";
import { Box } from "@mui/material";
import type { Recipe } from "../types";
import EditCompositionButton from "./EditRecipeButton";
import DeleteRecipeButton from "./DeleteRecipeButton";

type Props = {
  id: number;
};

export default function RecipeEdit({ id }: Props) {
  return (
    <EditBase<Recipe>
      id={id}
      sx={{ width: "100%" }}
      mutationMode="optimistic"
      transform={(data) => ({
        ...data,
        title: data.title || "Untitled",
      })}
      component="div"
      redirect="edit"
    >
      <Box m={2} height="100%">
        <Form key={id}>
          <TextInput
            source="title"
            variant="outlined"
            defaultValue={"Untitled"}
            label={false}
            helperText={false}
            fullWidth
          />
          <TextInput
            source="body"
            variant="standard"
            label={false}
            helperText={false}
            autoFocus
            multiline
            minRows={10}
            fullWidth
            sx={{
              my: 2,
              "& .MuiInputBase-root:before": { display: "none" },
              "& .MuiInputBase-root:after": { display: "none" },
              overflowY: "auto",
              maxHeight: "calc(100vh - 110px)",
              height: "calc(100vh - 110px)",
            }}
          />
          <DeleteRecipeButton />
          <EditCompositionButton />
        </Form>
      </Box>
    </EditBase>
  );
}
