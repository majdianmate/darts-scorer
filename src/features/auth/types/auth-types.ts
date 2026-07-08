import type { User } from '#/generated/prisma/client'

export type { User }

export interface AuthSignUpCredentials {
    name: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthSignInCredentials  {
    email: string;
    password: string;
}