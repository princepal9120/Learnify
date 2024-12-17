import { BookOpen, Code, Cloud, TrendingUp, Briefcase, Rocket } from 'lucide-react'

const categories = [
  { name: "Data Science", icon: TrendingUp },
  { name: "Web Development", icon: Code },
  { name: "Cloud Computing", icon: Cloud },
  { name: "Programming", icon: BookOpen },
  { name: "Business", icon: Briefcase },
  { name: "Personal Development", icon: Rocket },
]

export default function Categories() {
  return (
    <section className="bg-white px-4 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Browse Top Categories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ name, icon: Icon }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
      <div className="flex flex-col items-center p-6">
        <Icon className="mb-4 h-12 w-12 text-blue-500" />
        <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
      </div>
    </div>
  )}

