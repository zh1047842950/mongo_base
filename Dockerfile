FROM registry.cn-hangzhou.aliyuncs.com/dev_image_list/node_env:v4
RUN mkdir /workspace/mongo_base -p
COPY . /workspace/mongo_base
WORKDIR /workspace/mongo_base
EXPOSE 9001
RUN source /etc/profile \
&& npm --version \
&& pm2 --version \
&& npm install --unsafe-perm \
&& pm2 start src/app.js --name mongo_base
