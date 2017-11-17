<?php
    include 'connect.php';
    
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    // 密码md5加密
    $password = md5($password);

    $sql = "select * from user where username='$username' and password='$password'";


    // 获取查询结果
    $result = $conn->query($sql);

    $res = $result->num_rows;

  

    if($res>0){
        // 释放查询内存(销毁)
        $result->free();

        echo 'ok';
    }else{
        // 释放查询内存(销毁)
        $result->free();

        echo 'fail';
    }
    

    

    //关闭连接
    $conn->close();
?>