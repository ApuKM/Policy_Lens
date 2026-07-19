"use client";

import { Accordion } from "@heroui/react";

const faqs = [
  {
    key: "what-is-policylens",
    question: "What is PolicyLens and who is it for?",
    answer:
      "PolicyLens is an AI-powered civic intelligence platform that transforms complex government documents, legislation, and regulations into clear, actionable summaries. It is designed for policy analysts, legal researchers, journalists, NGOs, government officials, and engaged citizens who need to understand policy content quickly and accurately.",
  },
  {
    key: "document-types",
    question: "What types of documents can I analyze?",
    answer:
      "PolicyLens supports a wide range of document formats including PDF, DOCX, TXT, and scanned image files (via OCR). You can analyze federal and state legislation, municipal ordinances, regulatory filings, executive orders, international treaties, court rulings, and administrative guidance notes.",
  },
  {
    key: "accuracy",
    question: "How accurate is the AI analysis?",
    answer:
      "Our models achieve a 98% accuracy rate as validated against expert legal reviews. We use domain-specific fine-tuned language models combined with a curated legal knowledge base. Every analysis includes source citations so you can verify findings directly against the original text.",
  },
  {
    key: "data-privacy",
    question: "Is my document data kept private and secure?",
    answer:
      "Absolutely. All uploaded documents are encrypted at rest and in transit using AES-256 and TLS 1.3 respectively. We do not use your documents to train our models without explicit consent. Enterprise users can opt for on-premises deployment for maximum data sovereignty.",
  },
  {
    key: "pricing",
    question: "Is PolicyLens free to use?",
    answer:
      "PolicyLens offers a free tier with access to up to 5 document analyses per month, covering documents of up to 50 pages. Pro plans start at $29/month for unlimited analyses, and Enterprise plans include team collaboration features, API access, and dedicated support.",
  },
  {
    key: "languages",
    question: "Does PolicyLens support documents in multiple languages?",
    answer:
      "Yes. PolicyLens currently supports documents in English, Spanish, French, German, Portuguese, and Mandarin. Additional language support is rolling out throughout 2024. The output summary language can be configured independently from the source document language.",
  },
  {
    key: "api",
    question: "Is there a developer API available?",
    answer:
      "Yes. Our REST API is available on Pro and Enterprise plans and lets you programmatically submit documents, retrieve structured analysis results, and integrate PolicyLens intelligence directly into your own applications, dashboards, or workflows.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#f5f4f0] dark:bg-[#091832]">
      <div className="mx-auto max-w-3xl px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#d4960a] font-semibold text-sm uppercase tracking-widest mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#091832] dark:text-[#eef1f7] tracking-tight">
            Frequently Asked
          </h2>
          <p className="mt-4 text-lg text-[#7a756a] dark:text-[#9baece]">
            Everything you need to know about PolicyLens, answered clearly.
          </p>
        </div>

        {/* Accordion — HeroUI v3 compound API */}
        <Accordion variant="surface" className="flex flex-col gap-2">
          {faqs.map((faq) => (
            <Accordion.Item key={faq.key} id={faq.key}>
              <Accordion.Heading>
                <Accordion.Trigger className="flex w-full items-center justify-between px-5 py-4 text-left text-[#091832] dark:text-[#eef1f7] font-semibold text-base hover:text-[#1a3a6b] dark:hover:text-[#f7ce47] transition-colors">
                  <span>{faq.question}</span>
                  <Accordion.Indicator className="text-[#d4960a] ml-3 shrink-0" />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="px-5 pb-5">
                  <p className="text-sm text-[#7a756a] dark:text-[#9baece] leading-relaxed">
                    {faq.answer}
                  </p>
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* CTA below FAQ */}
        <p className="text-center text-sm text-[#a09b8e] dark:text-[#6987b6] mt-10">
          Still have questions?{" "}
          <a
            href="mailto:support@policylens.ai"
            className="text-[#d4960a] font-semibold hover:underline"
          >
            Contact our team →
          </a>
        </p>
      </div>
    </section>
  );
}
