FROM node 
WORKDIR app
COPY package.json package.json
RUN npm install
# move node mudules from app folder to global location 
RUN mv /app/node_modules /node_modules 
# COPY . . 
RUN ls
EXPOSE 5001
CMD ["node", "src/index.js"] 