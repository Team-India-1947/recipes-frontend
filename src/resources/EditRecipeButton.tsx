import { SaveButton } from "react-admin";
import { Box } from "@mui/material";

export default function EditCompositionButton() {
  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Box position="fixed" right={32} bottom={32}>
      <SaveButton />
    </Box>
  );
}
