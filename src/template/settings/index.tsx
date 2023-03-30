import { AppText } from '@/components/base'
import { SectionLink } from './styled'

export const SettingsPage = () => {
  return (
    <>
      <AppText variant="h6">Conta</AppText>
      <SectionLink href="/settings/account/profile">Perfil</SectionLink>
      <SectionLink href="/settings/account/security">Segurança</SectionLink>

      <AppText variant="h6">Finança</AppText>
      <SectionLink href="/settings/finance/wallet">Carteira</SectionLink>
      <SectionLink href="/settings/finance/origin">Origem</SectionLink>
      <SectionLink href="/settings/finance/tag">Tag</SectionLink>
    </>
  )
}