type Props = {
  username: string;
  password: string;
};

type LoginResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

async function getResponse(request: Request) {
  try {
    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      return Promise.reject(response);
    }
    return response;
  } catch {
    return Promise.reject(new Error("Network error"));
  }
}

async function getJsonResponse(request: Request) {
  const response = await getResponse(request);
  try {
    return await response.json();
  } catch {
    return Promise.reject(new Error("Invalid response"));
  }
}

async function refreshToken() {
  const request = new Request(
    `${import.meta.env.VITE_JSON_SERVER_URL}/refresh`,
    {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ refreshToken: JWT.getToken() }),
    }
  );
  request.headers.set("Authorization", `Bearer ${JWT.getToken()}`);
  const { accessToken } = (await getJsonResponse(request)) as LoginResponse;
  JWT.setToken(accessToken);
}

export class JWT {
  static getToken() {
    return localStorage.getItem("token");
  }

  static setAuth({ accessToken, refreshToken }: LoginResponse) {
    JWT.setToken(accessToken);
    JWT.setRefreshToken(refreshToken);
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  static setRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
  }

  static setToken(token: string) {
    localStorage.setItem("token", token);
  }

  static eraseToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
}

export default {
  login: async ({ username, password }: Props) => {
    const request = new Request(
      `${import.meta.env.VITE_JSON_SERVER_URL}/login`,
      {
        method: "POST",
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    const auth = (await getJsonResponse(request)) as LoginResponse;
    console.log(auth);
    JWT.setAuth(auth);
  },
  // when the dataProvider returns an error, check if this is an authentication error
  checkError: async () => {
    console.log("checkError");
    if (!JWT.getToken() && JWT.getRefreshToken()) await refreshToken();
    if (!JWT.getToken()) throw new Error("Not authenticated");
  },
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: async () => {
    console.log("checkAuth");
    if (!JWT.getToken() && JWT.getRefreshToken()) await refreshToken();
    if (!JWT.getToken()) throw new Error("Not authenticated");
  },
  // remove local credentials and notify the auth server that the user logged out
  logout: async () => {
    if (!JWT.getToken()) return "/login";
    const request = new Request(
      `${import.meta.env.VITE_JSON_SERVER_URL}/logout`,
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    request.headers.set("Authorization", `Bearer ${JWT.getToken()}`);
    try {
      await getResponse(request);
    } catch {
      console.log("Logout failed");
    }
    JWT.eraseToken();
    return "/login";
  },
  // get the user's profile
  getIdentity: async () => {
    return { id: 0 };
  },
  getPermissions: async () => {},
};
