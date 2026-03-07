import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls the window to the top whenever the route changes.
 * This is important for SPA user experience.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main window to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Use 'instant' for immediate reset, or 'smooth' if preferred
    });

    // Handle internal scroll containers (like the one in DashboardLayout)
    // We can look for common scrollable elements and reset them too
    const scrollableElements = document.querySelectorAll('.overflow-y-auto');
    scrollableElements.forEach((el) => {
      el.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [pathname]);

  return null;
}
