FROM node:20-slim

# Install git for source control tools inside the container
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /workspace

# Expose Vite dev server port
EXPOSE 5173

# Run the dev server on 0.0.0.0 so the host machine can access it
CMD ["sh", "-c", "npm install && npm run dev -- --host"]
