import type { Metadata } from 'next';
import Reveal from '@/components/motion/Reveal';
import { PageHero } from '@/components/Section';
import { title, html } from './content';

export const metadata: Metadata = {
  title,
  description: `${title} for Umurimo Finance Plc.`,
};

export default function Page() {
  return (
    <>
      <PageHero title={title} />
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-prose">
            {/* Wording is carried over verbatim from the original site. */}
            <div className="prose-legal" dangerouslySetInnerHTML={{ __html: html }} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
