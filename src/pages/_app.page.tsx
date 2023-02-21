import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProvider } from "@/providers";
import { AppPropsLayout } from '@/types/layout';
import Layout from "@/layouts";
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/global.css'

config.autoAddCss = false

export default function App({ Component, pageProps }: AppPropsLayout) {
  return (
    <AppProvider>
      <Layout layout={Component.layout}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}