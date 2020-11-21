#!/bin/sh

docker login -u $DOCKER_USER -p $DOCKER_PASS

IMAGE_NAME=$APP_NAME

if [ "$TRAVIS_BRANCH" = "master" ]; then
    TAG="latest"
elif [ "$TRAVIS_BRANCH" != "master" ]; then
    TAG="$TRAVIS_BRANCH"
else
    TAG="latest"
fi

echo "Building Docker Image"
docker build \
    --build-arg CLIENT_SPOTIFY_CLIENT_ID=$CLIENT_SPOTIFY_CLIENT_ID \
    --build-arg SERVER_CLIENT_ID=$SERVER_CLIENT_ID \
    --build-arg SERVER_CLIENT_SECRET=$SERVER_CLIENT_SECRET \
    --build-arg CLIENT_BUILD_VERSION=$TRAVIS_BUILD_ID \
    -f Dockerfile -t $IMAGE_NAME .

echo "Tagging Docker Image"
docker tag $IMAGE_NAME $DOCKER_USER/$IMAGE_NAME

echo "Pushing Docker Image"
docker push $DOCKER_USER/$IMAGE_NAME