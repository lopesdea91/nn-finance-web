import { redirectObserver, observer } from '@/@core/domain/observer'
import { DataSSR } from '@/types/system'

export const handlerRequestError = (err: unknown) => {
  return (message: string = 'Error Request') => {
    let messageError = message

    const error = err as Error

    if (process.env.NODE_ENV === 'development') {
      console.warn('--- handlerRequestError --- message', error.message)
      console.warn('--- handlerRequestError ---', error)
    }

    if (checkMessage(error.message)) {
      messageError = 'unauthenticated'
    }

    throw Error(messageError)
  }
}

export const handlerRequestErrorSSR = (err: unknown) => {
  const error = err as Error
  return checkMessage(error.message)
}

export const handlerCatchError = (err: unknown) => {
  const error = err as Error

  if (error.message === 'unauthenticated') {
    // toast com a mensagem sessao expirou
    observer.publish(redirectObserver('/auth/signIn'))
    return
  }

  if (String(error.message).includes('422')) {
    // toast com a mensagem sessao expirou
    observer.publish(redirectObserver('/auth/signIn'))
    return
  }

  console.warn('--- handlerCatchError --- ', error.message)
}

const checkMessage = (message: string): boolean =>
  !![
    String(message).includes('400'),
    // String(message).includes('401'),
    String(message).includes('422'),
    // String(message).includes('500'),
    String(message).includes('Cannot destructure property'),
    String(message).includes('Error Request')
  ].filter(Boolean).length

// --------

export const handlerRequest = async (props: { execut: Function; catch?: Function; finally?: Function }) => {
  try {
    await props.execut()
    
  } catch (error) {
    handlerLogRequestError(error)

    if (!!props?.catch) {
      await props.catch()
      return
    }

    /** LOGOUT */
    if (isUnauthenticated(error)) {
      observer.publish(redirectObserver('/auth/signIn?error=unauthenticated'))
    }
    if (isServerError(error)) {
      observer.publish(redirectObserver('/auth/signIn?error=server'))
    }
  } finally {
    !!props.finally && (await props.finally())
  }
}
export const handlerRequestSSR = async <T>(dataSSR: DataSSR<T>, func: () => Promise<DataSSR<T>>) => {
  try {
    return await func()
  } catch (error) {
    handlerLogRequestError(error)

    /** LOGOUT */
    dataSSR.redirect = {
      destination: '',
      permanent: false
    }

    if (isUnauthenticated(error)) {
      dataSSR.redirect.destination = '/auth/signIn?error=unauthenticated'
    }
    if (isServerError(error)) {
      dataSSR.redirect.destination = '/auth/signIn?error=server'
    }
    if (isOtherError(error)) {
      dataSSR.redirect.destination = '/auth/signIn?error=unknown-error'
    }
  } finally {
    return dataSSR
  }
}

const handlerLogRequestError = (error: unknown) => {
  const message = (error as Error).message

  if (process.env.NODE_ENV === 'development') {
    console.warn(' -- error.message -- ', message)
  }
}
const isUnauthenticated = (error: unknown) => {
  const message = (error as Error).message

  return !![String(message).includes('400'), String(message).includes('422'), String(message).includes('Cookie')].filter(Boolean)
    .length
}
const isServerError = (error: unknown) => {
  const message = (error as Error).message

  return !![String(message).includes('500'), String(message).includes('Error Request')].filter(Boolean).length
}
const isOtherError = (error: unknown) => {
  const message = (error as Error).message

  return !![String(message).includes('Cannot destructure property')].filter(Boolean).length
}
