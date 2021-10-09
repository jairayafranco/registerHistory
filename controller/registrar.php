<?php
	require_once("conectar.php");
    $conn = conectarDB();
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);  
	
	$name		= $dataObject-> name;
	$lastName	= $dataObject->lastName;
	$user 		= $dataObject->user;
	$password 	= $dataObject->password;
	$compañia 	= $dataObject->compañia;

	$sqlQuery = "INSERT IGNORE INTO `usuarios`(`usuario`,`clave`,  `nombres`, `apellidos`, `id_tipo_usuario`) 
				VALUES ('$user', MD5('$password'), '$name', '$lastName', '$compañia');";
	
	if ($conn->query($sqlQuery) === true) {
		echo json_encode(array('isOk'=>'true', 'msj'=>'Registro almacenado satisfactoriamente.'));
	} else {
		echo json_encode(array('isOk'=>'false','msj'=>$conn->error)); 
	}
	mysqli_close($conn);
?>