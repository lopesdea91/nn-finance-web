import { useRouter } from 'next/router'
import { Container, Section, SectionTitle, SectionLinks, SectionLink } from './styled'

export const SettingsPage = () => {
  const { push } = useRouter()

  return (
    <Container>
      <Section>
        <SectionTitle>Conta</SectionTitle>
        <SectionLinks>
          <SectionLink onClick={() => push("/settings/account/profile")}>Perfil</SectionLink>
          <SectionLink onClick={() => push("/settings/account/security")}>Segurança</SectionLink>
        </SectionLinks>
      </Section>

      <Section>
        <SectionTitle>Finança</SectionTitle>
        <SectionLinks>
          <SectionLink onClick={() => push('/settings/finance/wallet')}>Carteira</SectionLink>
          {/* <SectionLink onClick={() => push('/settings/finance/group')}>Grupo</SectionLink> */}
          {/* <SectionLink onClick={() => push('/settings/finance/category')}>Categoria</SectionLink> */}
          <SectionLink onClick={() => push('/settings/finance/origin')}>Origem</SectionLink>
          <SectionLink onClick={() => push('/settings/finance/tag')}>Tag</SectionLink>
        </SectionLinks>
      </Section>
    </Container>
  )
}