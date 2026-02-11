import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Wrench, Palette, CircleDot, Target, ShieldAlert, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: "diamond-cut",
    icon: Sparkles,
    title: "Diamond Cut CNC",
    description:
      "Precision CNC machining restores your wheels to factory-perfect finish. Using the latest technology for flawless diamond-cut repairs.",
    features: ["Factory finish", "Latest CNC equipment", "All wheel types"],
  },
  {
    id: "cosmetic",
    icon: Wrench,
    title: "Cosmetic Repairs",
    description:
      "Expert repair of kerb damage, scratches, scuffs, and chips. We restore your wheels' appearance without the cost of replacement.",
    features: ["Kerb damage repair", "Scratch removal", "Chip filling"],
  },
  {
    id: "custom-colour",
    icon: Palette,
    title: "Custom Colour",
    description:
      "Transform your wheels with our professional custom colour service. Choose from a wide range of colours and finishes.",
    features: ["Wide colour range", "Durable finish", "Complete transformation"],
  },
  {
    id: "tyre-service",
    icon: CircleDot,
    title: "Tyre Service",
    description:
      "Complete tyre services including supply, fitting, and balancing. We work with all major tyre brands.",
    features: ["All major brands", "Professional fitting", "Wheel balancing"],
  },
  {
    id: "buckle-repair",
    icon: Target,
    title: "Buckle Wheel Repair",
    description:
      "Professional repair of buckled and bent wheels. We straighten and restore your wheels to their original shape.",
    features: ["Wheel straightening", "Structural check", "Precision balancing"],
  },
  {
    id: "cracked-repair",
    icon: ShieldAlert,
    title: "Cracked Wheel Repair",
    description:
      "Expert welding and repair of cracked alloy wheels. We restore structural integrity and strength to damaged wheels.",
    features: ["TIG welding repair", "Crack detection", "Safety certified"],
  },
  {
    id: "wheel-restoration",
    icon: RotateCcw,
    title: "Wheel Restoration",
    description:
      "Complete wheel restoration via powder coating: Acid Strip → Sand Blasted → Powder Coated for a durable factory-quality finish.",
    features: ["Acid stripping", "Sand blasting", "Powder coating"],
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6">
            Expert Wheel Repair Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From minor cosmetic repairs to complete wheel transformations, we deliver 
            professional results that exceed expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/services#${service.id}`}
                className="group block h-full bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-premium-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <svg
                        className="w-4 h-4 text-primary flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
