/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Application environment label (defaults to the Vite mode when unset). */
  readonly VITE_APP_ENV?: string
  /** Base URL of the backend REST API. */
  readonly VITE_API_BASE_URL?: string
  /** Stellar network target: "testnet" | "mainnet". */
  readonly VITE_STELLAR_NETWORK?: string
  /** Soroban RPC endpoint URL. */
  readonly VITE_STELLAR_RPC_URL?: string
  /** Deployed Procura Soroban contract identifier. */
  readonly VITE_PROCURA_CONTRACT_ID?: string
}
