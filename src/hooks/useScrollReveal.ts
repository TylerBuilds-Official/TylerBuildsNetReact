import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Observes all elements with `.reveal` and toggles `.visible`
 * as they enter/exit the viewport. Re-scans on route change.
 */
export default function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    // Brief delay so DOM is settled after route transition
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);
}
