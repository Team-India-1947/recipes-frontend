import { Admin, Resource, defaultTheme, CustomRoutes } from "react-admin";
import { dataProvider } from "./dataProvider";
import indigo from "@mui/material/colors/indigo";
import pink from "@mui/material/colors/pink";
import red from "@mui/material/colors/red";
import RecipeList from "./resources/RecipeList";
import AppLayout from "./layout/AppLayout";
import authProvider from "./authProvider";
import AppLogin from "./layout/AppLogin";
import { Route } from "react-router-dom";
import AppRegister from "./layout/AppRegister";

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
};

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    theme={indianTheme}
    layout={AppLayout}
    authProvider={authProvider}
    loginPage={AppLogin}
  >
    <Resource name="recipes" list={RecipeList} />
    <CustomRoutes>
      <Route path="/register" element={<AppRegister />} />
    </CustomRoutes>
  </Admin>
);
