import { DeleteButton } from "react-admin";
import { Box } from "@mui/material";

export default function DeleteRecipeButton() {
  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Box position="fixed" right={148} bottom={32}>
      <DeleteButton />
    </Box>
  );
}
