<?php
    include 'connect.php';

    // 接收前端数据
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';

    // 查询用户名是否存在
    $sql = "select username from user where username='$username'";

    // 获取查询结果
    $result = $conn->query($sql);

    // 判断用户名有没有
    if($result->num_rows>0){
        // 释放查询内存(销毁)
        $result->free();

        //说明用户名已经存在
        echo "fail";
    // 如果用户名不存在，并且传递过来的密码不为空则写入数据库
    }else if($password != ''){
        // 释放查询内存(销毁)
        $result->free();

        // 将密码加密
        $password = md5($password);//echo "$password";
        

        // 没有就将该用户名写入数据库
        $sql = "insert into user(username,password,email) values('$username','$password','$email')";
        $result = $conn->query($sql);

        // 判断写入是否成功
        if($result){
            echo "ok";
        }else{
            echo "Error: " . $sql . "<br>" . $conn->error;

        }

        // 关闭连接
        $conn->close();
    echo '777';
    }

?>