# news-explorer-api
## Актуальная версия v0.0.4

# [https://api.explorenews.tk/](https://api.explorenews.tk/)
# [http://api.explorenews.tk/](http://api.explorenews.tk/)

### POST /signup - регистрация нового пользователя - в ответ придет объект пользователя

### POST /signin - авторизация формат: ```{ "email": "hello@gmail.com", "password": "12345678" }``` в ответ придет cookie s jwt

### GET /users/me -возвращает информацию о пользователе (email и имя)

### GET /articles - возвращает все сохранённые пользователем статьи

### POST /articles - создаёт статью с переданными в теле (keyword, title, text, date, source, link и image)

### DELETE /articles/articleId - удаляет сохранённую статью  по _id

## Технологии:

- Node.js,
- Express.js.
- MongoDB,
- Mongoose (Object Data Modeling (ODM) library for MongoDB and Node.js),
- Helmet, 
- Express-rate-limit, 
- Celebrate,
- Winston

## Инструкции по установке, настройке и запуску

1. Для клонирования используйте ```git clone https://github.com/leannalight/news-explorer-api```
2. Используйте ```npm install``` для переустановки пакетов.
3. ```git pull origin level-1``` - добавить изменения на облако
4. ```pm2 restart app```- перезагрузить pm2, чтобы изменения вступили в силу
5. Команда ```npm run start``` запускает сервер на локальном хосте: 3000;
6. Команда ```npm run dev``` запускает сервер на локальном хосте: 3000 с горячей перезагрузкой;
7. Приложение Node.js подключается к серверу Mongo по адресу ```mongodb: // localhost: 27017 / mestodb;```
