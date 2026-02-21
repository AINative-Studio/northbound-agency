import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { contactPageSchema, faqPageSchema } from './schema';

export const metadata: Metadata = {
  title: 'Contact Blaq Digital | AI Development Consultation',
  description: 'Get in touch with Blaq Digital for AI development, custom web applications, and intelligent automation. Based in South Africa, serving clients globally. Free consultation available.',
  openGraph: {
    title: 'Contact Blaq Digital | AI Development Consultation',
    description: 'Get in touch with Blaq Digital for AI development, custom web applications, and intelligent automation. Based in South Africa, serving clients globally. Free consultation available.',
    type: 'website',
    url: 'https://blaq.ainative.studio/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Blaq Digital | AI Development Consultation',
    description: 'Get in touch with Blaq Digital for AI development, custom web applications, and intelligent automation. Based in South Africa, serving clients globally. Free consultation available.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
