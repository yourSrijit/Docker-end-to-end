# Docker In One Shot - Part 1
---
## Creating Container 
`docker run -it <Image_Name>`
it check is ubuntu is locally presrnt or not. if not it will pull from hub.docker

## What is image and container
- Docker Image
Definition: A Docker image is a read-only template that contains the instructions for creating a Docker container. It includes everything needed to run an application, including the code, runtime, libraries, environment variables, and configuration files.

Creation: Images are typically built from a Dockerfile, which is a text file that contains a series of commands and instructions to assemble the image. For example, a Dockerfile might specify a base image (like an Ubuntu or Alpine Linux image), install necessary packages, and set up the application environment.

Immutability: Once an image is created, it does not change. If you need a new version, you create a new image. Images can be shared and distributed via Docker registries, such as Docker Hub.

- Docker Container
Definition: A Docker container is a runtime instance of a Docker image. It is a lightweight, standalone, and executable package that runs the application and its dependencies. Containers are isolated from each other and from the host system, but they share the OS kernel with other containers.

Lifecycle: Containers are created from images and can be started, stopped, moved, and deleted. When a container is started, it uses the image as a blueprint and creates a writable layer on top of the image's read-only layers.

Persistence: Changes made inside a running container do not affect the original image. However, you can commit changes from a container to create a new image, which can then be used to launch new containers with those changes.

## Port Mapping
Port mapping in Docker is a feature that allows you to expose and map ports on a Docker container to ports on the Docker host. This is essential for making services running inside containers accessible from outside the container, such as from your local machine or other networked devices.
When a container runs a service that listens on a specific port (like a web server running on port 80), this port is isolated inside the container. Port mapping allows you to map this internal port to a port on the Docker host, so you can access the service from outside the container.

`docker run -p <host_port>:<container_port> <image_name>`

You can map multiple ports by specifying multiple -p options also add env value using -e
```
docker run -p 8080:80 -p 443:443 my-web-server

Adding environment variables
docker run -p 8080:80 -p 443:443 -e key1=value1 key2=value2 my-web-server
```

## Dockerization of NodeJS Application

- 1.Create a server
- 2.Create a Dockerfile
```
        FROM ubuntu

        RUN apt-get update
        RUN apt-get install -y curl
        RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
        RUN apt-get upgrade -y
        RUN apt-get install -y nodejs

        COPY package.json package.json
        COPY package-lock.json package-lock.json
        COPY server.js server.js

        RUN npm install

        ENTRYPOINT [ "node", "server.js" ]
```
- 3. Run this command to build the image
    `docker build -t my-node-server . `
    ```
    this will generate a image in docker
- 4. Run that server from cmd  
    ```
    docker run -it my-node-server
    docker run -it -p 4000:4000 my-node-server
    ```   

 ## Publish yout image on Docker Hub   
 - 1. Create a repo on Docker hub
 - 2. Build a image locally with the same name as repo
    `docker build -t yoursrijit/my-node-server .`
 - 3. After creating the image login in docker locally and push the image into hub.docker
        ```
        docker login
        docker push yoursrijit/my-node-server
        ```   