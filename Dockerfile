#Stage 1
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json .
COPY pnpm*.lock .
RUN pnpm install
COPY . .
RUN pnpm build

#Stage 2
FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]