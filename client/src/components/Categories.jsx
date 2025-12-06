import { BookOpen, Code, Cloud, TrendingUp, Briefcase, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import BrutalCard from './brutal/BrutalCard'
import BrutalBadge from './brutal/BrutalBadge'

const categories = [
  { name: "Data Science", icon: TrendingUp },
  { name: "Web Development", icon: Code },
  { name: "Cloud Computing", icon: Cloud },
  { name: "Programming", icon: BookOpen },
  { name: "Business", icon: Briefcase },
  { name: "Personal Development", icon: Rocket },
]

export default function Categories() {
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
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Browse Categories</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse range of courses across multiple disciplines
          </p>
        </div>
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <CategoryCard {...category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CategoryCard({ name, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <BrutalCard className="border-3 p-6 text-center h-full flex flex-col items-center justify-center">
        <div className="p-4 bg-gray-100 border-2 border-black rounded-lg mb-4">
          <Icon className="w-8 h-8 text-black" />
        </div>
        <h3 className="font-black text-base">{name}</h3>
      </BrutalCard>
    </motion.div>
  )
}

