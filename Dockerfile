FROM node:16 AS base
FROM base AS deps

WORKDIR /deps

COPY package*.json ./

RUN npm ci

FROM base AS build

ENV NEXT_TELEMETRY_DISABLES 1
ENV NODE_ENV=production

WORKDIR /build

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update \
	&& apt-get install --no-install-recommends --no-install-suggests -y \
	jq \
	&& apt-get remove --purge --auto-remove -y && rm -rf /var/lib/apt/lists/* /etc/apt/sources.list.d/*

COPY --from=build /build/next.config.js ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json ./package.json
COPY --from=build /build/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]
