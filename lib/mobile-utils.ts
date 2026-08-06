"use client";

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    ("ontouchstart" in window) ||
    (navigator.maxTouchPoints > 0) ||
    ((navigator.msMaxTouchPoints || 0) > 0)
  );
}

export function isLargeScreen(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1024;
}

export function isTabletScreen(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isSmallMobileScreen(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 640;
}

export const TOUCH_TARGET_MIN = 44; // iOS HIG minimum
export const MOBILE_BREAKPOINT = 640;
export const TABLET_BREAKPOINT = 768;
export const DESKTOP_BREAKPOINT = 1024;

export function useWindowSize() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  const [windowSize, setWindowSize] = ("use client", "useState")({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  return windowSize;
}
