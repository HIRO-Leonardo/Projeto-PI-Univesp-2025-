# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend (if using a build step, e.g., React/Vue/Angular)
RUN npm run build

# Expose the port the app runs on (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]