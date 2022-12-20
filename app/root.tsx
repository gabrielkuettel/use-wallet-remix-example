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
  WalletProvider,
} from "@txnlab/use-wallet";
import { useAlgoWalletProviders } from "./useAlgoWalletProviders";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const {walletProviders} = useAlgoWalletProviders({autoConnect: true})

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
