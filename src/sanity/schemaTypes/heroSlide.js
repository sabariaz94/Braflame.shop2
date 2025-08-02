// /sanity/schemas/heroSlide.js

export default {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'caption', type: 'string', title: 'Caption' },
    {
      name: 'mediaType',
      type: 'string',
      title: 'Media Type',
      options: {
        list: ['image', 'mp4', 'youtube', 'vimeo']
      }
    },
    {
      name: 'mediaUrl',
      type: 'url',
      title: 'Media URL'
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail Image'
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Button Text'
    },
    {
      name: 'buttonLink',
      type: 'url',
      title: 'Button Link'
    }
  ]
};
