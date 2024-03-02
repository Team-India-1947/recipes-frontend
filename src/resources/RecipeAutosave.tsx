import { Box } from "@mui/material";
import { SaveButton } from "react-admin";

export default function MoreActionsButton() {
  return (
    <Box width="100%" display="flex" flexDirection="row-reverse">
      <SaveButton />
    </Box>
  );
}
