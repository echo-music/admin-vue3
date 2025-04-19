
FROM node:18.17.0  as  builder

WORKDIR /app
COPY package.json .
RUN npm config set registry https://registry.npmmirror.com/ \
&& npm install 


COPY . .

RUN npm install -g vite@5.2.11 && vite build --mode test

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/

