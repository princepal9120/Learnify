import { BookOpen, Users, Globe } from 'lucide-react'

export default function Stats() {
  return (
    <section className="bg-white px-4 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={BookOpen} value="100,000+" label="Courses" />
          <StatCard icon={Users} value="50 million+" label="Students" />
          <StatCard icon={Globe} value="100+" label="Countries" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
      <div className="flex items-center p-6">
        <Icon className="h-8 w-8 text-blue-500 mr-4" />
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  )
}