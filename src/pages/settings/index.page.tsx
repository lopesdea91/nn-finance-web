import { Container, Section, SectionTitle, SectionLinks, SectionLink } from './styled'

export default function Page() {
  return (
    <Container>
      <Section>
        <SectionTitle>Conta</SectionTitle>
        <SectionLinks>
          <SectionLink href="/settings/account/profile">Perfil</SectionLink>
          <SectionLink href="/settings/account/security">Segurança</SectionLink>
        </SectionLinks>
      </Section>

      <Section>
        <SectionTitle>Finança</SectionTitle>
        <SectionLinks>
          <SectionLink href='/settings/finance/wallet'>Carteira</SectionLink>
          {/* <SectionLink href='/settings/finance/group'>Grupo</SectionLink> */}
          {/* <SectionLink href='/settings/finance/category'>Categoria</SectionLink> */}
          <SectionLink href='/settings/finance/origin'>Origem</SectionLink>
          <SectionLink href='/settings/finance/tag'>tag</SectionLink>
        </SectionLinks>
      </Section>
    </Container>
  )
}