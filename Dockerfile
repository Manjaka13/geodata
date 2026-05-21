FROM node:20-bookworm

WORKDIR /app

# install build deps
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    build-essential \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# FORCE clean install (no prebuilt binaries reused)
RUN npm cache clean --force
RUN npm install --build-from-source

COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
