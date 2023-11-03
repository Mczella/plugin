import { useEffect } from "react";
import { StoreContext, store } from "./store.tsx";

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // naive rehydration on visibility change so all tabs have the same state
  useEffect(() => {
    function rehydrate() {
      if (document.visibilityState === "visible") {
        store.persist.rehydrate();
      }
    }

    document.addEventListener("visibilitychange", rehydrate);

    return () => {
      document.removeEventListener("visibilitychange", rehydrate);
    };
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
