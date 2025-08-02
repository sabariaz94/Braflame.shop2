'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CategoryHighlight({ categories }) {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl md:text-5xl font-light text-center mb-12">
        Explore by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.link}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={300}
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-4 text-lg text-center font-medium group-hover:underline">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
