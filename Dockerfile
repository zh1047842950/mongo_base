FROM zsf10838438/node_env:v4
RUN mkdir /workspace/mongo_base -p
COPY . /workspace/mongo_base
WORKDIR /workspace/mongo_base
RUN source /etc/profile \
&& npm --version \
&& pm2 --version \
&& npm install --unsafe-perm \
&& pm2 start npm --watch --name mongo_base -- run start
