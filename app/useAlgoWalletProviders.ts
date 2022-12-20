import {Buffer} from 'buffer'
import { useEffect, useState } from 'react';
import {
    reconnectProviders,
    PROVIDER_ID,
    pera,
    myalgo,
  } from "@txnlab/use-wallet";

// polyfill Buffer for client
if (typeof window !== 'undefined' && !window.Buffer) {
    window.Buffer = Buffer
}

export function useAlgoWalletProviders(context: { autoConnect: boolean }) {
    // any because `SupportedProviders` isn't exported...
    const [walletProviders, setWalletProviders] = useState<any>({})

    useEffect(() => {
        (async () => {
          // Need to ensure these are called after Buffer is patched
          const algosdk = await import('algosdk')
          const perawc = await import("@perawallet/connect")
          const mac = await import("@randlabs/myalgo-connect")
          const providers = {
            [PROVIDER_ID.MYALGO]: myalgo.init({
              algosdkStatic: algosdk,
              clientStatic: mac.default,
            }),
            [PROVIDER_ID.PERA]: pera.init({
              algosdkStatic: algosdk,
              clientStatic: perawc.default.PeraWalletConnect,
            }),
          };
          setWalletProviders(providers)

          if (context.autoConnect) {
            reconnectProviders(providers)
          }
        })()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return {walletProviders}
}  