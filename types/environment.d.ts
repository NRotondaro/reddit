namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    REDDIT_CLIENT_ID: string
    REDDIT_CLIENT_SECRET: string
    NEXT_PUBLIC_STEPZEN_KEY: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
  }
}
