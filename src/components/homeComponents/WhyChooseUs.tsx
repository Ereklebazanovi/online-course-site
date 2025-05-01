
const WhyChooseUs = () => {
  return (
    <div>
        <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Learn at Your Own Pace",
                desc: "Access courses anytime, anywhere.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0
                        00-7 7h14a7 7 0
                        00-7-7z"
                    />
                  </svg>
                ),
                title: "Expert Instructors",
                desc: "Learn from industry leaders.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0
                        002-2v-6a2 2 0
                        00-2-2H6a2 2 0
                        00-2 2v6a2 2 0
                        002 2zm10-10V7a4 4 0
                        00-8 0v4h8z"
                    />
                  </svg>
                ),
                title: "Lifetime Access",
                desc: "Enroll once, access forever.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7
                        4h12a3 3 0
                        003-3V8a3 3 0
                        00-3-3H6a3 3 0
                        00-3 3v8a3 3 0
                        003 3z"
                    />
                  </svg>
                ),
                title: "Secure Payments",
                desc: "Safe and reliable transactions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyChooseUs
