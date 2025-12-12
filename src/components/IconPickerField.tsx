'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { TextFieldClientComponent } from 'payload'

// Динамический импорт компонента только на клиенте
const IconPickerClient = dynamic(
  () => import('./IconPickerClient').then((mod) => ({ default: mod.IconPickerClient })),
  {
    ssr: false,
    // Важно: не рендерить текстовый "loading" на первом рендере,
    // иначе в production возможен mismatch гидрации (React error #418).
    loading: () => null,
  },
)

export const IconPickerField: TextFieldClientComponent = (props) => {
  // Гарантируем, что серверный HTML и первый клиентский рендер совпадают (оба null),
  // а уже после mount подгружаем динамический компонент.
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <IconPickerClient {...props} />
}


