###База данных:
```
sudo apt-get install mongo

```
Создать пользователя (я делал из robomongo -robo3t)
Залить бд (здесь - все экспортированные бд mongo)
```
sudo mongorestore [--database dbName] --drop /dbpath

```
Здесь drop - указание на источник

## Установка и запуск
1. Устанавливаем зависимости
```
npm instal
```
2. Запускаем серверную часть
```
npm run nodemon
```
3. Запускаем webpack-dev-server, который будет отдавать клиентские js, css и другие ресурсы
```
npm run webpack-devserver
```
Приложение будет доступно по адресу http://localhost:3001
*Внимание:* для корректной работы необходимо, чтобы nodemon и webpack-dev-server были запущены одновременно!

