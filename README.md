# Dataformer
Dataformer makes text processing simple through an interactive graphical user interface.

## Setting up
Dataformer currently uses [poetry](https://python-poetry.org/) ([install instructions](https://python-poetry.org/docs/master/#installing-with-the-official-installer)) for Python packaging and dependency management and [npm](https://www.npmjs.com/package/node) for managing the frontend. After installing these tools (and their dependencies), run

```
poetry install
cd frontend
npm install
```

in the repository root to setup the project. Poetry automatically sets up a virtual environment for Python, which can be activated by running

```
poetry shell
```

## Adding dependencies
New Python dependencies can be added by running

```
poetry add <dependency>
poetry export -f requirements.txt --output requirements.txt
```

The second step exports the standard requirements.txt file, which can be used to setup the project in environments not supporting poetry.

New node dependencies can be added in a standard way by running

```
npm install <dependency>
```

## Running the app
You can either run the server and the frontend separately (probably most convenient for development) or together using a Docker container. In order to run the server, make sure that the virtual environment for the project is activated (i.e. run `poetry shell` if needed) and run

```
flask run
```

in the repository root. The server handles the API requests and is also set up to serve the latest built version of the React app (located in `/frontend/build` after running `npm run build` in `/frontend`). However, the build of the app will not refresh dynamically when making changes, so it might be more convenient to run

```
npm start
```

in `/frontend` in order to start the frontend development server.

If you want to run the application in a Docker container, you can run

```
docker build -t dataformer .
docker run -p 8000:8000 dataformer
```

in the repository root. This will build and start the application on `localhost:8000`.

## Formatting
You can format the Python code using [black](https://github.com/psf/black) by running

```
black .
```