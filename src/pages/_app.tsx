import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core'
import { Layout } from "@/layouts";
import { AppProvider } from "@/providers";
import { AppPropsLayout } from '@/types/layout';

import '@fortawesome/fontawesome-svg-core/styles.css'
import '../assets/css/app.scss'

config.autoAddCss = false

function App({ Component, pageProps }: AppPropsLayout) {
  return (
    <AppProvider>
      <Layout layout={Component.layout}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default App