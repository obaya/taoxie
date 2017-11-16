
<!-- 这里获取到mysql中所有的数据 -->

<?php



    // 引入其他php文件
    include 'connect.php'; 


    // 获取前端传递过来的参数
    $pageNo=isset($_GET['pageNo'])?$_GET['pageNo']:1;
    $qty=isset($_GET['qty'])?$_GET['qty']:10;

    
    // 连接成功之后编写sql语句
    $sql = "select * from goodslist";

    // 执行sql语句
    // query():得到一个查询结果集
    $result = $conn->query($sql);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);

    $res=array(
        'data'=>array_slice($row,($pageNo-1)*$qty,$qty),
        'total'=>count($row)//数组总数量
            );

    // 把数组转换成json字符串
    
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>