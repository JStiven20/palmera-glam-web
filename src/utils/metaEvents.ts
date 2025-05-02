
// Meta Pixel Event Tracking Utility

// This is a utility file for implementing Meta Pixel events
// Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID when in production

/**
 * Track a standard Meta Pixel event
 * @param eventName The name of the event to track
 * @param params Additional parameters to include with the event
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  } else {
    console.log(`Meta Pixel Event (${eventName}) would be tracked here`, params);
  }
};

/**
 * Track a page view event
 */
export const trackPageView = () => {
  trackEvent('PageView');
};

/**
 * Track when a user views content
 * @param contentType The type of content viewed
 * @param contentId Identifier for the content
 */
export const trackViewContent = (contentType: string, contentId: string) => {
  trackEvent('ViewContent', {
    content_type: contentType,
    content_ids: [contentId]
  });
};

/**
 * Track when a user completes a lead form
 * @param formId Identifier for the form
 * @param formSource Source of the lead
 */
export const trackLead = (formId: string, formSource: string) => {
  trackEvent('Lead', {
    form_id: formId,
    source: formSource
  });
};

/**
 * Track when a user completes a registration
 * @param method Registration method used
 */
export const trackCompleteRegistration = (method: string) => {
  trackEvent('CompleteRegistration', {
    method: method
  });
};

/**
 * Track when a user makes a booking/purchase
 * @param value Value of the purchase
 * @param currency Currency code
 * @param serviceIds IDs of services booked/purchased
 */
export const trackPurchase = (value: number, currency: string, serviceIds: string[]) => {
  trackEvent('Purchase', {
    value: value,
    currency: currency,
    content_ids: serviceIds,
    content_type: 'product'
  });
};

// Declaration to extend the Window interface to include fbq
declare global {
  interface Window {
    fbq?: any;
  }
}
