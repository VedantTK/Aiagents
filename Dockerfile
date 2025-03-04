# Use official Nginx image as the base
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy your website files to the Nginx html directory
COPY index.html .
COPY styles.css .
COPY script.js .

# Expose port 80 for web access
EXPOSE 80

# Start Nginx server (default command from base image)
CMD ["nginx", "-g", "daemon off;"]
