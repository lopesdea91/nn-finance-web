import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/assets/css/app.scss'

import { AppProvider } from '@/@core/framework/providers';
import { Layout } from "@/@core/presentation/layouts";

import { SetupKeyDown, SetupAppObserver, SetupSystemObserver, SetupStoreFinanceObserver, SetupData } from '@/@core/app/app.setup';
import { IAppProps } from '@/@core/app/app.types';
import { MyAppSSR } from '@/@core/app/appSSR';
function MyApp({ Component, pageProps, pageInitialData }: IAppProps) {
  return (
    <AppProvider>

      <SetupKeyDown />
      <SetupAppObserver />
      <SetupSystemObserver />
      <SetupStoreFinanceObserver />

      <SetupData initialData={pageInitialData} />

      <Layout layout={Component.layout}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

MyApp.getInitialProps = MyAppSSR

export default MyApp