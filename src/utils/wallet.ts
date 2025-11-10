// src/utils/wallet.ts
export function formatBalance(balance: string) {
  // balance comes as hex wei string, parse and convert to eth
  const num = parseInt(balance, 16) / 1e18;
  return num.toFixed(4);
}

export function formatChainAsNum(chainId: string) {
  // chainId usually hex, e.g. "0x1"
  return parseInt(chainId, 16);
}
