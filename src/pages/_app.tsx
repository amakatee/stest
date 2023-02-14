import { type AppType } from "next/app";
import { ThirdwebProvider , ChainId } from "@thirdweb-dev/react";
// import { StateContextProvider } from "../context/StateContext";


import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
     {/* <StateContextProvider> */}
      <Component {...pageProps} />
     {/* </StateContextProvider> */}
    </ThirdwebProvider> ;
};

export default api.withTRPC(MyApp);
