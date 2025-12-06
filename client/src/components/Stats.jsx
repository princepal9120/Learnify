import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import BrutalCard from './brutal/BrutalCard';

export default function Stats() {
  const stats = [
    { icon: BookOpen, value: '500+', label: 'Courses', color: 'secondary' },
    { icon: Users, value: '10K+', label: 'Active Students', color: 'primary' },
    { icon: Award, value: '4.9★', label: 'Avg Rating', color: 'accent' },
    { icon: TrendingUp, value: '95%', label: 'Completion Rate', color: 'success' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">By The Numbers</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join a thriving community of learners and educators
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, label, color }) {
  const colorMap = {
    primary: 'border-black bg-white',
    secondary: 'border-secondary bg-white',
    accent: 'border-accent bg-accent/10',
    success: 'border-success bg-success/10',
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.2 }}
    >
      <BrutalCard className={`p-8 border-3 ${colorMap[color]} text-center group cursor-pointer`}>
        <div className="mb-4 flex justify-center">
          <div className="p-4 bg-gray-100 border-2 border-black rounded-lg group-hover:bg-gray-200 transition-colors">
            <Icon className="w-8 h-8 text-black" />
          </div>
        </div>
        <h3 className="text-4xl font-black mb-2">{value}</h3>
        <p className="text-gray-600 font-bold text-sm uppercase tracking-wider">{label}</p>
      </BrutalCard>
    </motion.div>
  );
}