nginx 日志清空
进入 nginx/logs
truncate -s 0 xxx.log

安装MongoDB命令 : apt-get install mongodb

启动MongoDB命令:sudo service mongodb start。

关闭MongoDB命令:sudo service mongodb stop。

查看是否已经启动mongodb：pgrep mongo -l。

查看MongoDB的安装位置命名：locate mongo

查看配置文件信息，默认mongodb 配置文件存放在 /etc/mongodb.conf。

卸载MongoDB命令：sudo apt-get --purge remove mongodb mongodb-clients mongodb-server

docker network create -d bridge test-net
docker run --name mongo_db --network net_dev_bridge --restart=always -p 27017:27017 -itd mongo --auth
docker exec -it mongo_db bash

psftp 上传文件
    psftp
    open root@123.56.242.218 # 输入密码，连接服务器
    put xxx/xxxx  上传文件
    put -r xxx/xxxx  上传文件夹


# 容器启动后进入容器、进入mongo shell配置数据库用户、密码
# 启用认证
    mongod --auth
#进入shell
    mongo
    use admin   #切换admin数据库
    db.createUser({user:"admin",pwd:"admin",roles:["root"]})    #创建数据库管理员账号、密码
    db.auth("admin", "admin")   #数据库管理员账号、密码校验

## 宿主机连接容器内的mongodb失败解决办法
    需修改容器中mongodb的配置文件 /etc/mongod.conf
        将 bindIp: 127.0.0.1修改为 bindIp: 0.0.0.0
    保存、重启容器即可

