import { Box } from "@mui/material";

export default function AppLayout({ children }: any) {
  return (
    <Box display="flex" flex="1 0 auto" width="100%">
      {children}
    </Box>
  );
}
