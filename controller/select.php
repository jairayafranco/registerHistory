<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$sql= "SELECT * FROM `usuarios` ORDER BY id ASC ";
require_once("conectar.php");
function desconectar($conexion){
    $close = mysqli_close($conexion);
        if($close){
            echo '';
        }else{
            echo 'Ha sucedido un error inexperado en la conexión de la base de datos';
        }

    return $close;
}

function obtenerArreglo($sql){
  $conexion = conectarDB();

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    if(!$resultado = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa

    $arreglo = array();

    $i=0;
    while($row = mysqli_fetch_assoc($resultado)) {
        $arreglo[$i] = $row;
        $i++;
    }

    desconectar($conexion);
    return $arreglo;
}

    $r = obtenerArreglo($sql);
    echo json_encode($r);
?>