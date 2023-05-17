import React, { useEffect, useRef } from 'react'
import { AppButtonGroup, AppButtonIcon, AppTitle } from '@/@core/presentation/shared'
import { SystemStore } from '@/store/hook';
import { Form, FormWalletIdProps } from './Form';

type Props = {
  form: FormWalletIdProps
};
export const TabData = (props: Props) => {
  const formRef = useRef() as React.MutableRefObject<{
    onClearFields: () => void
    onResetFields: () => void
  }>

  const systemStore = SystemStore()

  return (
    <>
      <AppTitle
        variant="h5"
        sx={{ mb: 1 }}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon
              variant="save"
              form="form-walletId"
              type="submit"
              disabled={systemStore.state.loading}
              title={props.form.defaultValues.id ? "Atualizar" : "Salvar"}
            />
            <AppButtonIcon
              variant="clean"
              onClick={() => formRef.current?.onClearFields()}
              disabled={systemStore.state.loading}
              title="Definir fomulário padrão"
            />
            <AppButtonIcon
              variant="reset"
              onClick={() => formRef.current?.onResetFields()}
              disabled={systemStore.state.loading || !props.form.defaultValues.id}
              title="Definir fomulário do início"
            />

          </AppButtonGroup>
          //     <AppButtonIcon
          //       color="error"
          //       variant="remove"
          //       onClick={() => handleDelete()}
          //       disabled
          //     />
        }
      >
        Dados
      </AppTitle>

      <Form ref={formRef} {...props.form} />
    </>
  )
}
