import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { Button } from "@/components/ui/button";

export type ContactUsHandle = {
  open: () => void;
  close: () => void;
};

const ContactUs = forwardRef<ContactUsHandle>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    message: "",
  });

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => setOpen(false), 1500);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSuccess(true);
      setForm({ email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <MotionEffect fade zoom slide={{ direction: "up", offset: 40 }}>
        <div className="bg-gray-900/95 rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
          <button
            className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
            Contact Us
          </h3>
          <p className="mb-6 text-center text-gray-500 dark:text-gray-300">
            We'd love to hear from you. Send us a message!
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
              className="border dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              value={form.message}
              onChange={handleChange}
              className="border dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <Button
              type="submit"
              className="w-full h-12 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition animate-shimmer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {success && (
              <div className="text-green-600 dark:text-green-400 text-center">
                Message sent! We'll get back to you soon.
              </div>
            )}
            {error && (
              <div className="text-red-600 dark:text-red-400 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      </MotionEffect>
    </div>,
    document.body
  );
});

ContactUs.displayName = "ContactUs";
export default ContactUs;
