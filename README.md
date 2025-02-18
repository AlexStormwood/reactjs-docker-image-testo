# reactjs-docker-image-testo

Quick test of how to put an ReactJS app into a Docker image for use in Docker containers.

This Docker image is available on this repository's GitHub Packages page, [here](https://github.com/AlexStormwood/reactjs-docker-image-testo/pkgs/container/reactjs-docker-image-testo).

## Usage

This project automatically builds itself into Docker images upon every push to the repo.

So, you can make your own Docker Compose file to download that Docker image and use it in a service.

You can map whatever port you like to it, as long as it maps to an internal port of 80.

Here's an example:

```yml
name: Full-stack Dockerized
services:
  backend:
    image: ghcr.io/alexstormwood/expressjs-docker-image-testo:latest
    container_name: expressjstesto
    ports:
      - 5050:5000
    restart: unless-stopped
  frontend:
    image: ghcr.io/alexstormwood/reactjs-docker-image-testo:latest
	container_name: reactjstesto
	ports:
	  - 5000:80
	env:
	  - VITE_BACKEND_CONTAINER_NAME:expressjstesto
	  - VITE_BACKEND_CONTAINER_PORT:5050
	restart: unless-stopped
```

You may note that in the ReactJS app, it makes a fetch request to an API. It is intended to make a request to a container named `expressjstesto`, running in the same Docker app. Docker automatically allows services within the same app to communicate with each other, via the container name and mapped port. So, JavaScript code like this:

```js
targetUrl = `http://${import.meta.env.VITE_BACKEND_CONTAINER_NAME}:${import.meta.env.VITE_BACKEND_CONTAINER_PORT}/`;
```

Expects a container with environment variables as shown above. This lets the `targetUrl` string value become:

```
http://expressjstesto:5050/
```