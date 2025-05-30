import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/hotels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/hotels"!</div>
}
