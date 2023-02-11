import { AppIcon } from "@/components/base";
import { Container } from "./styled";

export default function Loading() {
  return (
    <Container>
      <AppIcon variant="spinner" />
    </Container>
  )
}