# Essentially, because ReactJS needs to be compiled,
# we have an opportunity to really optimise the built image.
# So, the "build" image is kinda bulky to make sure everything works.
# Then, we move the built "dist" folder of the compiled React app
# over to an even-slimmer Docker base image and use that to run the built app.

# Build Stage

# Fetching the minified node image on apline linux
FROM node:alpine AS build

# Setting up the work directory
WORKDIR /react-docker

# Install project dependencies
# This is strange one, right? Copy the package.json and package-lock.json
# and install dependencies... without our actual source code nearby!
# This helps our dependencies grab the versions that are more-likely to work in the "alpine" Linux base image.
# Some dependencies need different versions depending on the OS that they're being run on!
COPY package*.json ./
RUN npm install

# Then, with dependencies ready and installed, we can copy the app source code across the the build stage.
COPY . .

# Declaring env
ENV NODE_ENV=production

# Run the build command to create a compiled ReactJS app
# Since we're using Vite with default settings, this will end up in a "dist" folder.
RUN npm run build
 

# Production Stage

# Nginx is a HTTP web server system, really powerful stuff.
# Instead of using a Docker base image that is NodeJS + Nginx + their dependencies,
# we stay streamlined and optimised by just grabbing a base image that is Nginx + dependencies.
# This helps the Docker image that is pushed to the public or our deployment systems stay even skinnier.
FROM nginx:stable-alpine AS production

# Grab files from the build stage and copy them into Nginx's HTML directory
# Nginx will automatically serve up that directory as a static website!
COPY --from=build /react-docker/dist /usr/share/nginx/html

# Copy the env helper script into the docker pre-app scripts section.
# This helps the Docker image run the script before the app starts up.
COPY env.sh /docker-entrypoint.d/env.sh

RUN dos2unix /docker-entrypoint.d/env.sh 
RUN chmod +x /docker-entrypoint.d/env.sh

# If we use React Router and we're making a single-page application, we need to tell Nginx that
# every request that the frontend receives should return `/index.html`.
# If we dont', then Nginx will try to load new HTML files for each route of the React app!
COPY /nginx-spa.conf /etc/nginx/conf.d/default.conf

# Nginx will serve content on port 80.
# Because Docker lets us do port mapping, we just have to remember that port 80 is the desired _internal_ port.
# Our Docker Compose files or container configurations can still use whatever _host_ port we want, 
# as long as it maps to 80 as the internal port!
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]