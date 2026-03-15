import { useEffect } from "react";

export function useNoSleep(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let wakeLock: WakeLockSentinel | null = null;

    const request = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch {
        // WakeLock not supported or denied
      }
    };

    request();
    const onVisibility = () => {
      if (document.visibilityState === "visible") request();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      wakeLock?.release();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);
}
