import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: {
    en: 'About',
    ru: 'Обо мне',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: {
        en: 'Hero image',
        ru: 'Фото (hero)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      localized: true,
      label: {
        en: 'Title',
        ru: 'Заголовок',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: false,
      localized: true,
      label: {
        en: 'Subtitle (supports HTML)',
        ru: 'Подзаголовок (можно HTML)',
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
      label: {
        en: 'Text blocks',
        ru: 'Текстовые блоки',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
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
    {
      name: 'seoTitle',
      type: 'text',
      required: false,
      localized: true,
      label: {
        en: 'SEO title',
        ru: 'SEO title',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      required: false,
      localized: true,
      label: {
        en: 'SEO description',
        ru: 'SEO description',
      },
    },
  ],
}


