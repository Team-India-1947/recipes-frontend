import { Box, Typography } from "@mui/material";

export default function RecipeListEmpty() {
  return (
    <Box m={2} display="flex" textAlign="center">
      <Typography
        variant="body1"
        color="text.secondary"
        flex={1}
        textAlign="center"
      >
        Create a recipe and save it to see it here!
      </Typography>
    </Box>
  );
}
