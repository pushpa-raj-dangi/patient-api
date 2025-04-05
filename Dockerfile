# Use Node.js LTS base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

RUN npm install -g nodemon


# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
