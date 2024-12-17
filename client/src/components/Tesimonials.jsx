import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    content: "The courses on this platform have been instrumental in advancing my career in data science. The quality of instruction is unparalleled.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    content: "I've tried many online learning platforms, but this one stands out for its comprehensive curriculum and hands-on projects.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    content: "The business courses here have given me valuable insights and skills that I apply daily in my role as a product manager.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gray-50 px-4 py-16 dark:bg-gray-800">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          What Our Students Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ name, role, content, avatar }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
      <div className="p-6">
        <p className="mb-4 text-gray-600 dark:text-gray-300">{content}</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}