# Timesheet Front

- [Установка](#Установка)
- [Запуск](#Запуск)
- [Сборка](#Сборка)
- [Разработка](#Разработка)
- [Docker](#Docker)

- Должна быть установлена
  [NodeJS](https://www.digitalocean.com/community/tutorials/node-js-ubuntu-18-04-ru#Установка-при-помощи-nvm)

## Установка

- Установка пакетов
  ```shell
  npm ci
  ```

## Запуск

- Запуск в dev-сервера (будет доступен по адресу http://localhost:3000/)
  ```shell
  npm run dev
  ```

## Сборка

- Сборка
  ```shell
  npm run build
  ```
- Экспорт статики
  ```shell
  npm run export
  ```

## Разработка

- Структура папок [Feature-Sliced Design](https://feature-sliced.design/)
  ```
  ├ pages/         # Точки входа Next.js;
  ├ public/        # Публичная папка;
  │ └ local/api/   # Локальные данные приложения
  └ src/           # Исходные коды;
    ├ app/         #   Инициализирующая логика приложения
    ├ entities/    #   Бизнес-сущности, которыми оперирует предметная область
    │ ├ <entity>/  #     Бизнес-сущность
    │ │ ├ lib/     #       Инфраструктурная логика (utils/helpers)
    │ │ ├ model/   #       Бизнес-логика (store, actions, effects, reducers, ...)
    │ │ └ ui/      #       UI-логика (components, ui-widgets, ...)
    │ └ ...        #
    ├ features/    #   Обрабатываемые пользовательские сценарии
    │ ├ <feature>/ #     Пользовательский сценарий
    │ │ ├ lib/     #       Инфраструктурная логика (utils/helpers)
    │ │ ├ model/   #       Бизнес-логика (store, actions, effects, reducers, ...)
    │ │ └ ui/      #       UI-логика (components, ui-widgets, ...)
    │ └ ...        #
    ├ pages/       #   Страницы приложения
    │ ├ <page>/    #     Страница
    │ │ ├ lib/     #       Инфраструктурная логика (utils/helpers)
    │ │ ├ model/   #       Бизнес-логика (store, actions, effects, reducers, ...)
    │ │ └ ui/      #       UI-логика (components, ui-widgets, ...)
    │ └ ...        #
    ├ shared/      #   Переиспользуемые модули, без привязки к бизнес-логике
    │ ├ api/       #     Логика запросов к API (api instances, requests, ...)
    │ ├ config/    #     Конфигурация (проекта / слайса)
    │ ├ lib/       #     Инфраструктурная логика (utils/helpers)
    │ └ ui/        #     UI-логика (components, ui-widgets, ...)
    └ widgets/     #   Самостоятельные и полноценные блоки для страниц
      ├ <widget>/  #     Блок
      │ ├ lib/     #       Инфраструктурная логика (utils/helpers)
      │ ├ model/   #       Бизнес-логика (store, actions, effects, reducers, ...)
      │ └ ui/      #       UI-логика (components, ui-widgets, ...)
      └ ...
  ```

## Docker

- Локальная разработка
  ```shell
  docker-compose up --build
  ```
- с использованием `BUILDKIT`
  ```shell
  COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build
  ```
- `docker-compose.yaml`
  ```yaml
  services:
    timesheet:
      build:
        context: .
        dockerfile: Dockerfile.dev
      container_name: timesheet
      environment:
        ORG_ID: ""    # переменная передается в контейнер при старте и записывается в config.json
        CLIENT_ID: "" # переменная передается в контейнер при старте и записывается в config.json
      networks:
        - timesheet-net
      ports:
        - 3000:3000
      restart: always
      tty: true
      stdin_open: true
      volumes:
        - ./:/app # монтируется каталог с приложением внутрь контейнера. Изменения файла config.json перечитывается на лету
  
  networks:
    timesheet-net:
      driver: bridge
  ```
- Сборка и запуск контейнера
  ```shell
  docker build -t timesheet .
  
  # При запуске необходимо передать переменные CLIENT_ID и ORG_ID. Иначе контейнер не запустится
  # Для изменения значений указанных переменных необходимо перезапустить docker run и указать новые значения -e CLIENT_ID=...
  docker run -ti -e CLIENT_ID=XXX -e ORG_ID=XXX -p 3000:3000 timesheet
  ```
