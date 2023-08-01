FROM node:lts-alpine as dependency
RUN npm install -g pnpm
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm i

FROM node:lts-alpine as builder
RUN npm install -g pnpm
WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .
RUN pnpm next telemetry disable
RUN pnpm lint
RUN pnpm dlx prisma generate
RUN pnpm build

FROM node:lts-alpine as running
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start"]
