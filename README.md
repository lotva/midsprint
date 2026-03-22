[![Oxfmt](https://github.com/lotva/midsprint/actions/workflows/check-formatting.yaml/badge.svg)](https://github.com/lotva/midsprint/actions/workflows/check-formatting.yaml) [![Oxlint](https://github.com/lotva/midsprint/actions/workflows/check-scripts.yaml/badge.svg)](https://github.com/lotva/midsprint/actions/workflows/check-scripts.yaml) [![Stylelint](https://github.com/lotva/midsprint/actions/workflows/check-styles.yaml/badge.svg)](https://github.com/lotva/midsprint/actions/workflows/check-styles.yaml)

# Midsprint

Каталог фильмов. Основан на неофициальном АПИ Кинопоиска.

Превью: https://midsprint.vercel.app

<img width="1920" height="1080" alt="Главный экран приложения" src="https://github.com/user-attachments/assets/213f2827-8aa0-432f-b1d6-ccd3d631051e" />
<img width="1920" height="1080" alt="Интерфейс приложения. Страница фильма" src="https://github.com/user-attachments/assets/27ce06b6-65bb-4320-af2e-d0c5a68b8da7" />

## Команды для разработки

Запустить дев-сервер:

```bash
pnpm install
pnpm dev
```

Собрать и развернуть локально билд:

```bash
pnpm preview
```

Обновить зависимости:

```bash
pnpx npm-check-updates
pnpm install
```

## Файловая структура

**Архитектурная методология — FEOD.** Код поделён на директории `core`, `pages`, `modules` и `common`; директории поделены на сегменты `api`, `config`, `lib`, `ui`.

_[Документация FEOD](https://habr.com/ru/companies/sportmaster_lab/articles/972410/)_

## Стек

| Категория | Технологии                   |
| --------- | ---------------------------- |
| Фреймворк | TypeScript, React, Vike, MSW |
| Состояние | TanStack Query, Zustand      |
| Стили     | PostCSS, CSS Modules, UnoCSS |
| Тулинг    | Lefthook, Oxc, Commitlint    |

## Технологии

**Стейт.** Клиентское состояие хранится в Zustand, серверное состояние — в Tanstack Query и `+data`-хуках Vike.

**Кодогенерация.** Типы для работы с бэкендом генерируются из OpenAPI-схемы. См. `openapi-ts.config.ts` и `@/common/api/codegen`.

**SSR.** Работает серверный рендеринг с HTML-стримингом.

**Стили.** Используется PostCSS и UnoCSS. UnoCSS настроен в стиле Tailwind. Утилитарные стили применяются для простой вёрстки и задания внешнего позиционирования.

**Моки.** Чтобы не превысить лимит использования АПИ, на деве работает Mock Service Worker. Настроен на генерацию по OpenAPI-схеме. Есть возможность настроить моки с помощью _кассет_ — снапшотов реальных ответов АПИ. Для этого запишите в девтулах файл `.har` с историей запросов и добавьте в конфиг с помощью `fromTraffic`.

_[Тестируем вызовы API с помощью кассет](https://t.me/orgprog/366). Кирилл Мокевнин_
