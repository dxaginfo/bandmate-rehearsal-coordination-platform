import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '@/store';
import theme from '@/theme';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/layout/Layout';
import { setupAxiosInterceptors } from '@/utils/api';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Setup axios interceptors
    setupAxiosInterceptors(store);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer position="top-right" autoClose={5000} />
      </ThemeProvider>
    </Provider>
  );
}
