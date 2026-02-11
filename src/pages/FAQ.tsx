import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "How long does a wheel repair take?",
        answer:
          "Most wheel repairs are completed within 24-48 hours. However, the exact timeframe depends on the extent of damage and the type of repair required. We'll provide an estimated completion time when you receive your quote.",
      },
      {
        question: "Do you offer mobile services?",
        answer:
          "Yes! We offer mobile pickup and delivery services throughout Sydney. We can collect your wheels from your location and return them once the repair is complete. Fees depend on distance, number of wheels, and installation requirements.",
      },
      {
        question: "What types of wheels do you repair?",
        answer:
          "We repair all types of alloy wheels, including forged, cast, and multi-piece wheels. We work with all major brands and can handle everything from minor cosmetic damage to complete wheel transformations.",
      },
      {
        question: "How much does wheel repair cost?",
        answer:
          "The cost varies depending on the extent of damage and the type of repair required. We provide free quotes for all repairs - simply send us photos of your wheels or visit us for an in-person assessment. All quotes are 100% free with no obligation.",
      },
    ],
  },
  {
    category: "Services",
    questions: [
      {
        question: "What is diamond cut CNC repair?",
        answer:
          "Diamond cut CNC repair uses precision computer-controlled machinery with diamond-tipped tools to machine your wheel rims, restoring them to their original factory finish. This process removes scratches, scuffs, and damage while maintaining the wheel's structural integrity.",
      },
      {
        question: "Can you repair kerb damage?",
        answer:
          "Yes, we specialize in repairing kerb damage including scratches, scuffs, chips, and gouges. Our expert technicians can restore your wheels to their original appearance, often making them look better than new.",
      },
      {
        question: "Do you offer custom colour services?",
        answer:
          "Yes! We offer a comprehensive custom colour service with a wide range of colours and finishes including gloss, matte, and satin options. Our professional powder coating and painting services ensure a durable, long-lasting finish.",
      },
      {
        question: "Do you provide tyre services?",
        answer:
          "Yes, we offer complete tyre services including supply, fitting, and balancing. We work with all major tyre brands and can provide these services alongside our wheel repair work.",
      },
    ],
  },
  {
    category: "Process",
    questions: [
      {
        question: "How do I get a quote?",
        answer:
          "You can get a free quote by sending us photos of your wheels via email, WhatsApp, or our website contact form. Alternatively, you can visit us in person for a professional assessment. All quotes are 100% free with no obligation.",
      },
      {
        question: "What information do I need to provide?",
        answer:
          "When requesting a quote, please include clear photos of the damaged wheels from multiple angles, details about the type of damage (kerb damage, scratches, etc.), and your preferred contact method. The more information you provide, the more accurate our quote will be.",
      },
      {
        question: "Do I need to remove the tyres?",
        answer:
          "No, you don't need to remove the tyres yourself. We handle the complete process including tyre removal, wheel repair, and tyre reinstallation. We'll also balance your wheels once the tyres are reinstalled.",
      },
      {
        question: "What happens during the repair process?",
        answer:
          "Our repair process includes: tyre removal and storage, thorough cleaning and preparation, expert repair of all damage, CNC machining if required, professional painting and finishing, tyre reinstallation, and wheel balancing. We ensure your wheels are returned looking better than new.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "Are quotes really free?",
        answer:
          "Yes, all quotes are 100% free with no obligation. We provide detailed quotes based on photos or in-person assessments, and there's no charge for the quote itself.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, credit cards, and bank transfers. Payment is typically required upon completion of the repair and delivery of your wheels.",
      },
      {
        question: "Do you offer any warranties?",
        answer:
          "Yes, we provide a quality guarantee on all our work. We stand behind the quality of our repairs and will address any issues that arise from our workmanship.",
      },
      {
        question: "What are the pickup and delivery fees?",
        answer:
          "Pickup and delivery fees depend on several factors including distance from our location, number of wheels, and whether we need to remove/install wheels or it's a simple pickup and drop off. We'll provide a clear breakdown of all fees in your quote.",
      },
    ],
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Layout>
      <div className="pb-16">
        {/* Hero Section */}
        <section className="bg-secondary py-16 pt-40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our wheel repair services
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {faqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${categoryIndex}-${index}`}
                        className="border border-border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-semibold hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get in touch with us and we'll be happy to help
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
                <a
                  href="https://wa.me/61450693539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

