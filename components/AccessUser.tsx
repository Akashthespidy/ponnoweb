import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { Button } from "@/components/ui/button";

const categories = ["Retail", "Restaurant", "E-commerce", "Services", "Other"];

export type AccessUserHandle = {
  open: () => void;
  close: () => void;
};

const AccessUser = forwardRef<AccessUserHandle>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    businessName: "",
    businessCategory: "",
    businessDescription: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/access-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSuccess(true);
      setForm({
        email: "",
        businessName: "",
        businessCategory: "",
        businessDescription: "",
      });
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
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
          <button
            className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
            Get Early Access
          </h3>
          <p className="mb-6 text-center text-gray-500 dark:text-gray-300">
            Tell us about your business to join the waitlist.
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
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              required
              value={form.businessName}
              onChange={handleChange}
              className="border dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <select
              name="businessCategory"
              required
              value={form.businessCategory}
              onChange={handleChange}
              className="border dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              name="businessDescription"
              placeholder="Describe your business"
              required
              value={form.businessDescription}
              onChange={handleChange}
              className="border dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <Button
              type="submit"
              className="w-full h-12 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition animate-shimmer"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {success && (
              <div className="text-green-600 dark:text-green-400 text-center">
                Thank you! We’ll be in touch soon.
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

AccessUser.displayName = "AccessUser";
export default AccessUser;
