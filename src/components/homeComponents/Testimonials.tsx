
const Testimonials = () => {
  return (
    <div>
       <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <blockquote
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <p className="italic text-gray-700 mb-4">
                  “This course transformed my skills! The instructors are amazing.”
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://via.placeholder.com/50?text=User+${idx + 1}`}
                    alt={`Student ${idx + 1}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      Student {idx + 1}
                    </h4>
                    <p className="text-gray-500">Course Taken</p>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
