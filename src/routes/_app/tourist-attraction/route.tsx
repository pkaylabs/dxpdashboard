import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tourist-attraction')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/tourist-attraction"!</div>
}
