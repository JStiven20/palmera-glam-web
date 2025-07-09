# Services Subdomain Deployment Guide

This guide explains how to deploy the services page on a subdomain (e.g., `services.palmerastudio.com`).

## Files Created

1. **src/pages/ServicesPage.tsx** - Complete services page with all service details
2. **src/services-main.tsx** - Entry point for the services subdomain
3. **services.html** - HTML template for the services page
4. **vite.services.config.ts** - Vite configuration for building the services subdomain

## Features

- **Complete Service Catalog**: Detailed information about all services
- **Bilingual Support**: Spanish and English language switching
- **Category Filtering**: Filter services by category
- **Responsive Design**: Optimized for all devices
- **SEO Optimized**: Structured data and meta tags
- **Brand Consistency**: Same design system, colors, and typography as main site

## Services Included

1. **Manicura Clásica / Classic Manicure** - €25
2. **Pedicura Clásica / Classic Pedicure** - €50  
3. **Esmalte de Gel / Gel Polish** - €45
4. **Nail Art Personalizado / Custom Nail Art** - €60
5. **Manicura Rusa Uña Corta / Russian Short Nail Manicure** - €45
6. **Pedicura Completa Sin Esmaltar / Complete Unglazed Pedicure** - €55

## How to Build and Deploy

### Build for Production
```bash
npm run build -- --config vite.services.config.ts
```

### Deploy to Subdomain
1. Upload the contents of `dist-services` to your subdomain hosting
2. Configure your DNS to point `services.palmerastudio.com` to the hosting location
3. Set up SSL certificate for the subdomain

### Local Development
To test the services page locally:
```bash
npm run dev -- --config vite.services.config.ts
```

## Customization

### Update Contact Information
Edit the contact details in `src/pages/ServicesPage.tsx`:
- Phone number
- Email address  
- Business hours
- Address

### Add New Services
Add new services to the `services` array in `ServicesPage.tsx` following the existing structure.

### Modify Styling
The page uses the same design system as the main site. All colors and styling are pulled from:
- `src/index.css`
- `tailwind.config.ts`

## SEO Features

- Structured data for services
- OpenGraph and Twitter meta tags
- Optimized page titles and descriptions
- Canonical URLs
- Image alt texts

## Performance Optimizations

- Font preloading
- Image optimization
- Lazy loading components
- Efficient caching headers
- Minimal bundle size