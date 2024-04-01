# Docker_Basics
This repository is just for learning the basics of Docker and its terminology

### Docker Introduction
- Overview: Docker is a platform that allows you to develop, ship, and run applications in containers.
- Command: 
  - To check Docker version
```bash docker version ```
  - To get detailed Docker system information
```bash docker info ```

### Problem Statement
Discusses the problems Docker solves such as dependency management, environment consistency, and deployment issues.

### Docker Containers
- Containers are lightweight, portable, and self-sufficient units that package the application and its dependencies.
- Command: 
  - To list running containers
``` bash docker container ls ```
  - To stop a running container
``` bash docker container stop <container_id> ```

### Docker Installation and Setup
- Download MacOS Docker Desktop : 
  [Click here !](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*re3fd*_ga*MTQ5MzIzODEyLjE3MDgyOTA4ODA.*_ga_XJWPQMJYHQ*MTcxMTI0NDQyNS4zLjEuMTcxMTI0NDQyNS42MC4wLjA)

### Docker CLI Introduction
The Docker CLI (Command Line Interface) is used to interact with Docker and manage containers, images, volumes, networks, and other Docker components. It provides a set of commands for building, running, and managing Docker containers and images.


### Docker Images vs Containers
Docker images are read-only templates used to create Docker containers. Images contain the application code, runtime, libraries, dependencies, and other files needed to run the application. Containers are instances of Docker images that run as isolated processes on the host system.
### Port Mapping
Port mapping allows you to expose ports from a Docker container to the host system, enabling communication between the containerized application and external services. This is essential for accessing web servers, databases, and other networked services running inside Docker containers.
- Commands : 
  - To map the docker port to the local machine port
  
    ```docker run -it -p <localport>:<containerport> <image name> ```
### Envrioment Variables
Environment variables are key-value pairs used to configure and customize Docker containers at runtime. They allow you to pass configuration settings, credentials, and other dynamic values to containerized applications without modifying the underlying code or configuration files.

- Commands :
  - To pass the environment variable
    ```docker run -it -e key=value -e key=value <image name> ```

### Containerize Nodejs Server with Docker
```bash 
FROM ubuntu
```
This line specifies the base image for the Docker container. In this case, it's using the official Ubuntu image as the base.
Dockerfile
```bash 
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
```

These lines are used to install dependencies and set up the environment within the Docker container.
- RUN apt-get update: Updates the package index of the Ubuntu image.
- RUN apt-get install -y curl: Installs the curl tool, which is used to transfer data from or to a server.
- RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -: Downloads and executes the script to add the Node.js repository to the package sources.
- RUN apt-get upgrade -y: Upgrades the installed packages to the latest versions.
- RUN apt-get install -y nodejs: Installs Node.js from the added repository.

```bash 
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY main.js main.js
```
These lines copy files from the host machine (the machine where Docker is running) into the Docker container.
- COPY package.json package.json: Copies the package.json file from the host to the container.
- COPY package-lock.json package-lock.json: Copies the package-lock.json file from the host to the container.
- COPY [main.js](./docker-nodejs/main.js) main.js: Copies the main.js file from the host to the container.

```bash 
RUN npm install
```
This line runs the npm install command inside the container, which installs the dependencies listed in the package.json file.

```bash 
ENTRYPOINT [ "node", "main.js" ]
```
This line specifies the default command to run when the container starts.
- ENTRYPOINT: Sets the command and parameters to be executed when the container starts.

### Publishing Custom Images to hub.docker.com
1. Login to [Docker](hub.docker.com)
2. Create a hub repository
3. Now create the image with the same name as repository.
4. Use the below command locally to push newly created image to hub.docker.com
   ```bash 
    docker push <image-name or Repository name>
    ```
### Docker Compose
- Firstly create [config file](./docker-compose/docker-compose.yml) akin docker compose file.
- This would hold all the services which that image would be running inside itself.
- Command to run : 
  ``` bash 
  docker compose up -d
  ```
  Note: '-d' stands for detached mode which would run in background.
- Command to delete :
  ``` bash 
  docker compose down
  ```
NOTE: In Linus and MacOs use ```sudo``` to run this command.

### Docker Networks
Container networking refers to the ability for containers to connect to and communicate with each other, or to non-Docker workloads.

```bash
docker network create -d bridge my-net
docker run --network=my-net -itd --name=container3 busybox
```
| Driver | Description |
| ------ | ----------- |
| bridge | The default network driver. |
| host   | Removes network isolation between the container and the Docker host. |
| none   | Completely isolates a container from the host and other containers. |

### Volume Mounting
Volumes are the preferred mechanism for persisting data generated by and used by Docker containers. While bind mounts are dependent on the directory structure and OS of the host machine, volumes are completely managed by Docker.

- Command to mount local directory to container :
```bash 
docker run -it -v <local path>:<container path> <iamge name>
```
- Even if you destroy the container the data created locally would not be deleted.

In general, --mount is more explicit and verbose. The biggest difference is that the -v syntax combines all the options together in one field, while the --mount syntax separates them. Here is a comparison of the syntax for each flag.
```bash 
 docker run -d \
  --name devtest \
  --mount source=myvol2,target=/app \
  nginx:latest
```