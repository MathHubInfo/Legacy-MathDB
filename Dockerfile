FROM node as builder

# Add sources into /app/
WORKDIR /app/
ADD cmoDb /app/cmoDb
ADD package.json /app/package.json
ADD public /app/public
ADD src /app/src
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

# Install dependencies and run build
RUN yarn && yarn build

# And add data to to a static file server
FROM pierrezemb/gostatic
EXPOSE 8043
COPY --from=builder /app/build /srv/http