import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures smooth scroll-to-top whenever the path or query parameters change,
 * except when navigating back/forward or if a state specifies to keep position.
 */
export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { backgroundLocation?: any } | undefined;
    if (state?.backgroundLocation) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search, location.state]);

  return null;
}
