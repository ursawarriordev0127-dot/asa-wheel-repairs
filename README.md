# ASA Wheel Repairs Website

A modern, responsive website for ASA Wheel Repairs - Sydney's leading CNC wheel repair specialists.

## Tech Stack

- **Vite + React** - Fast build tool and React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **EmailJS** - Email service for contact form

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hero section with call-to-action
- ✅ Statistics showcase
- ✅ Services section with 4 service cards
- ✅ How It Works section with 4-step process
- ✅ Testimonials carousel
- ✅ Contact CTA section
- ✅ Footer with company information and links

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up EmailJS for contact form (optional but recommended):
   - Go to https://www.emailjs.com/ and create a free account
   - Add an Email Service (Gmail, Outlook, etc.)
   - Create an Email Template with these variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`
   - Set the template recipient to: `info@asawheelrepairs.com.au`
   - Get your Public Key from Account > API Keys
   - Create a `.env` file in the root directory:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - Note: If EmailJS is not configured, the form will use a mailto link as fallback

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Project Structure

```
asa-wheel-repairs/
├── app/
│   ├── layout.tsx      # Root layout with Header and Footer
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section
│   ├── Stats.tsx       # Statistics section
│   ├── Services.tsx    # Services showcase
│   ├── HowItWorks.tsx  # Process steps
│   ├── Testimonials.tsx # Client testimonials
│   └── CTA.tsx         # Call-to-action section
└── public/             # Static assets
```

## Build for Production

```bash
npm run build
npm start
```

## Design Notes

- Color scheme: Dark grey (#1F2937), Red (#DC2626), White
- Fully responsive with mobile-first approach
- Modern UI with smooth transitions and hover effects
- Accessible navigation and semantic HTML

