import { Link } from "react-router-dom";
import { ArrowRight, Camera, Truck, Settings, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Get Your Free Quote",
    description:
      "Send us photos via email, WhatsApp, or our website. Or visit us for an in-person assessment. All quotes are 100% free.",
  },
  {
    number: "02",
    icon: Truck,
    title: "Optional Pickup",
    description:
      "We can collect your wheels from your location. Fees depend on distance, number of wheels, and whether we need to remove/install them or it's a simple pickup and drop off.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Wheels Repaired",
    description:
      "We take tyres off, clean the wheels, repair, CNC (if needed) and repaint the wheels. Put tyres back on and balance it.",
  },
  {
    number: "04",
    icon: Package,
    title: "Delivery",
    description:
      "We'll return your wheels looking brand new. Delivery available to your preferred location. Fees depend on distance, number of wheels, and installation requirements.",
  },
];

export function ProcessPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mt-4 mb-6">
            How It Works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From quote to delivery, we make the wheel repair process seamless and convenient.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                </div>
              )}

              <div className="text-center">
                {/* Icon */}
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-secondary-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link to="/how-it-works">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 group"
            >
              Learn More About Our Process
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
