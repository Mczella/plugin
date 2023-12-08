import { useEffect, useRef } from "react";
import { StoreContext, createMyStore } from "./store.tsx";

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef(createMyStore());

  // naive rehydration on visibility change so all tabs have the same state
  useEffect(() => {
    function rehydrate() {
      if (document.visibilityState === "visible") {
        store.current.persist.rehydrate();
      }
    }

    document.addEventListener("visibilitychange", rehydrate);

    return () => {
      document.removeEventListener("visibilitychange", rehydrate);
    };
  }, []);

  return (
    <StoreContext.Provider value={store.current}>
      {children}
    </StoreContext.Provider>
  );
}
