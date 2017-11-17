<!-- 这里通过goods中传过来的颜色，尺码获取到guidID对应的一条数据 -->

<?php

    // 引入其他php文件
    include 'connect.php';

    // 接口 获取商品详细信息
    $color = isset($_GET['color']) ? $_GET['color'] : null;
    $size = isset($_GET['size']) ? $_GET['size'] : null;

    
    // 连接成功之后编写sql语句
    $sql = "select * from cart where color='$color' and size='$size'";

    // 执行sql语句
    // query():得到一个查询结果集
    $result = $conn->query($sql);

    // 得到之后要释放查询结果集，避免资源浪费
    // $result->close();

    // // 关闭数据库，避免资源浪费
    // $conn->close();

    // 使用查询结果集
    // $row = $result->fetch_all(MYSQLI_ASSOC);
    // 只有一条数据用fetch_row
    $row = $result->fetch_row();
    
    // var_dump($row);

    // 把数组转换成json字符串
    $res = json_encode($row,JSON_UNESCAPED_UNICODE);
    // var_dump( $res)
    echo "$res";
?>