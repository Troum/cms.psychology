import type { CollectionConfig } from 'payload'
import { IconPickerField } from '@/components/IconPickerField'

export const Links: CollectionConfig = {
  slug: 'links',
  labels: {
    singular: {
      en: 'Link',
      ru: 'Ссылка',
    },
    plural: {
      en: 'Links',
      ru: 'Ссылки',
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'url', 'icon', 'isActive'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      index: true,
      required: true,
      label: {
        en: 'Title',
        ru: 'Название',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: {
        en: 'URL / Email / Phone',
        ru: 'Ссылка / Email / Телефон',
      },
      admin: {
        placeholder: {
          en: 'https://example.com, mailto:email@example.com, tel:+1234567890',
          ru: 'https://example.com, mailto:email@example.com, tel:+1234567890',
        },
      },
      // @ts-ignore
      validate: (value: string) => {
        if (!value) return true

        // Проверка на mailto:
        if (value.startsWith('mailto:')) {
          const email = value.replace('mailto:', '')
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (emailRegex.test(email)) {
            return true
          }
          return 'Введите корректный email (например: mailto:name@example.com)'
        }

        // Проверка на tel:
        if (value.startsWith('tel:')) {
          const phone = value.replace('tel:', '')
          if (phone.length > 0) {
            return true
          }
          return 'Введите корректный телефон (например: tel:+1234567890)'
        }

        // Проверка на обычный URL
        try {
          new URL(value)
          return true
        } catch {
          return 'Введите корректный URL (например: https://example.com, mailto:email@example.com, tel:+1234567890)'
        }
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: {
        en: 'Icon',
        ru: 'Иконка',
      },
      admin: {
        components: {
          // @ts-ignore
          Field: IconPickerField,
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        en: 'Description',
        ru: 'Описание',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Active',
        ru: 'Активна',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: {
        en: 'Order',
        ru: 'Порядок сортировки',
      },
      admin: {
        description: {
          en: 'Lower numbers appear first',
          ru: 'Меньшие числа отображаются первыми',
        },
      },
    },
  ],
  endpoints: [
    {
      path: '/',
      method: 'get',
      handler: async (req) => {
        const payload = req.payload

        const result = await payload.find({
          collection: 'links',
          pagination: false,
        })

        return Response.json(result.docs, { status: 200 })
      },
    },
  ],
}
