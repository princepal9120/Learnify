import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { motion } from 'framer-motion'
import BrutalCard from './brutal/BrutalCard'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    content: "The courses on this platform have been instrumental in advancing my career in data science. The quality of instruction is unparalleled.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    content: "I've tried many online learning platforms, but this one stands out for its comprehensive curriculum and hands-on projects.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    content: "The business courses here have given me valuable insights and skills that I apply daily in my role as a product manager.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 4,
  },
]

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">What Our Students Say</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from real learners on their journey with Learnify
          </p>
        </div>
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ name, role, content, avatar, rating }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <BrutalCard className="border-3 p-6 h-full flex flex-col">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-accent text-accent' : 'text-gray-300'
                }`}
            />
          ))}
        </div>
        <p className="text-gray-600 font-medium mb-6 flex-1">{content}</p>
        <div className="border-t-2 border-black pt-4 flex items-center gap-4">
          <Avatar className="w-10 h-10 border-2 border-black">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="font-bold">{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-black text-sm">{name}</p>
            <p className="text-xs text-gray-600 font-medium">{role}</p>
          </div>
        </div>
      </BrutalCard>
    </motion.div>
  )
}