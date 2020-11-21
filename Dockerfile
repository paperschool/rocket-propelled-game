FROM node:12-slim as base

WORKDIR /home/node/app

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install iproute2 -y
RUN apt-get install iputils-ping -y

RUN chown -Rh node:node /home/node/app
USER node

FROM base as devDependencies

COPY --chown=node ./package.json .
COPY --chown=node ./yarn.lock .

RUN yarn --frozen-lockfile

FROM devDependencies as productionBuild 

COPY --chown=node ./app ./app
COPY --chown=node ./build ./build
COPY --chown=node ./.babelrc .
COPY --chown=node ./tsconfig.json .
COPY --chown=node ./tslint.json .

RUN yarn build:prod

FROM devDependencies AS productionDependencies

RUN yarn --frozen-lockfile --production

FROM base AS production

COPY --chown=node --from=productionDependencies /home/node/app//node_modules ./node_modules
COPY --chown=node --from=productionBuild /home/node/app/bin ./bin
COPY --chown=node ./package.json .
COPY --chown=node ./.env-prod .

RUN chmod +x ./bin/server/server.bundle.js

ARG CLIENT_SPOTIFY_CLIENT_ID
ARG CLIENT_BUILD_VERSION
ARG SERVER_CLIENT_ID
ARG SERVER_CLIENT_SECRET

ENV CLIENT_SPOTIFY_CLIENT_ID=$CLIENT_SPOTIFY_CLIENT_ID
ENV CLIENT_BUILD_VERSION=$CLIENT_BUILD_VERSION
ENV SERVER_CLIENT_ID=$SERVER_CLIENT_ID
ENV SERVER_CLIENT_SECRET=$SERVER_CLIENT_SECRET

ENTRYPOINT [ "node" ]
CMD ["-r","dotenv/config","/home/node/app/bin/server/server.bundle.js","dotenv_config_path=.env-prod"]