import { ContextSSR, DataSSR } from '@/types/system'
import { PageProps } from './AuthSignInPage.type'

export const AuthSignInPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      message: {
        text: '',
        type: 'error'
      }
    }
  }

  const { error } = ctx.query

  const errors: Record<string, PageProps['message']> = {
    unauthenticated: {
      text: 'sessão expirou!',
      type: 'error'
    },
    server: {
      text: 'Erro API',
      type: 'error'
    },
    'unknown-error': {
      text: 'Algo de errado ocorreu',
      type: 'error'
    }
  }

  if (typeof error === 'string' && errors?.[error]) {
    dataSSR.props.message = errors[error]
  }

  return dataSSR
}
