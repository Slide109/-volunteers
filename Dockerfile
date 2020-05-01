FROM node:12

ENV PORT 3000

RUN apt-get update && \
    apt-get install -y yarn \
    curl \
    nano

# Create app directory
RUN mkdir -p /var/www/app
WORKDIR /var/www/app

# Installing dependencies
COPY package.json /var/www/app/
COPY yarn.lock /var/www/app/

RUN yarn

COPY . .

# Building app
RUN yarn build
EXPOSE 3000

# Running the app
CMD ["yarn", "start"]
