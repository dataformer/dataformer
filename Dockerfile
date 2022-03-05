FROM node:17.6-bullseye AS build
RUN mkdir ./frontend
WORKDIR /app/frontend
ENV PATH /app/frontend/node_modules/.bin:$PATH
COPY ./frontend/package.json ./
COPY ./frontend/src ./src
COPY ./frontend/public ./public
RUN npm install
RUN npm run build

FROM python:3.9-bullseye
WORKDIR /app
COPY --from=build /app/frontend/build ./build

RUN mkdir ./api
WORKDIR /app/api
COPY ./requirements.txt .
RUN pip install --upgrade pip \
  && pip install -r ./requirements.txt \
  && apt-get update \
  && apt-get -y install make libcap-dev \
  && git clone https://github.com/ioi/isolate.git \
  && cd isolate \
  && make isolate \
  && make install
COPY . .

EXPOSE 8000
ENTRYPOINT [ "gunicorn", "app:app", "--bind", "0.0.0.0:8000"]