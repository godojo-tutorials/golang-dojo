import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        // Custom fields for article meta
        author: z.string().optional(),
        authorName: z.string().optional(),
        updatedAt: z.string().optional(),
        readingTime: z.number().optional(),
      }),
    }),
  }),
};
