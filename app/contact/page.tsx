import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { contactPageSchema, faqPageSchema, localBusinessSchema } from './schema';

export const metadata: Metadata = {
  title: 'Contact Northbound Studio Cape Town | AI Development & Digital Media Agency South Africa',
  description: 'Contact Northbound Studio in Cape Town for AI development, custom web applications, and intelligent automation. Free 30-minute consultation. We respond within 24 hours. Serving South Africa and global clients.',
  openGraph: {
    title: 'Contact Northbound Studio Cape Town | AI Development & Digital Media Agency',
    description: 'Contact Northbound Studio in Cape Town for AI development, custom web applications, and intelligent automation. Free 30-minute consultation. We respond within 24 hours.',
    type: 'website',
    url: 'https://northboundstudio.co/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Northbound Studio Cape Town | AI Development & Digital Media Agency',
    description: 'Contact Northbound Studio in Cape Town for AI development, custom web applications, and intelligent automation. Free 30-minute consultation. We respond within 24 hours.',
  },
};

export default function ContactPage() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
