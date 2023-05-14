
import { useTitlePage } from '@/hooks';
import { Page } from '@/layouts/LayoutPrivate/components';
import { SignInForm } from './components/SignInForm';
import { AuthSignInPageMethods } from './index.methods';

export const AuthSignInPage = () => {
  useTitlePage('Login')
  const { onSubmit, messageSubmit } = AuthSignInPageMethods()

  return (
    <Page>
      <SignInForm onSubmit={onSubmit} messageSubmit={messageSubmit} />
    </Page>
  )
}
AuthSignInPage.layout = 'public'
