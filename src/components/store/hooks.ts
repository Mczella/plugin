import { useEffect, useState } from "react";
// import { store } from "./store";

export function useBytesInUse() {
  const [bytesInUse, setBytesInUse] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.onChanged.addListener(getBytesInUse);

    function getBytesInUse() {
      chrome.storage.local.getBytesInUse((bytes) => {
        setBytesInUse(bytes);
      });
    }

    return () => {
      chrome.storage.local.onChanged.removeListener(getBytesInUse);
    };
  }, []);

  return bytesInUse;
}
// export function usePurgeStorage() {
//   return useCallback(() => {
//     store.persist.clearStorage();
//     window.location.reload();
//   }, []);
// }
