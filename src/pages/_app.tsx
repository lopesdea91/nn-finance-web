import { AppProvider } from "@/providers";
import Layout from "@/layouts";
import { AppPropsLayout } from '@/types/layout';

export default function App({ Component, pageProps }: AppPropsLayout) {
  return (
    <AppProvider>
      <Layout layout={Component.layout}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}