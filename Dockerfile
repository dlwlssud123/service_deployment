FROM nginx:alpine

# Copy web content
COPY . /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create certs directory and copy certificates
# Note: User must fill cert.pem and key.pem before building
RUN mkdir -p /etc/nginx/certs
COPY cert.pem /etc/nginx/certs/cert.pem
COPY key.pem /etc/nginx/certs/key.pem

# Expose both HTTP (redirect) and HTTPS
EXPOSE 80
EXPOSE 443