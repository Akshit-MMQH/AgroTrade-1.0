// src/hooks/useWallet.ts
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../utils/wallet";

type WalletState = {
  accounts: string[];
  balance: string;
  chainId: string;
};

const initialState: WalletState = { accounts: [], balance: "", chainId: "" };

export default function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(initialState);
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  /** FORCE update wallet */
  const updateWallet = async (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      setWallet(initialState);
      return;
    }

    try {
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setWallet({
        accounts,
        balance: formatBalance(balanceHex),
        chainId,
      });
    } catch (err) {
      console.error("updateWallet error", err);
      setWallet(initialState);
    }
  };

  useEffect(() => {
    let mounted = true;

    const handleAccountsChanged = (accounts: string[]) => {
      if (!mounted) return;
      updateWallet(accounts);
    };

    const handleChainChanged = (chainId: string) => {
      if (!mounted) return;
      setWallet((w) => ({ ...w, chainId }));
    };

    const init = async () => {
      /** ✅ MUST BE METAMASK */
      let provider: any = await detectEthereumProvider({
        mustBeMetaMask: true,
      });

      /** If detectEthereumProvider fails, but window.ethereum has multiple providers… */
      if (!provider && window.ethereum?.providers) {
        provider = window.ethereum.providers.find((p: any) => p.isMetaMask);
      }

      /** If STILL no MetaMask → error */
      if (!provider || !provider.isMetaMask) {
        alert("MetaMask not detected! Disable Phantom / Coinbase / other wallets.");
        setHasProvider(false);
        return;
      }

      console.log("✅ MetaMask detected");
      setHasProvider(true);

      /** FORCE override default provider */
      window.ethereum = provider;

      try {
        /** Already authorized? (no popup) */
        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) await updateWallet(accounts);

        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
      } catch (err) {
        console.error("init provider error", err);
      }
    };

    init();

    return () => {
      mounted = false;
      try {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum?.removeListener("chainChanged", handleChainChanged);
      } catch {
        // ignore
      }
    };
  }, []);

  /** ✅ REAL pop-up call */
  const connect = async () => {
    if (!window.ethereum?.isMetaMask) {
      alert("MetaMask is required. Disable Phantom / Coinbase / Rabby etc.");
      return;
    }

    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await updateWallet(accounts);
    } catch (err: any) {
      console.error("User rejected or error:", err);
      if (err?.code === 4001) {
        alert("Please approve MetaMask.");
      }
    }
  };

  return { wallet, connect, hasProvider };
}
