import { Layout } from "@/components/layout/Layout";
import { Camera, Truck, Settings, Package, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Get Your Free Quote",
    description:
      "Send us photos via email, WhatsApp, or our website. Or visit us for an in-person assessment. All quotes are 100% free.",
    details: [
      "Send photos of your damaged wheels via email, WhatsApp, or our website contact form",
      "Include details about the damage (kerb damage, scratches, etc.)",
      "Or visit us in person for a professional assessment",
      "We'll provide a detailed quote within hours",
      "No obligation - all quotes are completely free",
    ],
  },
  {
    number: "02",
    icon: Truck,
    title: "Optional Pickup",
    description:
      "We can collect your wheels from your location. Fees depend on distance, number of wheels, and whether we need to remove/install them or it's a simple pickup and drop off.",
    details: [
      "We offer convenient pickup service from your location",
      "Fees depend on: distance, number of wheels, and whether we need to remove/install them",
      "Simple pickup and drop off available",
      "We can also remove and reinstall wheels if needed",
      "Mobile service available throughout Sydney",
    ],
  },
  {
    number: "03",
    icon: Settings,
    title: "Wheels Repaired",
    description:
      "We take tyres off, clean the wheels, repair, CNC (if needed) and repaint the wheels. Put tyres back on and balance it.",
    details: [
      "Professional tyre removal and storage",
      "Thorough cleaning and preparation",
      "Expert repair of all damage",
      "CNC machining if required for diamond-cut finish",
      "Professional painting and finishing",
      "Tyres reinstalled and wheels balanced",
    ],
  },
  {
    number: "04",
    icon: Package,
    title: "Delivery",
    description:
      "We'll return your wheels looking brand new. Delivery available to your preferred location. Fees depend on distance, number of wheels, and installation requirements.",
    details: [
      "Wheels returned looking better than new",
      "Delivery to your preferred location",
      "Fees depend on: distance, number of wheels, and installation needs",
      "We can reinstall wheels on your vehicle if required",
      "Quality guarantee on all work",
    ],
  },
];

export default function HowItWorks() {
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
              <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
                Simple Process
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-4">
                How It Works
              </h1>
              <p className="text-lg text-muted-foreground">
                From quote to delivery, we make the wheel repair process seamless and convenient.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const stepRef = useRef(null);
                const stepInView = useInView(stepRef, { once: true, margin: "-100px" });

                return (
                  <motion.div
                    key={step.number}
                    ref={stepRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={stepInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={`grid md:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "md:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Icon and Content */}
                    <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                      <div className="flex items-start gap-6 mb-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="w-12 h-12 text-primary" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-display font-bold text-sm">
                              {step.number}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                            {step.title}
                          </h2>
                          <p className="text-lg text-muted-foreground mb-6">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                      <div className="bg-muted rounded-xl aspect-square overflow-hidden relative">
                        <img
                          src={
                            index === 0
                              ? "/images/process/step-01-quote.jpg"
                              : index === 1
                              ? "/images/process/step-02-pickup.jpg"
                              : index === 2
                              ? "/images/process/step-03-repair.jpg"
                              : "/images/process/step-04-delivery.jpg"
                          }
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get your free quote today and experience our professional service
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-primary-foreground text-primary hover:opacity-90 gap-2"
                  >
                    Get Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/61450693539"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="destructive"
                    className="w-full sm:w-auto border-secondary-foreground/20 hover:bg-secondary-foreground/10 gap-2 text-green"
                  >
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

