# Backend Practice Folder

This repository is a collection of Medium-Advanced backend exercises and demos. Each task folder is self-contained with its own `package.json`, dependencies, and entry point.

## Contents

- `task1=AuthSystem/` - Authentication system with Express, EJS, MongoDB, cookies, and JWT.
- `task2=blogged/` - Blog application with users, posts, comments, uploads, and Redis-based pieces.
- `task3=shorturl/` - URL shortener built with Express, MongoDB, and short ID generation.
- `task4=rateLimitingWithoutRedis/` - Rate limiting example using in-memory logic.
- `task5=rateLimitingWithRedis/` - Rate limiting example backed by Redis.
- `task6=caching_using_redis/` - Redis caching demo.
- `task7=BULLMQ/` - BullMQ producer/worker example.
- `task8=emailSendWithoutBullMQ/` - Email sending flow without a queue.
- `task9=emailSendWithBullMQ/` - Email sending flow using BullMQ.
- `task10=websockets/` - WebSocket demo using Socket.IO.
- `task11=logging(winston)/` - Logging example using Winston.
- `task12=Security/` - Express security middleware demo using Helmet.
- `task13=Cloudinary/` - File upload and Cloudinary integration demo.

## General Setup

1. Open the folder for the task you want to run.
2. Install dependencies with `npm install`.
3. Start the app using the task's entry file, usually one of:
   - `node index.js`
   - `node app.js`
   - `node producer.js` / `node worker.js` for queue demos

Many folders also include `nodemon` for development, so you can use it if the entry file matches the task.

## Notes

- These folders are independent practice projects, not a single monorepo app.
- Some tasks require external services such as MongoDB, Redis, Cloudinary, or SMTP credentials.
- Check each folder's source files and `package.json` for the exact runtime entry point and environment variables.