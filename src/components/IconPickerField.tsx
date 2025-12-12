'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { TextFieldClientComponent } from 'payload'

// Динамический импорт компонента только на клиенте
const IconPickerClient = dynamic(
  () => import('./IconPickerClient').then((mod) => ({ default: mod.IconPickerClient })),
  {
    ssr: false,
    loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>,
  },
)

export const IconPickerField: TextFieldClientComponent = (props) => {
  return <IconPickerClient {...props} />
}


