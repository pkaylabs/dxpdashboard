import { createFileRoute } from '@tanstack/react-router'
import { UserSearch } from '.'

export const Route = createFileRoute('/_app/user-management/add')({
  validateSearch: (search) => UserSearch.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/user-management/add"!</div>
}
