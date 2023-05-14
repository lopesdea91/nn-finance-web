import { AppColumn, AppColumns, AppDivider, AppText } from '@/components/base'
import { useTitlePage } from '@/hooks'
import { Page, Section } from '@/layouts/LayoutPrivate/components'
import { SectionLink } from './styled'

export const SettingsPage = () => {
  useTitlePage('Config')

  const linkPerfil = [
    { label: 'Perfil', desc: 'Edição de nome e email', href: '/settings/account/profile' },
    { label: 'Segurança', desc: 'reset de senha', href: '/settings/account/security' },
  ]
  const linkFinance = [
    { label: 'Carteira', desc: 'Cadastro, edição e reprocessar de dados', href: '/settings/finance/wallet' },
    { label: 'Origem', desc: 'Cadastro e edição', href: '/settings/finance/origin' },
    { label: 'Tag', desc: 'Cadastro e edição', href: '/settings/finance/tag' },
  ]
  return (
    <Page>
      <Section>
        <AppText variant="h5">Conta</AppText>
        <AppDivider sx={{ mb: 0 }} />

        <AppColumns spacing={2}>
          {linkPerfil.map(el => (
            <AppColumn xs={6} sm={4} md={3} lg={2} key={el.label}>
              <SectionLink href={el.href}>
                <AppText variant='h6'>{el.label}</AppText>
                <AppDivider sx={{ mb: 1 }} />
                <AppText variant='body2'>{el.desc}</AppText>
              </SectionLink>
            </AppColumn>
          ))}
        </AppColumns>
      </Section>

      <Section>
        <AppText variant="h6">Finança</AppText>
        <AppDivider sx={{ mb: 0 }} />

        <AppColumns spacing={2}>
          {linkFinance.map(el => (
            <AppColumn xs={6} sm={4} md={3} lg={2} key={el.label}>
              <SectionLink href={el.href}>
                <AppText variant='h6'>{el.label}</AppText>
                <AppDivider sx={{ mb: 1 }} />
                <AppText variant='body2'>{el.desc}</AppText>
              </SectionLink>
            </AppColumn>
          ))}
        </AppColumns>
      </Section>
    </Page>
  )
}