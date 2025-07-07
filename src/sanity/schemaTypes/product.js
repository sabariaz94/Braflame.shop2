// studio/schemas/product.js

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: ['S', 'M', 'L', 'XL', 'XXL'],
      },
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
  ],
};
