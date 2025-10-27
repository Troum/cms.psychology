# Коллекция Links с Lucide Icons

## Описание

Коллекция `Links` позволяет управлять ссылками на социальные сети и другие внешние ресурсы с возможностью выбора иконок из библиотеки Lucide Icons.

## Возможности

- **Выбор иконок**: Визуальный выбор из 50+ популярных иконок социальных сетей
- **Поиск**: Быстрый поиск нужной иконки
- **Валидация URL**: Автоматическая проверка корректности ссылок
- **Сортировка**: Управление порядком отображения через поле `order`
- **Активация/деактивация**: Возможность временно скрыть ссылки

## Поля коллекции

- **title** (обязательное) - Название ссылки
- **url** (обязательное) - URL адрес, email или телефон с валидацией
  - Поддерживаемые форматы:
    - `https://example.com` - обычные веб-ссылки
    - `mailto:email@example.com` - email адреса
    - `tel:+1234567890` - телефонные номера
- **icon** (обязательное) - Выбор иконки через визуальный интерфейс
- **description** - Описание (отображается в title при наведении)
- **isActive** - Активна ли ссылка (по умолчанию true)
- **order** - Порядок сортировки (меньшие числа отображаются первыми)

## Использование в админ-панели

1. Перейдите в раздел "Ссылки" (Links)
2. Создайте новую ссылку
3. Заполните название и URL/email/телефон:
   - Для веб-сайта: `https://example.com`
   - Для email: `mailto:info@example.com`
   - Для телефона: `tel:+1234567890`
4. Выберите иконку из визуального списка или используйте поиск
5. При необходимости добавьте описание и настройте порядок сортировки

## Использование на фронтенде

### Получение данных через API

```typescript
// Получить все активные ссылки через Payload REST API
const response = await fetch('/api/links?where[isActive][equals]=true&sort=order')
const data = await response.json()
// data.docs содержит массив ссылок
```

**Примечание:** Payload CMS автоматически создает REST API endpoints для всех коллекций:
- `GET /api/links` - получить все ссылки
- `GET /api/links/:id` - получить одну ссылку  
- `POST /api/links` - создать ссылку (требует авторизации)
- `PATCH /api/links/:id` - обновить ссылку (требует авторизации)
- `DELETE /api/links/:id` - удалить ссылку (требует авторизации)

### Использование компонента SocialLinks

```tsx
import { SocialLinks } from '@/components/SocialLinks'

// В вашем компоненте
const MyComponent = async () => {
  const response = await fetch('/api/links')
  const { docs: links } = await response.json()

  return (
    <div>
      <SocialLinks 
        links={links}
        iconSize={24}
        showTitle={false}
        className="my-social-links"
      />
    </div>
  )
}
```

### Пример стилей

```css
.social-links {
  display: flex;
  gap: 16px;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  color: inherit;
  text-decoration: none;
}

.social-link:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}
```

## Доступные иконки

Компонент включает 50+ популярных иконок, включая:

- **Социальные сети**: Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok
- **Мессенджеры**: WhatsApp, Telegram, Discord, Slack
- **Профессиональные**: GitHub, GitLab, Dribbble, Figma
- **Общие**: Mail, Phone, Globe, Link, и многие другие

Полный список иконок можно найти на [lucide.dev](https://lucide.dev/icons/)

## Кастомизация

### Добавление новых иконок

Откройте файл `src/components/IconPicker.tsx` и добавьте название иконки в массив `socialIcons`:

```typescript
const socialIcons = [
  'Facebook',
  'Twitter',
  // ... существующие иконки
  'YourNewIcon', // Добавьте здесь
]
```

### Изменение стиля компонента IconPicker

Все стили находятся в inline-стилях компонента `IconPicker.tsx` и могут быть легко изменены.

## API Endpoints (автоматические от Payload CMS)

Payload CMS автоматически создает REST API endpoints для коллекции `links`:

- **GET** `/api/links` - получить все ссылки
- **GET** `/api/links/:id` - получить одну ссылку по ID
- **POST** `/api/links` - создать новую ссылку (требует авторизации)
- **PATCH** `/api/links/:id` - обновить ссылку (требует авторизации)
- **DELETE** `/api/links/:id` - удалить ссылку (требует авторизации)

### Примеры запросов

**Получить все активные ссылки:**
```bash
GET /api/links?where[isActive][equals]=true&sort=order
```

**Пример ответа:**
```json
{
  "docs": [
    {
      "id": 1,
      "title": "Facebook",
      "url": "https://facebook.com/mypage",
      "icon": "Facebook",
      "description": "Наша страница в Facebook",
      "isActive": true,
      "order": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Email",
      "url": "mailto:info@example.com",
      "icon": "Mail",
      "description": "Напишите нам",
      "isActive": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 3,
      "title": "Телефон",
      "url": "tel:+1234567890",
      "icon": "Phone",
      "description": "Позвоните нам",
      "isActive": true,
      "order": 2,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalDocs": 3,
  "limit": 10,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

### Особенности работы с разными типами ссылок

- **Веб-ссылки** (`https://...`) - открываются в новой вкладке
- **Email** (`mailto:...`) - открывают почтовый клиент
- **Телефон** (`tel:...`) - инициируют звонок на мобильных устройствах

Компонент `SocialLinks` автоматически определяет тип ссылки и применяет правильное поведение.

