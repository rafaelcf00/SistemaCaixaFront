import "../styles/globals.css";
import "../components/Common/Loader/loader.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}

export default MyApp;
