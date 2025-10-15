# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Копиране на package files
COPY package*.json ./
RUN npm ci --only=production

# Копиране на изходния код и build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Копиране на build файловете
COPY --from=build /app/build /usr/share/nginx/html

# Копиране на nginx конфигурация
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]