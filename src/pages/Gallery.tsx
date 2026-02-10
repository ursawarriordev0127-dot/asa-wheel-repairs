import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ─── Gallery Images ───────────────────────────────────────────────────────────
const galleryImages = [
  // ── Diamond Cut ──
  {
    id: 1,
    category: "Diamond Cut",
    title: "BMW Diamond Cut Restoration",
    url: "/images/gallery/diamond-cut-bmw-01.jpg",
  },
  {
    id: 2,
    category: "Diamond Cut",
    title: "BMW Two-Tone Diamond Cut",
    url: "/images/gallery/diamond-cut-bmw-02.jpg",
  },
  {
    id: 3,
    category: "Diamond Cut",
    title: "Audi Diamond Cut Alloy",
    url: "/images/gallery/diamond-cut-audi.jpg",
  },
  {
    id: 4,
    category: "Diamond Cut",
    title: "VW Diamond Cut Finish",
    url: "/images/gallery/diamond-cut-vw.jpg",
  },
  {
    id: 5,
    category: "Diamond Cut",
    title: "Snowflake Diamond Cut Wheel",
    url: "/images/gallery/diamond-cut-snowflake.jpg",
  },
  {
    id: 6,
    category: "Diamond Cut",
    title: "Two-Tone Diamond Cut Detail",
    url: "/images/gallery/diamond-cut-two-tone-01.jpg",
  },
  {
    id: 7,
    category: "Diamond Cut",
    title: "Diamond Cut Two-Tone Close-Up",
    url: "/images/gallery/diamond-cut-two-tone-02.jpg",
  },

  // ── Custom Colour ──
  {
    id: 8,
    category: "Custom Colour",
    title: "Gloss Black Alloy Wheel",
    url: "/images/gallery/colour-gloss-black-01.jpg",
  },
  {
    id: 9,
    category: "Custom Colour",
    title: "Gloss Black Freshly Painted",
    url: "/images/gallery/colour-gloss-black-02.jpg",
  },
  {
    id: 10,
    category: "Custom Colour",
    title: "Gloss Black Wheel Set",
    url: "/images/gallery/colour-gloss-black-set.png",
  },
  {
    id: 11,
    category: "Custom Colour",
    title: "Mercedes AMG Gloss Black",
    url: "/images/gallery/colour-amg-gloss-black.jpg",
  },
  {
    id: 12,
    category: "Custom Colour",
    title: "Snowflake Gloss Black Finish",
    url: "/images/gallery/colour-snowflake-black.jpg",
  },
  {
    id: 13,
    category: "Custom Colour",
    title: "Mesh Spoke Gloss Black",
    url: "/images/gallery/colour-mesh-black-01.jpg",
  },
  {
    id: 14,
    category: "Custom Colour",
    title: "Mesh Spoke Detail Close-Up",
    url: "/images/gallery/colour-mesh-black-02.jpg",
  },
  {
    id: 15,
    category: "Custom Colour",
    title: "BMW M Gold Wheel Set",
    url: "/images/gallery/colour-bmw-gold-set.jpg",
  },
  {
    id: 16,
    category: "Custom Colour",
    title: "BMW M Gold Close-Up",
    url: "/images/gallery/colour-bmw-gold-closeup.jpg",
  },
  {
    id: 17,
    category: "Custom Colour",
    title: "VW Gloss Black On Vehicle",
    url: "/images/gallery/colour-vw-black-oncar.jpg",
  },
  {
    id: 18,
    category: "Custom Colour",
    title: "Hyundai Gloss Black Set",
    url: "/images/gallery/colour-hyundai-black-set.jpg",
  },

  // ── Cosmetic Repair ──
  {
    id: 19,
    category: "Cosmetic",
    title: "Ferrari Classic Wheel Repair",
    url: "/images/gallery/cosmetic-ferrari-01.jpg",
  },
  {
    id: 20,
    category: "Cosmetic",
    title: "Ferrari Star Spoke Restored",
    url: "/images/gallery/cosmetic-ferrari-02.jpg",
  },
  {
    id: 21,
    category: "Cosmetic",
    title: "Ferrari F355 Full Restoration",
    url: "/images/gallery/cosmetic-ferrari-fullcar.jpg",
  },
  {
    id: 22,
    category: "Cosmetic",
    title: "Haval Wheel Fully Repaired",
    url: "/images/gallery/cosmetic-haval-repaired.jpg",
  },
  {
    id: 23,
    category: "Cosmetic",
    title: "Mercedes ML AMG Side View",
    url: "/images/gallery/cosmetic-mercedes-ml-side.jpg",
  },
  {
    id: 24,
    category: "Cosmetic",
    title: "Mercedes ML63 AMG Full Car",
    url: "/images/gallery/cosmetic-mercedes-ml-full.jpg",
  },
  {
    id: 25,
    category: "Cosmetic",
    title: "Mercedes ML Rear Quarter",
    url: "/images/gallery/cosmetic-mercedes-ml-rear.jpg",
  },
  {
    id: 26,
    category: "Cosmetic",
    title: "Lamborghini Urus Wheel",
    url: "/images/gallery/cosmetic-lamborghini-urus.jpg",
  },

  // ── CNC Machine / Workshop ──
  {
    id: 27,
    category: "CNC Machine",
    title: "CNC Diamond Cut Machine",
    url: "/images/gallery/cnc-machine-01.jpg",
  },
  {
    id: 28,
    category: "CNC Machine",
    title: "CNC Probe Setup",
    url: "/images/gallery/cnc-machine-02.jpg",
  },
  {
    id: 29,
    category: "CNC Machine",
    title: "CNC Machine Full View",
    url: "/images/gallery/cnc-machine-03.jpg",
  },
  {
    id: 30,
    category: "CNC Machine",
    title: "CNC Wheel Preparation",
    url: "/images/gallery/cnc-wheel-setup.jpg",
  },

  // ── Additional NEW images from latest batch ──
  {
    id: 31,
    category: "Custom Colour",
    title: "VW Golf R Blue On Vehicle",
    url: "/images/gallery/colour-vw-golf-r-blue.jpg",
  },
  {
    id: 32,
    category: "CNC Machine",
    title: "VW Diamond Cut CNC Process",
    url: "/images/gallery/diamond-cut-vw-machine-02.jpg",
  },
  {
    id: 33,
    category: "CNC Machine",
    title: "VW CNC Machine Setup",
    url: "/images/gallery/diamond-cut-vw-machine-03.jpg",
  },
  {
    id: 34,
    category: "Custom Colour",
    title: "Peugeot Gunmetal Grey",
    url: "/images/gallery/colour-peugeot-gunmetal.jpg",
  },
  {
    id: 35,
    category: "Custom Colour",
    title: "Peugeot Gunmetal Close-Up",
    url: "/images/gallery/colour-peugeot-gunmetal-closeup.jpg",
  },
  {
    id: 36,
    category: "Cosmetic",
    title: "Lamborghini Full Vehicle Showcase",
    url: "/images/gallery/cosmetic-lamborghini-full-car.jpg",
  },
  {
    id: 37,
    category: "Cosmetic",
    title: "Lamborghini Wheel Top View",
    url: "/images/gallery/cosmetic-lamborghini-closeup-top.jpg",
  },
  {
    id: 38,
    category: "Diamond Cut",
    title: "Hyundai Diamond Cut Set",
    url: "/images/gallery/diamond-cut-hyundai-set.jpg",
  },
  {
    id: 39,
    category: "Custom Colour",
    title: "Hyundai Gloss Black With Tyres",
    url: "/images/gallery/colour-hyundai-black-with-tyres.jpg",
  },
  {
    id: 40,
    category: "Diamond Cut",
    title: "Hyundai Multi-Spoke Diamond Cut Set",
    url: "/images/gallery/diamond-cut-hyundai-multispoke-set.jpg",
  },
  {
    id: 41,
    category: "Workshop",
    title: "Stripped Wheels Ready for Paint",
    url: "/images/gallery/workshop-stripped-wheels.jpg",
  },
  {
    id: 42,
    category: "Custom Colour",
    title: "Chrome Barrel with Black Spokes",
    url: "/images/gallery/colour-chrome-barrel-black.jpg",
  },
  {
    id: 43,
    category: "CNC Machine",
    title: "Mercedes AMG Diamond Cut Process",
    url: "/images/gallery/diamond-cut-mercedes-amg-process.jpg",
  },
  {
    id: 44,
    category: "Workshop",
    title: "Wheels Before Paint Stripping",
    url: "/images/gallery/workshop-before-stripping.jpg",
  },
  {
    id: 45,
    category: "Custom Colour",
    title: "Classic Chrome Wire Wheel",
    url: "/images/gallery/colour-classic-chrome-wire.jpg",
  },
  {
    id: 46,
    category: "Custom Colour",
    title: "Range Rover Gloss Black",
    url: "/images/gallery/colour-range-rover-black.jpg",
  },
  {
    id: 47,
    category: "Custom Colour",
    title: "Range Rover Black Close-Up",
    url: "/images/gallery/colour-range-rover-black-closeup.jpg",
  },
  {
    id: 48,
    category: "Diamond Cut",
    title: "Range Rover Diamond Cut Set",
    url: "/images/gallery/diamond-cut-range-rover-set.jpg",
  },
  {
    id: 57,
    category: "Diamond Cut",
    title: "Two-Tone Diamond Cut Alloy",
    url: "/images/gallery/wheel-09.jpg",
  },
  {
    id: 58,
    category: "Custom Colour",
    title: "Gloss Black Barrel Finish",
    url: "/images/gallery/wheel-10.jpg",
  },
  {
    id: 59,
    category: "Diamond Cut",
    title: "Diamond Cut Close-Up Detail",
    url: "/images/gallery/wheel-11.jpg",
  },
  {
    id: 61,
    category: "Diamond Cut",
    title: "Multi-Spoke Diamond Cut Wheel",
    url: "/images/gallery/wheel-13.jpg",
  },

  // ── Before & After Photos ──
  {
    id: 300,
    category: "Before & After",
    title: "Haval Wheel Peeling Paint Close-Up",
    url: "/images/gallery/ba-haval-peeling-closeup.jpg",
  },
  {
    id: 301,
    category: "Before & After",
    title: "Haval Wheel Damage Full View",
    url: "/images/gallery/ba-haval-damage-full.jpg",
  },
  {
    id: 100,
    category: "Before & After",
    title: "Gloss Black Wheel Set Complete",
    url: "/images/gallery/ba-gloss-black-set.jpg",
  },
  {
    id: 101,
    category: "Before & After",
    title: "Before & After Showcase",
    url: "/images/gallery/ba-showcase-01.png",
  },
  {
    id: 102,
    category: "Before & After",
    title: "AMG Kerb Damage Close-Up",
    url: "/images/gallery/ba-amg-kerb-damage.jpeg",
  },
  {
    id: 103,
    category: "Before & After",
    title: "Wheel Damage Assessment",
    url: "/images/gallery/ba-damage-assessment.jpeg",
  },
  {
    id: 104,
    category: "Before & After",
    title: "Alloy Wheel Before Repair",
    url: "/images/gallery/ba-alloy-before-repair.jpeg",
  },
  {
    id: 105,
    category: "Before & After",
    title: "Wheel Restoration Progress",
    url: "/images/gallery/ba-restoration-progress.jpeg",
  },
  {
    id: 106,
    category: "Before & After",
    title: "Damaged Wheel Inspection",
    url: "/images/gallery/ba-damaged-inspection.jpeg",
  },
  {
    id: 107,
    category: "Before & After",
    title: "Wheel Surface Preparation",
    url: "/images/gallery/ba-surface-preparation.jpeg",
  },
  {
    id: 108,
    category: "Before & After",
    title: "Alloy Restoration Before",
    url: "/images/gallery/ba-alloy-restoration-before.jpeg",
  },
  {
    id: 109,
    category: "Before & After",
    title: "Wheel Repair In Progress",
    url: "/images/gallery/ba-repair-in-progress.jpeg",
  },
  {
    id: 110,
    category: "Before & After",
    title: "Pre-Repair Wheel Condition",
    url: "/images/gallery/ba-pre-repair-condition.jpeg",
  },
  {
    id: 111,
    category: "Before & After",
    title: "Wheel Damage Documentation",
    url: "/images/gallery/ba-damage-documentation.jpeg",
  },
  {
    id: 112,
    category: "Before & After",
    title: "BMW Gold Wheel Set Completed",
    url: "/images/gallery/ba-bmw-gold-set.jpg",
  },
  {
    id: 113,
    category: "Before & After",
    title: "Custom Colour Transformation",
    url: "/images/gallery/ba-colour-transformation.jpg",
  },
  {
    id: 114,
    category: "Before & After",
    title: "Alloy Wheel Restored Finish",
    url: "/images/gallery/ba-restored-finish.jpg",
  },
  {
    id: 115,
    category: "Before & After",
    title: "Wheel Repair Result",
    url: "/images/gallery/ba-repair-result.jpg",
  },
  {
    id: 116,
    category: "Before & After",
    title: "Completed Wheel Restoration",
    url: "/images/gallery/ba-completed-restoration.jpg",
  },
  {
    id: 117,
    category: "Before & After",
    title: "Repaired Wheel Close-Up",
    url: "/images/gallery/ba-repaired-closeup.jpg",
  },
  {
    id: 118,
    category: "Before & After",
    title: "CNC Diamond Cut Process Shot",
    url: "/images/gallery/ba-cnc-process-shot.jpg",
  },
  {
    id: 119,
    category: "Before & After",
    title: "Wheel Set Before Treatment",
    url: "/images/gallery/ba-set-before-treatment.jpg",
  },
  {
    id: 120,
    category: "Before & After",
    title: "Alloy Repair Workshop Shot",
    url: "/images/gallery/ba-repair-workshop-shot.jpg",
  },
  {
    id: 121,
    category: "Before & After",
    title: "Finished Wheel Quality Check",
    url: "/images/gallery/ba-quality-check.jpg",
  },
  {
    id: 122,
    category: "Before & After",
    title: "Before & After Wheel Detail",
    url: "/images/gallery/ba-wheel-detail.jpg",
  },
  {
    id: 123,
    category: "Before & After",
    title: "Restored Wheel On Display",
    url: "/images/gallery/ba-restored-display.jpg",
  },
  {
    id: 124,
    category: "Before & After",
    title: "Wheel Transformation Result",
    url: "/images/gallery/ba-transformation-result.jpg",
  },
  {
    id: 125,
    category: "Before & After",
    title: "Completed Repair Close-Up",
    url: "/images/gallery/ba-completed-repair-closeup.jpg",
  },
  {
    id: 126,
    category: "Before & After",
    title: "Wheel Set After Restoration",
    url: "/images/gallery/ba-set-after-restoration.jpg",
  },
  {
    id: 127,
    category: "Before & After",
    title: "Final Finish Inspection",
    url: "/images/gallery/ba-finish-inspection.jpg",
  },
  {
    id: 128,
    category: "Before & After",
    title: "Mercedes Wheel On Vehicle After",
    url: "/images/gallery/ba-mercedes-on-vehicle.jpg",
  },
  {
    id: 129,
    category: "Before & After",
    title: "Workshop Repair Showcase",
    url: "/images/gallery/ba-workshop-showcase.jpg",
  },
  {
    id: 130,
    category: "Before & After",
    title: "Before & After Comparison",
    url: "/images/gallery/ba-comparison.jpg",
  },
  {
    id: 131,
    category: "Before & After",
    title: "Alloy Wheel Refinish Complete",
    url: "/images/gallery/ba-refinish-complete.jpg",
  },
  {
    id: 132,
    category: "Before & After",
    title: "Wheel Repair Before State",
    url: "/images/gallery/ba-repair-before-state.jpg",
  },
  {
    id: 133,
    category: "Before & After",
    title: "Restored Wheel Showcase",
    url: "/images/gallery/ba-restored-showcase.jpg",
  },
  {
    id: 134,
    category: "Before & After",
    title: "Damage Repair Transformation",
    url: "/images/gallery/ba-damage-transformation.jpg",
  },
  {
    id: 135,
    category: "Before & After",
    title: "Alloy Wheel Before Treatment",
    url: "/images/gallery/ba-alloy-before-treatment.jpg",
  },
  {
    id: 136,
    category: "Before & After",
    title: "Wheel After Expert Repair",
    url: "/images/gallery/ba-expert-repair.jpg",
  },
  {
    id: 137,
    category: "Before & After",
    title: "Repaired Alloy Wheel Set",
    url: "/images/gallery/ba-repaired-set.jpg",
  },
  {
    id: 138,
    category: "Before & After",
    title: "Workshop Wheel Restoration",
    url: "/images/gallery/ba-workshop-restoration.jpg",
  },
  {
    id: 139,
    category: "Before & After",
    title: "Wheel Repair Final Result",
    url: "/images/gallery/ba-repair-final-result.jpg",
  },
  {
    id: 140,
    category: "Before & After",
    title: "Before & After Full Set",
    url: "/images/gallery/ba-full-set.jpg",
  },
  {
    id: 141,
    category: "Before & After",
    title: "Wheel Colour Change Result",
    url: "/images/gallery/ba-colour-change-result.jpg",
  },
  {
    id: 142,
    category: "Before & After",
    title: "Professional Wheel Repair",
    url: "/images/gallery/ba-professional-repair.jpg",
  },
  {
    id: 143,
    category: "Before & After",
    title: "Alloy Transformation Complete",
    url: "/images/gallery/ba-alloy-transformation.jpg",
  },
  {
    id: 144,
    category: "Before & After",
    title: "Final Before & After Showcase",
    url: "/images/gallery/ba-final-showcase.jpg",
  },

  // ── Acid & Sand Blast ──
  {
    id: 200,
    category: "Acid & Sand Blast",
    title: "Rusty Steel Wheels Before Treatment",
    url: "/images/gallery/acid-blast-rusty-wheels.jpg",
  },
  {
    id: 201,
    category: "Acid & Sand Blast",
    title: "Wheel Emerging From Acid Bath",
    url: "/images/gallery/acid-blast-acid-bath.jpg",
  },
  {
    id: 202,
    category: "Acid & Sand Blast",
    title: "Sand Blasted Wheel Surface",
    url: "/images/gallery/acid-blast-surface.jpg",
  },
  {
    id: 203,
    category: "Acid & Sand Blast",
    title: "Acid Stripping Process",
    url: "/images/gallery/acid-blast-stripping.jpg",
  },
  {
    id: 204,
    category: "Acid & Sand Blast",
    title: "Wheel After Sand Blasting",
    url: "/images/gallery/acid-blast-after.jpg",
  },
  {
    id: 205,
    category: "Acid & Sand Blast",
    title: "Acid Bath Treatment Result",
    url: "/images/gallery/acid-blast-treatment-result.jpg",
  },
  {
    id: 206,
    category: "Acid & Sand Blast",
    title: "Sand Blast Preparation",
    url: "/images/gallery/acid-blast-preparation.jpg",
  },
  {
    id: 207,
    category: "Acid & Sand Blast",
    title: "Stripped Wheel Ready for Paint",
    url: "/images/gallery/acid-blast-ready-for-paint.jpg",
  },
  {
    id: 208,
    category: "Acid & Sand Blast",
    title: "Acid & Sand Blast Final Result",
    url: "/images/gallery/acid-blast-final-result.jpg",
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
    id: "haval-repair",
    category: "Damage Repair",
    title: "Haval Wheel Full Restoration",
    description:
      "Badly peeling paint and kerb damage on this Haval wheel were stripped back and refinished to a flawless dark metallic grey.",
    beforeImage: "/images/before-after/haval-before.jpg",
    afterImage: "/images/before-after/haval-after.jpg",
    beforeLabel: "Peeling & Damaged",
    afterLabel: "Fully Restored",
  },
  {
    id: "amg-turbine",
    category: "Colour Change",
    title: "AMG Turbine Wheel Colour Change",
    description:
      "This Mercedes AMG turbine-style wheel went from a scratched silver/black to a stunning full gloss black custom colour finish.",
    beforeImage: "/images/before-after/amg-turbine-before.jpg",
    afterImage: "/images/before-after/amg-turbine-after.jpg",
    beforeLabel: "Scratched Silver",
    afterLabel: "Gloss Black",
  },
  {
    id: "mercedes-amg-full",
    category: "Damage Repair",
    title: "Mercedes ML63 AMG Full Set",
    description:
      "All four AMG wheels on this Mercedes ML63 had heavy kerb damage and scratches. Each wheel was fully repaired and diamond cut to factory spec.",
    beforeImage: "/images/before-after/mercedes-amg-before.jpg",
    afterImage: "/images/before-after/mercedes-amg-after.jpg",
    beforeLabel: "Scratched & Damaged",
    afterLabel: "Factory Fresh",
  },
  {
    id: "haval-colour-change-1",
    category: "Colour Change",
    title: "Haval Wheel Colour Change — Close-Up",
    description:
      "Badly peeling and worn paint stripped back to bare metal, then refinished in a stunning metallic dark grey. The spoke detail shows the quality of the new finish.",
    beforeImage: "/images/before-after/haval-colour-before-closeup.jpg",
    afterImage: "/images/before-after/haval-colour-after-closeup.jpg",
    beforeLabel: "Peeling Paint",
    afterLabel: "Metallic Dark Grey",
  },
  {
    id: "haval-colour-change-2",
    category: "Colour Change",
    title: "Haval Wheel Colour Change — Full Wheel",
    description:
      "From faded, chipped paint to a flawless dark metallic finish. This Haval wheel was completely transformed with a full colour change, delivered with tyre fitted.",
    beforeImage: "/images/before-after/haval-colour-before-full.jpg",
    afterImage: "/images/before-after/haval-colour-after-full.jpg",
    beforeLabel: "Worn & Chipped",
    afterLabel: "Fully Restored",
  },
];

// ─── Workshop Videos ──────────────────────────────────────────────────────────
const workshopVideos = [
  {
    id: "vid-1",
    title: "CNC Diamond Cutting Process",
    description:
      "Watch our CNC machine precision-cutting a wheel to factory-perfect finish",
    url: "/images/videos/cnc-cutting-01.mp4",
    category: "Diamond Cut",
  },
  {
    id: "vid-2",
    title: "CNC Machine in Action",
    description:
      "See the diamond-tipped tool cutting perfect lines on an alloy wheel",
    url: "/images/videos/cnc-cutting-02.mp4",
    category: "Diamond Cut",
  },
  {
    id: "vid-8",
    title: "Colour Change Final Product",
    description:
      "See the stunning final result of a complete colour change — from damaged to showroom-ready",
    url: "/images/videos/colour-change-final-01.mp4",
    category: "Custom Colour",
  },
  {
    id: "vid-9",
    title: "Colour Change Transformation Complete",
    description:
      "The finished product of a full colour change transformation — flawless in every detail",
    url: "/images/videos/colour-change-final-02.mp4",
    category: "Custom Colour",
  },
  {
    id: "vid-10",
    title: "Before & After Repair Process",
    description:
      "Watch the full journey from damaged wheel to perfect finish in this before and after video",
    url: "/images/videos/before-after-process-01.mp4",
    category: "Before & After",
  },
  {
    id: "vid-11",
    title: "Before & After Transformation",
    description:
      "A complete before and after transformation — see the difference expert repair makes",
    url: "/images/videos/before-after-process-02.mp4",
    category: "Before & After",
  },
  {
    id: "vid-12",
    title: "Before & After Wheel Restoration",
    description:
      "From worn and damaged to pristine — watch this wheel's complete restoration journey",
    url: "/images/videos/before-after-restoration.mp4",
    category: "Before & After",
  },
];

const galleryCategories = [
  "All",
  "Diamond Cut",
  "Custom Colour",
  "Cosmetic",
  "CNC Machine",
  "Workshop",
  "Before & After",
  "Acid & Sand Blast",
];
const beforeAfterCategories = ["All", "Colour Change", "Damage Repair"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBACategory, setSelectedBACategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const filteredBA =
    selectedBACategory === "All"
      ? beforeAfterSets
      : beforeAfterSets.filter((set) => set.category === selectedBACategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  // Reset to page 1 when category or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsPerPage]);

  // Scroll to gallery section when page changes
  useEffect(() => {
    if (currentPage > 1) {
      const gallerySection = document.getElementById('gallery-section');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentPage]);

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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
              <AnimatePresence mode="wait">
                {filteredBA.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
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
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Want results like these for your wheels?
              </p>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Get Your Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-b border-border" />

        {/* ═══ WORKSHOP VIDEOS SECTION ═══ */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Watch Us Work
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-4">
                Workshop Videos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                See our CNC machines and expert technicians in action — real
                footage from our Sydney workshop.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {workshopVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[9/16] bg-muted rounded-xl overflow-hidden shadow-lg">
                    {playingVideo === video.id ? (
                      <video
                        src={video.url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        onEnded={() => setPlayingVideo(null)}
                      />
                    ) : (
                      <div
                        className="w-full h-full cursor-pointer relative"
                        onClick={() => setPlayingVideo(video.id)}
                      >
                        <video
                          src={video.url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-primary-foreground ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <span className="text-primary text-xs font-medium uppercase tracking-wider">
                            {video.category}
                          </span>
                          <p className="text-white text-sm font-semibold mt-1">
                            {video.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-b border-border" />

        {/* ═══ FULL GALLERY SECTION ═══ */}
        <section id="gallery-section" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-4">
                Complete Gallery
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Browse our full collection of completed projects — diamond cut
                finishes, cosmetic repairs, custom colours, and CNC workshop
                shots.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
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

            {/* Pagination Controls - Items per page */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-sm text-muted-foreground">Show:</span>
                {[12, 16, 20].map((size) => (
                  <button
                    key={size}
                    onClick={() => setItemsPerPage(size)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      itemsPerPage === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {size}
                  </button>
                ))}
                <span className="text-sm text-muted-foreground">
                  items per page
                </span>
              </div>
              <div className="flex items-center gap-2">
              {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                      const showEllipsisAfter =
                        page === currentPage + 2 && currentPage < totalPages - 2;

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span
                            key={`ellipsis-${page}`}
                            className="px-1 sm:px-2 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[36px] sm:min-w-[40px] px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Page indicator for mobile */}
                <div className="sm:hidden text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}

              </div>
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} of {filteredImages.length} images
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence mode="wait">
                {paginatedImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
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
              </AnimatePresence>
            </div>

            {/* Pagination Controls - Items per page */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2 mt-12">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-sm text-muted-foreground">Show:</span>
                {[12, 16, 20].map((size) => (
                  <button
                    key={size}
                    onClick={() => setItemsPerPage(size)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      itemsPerPage === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {size}
                  </button>
                ))}
                <span className="text-sm text-muted-foreground">
                  items per page
                </span>
              </div>
              <div className="flex items-center gap-2">
              {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                      const showEllipsisAfter =
                        page === currentPage + 2 && currentPage < totalPages - 2;

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span
                            key={`ellipsis-${page}`}
                            className="px-1 sm:px-2 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[36px] sm:min-w-[40px] px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Page indicator for mobile */}
                <div className="sm:hidden text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}

              </div>
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} of {filteredImages.length} images
              </div>
            </div>


            {/* Gallery CTA */}
            <div className="text-center mt-16">
              <p className="text-lg font-semibold text-foreground mb-2">
                Impressed by our work?
              </p>
              <p className="text-muted-foreground mb-6">
                Get the same professional results for your wheels — free quotes,
                pickup & delivery available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2 group"
                  >
                    Get Your Free Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/61450693539"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 group"
                  >
                    WhatsApp Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ LIGHTBOX MODAL ═══ */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
