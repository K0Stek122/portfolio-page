FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine
RUN npm i -g serve
COPY --from=builder /app/dist /app/dist
EXPOSE 25568
CMD ["serve", "/app/dist", "-l", "25568"]
