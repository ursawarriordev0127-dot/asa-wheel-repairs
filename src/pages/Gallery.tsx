import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

// Gallery images - using local images (replace with AI-generated images later)
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
];

const categories = ["All", "Diamond Cut", "Cosmetic", "Custom Colour"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <Layout>
      <div className="pb-16">
        {/* Hero Section */}
        <section className="bg-secondary py-16 pt-32">
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
                See the quality of our work - from minor repairs to complete transformations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="relative aspect-square bg-muted rounded-xl overflow-hidden group">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold text-sm">{image.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
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
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="bg-muted rounded-xl overflow-hidden">
                {galleryImages.find((img) => img.id === selectedImage) && (
                  <img
                    src={galleryImages.find((img) => img.id === selectedImage)!.url}
                    alt={galleryImages.find((img) => img.id === selectedImage)!.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
                <div className="p-6 bg-background">
                  <p className="text-lg font-semibold text-foreground">
                    {galleryImages.find((img) => img.id === selectedImage)?.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
}

