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
      name: 'about',
      type: 'group',
      label: {
        en: 'About page content',
        ru: 'Контент страницы "Обо мне"',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'about',
        description: {
          en: 'These fields are used by the Nuxt /about page layout.',
          ru: 'Эти поля используются Nuxt-страницей /about (верстка остаётся как сейчас).',
        },
      },
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: {
            en: 'Hero photo',
            ru: 'Фото (hero)',
          },
        },
        {
          name: 'heroImageCaption',
          type: 'text',
          required: false,
          localized: true,
          label: {
            en: 'Photo caption',
            ru: 'Подпись к фото',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          required: false,
          localized: true,
          label: {
            en: 'Tagline',
            ru: 'Короткая подпись (tagline)',
          },
        },
        {
          name: 'sections',
          type: 'array',
          required: false,
          localized: true,
          label: {
            en: 'Text sections',
            ru: 'Текстовые блоки',
          },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              label: {
                en: 'Text',
                ru: 'Текст',
              },
            },
          ],
        },
        {
          name: 'ctaTitle',
          type: 'text',
          required: false,
          localized: true,
          label: {
            en: 'CTA title',
            ru: 'CTA заголовок',
          },
        },
        {
          name: 'ctaSubtitle',
          type: 'textarea',
          required: false,
          localized: true,
          label: {
            en: 'CTA subtitle',
            ru: 'CTA текст',
          },
        },
        {
          name: 'ctaButton',
          type: 'text',
          required: false,
          localized: true,
          label: {
            en: 'CTA button text',
            ru: 'CTA текст кнопки',
          },
        },
      ],
    },
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
      index: true,
      required: true,
      label: {
        en: 'Slug',
        ru: 'Слаг (URL)',
      },
      admin: {
        position: 'sidebar',
        description: {
          en: 'URL path, e.g. "about". If empty, it will be generated from the title.',
          ru: 'Часть URL, например "about". Если оставить пустым, сгенерируется из заголовка.',
        },
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
          depth: 1,
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
