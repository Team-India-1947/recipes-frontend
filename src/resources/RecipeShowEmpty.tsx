import { Box, Typography } from "@mui/material";

export default function RecipeShow() {
  return (
    <Box
      display="flex"
      justifyItems="center"
      alignItems="center"
      textAlign="center"
      height="100%"
    >
      <Typography variant="body1" color="text.secondary" flex={1}>
        Create or select a recipe to see it here!
      </Typography>
    </Box>
  );
}
