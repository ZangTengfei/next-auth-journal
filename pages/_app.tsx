import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import NiceModal from "@ebay/nice-modal-react";
import { AppProps } from "next/app";

import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NiceModal.Provider>
      <NextUIProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NextUIProvider>
    </NiceModal.Provider>
  );
};

export default App;
