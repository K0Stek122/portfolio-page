FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:20-alpine
RUN npm i -g serve
COPY --from=builder /app/dist /app/dist
EXPOSE 25568
CMD ["serve", "-s", "/app/dist", "-l", "25568"]
