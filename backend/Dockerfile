# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the backend runs on
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]