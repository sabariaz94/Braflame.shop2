'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LifestyleBanner({ image, text, ctaText, link, reverse }) {
  return (
    <section className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center py-16 px-6 gap-8`}>
      <div className="w-full md:w-1/2">
        <Image
          src={image}
          alt="Lifestyle"
          width={800}
          height={600}
          className="rounded-2xl object-cover w-full h-auto"
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-light mb-6">{text}</h2>
        <Link href={link}>
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all">
            {ctaText}
          </button>
        </Link>
      </div>
    </section>
  );
}
