import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/link/$id")({
  component: () => <Link />
});

const Link = () => {
  return (
    <div>
      <h1>Link</h1>
    </div>
  );
};
