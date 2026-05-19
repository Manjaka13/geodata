FROM node:20-bookworm

WORKDIR /app

# Install build tools needed for sqlite3 native module
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first
COPY package*.json ./

# Clean install INSIDE container
RUN npm install

# Copy source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]