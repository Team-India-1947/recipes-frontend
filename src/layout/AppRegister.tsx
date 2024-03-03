// in src/MyLoginPage.js
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Button, CardContent, CircularProgress } from "@mui/material";
import {
  Form,
  required,
  useTranslate,
  useLogin,
  useNotify,
  useSafeSetState,
} from "ra-core";
import { TextInput, Link } from "react-admin";
import { Box, Typography } from "@mui/material";
import AppLoginBackground from "./AppLoginBackground";

export const LoginForm = (props: LoginFormProps) => {
  const { redirectTo, className } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();

  const submit = async (values: any) => {
    setLoading(true);
    console.log("values", values);
    try {
      await fetch(`${import.meta.env.VITE_JSON_SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      await fetch(`${import.meta.env.VITE_JSON_SERVER_URL}/user-registered`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });
      await login(values, redirectTo);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
    }
  };

  return (
    <StyledForm
      // @ts-ignore
      onSubmit={submit}
      mode="onChange"
      noValidate
      className={className}
    >
      <CardContent className={LoginFormClasses.content}>
        <TextInput
          autoFocus
          source="firstName"
          label="First name"
          validate={required()}
          fullWidth
        />
        <TextInput
          autoFocus
          source="lastName"
          label="Last name"
          validate={required()}
          fullWidth
        />
        <TextInput
          autoFocus
          source="email"
          label="Email"
          autoComplete="email"
          validate={required()}
          fullWidth
        />
        <TextInput
          source="password"
          label={translate("ra.auth.password")}
          type="password"
          autoComplete="current-password"
          validate={required()}
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
          fullWidth
          className={LoginFormClasses.button}
        >
          {loading ? (
            <CircularProgress
              className={LoginFormClasses.icon}
              size={19}
              thickness={3}
            />
          ) : (
            "Sign up"
          )}
        </Button>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            <Link to="/login">Sign in</Link>
          </Typography>
        </Box>
      </CardContent>
    </StyledForm>
  );
};

const PREFIX = "RaLoginForm";

export const LoginFormClasses = {
  content: `${PREFIX}-content`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

const StyledForm = styled(Form, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${LoginFormClasses.content}`]: {
    width: 300,
  },
  [`& .${LoginFormClasses.button}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${LoginFormClasses.icon}`]: {
    margin: theme.spacing(0.3),
  },
}));

export interface LoginFormProps {
  redirectTo?: string;
  className?: string;
}

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
};

export default function AppLogin() {
  return (
    <AppLoginBackground>
      <LoginForm />
    </AppLoginBackground>
  );
}
