import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Mercedes-Benz Parramatta",
    role: "Dealer Partner",
    content:
      "Just wanted to touch base to say thank you for your ongoing support and services. You and your team make it easy to do business every month and the quality is always to Mercedes Benz standards.",
    rating: 5,
    initials: "MB",
  },
  {
    id: 2,
    name: "Windsor Auto Group",
    role: "Service Partner",
    content:
      "Thank you for your excellent quality of work, quick turn around and your professional service. I know I can always rely on you to perform a high-end repair when needed. I recommend your work to everyone that wants quality affordable repair.",
    rating: 5,
    initials: "WA",
  },
  {
    id: 3,
    name: "Nepean Motor Group",
    role: "Dealer Partner",
    content:
      "Very professional and quick service from ASA. I have been using them for Wheel repairs for over 5 years now and always here on time and always does a great job from a scratch to a full rim repair. Very highly recommend Ronnie and his team, will not disappoint.",
    rating: 5,
    initials: "NM",
  },
  {
    id: 4,
    name: "Frank Maropoulos",
    role: "Mercedes Benz",
    content:
      "Just wanted to touch base to say thank you for your ongoing support and services. You and your team make it easy to do business every month and the quality is always to Mercedes Benz standards.",
    rating: 5,
    initials: "FM",
  },
  {
    id: 5,
    name: "Joe Kazan",
    role: "Windsor Auto Group",
    content:
      "Thank you for your excellent quality of work, quick turn around and your professional service. I know I can always rely on you to perform a high-end repair when needed. I recommend your work to everyone that wants quality affordable repair.",
    rating: 5,
    initials: "JK",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6">
              What Our Clients Say
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-premium-lg">
              <Quote className="w-12 h-12 text-primary/20 mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-primary fill-primary"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl text-card-foreground leading-relaxed mb-8">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-display font-bold text-primary">
                        {testimonials[currentIndex].initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-card-foreground">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
