import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { generateSlug } from '@/hooks/generateSlug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: {
      en: 'Post',
      ru: 'Статья',
    },
    plural: {
      en: 'Posts',
      ru: 'Статьи',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      index: true,
      required: true,
      label: {
        en: 'Title',
        ru: 'Заголовок',
      },
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      index: false,
      required: true,
      label: {
        en: 'Content',
        ru: 'Контент',
      },
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        hidden: true,
      },
      hooks: {
        beforeValidate: [generateSlug],
      },
    },
  ],
  endpoints: [
    {
      path: '/',
      method: 'get',
      handler: async (req) => {
        const payload = req.payload
        // @ts-ignore
        const url = new URL(req.url)
        const locale = url.searchParams.get('locale') || 'ru'

        const result = await payload.find({
          collection: 'posts',
          pagination: false,
          depth: 0,
          locale: locale as 'ru' | 'en',
          select: {
            title: true,
            slug: true,
            createdAt: true
          },
        })

        return Response.json(result.docs, { status: 200 })
      },
    },
    {
      path: '/:slug',
      method: 'get',
      handler: async (req) => {
        // @ts-ignore
        const { slug } = req.routeParams
        const payload = req.payload
        // @ts-ignore
        const url = new URL(req.url)
        const locale = url.searchParams.get('locale') || 'ru'

        const result = await payload.find({
          collection: 'posts',
          locale: locale as 'ru' | 'en',
          where: { slug: { equals: slug } },
          limit: 1,
        })

        if (!result.docs.length) {
          return Response.json({ message: 'Post not found' }, { status: 404 })
        }

        return Response.json(result.docs[0], { status: 200 })
      },
    },
  ],
}
