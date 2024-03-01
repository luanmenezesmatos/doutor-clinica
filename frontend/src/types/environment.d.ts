declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
      NEXTAUTH_SECRET: string;
    }
  }
}

export {};
