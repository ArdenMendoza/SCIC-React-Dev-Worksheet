import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
