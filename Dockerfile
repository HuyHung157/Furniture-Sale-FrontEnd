# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:alpine as build

# Set the working directory
WORKDIR /app

# install and cache app dependencies
COPY . .
RUN npm install
RUN npm run build --prod


# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/furniture-sale /usr/share/nginx/html

# Expose port 80
EXPOSE 80