import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/**
 * `false` during SSR and hydration, `true` once the component is on the client.
 * Uses `useSyncExternalStore` so there is no extra render or state update.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
