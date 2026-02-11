import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "12+", label: "Years Experience", suffix: "" },
  { value: "100", label: "Satisfied Clients", suffix: "%" },
  { value: "24-48", label: "Hour Turnaround", suffix: "hrs" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-xl font-display text-primary-foreground/80">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-primary-foreground/80 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
