import { useNavigate } from "react-router-dom";

export default function CTA() {
    const navigate= useNavigate();
    return (
      <section className="bg-blue-600 px-4 py-16 text-white dark:bg-blue-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Start Your Learning Journey?</h2>
          <p className="mb-8 text-lg">Join millions of learners and start exploring our courses today!</p>
          <button onClick={()=> navigate(`/course/search?query`)}  className="rounded-md bg-white px-6 py-3 text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-500 dark:hover:bg-gray-700">
            Get Started 
          </button>
        </div>
      </section>
    )
  }