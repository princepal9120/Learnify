import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "./brutal/BrutalButton";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="bg-white px-4 py-20 border-t-3 border-black">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-4xl md:text-5xl font-black leading-tight">
          Ready to Start Your <br className="hidden sm:block" />
          Learning Journey?
        </h2>
        <p className="mb-8 text-lg text-gray-600 font-medium max-w-2xl mx-auto">
          Join millions of learners and start exploring our carefully curated courses today!
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BrutalButton
            onClick={() => navigate("/course/search?query")}
            size="lg"
            className="inline-flex items-center gap-3"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </BrutalButton>
        </motion.div>
      </motion.div>
    </section>
  );
}