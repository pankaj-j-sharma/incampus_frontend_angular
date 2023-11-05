# Builder container to compile typescript
FROM node:16 AS build-stage

RUN mkdir -p /app
WORKDIR /app

# Copy the application source
COPY ./ /app/

# Install dependencies
COPY package.json /app

# COPY package-lock.json /app
RUN npm install

# Generate the build of the application
RUN npm run build -- --output-path=./dist/out

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
