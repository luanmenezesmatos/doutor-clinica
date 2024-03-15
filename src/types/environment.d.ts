declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
      NEXTAUTH_SECRET: string;
      APP_API_AUTHORIZATION_TOKEN: string;
    }
  }
}

export {};