import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id')({
  component: () => <div>Hello /$id!</div>
})