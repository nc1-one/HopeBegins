# syntax=docker/dockerfile:1

# The image that is live now, to keep its built files (see below). Pass
# it as a build arg (PREVIOUS_IMAGE=user/hope-frontend:latest); without
# it nothing is kept.
ARG PREVIOUS_IMAGE=node:20-alpine
FROM ${PREVIOUS_IMAGE} AS previous

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# A page opened before this version went live still asks for the files of
# the version it came from, and breaks when they are gone. Keep the live
# version's files beside the new ones (new files win), and drop any older
# than 30 days.
RUN --mount=type=bind,from=previous,source=/,target=/previous \
    if [ -d /previous/app/.next/static ]; then \
      cp -Rpn /previous/app/.next/static/. .next/static/ && \
      find .next/static -type f -mtime +30 -delete; \
    fi

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
