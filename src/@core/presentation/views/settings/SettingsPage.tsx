import React from 'react'
import { SubTitleSection, TitleSection } from '../../shared/pages'
import { Grid } from '../../shared/ui/Grid'
import { Button } from '../../shared/ui'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { Widget } from '../../shared/components'

export const SettingsPage = () => {
  return (
    <>
      <TitleSection>Configurações</TitleSection>

      <Widget.Root>
        <SubTitleSection>Finanças</SubTitleSection>

        <Grid.Root className="gap-2 grid-cols-1 sm:grid-cols-4 lg:grid-cols-6">
          <Button onClick={() => observer.publish(redirectObserver('/finance/wallet'))}>
            Carteira
          </Button>
          <Button onClick={() => observer.publish(redirectObserver('/finance/origin'))}>
            Origem
          </Button>
          <Button onClick={() => observer.publish(redirectObserver('/finance/tag'))}>
            Tag
          </Button>
        </Grid.Root>
      </Widget.Root>
    </>
  )
}

SettingsPage.layout = 'settings'