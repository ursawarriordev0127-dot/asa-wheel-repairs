import { Link } from "react-router-dom";
import { ArrowRight, Phone, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

const VIDEO_URL =
  "https://video.wixstatic.com/video/575d66_54b98cb2432a4ce1af91fddea9fa5e8a/1080p/mp4/file.mp4";

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = useCallback(() => setIsVideoOpen(true), []);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-medium">
                Sydney's #1 CNC Wheel Specialists
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary-foreground leading-tight">
              Premium{" "}
              <span className="text-primary">Wheel Repairs</span>{" "}
              <br className="hidden md:block" />
              Delivered to Your Door
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Expert diamond cut CNC machining, cosmetic repairs, and custom colour 
              services. From kerb damage to complete wheel transformations — 
              we restore your wheels to better than new.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2 group"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:0450693539">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-secondary-foreground/20 text-green hover:bg-secondary-foreground/10 gap-2"
                >
                  <Phone className="w-4 h-4" />
                  0450 693 539
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Pickup & Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>10+ Years Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin-slow" />
              
              {/* Middle Ring */}
              <div className="absolute inset-8 border-2 border-primary/30 rounded-full" />
              
              {/* Inner Content - Hero Image */}
              <div className="absolute inset-12 rounded-full overflow-hidden shadow-premium-lg">
                <img 
                  src="https://static.wixstatic.com/media/575d66_08e401a72d694bce8169854245bbd9fa~mv2.jpeg/v1/fill/w_1440,h_766,fp_0.50_0.50,q_85,enc_avif,quality_auto/575d66_08e401a72d694bce8169854245bbd9fa~mv2.jpeg" 
                  alt="Premium alloy wheel repair"
                  className="w-full h-full object-cover"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <button
                      onClick={openVideo}
                      aria-label="Play video"
                      className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-primary hover:scale-110 transition-all cursor-pointer"
                    >
                      <Play className="w-7 h-7 text-primary-foreground ml-1" />
                    </button>
                    <p className="font-display text-lg font-bold text-white drop-shadow-lg">
                      CNC Precision
                    </p>
                    <p className="text-sm text-white/90 drop-shadow-md">
                      Factory-finish results
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 top-1/4 bg-card shadow-premium-lg rounded-lg p-4"
              >
                <p className="text-2xl font-display font-bold text-primary">12+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 bottom-1/4 bg-card shadow-premium-lg rounded-lg p-4"
              >
                <p className="text-2xl font-display font-bold text-primary">5000+</p>
                <p className="text-xs text-muted-foreground">Wheels Repaired</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={VIDEO_URL}
                className="w-full h-full object-cover"
                controls
                muted
                playsInline
              />
              <button
                onClick={closeVideo}
                aria-label="Close video"
                className="absolute top-3 right-3 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
