import type { FieldHook } from 'payload'
import { useTransliterate } from '@/composables/useTransliterate'

// @ts-ignore
export const generateSlug: FieldHook<any, string> = async ({ data, value, req, collection }) => {
  if (value) return value
  if (!data?.title) return

  const slugBase = useTransliterate(data.title)
  let slug = slugBase
  let count = 1

  const payload = req?.payload
  if (payload && collection?.slug) {
    while (true) {
      const existing = await payload.find({
        collection: collection.slug,
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) break
      count++
      slug = `${slugBase}-${count}`
    }
  }

  return slug
}
