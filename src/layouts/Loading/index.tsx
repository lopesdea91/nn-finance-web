import { AppIcon } from "@/components/base";
import { Container } from "./styled";

interface LoadingProps {
  fullPage?: true
  fullContent?: true
}
export default function Loading(props: LoadingProps) {
  return (
    <Container {...props}>
      <AppIcon variant="spinner" />
    </Container>
  )
}