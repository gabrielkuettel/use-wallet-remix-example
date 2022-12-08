import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  reconnectProviders,
  WalletProvider,
  PROVIDER_ID,
  pera,
  myalgo,
} from "@txnlab/use-wallet";
import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { PeraWalletConnect } from "@perawallet/connect";

const walletProviders = {
  [PROVIDER_ID.MYALGO]: myalgo.init({
    algosdkStatic: algosdk,
    clientStatic: MyAlgoConnect,
  }),
  [PROVIDER_ID.PERA]: pera.init({
    algosdkStatic: algosdk,
    clientStatic: PeraWalletConnect,
  }),
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  // Reconnect the session when the user returns to the dApp
  useEffect(() => {
    reconnectProviders(walletProviders);
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <WalletProvider value={walletProviders}>
          <Outlet />
        </WalletProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
