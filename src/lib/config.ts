/**
 * Centralized, typed frontend configuration.
 *
 * Every value is sourced from Vite environment variables (`import.meta.env`).
 * `VITE_*` variables are inlined into the client bundle at build time and are
 * therefore PUBLIC — never place secrets (private/secret keys, tokens) here.
 *
 * Development builds fall back to sensible localhost / testnet defaults so the
 * app runs with zero configuration. Production builds (`vite build`) require the
 * critical values to be provided explicitly and fail fast with a clear error
 * listing everything that is missing or invalid.
 */

const isProduction = import.meta.env.PROD
const isDevelopment = import.meta.env.DEV

/** Stellar / Soroban network this build targets. */
export type StellarNetwork = 'testnet' | 'mainnet'

export interface AppConfig {
  /** Human-readable application environment label (defaults to the Vite mode). */
  readonly appEnv: string
  /** Base URL of the backend REST API. */
  readonly apiBaseUrl: string
  /** Stellar network this build targets. */
  readonly stellarNetwork: StellarNetwork
  /** Soroban RPC endpoint used to submit and poll transactions. */
  readonly stellarRpcUrl: string
  /** Deployed Procura Soroban contract identifier. */
  readonly procuraContractId: string
  /** True for production builds. */
  readonly isProduction: boolean
  /** True for development builds. */
  readonly isDevelopment: boolean
}

interface VarOptions {
  /** Value used in development when the variable is unset. */
  devDefault?: string
  /** When true, the variable must be present in production builds. */
  requiredInProduction?: boolean
}

const missing: string[] = []
const invalid: string[] = []

/**
 * Resolve a single environment variable.
 *
 * Values are read with static property access (never a dynamic key) so Vite can
 * inline them correctly in production builds.
 */
function resolve(name: string, raw: string | undefined, options: VarOptions): string {
  const value = typeof raw === 'string' ? raw.trim() : ''

  if (value) return value

  if (isDevelopment && options.devDefault !== undefined) {
    return options.devDefault
  }

  if (isProduction && options.requiredInProduction) {
    missing.push(name)
    return ''
  }

  return options.devDefault ?? ''
}

function resolveNetwork(
  name: string,
  raw: string | undefined,
  devDefault: StellarNetwork,
): StellarNetwork {
  const value = resolve(name, raw, { devDefault, requiredInProduction: true })

  if (value === 'testnet' || value === 'mainnet') return value
  // Empty means it was absent — already recorded as missing where required.
  if (value !== '') {
    invalid.push(`${name} must be "testnet" or "mainnet" (received "${value}")`)
  }
  return devDefault
}

const appEnv =
  (typeof import.meta.env.VITE_APP_ENV === 'string' && import.meta.env.VITE_APP_ENV.trim()) ||
  import.meta.env.MODE

const apiBaseUrl = resolve('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL, {
  devDefault: 'http://localhost:8080',
  requiredInProduction: true,
})

const stellarNetwork = resolveNetwork(
  'VITE_STELLAR_NETWORK',
  import.meta.env.VITE_STELLAR_NETWORK,
  'testnet',
)

const stellarRpcUrl = resolve('VITE_STELLAR_RPC_URL', import.meta.env.VITE_STELLAR_RPC_URL, {
  devDefault: 'https://soroban-testnet.stellar.org',
  requiredInProduction: true,
})

const procuraContractId = resolve(
  'VITE_PROCURA_CONTRACT_ID',
  import.meta.env.VITE_PROCURA_CONTRACT_ID,
  { requiredInProduction: true },
)

if (missing.length > 0 || invalid.length > 0) {
  const problems = [
    ...missing.map((name) => `  - ${name} is required in production but is not set`),
    ...invalid.map((message) => `  - ${message}`),
  ].join('\n')

  throw new Error(
    `Invalid Procura frontend configuration:\n${problems}\n\n` +
      'Set the required VITE_* variables (see .env.example) before building for production.',
  )
}

/** Application-wide configuration singleton. */
export const config: AppConfig = Object.freeze({
  appEnv,
  apiBaseUrl,
  stellarNetwork,
  stellarRpcUrl,
  procuraContractId,
  isProduction,
  isDevelopment,
})
