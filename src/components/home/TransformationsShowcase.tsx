import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Palette, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

const transformations = [
  {
    id: "colour-change",
    icon: Palette,
    title: "Custom Colour Change",
    description:
      "Complete colour transformations — from original factory finish to stunning satin, matte, or gloss black.",
    beforeImage: "/images/before-after/colour-before-01.jpg",
    afterImage: "/images/before-after/colour-after-01.jpg",
    beforeLabel: "Original",
    afterLabel: "Satin Black",
  },
  {
    id: "full-makeover",
    icon: Sparkles,
    title: "Full Wheel Makeover",
    description:
      "From factory two-tone to a bold matte dark finish. A dramatic transformation that completely changes the vehicle's look.",
    beforeImage: "/images/before-after/colour-before-02.jpg",
    afterImage: "/images/before-after/colour-after-02.jpg",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "kerb-damage",
    icon: Wrench,
    title: "Kerb Damage Repair",
    description:
      "Severe kerb rash and scratches expertly repaired and refinished to a flawless gloss black finish.",
    beforeImage: "/images/before-after/damage-before-03.jpg",
    afterImage: "/images/before-after/amg-repaired.jpg",
    beforeLabel: "Kerb Damaged",
    afterLabel: "Restored",
  },
];

export function TransformationsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} className="py-24 bg-secondary relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mt-4 mb-6">
            See Our Transformations
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Drag the slider to compare before and after. Every wheel tells a
            story of expert craftsmanship and attention to detail.
          </p>
        </motion.div>

        {/* Transformation Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {transformations.map((t, index) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === index
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary-foreground/10 text-secondary-foreground/70 hover:bg-secondary-foreground/20"
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:inline">
                {t.title}
              </span>
              <span className="sm:hidden">
                {t.title.split(" ").slice(0, 2).join(" ")}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Active Transformation */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Slider */}
            <div className="lg:col-span-3">
              <BeforeAfterSlider
                beforeImage={transformations[activeTab].beforeImage}
                afterImage={transformations[activeTab].afterImage}
                beforeLabel={transformations[activeTab].beforeLabel}
                afterLabel={transformations[activeTab].afterLabel}
                className="shadow-premium-lg"
              />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 mx-auto lg:mx-0">
                {(() => {
                  const Icon = transformations[activeTab].icon;
                  return <Icon className="w-7 h-7 text-primary" />;
                })()}
              </div>

              <h3 className="text-2xl font-display font-bold text-secondary-foreground mb-4">
                {transformations[activeTab].title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {transformations[activeTab].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/gallery">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 group"
                  >
                    View Full Gallery
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    Get Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom gallery preview strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex gap-3 justify-center overflow-hidden">
            {[
              "/images/gallery/diamond-cut-bmw-01.jpg",
              "/images/gallery/colour-bmw-gold-closeup.jpg",
              "/images/gallery/colour-mesh-black-02.jpg",
              "/images/gallery/cosmetic-ferrari-fullcar.jpg",
              "/images/gallery/colour-vw-black-oncar.jpg",
              "/images/gallery/cosmetic-lamborghini-urus.jpg",
            ].map((src, index) => (
              <Link
                key={index}
                to="/gallery"
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity"
              >
                <img
                  src={src}
                  alt={`Gallery preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            <Link
              to="/gallery"
              className="hover:text-primary transition-colors underline underline-offset-4"
            >
              View all completed projects in our gallery →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
