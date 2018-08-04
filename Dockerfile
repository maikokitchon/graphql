# Base image
FROM node:7-alpine

# Copy all packages
COPY \
  ./build/package-lock.json \
  ./build/package.json \
  ./build/.babelrc \
  /app/

# Copy source-code
COPY ./build/index.js /app/index.js

# Run npm install
RUN cd /app && npm install

# Work directory
WORKDIR /app

CMD npm run dev
