import { createFileRoute } from '@tanstack/react-router'
import SignUpPage from '#/features/auth/components/sign-up/sign-up-page'

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
})
