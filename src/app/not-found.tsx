import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <p className="text-7xl font-bold text-accent">404</p>
      <h1 className="text-2xl font-semibold text-fg sm:text-3xl">
        This page could not be found.
      </h1>
      <Button href="/" variant="solid" size="lg">
        Back to home
      </Button>
    </Container>
  );
}
