import { createFileRoute } from '@tanstack/react-router'
import DeleteAccount from './-components/delete-account'

export const Route = createFileRoute('/_auth/delete-account')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DeleteAccount />
}
