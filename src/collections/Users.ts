import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  labels: {
    singular: {
      en: 'User',
      ru: 'Пользователь',
    },
    plural: {
      en: 'Users',
      ru: 'Пользователи',
    }
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      index: false,
      required: true,
      label: {
        en: 'First Name',
        ru: 'Имя'
      }
    },
    {
      name: 'lastName',
      type: 'text',
      index: false,
      required: true,
      label: {
        en: 'Last Name',
        ru: 'Фамилия'
      }
    },
  ],
}
