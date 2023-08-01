namespace NodeJS {
    interface ProcessEnv {
        APP_PORT: number
        NEXT_PUBLIC_BASE_URL: string
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        POSTGRES_DB: string
        POSTGRES_HOST: string
        POSTGRES_PORT: number
        DATABASE_URL: string
    }
}
