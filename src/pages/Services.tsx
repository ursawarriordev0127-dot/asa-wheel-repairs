import { Layout } from "@/components/layout/Layout";
import { Sparkles, Wrench, Palette, Check, Target, ShieldAlert, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const services = [
  {
    id: "diamond-cut",
    icon: Sparkles,
    title: "Diamond Cut CNC",
    image: "https://static.wixstatic.com/media/81236c_2eefd8d8740b4a8db1557e9fd9435679~mv2.jpg/v1/fill/w_360,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/lenco-mag-machine.jpg",
    description:
      "Precision CNC machining restores your wheels to factory-perfect finish. Using the latest technology for flawless diamond-cut repairs.",
    features: [
      "Factory finish restoration",
      "Latest CNC equipment",
      "All wheel types supported",
      "Precision machining",
      "Professional quality guarantee",
    ],
    details:
      "Our state-of-the-art CNC machines use diamond-tipped tools to precisely machine your wheel rims, restoring them to their original factory finish. This process removes scratches, scuffs, and damage while maintaining the wheel's structural integrity. Perfect for alloy wheels that require a premium finish.",
  },
  {
    id: "cosmetic",
    icon: Wrench,
    title: "Cosmetic Repairs",
    image: "https://static.wixstatic.com/media/575d66_8e4314d251114af3a8f821b0975e4c9c~mv2.jpeg/v1/fill/w_360,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mclaren_forged3.jpeg",
    description:
      "Expert repair of kerb damage, scratches, scuffs, and chips. We restore your wheels' appearance without the cost of replacement.",
    features: [
      "Kerb damage repair",
      "Scratch removal",
      "Chip filling",
      "Scuff repair",
      "Paint matching",
    ],
    details:
      "Whether you've hit a kerb or your wheels have suffered from general wear and tear, our cosmetic repair service can restore them to their former glory. We use professional-grade materials and techniques to fill, sand, and refinish damaged areas, making your wheels look as good as new.",
  },
  {
    id: "custom-colour",
    icon: Palette,
    title: "Custom Colour",
    image: "https://static.wixstatic.com/media/81236c_33e0cdc1fc474cbdada63c494584fa6a~mv2.png/v1/fill/w_360,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Coloured%20Alloy%201.png",
    description:
      "Transform your wheels with our professional custom colour service. Choose from a wide range of colours and finishes.",
    features: [
      "Wide colour range",
      "Durable finish",
      "Complete transformation",
      "Gloss, matte, and satin finishes",
      "Powder coating available",
    ],
    details:
      "Give your vehicle a unique look with our custom colour service. We offer a comprehensive range of colours and finishes including gloss, matte, and satin options. Our professional powder coating and painting services ensure a durable, long-lasting finish that will make your wheels stand out.",
  },
  {
    id: "buckle-repair",
    icon: Target,
    title: "Buckle Wheel Repair",
    image: "/Buckle1.jpg",
    description:
      "Professional repair of buckled and bent wheels. We straighten and restore your wheels to their original shape using precision equipment.",
    features: [
      "Wheel straightening",
      "Structural integrity check",
      "Precision balancing",
      "All alloy types supported",
      "Safety tested",
    ],
    details:
      "Buckled wheels can cause vibrations, uneven tyre wear, and handling issues. Our expert technicians use hydraulic presses and precision equipment to carefully straighten buckled alloy wheels, restoring them to their original shape while maintaining structural integrity. Every repaired wheel is balanced and safety checked before delivery.",
  },
  {
    id: "cracked-repair",
    icon: ShieldAlert,
    title: "Cracked Wheel Repair",
    image: "/Crack 2.jpg",
    description:
      "Expert welding and repair of cracked alloy wheels. We restore structural integrity and strength to damaged wheels.",
    features: [
      "TIG welding repair",
      "Crack detection & assessment",
      "Structural reinforcement",
      "Pressure tested",
      "Professional quality guarantee",
    ],
    details:
      "Cracked wheels are a serious safety concern. Our skilled technicians use professional TIG welding and specialist repair techniques to fix cracked alloy wheels. Each repair undergoes rigorous testing to ensure the wheel meets safety standards before being returned to service.",
  },
  {
    id: "wheel-restoration",
    icon: RotateCcw,
    title: "Wheel Restoration (Powder Coating)",
    image: "/Wheel Restoration 1.jpg",
    description:
      "Complete wheel restoration through our professional powder coating process: Acid Strip → Sand Blasted → Powder Coated for a durable, factory-quality finish.",
    features: [
      "Acid stripping",
      "Sand blasting preparation",
      "Professional powder coating",
      "Durable long-lasting finish",
      "Full restoration process",
    ],
    details:
      "Our comprehensive wheel restoration process involves three key stages: First, wheels are acid stripped to remove all old paint, lacquer, and corrosion down to bare metal. Next, they are sand blasted to create a perfectly clean surface for optimal adhesion. Finally, a professional powder coat is applied and oven-cured for an incredibly durable, long-lasting finish that far outperforms traditional paint.",
  },
];

export default function Services() {
  const location = useLocation();
  const refs = services.reduce((acc, service) => {
    acc[service.id] = useRef(null);
    return acc;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = refs[id]?.current;
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash, refs]);

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
                Our Services
              </h1>
              <p className="text-lg text-muted-foreground">
                Professional wheel repair and restoration services delivered to your door
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = service.icon;
                const serviceRef = refs[service.id];
                const isInView = useInView(serviceRef, { once: true, margin: "-100px" });

                return (
                  <motion.div
                    key={service.id}
                    ref={serviceRef}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="scroll-mt-24"
                  >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {/* Left Side - Icon and Info */}
                      <div>
                        <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                          {service.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                          {service.description}
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                          {service.details}
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Side - Service Image(s) */}
                      {service.id === "wheel-restoration" ? (
                        <div className="space-y-4">
                          <div className="relative rounded-xl aspect-video overflow-hidden bg-muted">
                            <img
                              src={service.image}
                              alt="Wheel Restoration — Before (Acid Strip)"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="relative rounded-xl aspect-video overflow-hidden bg-muted">
                            <img
                              src="/Wheel Restoration 2.jpg"
                              alt="Wheel Restoration — Sand Blasted"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="relative rounded-xl aspect-video overflow-hidden bg-muted">
                            <img
                              src="/Wheel Restoration 3.jpg"
                              alt="Wheel Restoration — Powder Coated Final Result"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-center gap-3 text-sm font-medium text-primary pt-2">
                            <span className="bg-primary/10 px-3 py-1.5 rounded-full">Acid Strip</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="bg-primary/10 px-3 py-1.5 rounded-full">Sand Blasted</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="bg-primary/10 px-3 py-1.5 rounded-full">Powder Coated</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative rounded-xl aspect-square overflow-hidden bg-muted">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
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
                Ready to Restore Your Wheels?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get a free quote today and see how we can help
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Free Quote
                </a>
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

