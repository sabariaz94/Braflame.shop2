// /sanity/lib/getHeroSlides.ts

import { client } from './client'; // Adjust the path if needed

export async function getHeroSlides() {
  const query = `*[_type == "heroSlide"]{
    title,
    caption,
    mediaType,
    mediaUrl,
    "thumbnail": thumbnail.asset->url,
    buttonText,
    buttonLink
  }`;

  try {
    const slides = await client.fetch(query);
    return slides;
  } catch (err) {
    console.error('Failed to fetch hero slides:', err);
    return [];
  }
}
