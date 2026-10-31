# syntax=docker/dockerfile:1

# The image that is live now (the one the deploy workflow pushes), to keep
# its built files (see below). Build with PREVIOUS_IMAGE=node:20-alpine to
# keep nothing.
ARG PREVIOUS_IMAGE=rpascualiii/hope-frontend:latest
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
# version's files from the last 30 days beside the new ones (new files
# win). File by file: busybox cp -n skips folders that already exist.
RUN --mount=type=bind,from=previous,source=/,target=/previous \
    kept=0; \
    if [ -d /previous/app/.next/static ]; then \
      cd /previous/app/.next/static && \
      for f in $(find . -type f -mtime -31); do \
        if [ ! -e "/app/.next/static/$f" ]; then \
          mkdir -p "/app/.next/static/${f%/*}" && \
          cp -p "$f" "/app/.next/static/$f" && kept=$((kept + 1)); \
        fi; \
      done; \
    fi; \
    echo "Kept $kept built files from the live version"

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
