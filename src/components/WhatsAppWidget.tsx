import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppWidget() {
  return (
    <motion.a
      href="https://wa.me/61450693539?text=Hi%2C%20I'd%20like%20to%20get%20a%20quote%20for%20wheel%20repair"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 bg-foreground text-background text-sm font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
}
