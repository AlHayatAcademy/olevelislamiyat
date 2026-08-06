"use client";

import { useEffect, useState } from "react";

interface SwipeCoordinates {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface SwipeDirection {
  direction: "left" | "right" | "up" | "down" | null;
  distance: number;
}

const MIN_SWIPE_DISTANCE = 50;

export function useMobileNav() {
  const [swipeCoordinates, setSwipeCoordinates] = useState<SwipeCoordinates | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setSwipeCoordinates({
          startX: touch.clientX,
          startY: touch.clientY,
          endX: 0,
          endY: 0,
        });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (swipeCoordinates && e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        setSwipeCoordinates((prev) => ({
          ...prev!,
          endX: touch.clientX,
          endY: touch.clientY,
        }));
      }
    };

    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchend", handleTouchEnd, false);

    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ));

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [swipeCoordinates]);

  const detectSwipe = (): SwipeDirection => {
    if (!swipeCoordinates) {
      return { direction: null, distance: 0 };
    }

    const deltaX = swipeCoordinates.endX - swipeCoordinates.startX;
    const deltaY = swipeCoordinates.endY - swipeCoordinates.startY;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (Math.max(absDeltaX, absDeltaY) < MIN_SWIPE_DISTANCE) {
      return { direction: null, distance: 0 };
    }

    if (absDeltaX > absDeltaY) {
      return {
        direction: deltaX > 0 ? "right" : "left",
        distance: absDeltaX,
      };
    } else {
      return {
        direction: deltaY > 0 ? "down" : "up",
        distance: absDeltaY,
      };
    }
  };

  return {
    isMobile,
    detectSwipe,
    swipeCoordinates,
  };
}

export function useHapticFeedback() {
  const triggerFeedback = (pattern: "light" | "medium" | "heavy" = "light") => {
    if (typeof window === "undefined") return;

    if ("vibrate" in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
      };
      navigator.vibrate(patterns[pattern]);
    }
  };

  return { triggerFeedback };
}
