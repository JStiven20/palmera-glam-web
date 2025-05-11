
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import CookieConsent from "./components/CookieConsent";

// Lazy load non-critical routes
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

// Setup for Meta Pixel with performance optimization
const initializeMetaPixel = () => {
  // This is where you would add the Meta Pixel code
  // Example:
  // !function(f,b,e,v,n,t,s)
  // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  // n.queue=[];t=b.createElement(e);t.async=!0;
  // t.src=v;s=b.getElementsByTagName(e)[0];
  // s.parentNode.insertBefore(t,s)}(window, document,'script',
  // 'https://connect.facebook.net/en_US/fbevents.js');
  // fbq('init', 'YOUR_PIXEL_ID_HERE');
  // fbq('track', 'PageView');
  
  console.log('Meta Pixel initialized');
};

// Create queryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false, // Reduce unnecessary refetches
    },
  },
});

const App = () => {
  // Initialize Meta Pixel if user has accepted cookies
  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      initializeMetaPixel();
    }
    
    // Add passive event listeners for better scrolling performance
    const addPassiveEventListeners = () => {
      const wheelOpts = { passive: true };
      const wheelEvent = 'onwheel' in document ? 'wheel' : 'mousewheel';
      
      document.addEventListener(wheelEvent, () => {}, wheelOpts);
      document.addEventListener('touchstart', () => {}, wheelOpts);
    };
    
    addPassiveEventListeners();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={
                <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
                  <PrivacyPolicy />
                </Suspense>
              } />
              <Route path="/cookie-policy" element={
                <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
                  <CookiePolicy />
                </Suspense>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
