import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ─── Gallery Images ───────────────────────────────────────────────────────────
const galleryImages = [
  {
    id: 1,
    category: "Diamond Cut",
    title: "CNC Diamond Cut Finish",
    url: "/images/gallery/wheel-01.jpg",
  },
  {
    id: 2,
    category: "Diamond Cut",
    title: "Premium Wheel Restoration",
    url: "/images/gallery/wheel-02.jpg",
  },
  {
    id: 3,
    category: "Custom Colour",
    title: "Custom Coloured Alloy Wheels",
    url: "/images/gallery/wheel-03.jpg",
  },
  {
    id: 4,
    category: "Custom Colour",
    title: "Sport Wheel Customization",
    url: "/images/gallery/wheel-04.jpg",
  },
  {
    id: 5,
    category: "Cosmetic",
    title: "Luxury Vehicle Wheels",
    url: "/images/gallery/wheel-05.jpg",
  },
  {
    id: 6,
    category: "Diamond Cut",
    title: "Classic Sports Car Wheels",
    url: "/images/gallery/wheel-06.jpg",
  },
  {
    id: 7,
    category: "Cosmetic",
    title: "Performance Wheel Repair",
    url: "/images/gallery/wheel-07.jpg",
  },
  {
    id: 8,
    category: "Cosmetic",
    title: "Executive Sedan Wheels",
    url: "/images/gallery/wheel-08.jpg",
  },
  // ── New gallery photos ──
  {
    id: 9,
    category: "Diamond Cut",
    title: "Two-Tone Diamond Cut Alloy",
    url: "/images/gallery/wheel-09.jpg",
  },
  {
    id: 10,
    category: "Cosmetic",
    title: "Gloss Black Barrel Finish",
    url: "/images/gallery/wheel-10.jpg",
  },
  {
    id: 11,
    category: "Diamond Cut",
    title: "Diamond Cut Close-Up Detail",
    url: "/images/gallery/wheel-11.jpg",
  },
  {
    id: 12,
    category: "Workshop",
    title: "CNC Diamond Cut Machine",
    url: "/images/gallery/wheel-12.jpg",
  },
  {
    id: 13,
    category: "Diamond Cut",
    title: "Multi-Spoke Diamond Cut Wheel",
    url: "/images/gallery/wheel-13.jpg",
  },
  // ── Before/After showcase images also in gallery ──
  {
    id: 14,
    category: "Custom Colour",
    title: "Satin Black Colour Change",
    url: "/images/before-after/colour-after-01.jpg",
  },
  {
    id: 15,
    category: "Custom Colour",
    title: "Matte Dark Custom Finish",
    url: "/images/before-after/colour-after-02.jpg",
  },
  {
    id: 16,
    category: "Custom Colour",
    title: "Gloss Black Mercedes On Car",
    url: "/images/before-after/colour-after-03.jpg",
  },
  {
    id: 17,
    category: "Cosmetic",
    title: "Mercedes AMG Gloss Black Repair",
    url: "/images/before-after/amg-repaired.jpg",
  },
];

// ─── Before & After Transformations ───────────────────────────────────────────
const beforeAfterSets = [
  {
    id: "colour-change-1",
    category: "Colour Change",
    title: "Satin Black Colour Change",
    description:
      "Original diamond cut finish transformed into a sleek satin black — a complete personality change for these wheels.",
    beforeImage: "/images/before-after/colour-before-01.jpg",
    afterImage: "/images/before-after/colour-after-01.jpg",
    beforeLabel: "Original",
    afterLabel: "Satin Black",
  },
  {
    id: "colour-change-2",
    category: "Colour Change",
    title: "Matte Dark Transformation",
    description:
      "From factory two-tone to a bold matte dark finish. A dramatic transformation that completely changes the vehicle's look.",
    beforeImage: "/images/before-after/colour-before-02.jpg",
    afterImage: "/images/before-after/colour-after-02.jpg",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "amg-repair",
    category: "Damage Repair",
    title: "Mercedes AMG Kerb Damage Repair",
    description:
      "Severe kerb rash and scratches on this Mercedes AMG wheel were expertly repaired and refinished to a flawless gloss black.",
    beforeImage: "/images/before-after/damage-before-03.jpg",
    afterImage: "/images/before-after/amg-repaired.jpg",
    beforeLabel: "Kerb Damaged",
    afterLabel: "Restored",
  },
  {
    id: "amg-detail",
    category: "Damage Repair",
    title: "AMG Spoke & Rim Edge Repair",
    description:
      "Close-up detail of AMG kerb damage — deep scratches along the rim edge and spoke junction, expertly filled, smoothed and repainted.",
    beforeImage: "/images/before-after/damage-before-01.jpg",
    afterImage: "/images/before-after/damage-after-01.jpg",
    beforeLabel: "Scratched",
    afterLabel: "Repaired",
  },
];

const galleryCategories = [
  "All",
  "Diamond Cut",
  "Cosmetic",
  "Custom Colour",
  "Workshop",
];
const beforeAfterCategories = ["All", "Colour Change", "Damage Repair"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBACategory, setSelectedBACategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const baRef = useRef(null);
  const galleryRef = useRef(null);
  const isBAInView = useInView(baRef, { once: true, margin: "-100px" });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const filteredBA =
    selectedBACategory === "All"
      ? beforeAfterSets
      : beforeAfterSets.filter((set) => set.category === selectedBACategory);

  const openLightbox = (imageId: number) => {
    const idx = galleryImages.findIndex((img) => img.id === imageId);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setSelectedImage(imageId);
  };

  const nextImage = () => {
    const nextIdx = (lightboxIndex + 1) % galleryImages.length;
    setLightboxIndex(nextIdx);
    setSelectedImage(galleryImages[nextIdx].id);
  };

  const prevImage = () => {
    const prevIdx =
      (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    setLightboxIndex(prevIdx);
    setSelectedImage(galleryImages[prevIdx].id);
  };

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
                Our Gallery
              </h1>
              <p className="text-lg text-muted-foreground">
                See the quality of our work — from minor repairs to complete
                transformations. Drag the sliders to compare before and after.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ BEFORE & AFTER SECTION ═══ */}
        <section ref={baRef} className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBAInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Transformations
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-4">
                Before & After
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Drag the slider on each image to reveal the transformation.
                Every project is a testament to our precision and care.
              </p>
            </motion.div>

            {/* B&A Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {beforeAfterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedBACategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedBACategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* B&A Grid */}
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {filteredBA.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isBAInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group"
                >
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    beforeLabel={item.beforeLabel}
                    afterLabel={item.afterLabel}
                    className="shadow-premium-lg mb-4"
                  />
                  <div className="px-1">
                    <span className="text-primary text-xs font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-display font-bold text-foreground mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBAInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">
                Want results like these for your wheels?
              </p>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Get Your Free Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-b border-border" />

        {/* ═══ FULL GALLERY SECTION ═══ */}
        <section ref={galleryRef} className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-4">
                Complete Gallery
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Browse our full collection of completed projects — diamond cut
                finishes, cosmetic repairs, custom colours, and more.
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isGalleryInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(image.id)}
                >
                  <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-primary text-xs font-medium uppercase tracking-wider">
                        {image.category}
                      </span>
                      <p className="text-white font-semibold text-sm mt-1">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LIGHTBOX MODAL ═══ */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors z-50"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="bg-muted rounded-xl overflow-hidden">
                {galleryImages[lightboxIndex] && (
                  <img
                    src={galleryImages[lightboxIndex].url}
                    alt={galleryImages[lightboxIndex].title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
                <div className="p-6 bg-background flex items-center justify-between">
                  <div>
                    <span className="text-primary text-xs font-medium uppercase tracking-wider">
                      {galleryImages[lightboxIndex]?.category}
                    </span>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {galleryImages[lightboxIndex]?.title}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {lightboxIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>

              {/* Prev / Next */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
}
