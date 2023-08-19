import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { AppProps } from "next/app";

import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NextUIProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  );
};

export default App;
