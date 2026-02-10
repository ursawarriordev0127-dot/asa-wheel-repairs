import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      // EmailJS Configuration
      // To set up EmailJS:
      // 1. Go to https://www.emailjs.com/ and create a free account
      // 2. Add an Email Service (Gmail, Outlook, etc.)
      // 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
      // 4. Set the template to send to: info@asawheelrepairs.com.au
      // 5. Get your Public Key from Account > API Keys
      // 6. Create a .env file in the root directory with:
      //    VITE_EMAILJS_SERVICE_ID=your_service_id
      //    VITE_EMAILJS_TEMPLATE_ID=your_template_id
      //    VITE_EMAILJS_PUBLIC_KEY=your_public_key
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        // Use EmailJS
        const { default: emailjs } = await import("@emailjs/browser");
        
        const templateParams = {
          to_email: "info@asawheelrepairs.com.au",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          reply_to: formData.email,
          subject: `New Contact Form Submission from ${formData.name}`,
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        
        setSubmitStatus("success");
        setSubmitMessage("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        // Fallback: Use mailto link if EmailJS not configured
        const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`;
        const mailtoLink = `mailto:info@asawheelrepairs.com.au?subject=Contact Form Submission from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        
        setSubmitStatus("success");
        setSubmitMessage("Opening your email client... If it doesn't open, please email us directly at info@asawheelrepairs.com.au");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      
      // Fallback on error: Use mailto link
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:info@asawheelrepairs.com.au?subject=Contact Form Submission from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus("success");
      setSubmitMessage("Opening your email client... If it doesn't open, please email us directly at info@asawheelrepairs.com.au");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                Get in touch with us for all your wheel repair needs. Our friendly team look forward to hearing from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0450 000 000"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your wheel repair needs..."
                      rows={6}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Status Message */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 p-4 rounded-lg ${
                        submitStatus === "success"
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      }`}
                    >
                      {submitStatus === "success" ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <p
                        className={`text-sm ${
                          submitStatus === "success"
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        {submitMessage}
                      </p>
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a
                        href="tel:0450693539"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        0450 693 539
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Call or SMS anytime
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:info@asawheelrepairs.com.au"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@asawheelrepairs.com.au
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Email us anytime
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">Sydney, NSW</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mobile service available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Mon - Sat: 7am - 6pm</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sunday by appointment
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <a
                      href="https://wa.me/61450693539"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

