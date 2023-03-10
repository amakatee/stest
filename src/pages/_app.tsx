import { type AppType } from "next/app";
import { ThirdwebProvider , ChainId } from "@thirdweb-dev/react";
import MainLayout from '../components/MainLayout'
import { StateContextProvider } from "../context/StateContext";


import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
     <StateContextProvider>
     <MainLayout>
       <Component {...pageProps} />
     </MainLayout>
    </StateContextProvider>
    </ThirdwebProvider> ;
};

export default api.withTRPC(MyApp);
