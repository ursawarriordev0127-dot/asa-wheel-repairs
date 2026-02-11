import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const partners = [
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners, ...partners, ...partners];

export function TrustedPartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-2">
            Trusted Partners
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Servicing Sydney's Leading Dealerships
          </h2>
        </motion.div>
      </div>

      {/* Scrolling logos container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex"
        >
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: ["50%", "-50%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-32 h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Dealership names below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container mx-auto px-4 mt-10"
      >
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-muted-foreground">
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">Mercedes-Benz</p>
            <p className="text-xs text-muted-foreground">Authorized Partner</p>
          </div>
          <div className="hidden md:block w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">Windsor Auto Group</p>
            <p className="text-xs text-muted-foreground">Preferred Supplier</p>
          </div>
          <div className="hidden md:block w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">Nepean Motor Group</p>
            <p className="text-xs text-muted-foreground">Trusted Partner</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
