
<!-- 这里获取到mysql中所有的数据 -->

<?php

    // 引入其他php文件
    include 'connect.php'; 



    
    // 连接成功之后编写sql语句
    $sql = "select * from goodslist";

    // 执行sql语句
    // query():得到一个查询结果集
    $result = $conn->query($sql);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);

    // 把数组转换成json字符串
    $res = json_encode($row,JSON_UNESCAPED_UNICODE);
    echo($res);
?>