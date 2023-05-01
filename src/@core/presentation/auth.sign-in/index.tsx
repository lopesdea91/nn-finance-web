
import { useTitlePage } from '@/hooks';
import { SignInForm } from './components/SignInForm';
import { AuthSignInPageMethods } from './index.methods';

export const AuthSignInPage = () => {
  useTitlePage('Login')
  const { onSubmit, messageSubmit } = AuthSignInPageMethods()

  return (
    <SignInForm onSubmit={onSubmit} messageSubmit={messageSubmit} />
  )
}
AuthSignInPage.layout = 'public'
