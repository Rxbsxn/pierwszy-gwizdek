FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NODE_ENV=production
ENV STRAPI_TELEMETRY_DISABLED=true
COPY cms/package*.json ./
RUN npm ci --include=dev
COPY cms/ .
RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV STRAPI_TELEMETRY_DISABLED=true
COPY --from=build /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]
