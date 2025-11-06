import { createFileRoute } from '@tanstack/react-router'
import Contact from './-components/contact'

export const Route = createFileRoute('/_auth/support')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Contact />
}
