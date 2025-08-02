'use client';

const testimonials = [
  {
    name: "Aarushi K.",
    quote: "I’ve never felt this confident and comfortable at the same time. Brabliss is my new go-to!",
  },
  {
    name: "Meera S.",
    quote: "Their quality and fit are unmatched. I finally found bras that actually fit me right!",
  },
  {
    name: "Naina R.",
    quote: "From packaging to product, everything feels premium. Totally recommend!",
  },
];

export default function TestimonialsModern() {
  return (
    <section className="bg-[#fff0f5] dark:bg-gray-900 py-16 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-12 text-gray-900 dark:text-white">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <p className="text-base sm:text-lg italic text-gray-700 dark:text-gray-200 mb-4">
              “{t.quote}”
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              — {t.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
