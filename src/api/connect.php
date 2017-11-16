<?php
    // 将需要获取数据库中信息的部分综合在这里
    // 配置参数
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'taoxie';

    
    // 连接数据库：用户名密码主机
    // $conn = new mysqli($servername,$username,$password,$database);
    $conn = new mysqli($servername,$username,$password,$database);

    // 检测是否连接成功
    if($conn->connect_error){
        die('连接失败'.$conn->connect_error);
    }

    // 避免乱码：设置编码
    $conn->set_charset('utf8');
    
    
?>