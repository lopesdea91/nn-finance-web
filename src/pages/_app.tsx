// import 'chart.js/auto';
import React from 'react';
import { Layout } from "@/@core/presentation/layouts";
import { AppPropsLayout } from '@/types/layout';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/assets/css/app.scss'
import { AppProvider } from '@/@core/framework/providers';
import { AppSubscribed } from '@/@core/framework/subscribe';
// config.autoAddCss = false

function App({ Component, pageProps }: AppPropsLayout) {
  // return <Component {...pageProps} />

  return (
    <AppProvider>
      <AppSubscribed />

      <Layout layout={Component.layout}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default App