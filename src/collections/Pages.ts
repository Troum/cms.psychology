import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// @ts-ignore
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: {
      en: 'Page',
      ru: 'Страница',
    },
    plural: {
      en: 'Pages',
      ru: 'Страницы',
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
      name: 'subTitle',
      type: 'text',
      index: true,
      required: false,
      label: {
        en: 'Sub Title',
        ru: 'Подзаголовок',
      },
      localized: true,
    },
    {
      name: 'menuTitle',
      type: 'text',
      index: false,
      required: false,
      label: {
        en: 'Menu Title',
        ru: 'Для главного меню',
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
          collection: 'pages',
          pagination: false,
          depth: 0,
          locale: locale as 'ru' | 'en',
          select: {
            menuTitle: true,
            slug: true,
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
          collection: 'pages',
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
