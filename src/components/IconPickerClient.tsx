'use client'

import React, { useState } from 'react'
import { useField } from '@payloadcms/ui'
import * as Icons from 'lucide-react'

// Список популярных иконок социальных сетей
const socialIcons = [
  'Facebook',
  'Twitter',
  'Instagram',
  'Linkedin',
  'Youtube',
  'Github',
  'Mail',
  'Phone',
  'Globe',
  'MessageCircle',
  'Send',
  'Share2',
  'Link',
  'ExternalLink',
  'AtSign',
  'Hash',
  'Twitch',
  'Slack',
  'Discord',
  'Figma',
  'Dribbble',
  'Chrome',
  'Smartphone',
  'Tablet',
  'Monitor',
  'Wifi',
  'Radio',
  'Rss',
  'Podcast',
  'Music',
  'Video',
  'Camera',
  'Image',
  'FileText',
  'BookOpen',
  'Newspaper',
  'MessageSquare',
  'MessagesSquare',
  'Users',
  'User',
  'UserPlus',
  'Heart',
  'Star',
  'Bookmark',
  'ThumbsUp',
  'TrendingUp',
  'Award',
  'Gift',
  'ShoppingCart',
  'CreditCard',
  'DollarSign',
]

export const IconPickerClient: React.FC<any> = (props) => {
  const { path } = props
  const { value, setValue } = useField<string>({ path })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = socialIcons.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>
    if (!IconComponent) return null
    return <IconComponent size={24} />
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '600',
          fontSize: '14px',
        }}
      >
        Иконка
      </label>

      <input
        type="text"
        placeholder="Поиск иконки..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          marginBottom: '12px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />

      {value && (
        <div
          style={{
            padding: '12px',
            marginBottom: '12px',
            border: '2px solid #0070f3',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#f0f7ff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>{renderIcon(value)}</div>
          <span style={{ fontWeight: '500' }}>{value}</span>
          <button
            type="button"
            onClick={() => setValue('')}
            style={{
              marginLeft: 'auto',
              padding: '4px 12px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#ff4444',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Очистить
          </button>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '8px',
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '8px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#fafafa',
        }}
      >
        {filteredIcons.map((iconName) => (
          <button
            key={iconName}
            type="button"
            onClick={() => setValue(iconName)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 8px',
              border: value === iconName ? '2px solid #0070f3' : '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: value === iconName ? '#f0f7ff' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '10px',
              gap: '4px',
            }}
            onMouseEnter={(e) => {
              if (value !== iconName) {
                e.currentTarget.style.borderColor = '#0070f3'
                e.currentTarget.style.backgroundColor = '#f9f9f9'
              }
            }}
            onMouseLeave={(e) => {
              if (value !== iconName) {
                e.currentTarget.style.borderColor = '#e0e0e0'
                e.currentTarget.style.backgroundColor = 'white'
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {renderIcon(iconName)}
            </div>
            <span style={{ textAlign: 'center', wordBreak: 'break-word', lineHeight: '1.2' }}>
              {iconName}
            </span>
          </button>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
            fontSize: '14px',
          }}
        >
          Иконки не найдены
        </div>
      )}
    </div>
  )
}
