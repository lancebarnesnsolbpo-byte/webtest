# Real Estate Agent Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium real estate platforms like Zillow, Redfin, and Compass, combined with luxury hospitality aesthetics for trust and sophistication.

## Color Palette
- **Primary Navy**: #1a2332 (main navigation, headings, primary buttons)
- **White**: #ffffff (backgrounds, text on dark elements)
- **Gold Accent**: #d4af37 (CTAs, highlights, badges, borders)
- **Light Gray**: #f8f9fa (section backgrounds, cards)
- **Medium Gray**: #6c757d (body text, secondary information)

## Typography
**Font Stack**: 'Inter' or 'Poppins' from Google Fonts
- **Headings**: 600-700 weight, navy color
  - H1: 3.5rem (desktop), 2.5rem (mobile)
  - H2: 2.5rem (desktop), 2rem (mobile)
  - H3: 1.75rem (desktop), 1.5rem (mobile)
- **Body Text**: 400 weight, medium gray, 1rem base, 1.6 line-height
- **Buttons/CTAs**: 500-600 weight, uppercase tracking

## Layout System
**Spacing Units**: Tailwind scale - primarily using 4, 6, 8, 12, 16, 20, 24 units
- Section padding: py-16 (desktop), py-12 (mobile)
- Container max-width: max-w-7xl with px-6
- Card spacing: gap-6 to gap-8 in grids
- Component spacing: Consistent 6-8 unit gaps between related elements

## Navigation
- **Sticky header**: White background with subtle shadow on scroll
- **Logo**: Left-aligned, navy text or image
- **Menu items**: Navy text, gold underline on hover (3px thick)
- **Mobile**: Hamburger menu transitioning to overlay navigation
- **Height**: 80px desktop, 64px mobile

## Home Page

### Hero Section
- **Layout**: Full-width, 85vh height on desktop, 70vh mobile
- **Background**: High-quality modern luxury home image with subtle dark overlay (20% opacity)
- **Content**: Centered, white text
  - Main headline: Large, bold (H1)
  - Subheadline: Lighter weight, 1.25rem
- **CTAs**: Two buttons side-by-side (stack on mobile)
  - Primary "View Listings": Navy background with gold border, blurred background (backdrop-blur-md)
  - Secondary "Free Home Valuation": Gold background, blurred background
  - Button padding: px-8 py-4, rounded-lg

### Featured Properties Section
- **Layout**: 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- **Spacing**: py-20 section padding, gap-8 between cards
- **Section Header**: Centered, navy H2, gold accent underline (4px, 60px width)

## Property Cards (Home & Listings)
- **Structure**: White background, rounded-xl, shadow-lg on hover
- **Image**: 16:10 aspect ratio, rounded-t-xl, object-cover
- **Badge Overlay**: Top-right on image, gold background with navy text (e.g., "New Listing")
- **Content Padding**: p-6
- **Price**: Gold color, 1.5rem, 700 weight
- **Address**: Navy, 1.125rem, 600 weight
- **Details Row**: Flex layout, icons + text
  - Bed/Bath badges: Light gray background, navy text, rounded-full, px-3 py-1
- **Hover Effect**: Transform scale(1.02), shadow-2xl, transition 300ms

## Listings Page
- **Filter Bar**: Sticky below header, white background, shadow
  - Dropdowns for price, beds, baths, property type
  - Gold accent on active filters
- **Grid**: 3-column (desktop), 2-column (tablet), 1-column (mobile)
- **Spacing**: py-16, gap-8

## About Page
- **Bio Section**: Two-column layout (image left, text right) on desktop, stack on mobile
  - Realtor photo: Rounded-lg, shadow-md, 400x500px
  - Bio text: Navy headings, gray body, max-width prose
  - Section padding: py-20
- **Testimonials Slider**:
  - Cards: White background, italic text, shadow-md, rounded-lg, p-8
  - Navigation: Gold arrows, below cards
  - Client name: Navy, 600 weight
  - Rating: Gold stars
  - Auto-rotate: 5 seconds per slide

## Contact Page
- **Layout**: Two-column (form left, map right) on desktop, stack on mobile
- **Form**:
  - Fields: White background, border (2px light gray), rounded-lg, p-4
  - Labels: Navy, 600 weight, mb-2
  - Focus state: Gold border
  - Submit button: Full-width, gold background, navy text, py-4
- **Map Placeholder**: Gray background, rounded-lg, min-height 400px
- **Section padding**: py-16

## Footer
- **Background**: Navy (#1a2332)
- **Layout**: Three columns (desktop), stack (mobile)
  - Column 1: Logo and tagline (white text)
  - Column 2: Quick links (white text, gold hover)
  - Column 3: Social icons and Equal Housing logo
- **Social Icons**: Gold color, 1.5rem, circular hover background
- **Equal Housing Logo**: White, aligned bottom-right
- **Padding**: py-12, border-top (1px gold)

## Interactive Elements
- **All Buttons**: Rounded-lg, px-6 py-3, 500 weight, transition-all 300ms
- **Hover States**: 
  - Navy buttons: Lighten 10%, shadow-lg
  - Gold buttons: Darken 10%, shadow-lg
- **Links**: Navy text, gold underline on hover (2px)
- **Form Inputs**: Smooth focus transitions with gold border

## Images
1. **Hero Background**: Wide-angle shot of a modern luxury home exterior during golden hour, professionally lit, high resolution (1920x1080 minimum)
2. **Featured Properties**: 6 diverse property images - mix of exteriors and stylized interiors, warm lighting
3. **Listings Grid**: 12+ placeholder property images, consistent quality and lighting
4. **About Page - Realtor Photo**: Professional headshot or environmental portrait, warm and approachable
5. **Testimonial Avatars**: Circular client photos (or initials in circles if photos unavailable)

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All grids, typography, and spacing scale appropriately across breakpoints. Navigation collapses to hamburger menu below 768px.