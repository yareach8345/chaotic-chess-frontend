FROM node:22.14.0

WORKDIR /app

COPY .output .output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]