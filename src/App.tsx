import { Admin, Resource, defaultTheme } from "react-admin";
import { dataProvider } from "./dataProvider";
import indigo from "@mui/material/colors/indigo";
import pink from "@mui/material/colors/pink";
import red from "@mui/material/colors/red";
import RecipeList from "./resources/RecipeList";
import AppLayout from "./layout/AppLayout";

const indianTheme = {
  ...defaultTheme,

  palette: {
    mode: "light",
    primary: indigo,
    secondary: pink,
    error: red,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    ...defaultTheme.components,
    MuiTextField: {
      defaultProps: {
        variant: "outlined" as const,
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined" as const,
      },
    },
  },
  root: {
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: `1px solid slategrey`,
    },
  },
};

export const App = () => (
  <Admin dataProvider={dataProvider} theme={indianTheme} layout={AppLayout}>
    <Resource name="users" list={RecipeList} />
  </Admin>
);
