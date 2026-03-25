FROM nginx:alpine

# Copy web content
COPY . /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Certs will be provided via volume mount for security and automation
RUN mkdir -p /etc/nginx/certs

# Expose both HTTP (redirect) and HTTPS
EXPOSE 80
EXPOSE 443