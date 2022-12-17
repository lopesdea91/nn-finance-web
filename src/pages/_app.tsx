import type { AppProps } from 'next/app'
import { ProviderStore } from '@/store';
import { LoadingInitial } from '@/components/layout/LoadingInitial';
// import { AnimateRoute } from '@/components/layout/AnimateRoute';
import { Layout } from '@/components/layout';

import '@/assets/css/app.scss'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ProviderStore>
      <LoadingInitial>
        {/* <AnimateRoute> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </AnimateRoute> */}
      </LoadingInitial>
    </ProviderStore>
  )
}