import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings/')({
    beforeLoad: () => {
    throw redirect({
      to: "/settings/profile",
    });
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/settings"!</div>
}
