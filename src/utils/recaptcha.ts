
// Define the global reCAPTCHA type
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6LeWjH0rAAAAAJ_3RQ3raRIQ38hkrOra8bJWKipa'; // This is a test key

export const loadRecaptcha = (): Promise<void> => {
  return new Promise((resolve) => {
    // Check if reCAPTCHA script is already loaded
    if (window.grecaptcha) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // When script is loaded, initialize reCAPTCHA
      window.grecaptcha.ready(() => {
        resolve();
      });
    };
    
    // Append script to document
    document.head.appendChild(script);
  });
};

export const verifyRecaptcha = async (): Promise<boolean> => {
  try {
    await loadRecaptcha();
    
    // Execute reCAPTCHA with action
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' });
    
    // In a real application, you would verify this token on your server
    console.log('reCAPTCHA token:', token);
    
    // For demo purposes, we'll just return true
    // In production, you'd send this token to your backend for verification
    return true;
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    return false;
  }
};
