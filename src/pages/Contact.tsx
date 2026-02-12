import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle, Upload, X, ImageIcon } from "lucide-react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FilePreview {
  file: File;
  preview: string;
}

interface FormSubmitResponse {
  success?: boolean | string;
  message?: string;
}

function getAttachmentFileName(file: File, index: number): string {
  if (file.name?.trim())
    return file.name;

  const extension = file.type?.split("/")[1] || "jpg";
  return `photo-${index + 1}.${extension}`;
}

async function createZipAttachment(files: FilePreview[]): Promise<File> {
  const zip = new JSZip();

  files.forEach((filePreview, index) => {
    zip.file(getAttachmentFileName(filePreview.file, index), filePreview.file);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return new File([zipBlob], `wheel-photos-${timestamp}.zip`, {
    type: "application/zip",
  });
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
  // const primaryRecipientEmail = "info@asawheelrepairs.com.au";
  const primaryRecipientEmail = "ursa.warrior.dev0127@gmail.com";
  const secondaryRecipientEmail = "help@itechelp.com.au";
  const submitAjaxEndpoint = `https://formsubmit.co/ajax/${primaryRecipientEmail}`;
  const submitMultipartEndpoint = `https://formsubmit.co/${primaryRecipientEmail}`;

  const handleFiles = useCallback((files: FileList | File[]) => {
    const newFiles: FilePreview[] = [];
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_FILE_SIZE) continue;
      if (selectedFiles.length + newFiles.length >= MAX_FILES) break;

      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    setSelectedFiles((prev) => [...prev, ...newFiles].slice(0, MAX_FILES));
  }, [selectedFiles.length]);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setSelectedFiles((prev) => {
      prev.forEach((fp) => URL.revokeObjectURL(fp.preview));
      return [];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      // Build the message with photo info if no files attached
      const hasFiles = selectedFiles.length > 0;
      let messageBody = formData.message;
      if (hasFiles) {
        messageBody += `\n\n--- ${selectedFiles.length} photo(s) attached ---`;
      }

      // Try AJAX with JSON first (most reliable for text-only submissions)
      if (!hasFiles) {
        const payload: Record<string, string> = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          subject: formData.subject || "Free Quote Request",
          message: messageBody,
          _subject: `Free Quote Request from ${formData.name}`,
          _replyto: formData.email,
          _template: "table",
          _captcha: "false",
        };

        if (secondaryRecipientEmail)
          payload._cc = secondaryRecipientEmail;

        console.log("Submitting to:", submitAjaxEndpoint);
        console.log("Payload:", payload);

        const response = await fetch(submitAjaxEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        const result: FormSubmitResponse = await response.json();
        console.log("Response data:", result);

        const wasSubmitted =
          result.success === true || result.success === "true";

        if (response.ok && wasSubmitted) {
          setSubmitStatus("success");
          setSubmitMessage("Thank you for your enquiry! We'll review your details and get back to you with a quote shortly.");
          resetForm();
        } else {
          throw new Error(result.message || "Form submission failed");
        }
      } else {
        // Use FormData for file attachments
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone || "Not provided");
        data.append("subject", formData.subject || "Free Quote Request");
        data.append("message", messageBody);
        data.append("_subject", `Free Quote Request from ${formData.name}`);
        data.append("_replyto", formData.email);
        data.append("_template", "table");
        data.append("_captcha", "false");
        if (secondaryRecipientEmail)
          data.append("_cc", secondaryRecipientEmail);

        const attachmentFile = selectedFiles.length > 1
          ? await createZipAttachment(selectedFiles)
          : selectedFiles[0].file;
        data.append("attachment", attachmentFile);

        console.log("Submitting with files to:", submitMultipartEndpoint);
        console.log("File count:", selectedFiles.length);
        console.log("Attachment:", attachmentFile.name);

        // Use FormSubmit's non-AJAX endpoint for reliable file attachments.
        // We use no-cors because this endpoint responds with HTML and does not expose CORS headers.
        const response = await fetch(submitMultipartEndpoint, {
          method: "POST",
          mode: "no-cors",
          body: data,
        });

        console.log("File upload completed");

        setSubmitStatus("success");
        setSubmitMessage(
          selectedFiles.length > 1
            ? "Thank you for your enquiry! All photos were included as one ZIP attachment."
            : "Thank you for your enquiry! Your photo has been included with the request."
        );
        resetForm();
      }

      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 10000);
    } catch (error) {
      console.error("Error sending form:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unable to submit the form.";
      const needsActivation =
        /needs activation|activate form|activate|actived/i.test(errorMessage);

      setSubmitStatus("error");
      setSubmitMessage(
        needsActivation
          ? `Form inbox is not activated yet. Please open ${primaryRecipientEmail} and click the "Activate Form" email from FormSubmit, then try again.${secondaryRecipientEmail ? ` Submissions will be delivered to ${primaryRecipientEmail} and CC'd to ${secondaryRecipientEmail}.` : ""}`
          : "We couldn't send your request right now. Please try again in a moment or email us directly at info@asawheelrepairs.com.au."
      );

      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 10000);
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
                Get a Free Quote
              </h1>
              <p className="text-lg text-muted-foreground">
                Send us photos of your wheels and we'll provide a detailed quote. Our friendly team look forward to hearing from you.
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
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-6">
                  For all your wheel repair needs. Upload photos for an accurate quote.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Diamond Cut Repair Quote"
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
                      rows={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <Label>Upload Photos</Label>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Upload up to {MAX_FILES} photos of your wheels for an accurate quote (max 5MB each). Multiple photos are sent as one ZIP attachment.
                    </p>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        name="attachment"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) handleFiles(e.target.files);
                          e.target.value = "";
                        }}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {isDragging ? "Drop photos here" : "Click or drag photos here"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* File Previews */}
                    {selectedFiles.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                        {selectedFiles.map((fp, index) => (
                          <div
                            key={`${fp.file.name}-${index}`}
                            className="relative group rounded-lg overflow-hidden border border-border aspect-square bg-muted"
                          >
                            <img
                              src={fp.preview}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                              aria-label={`Remove photo ${index + 1}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1.5 py-0.5 truncate">
                              {fp.file.name}
                            </div>
                          </div>
                        ))}
                        {selectedFiles.length < MAX_FILES && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg border-2 border-dashed border-border hover:border-primary/50 aspect-square flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ImageIcon className="w-5 h-5" />
                            <span className="text-[10px]">Add more</span>
                          </button>
                        )}
                      </div>
                    )}
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
                        Submit Quote Request
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
                    <p className="text-sm text-muted-foreground mt-3">
                      Send us a message or photos via WhatsApp for a quick response.
                    </p>
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
