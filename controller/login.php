<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
require_once("conectar.php");
$mysqli = conectarDB();

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);       
  $mysqli->set_charset('utf8');
	    
	$user = $dataObject->usuario;
	$password =	$dataObject->clave;
    
  if ($newQuery = $mysqli->prepare("SELECT 
    s.nombres, s.clave, s.apellidos, s.usuario, s.id_tipo_usuario, s.id, c.descripcion, c.tipo_usuario
    FROM usuarios AS s
    LEFT JOIN companias AS c ON (s.id_tipo_usuario = c.tipo_usuario)
    WHERE s.usuario = ?;"
    )) {
        $newQuery->bind_param('s', $user);
        $newQuery->execute();
        $response = $newQuery->get_result();
        if ($response->num_rows == 1) {
            $data = $response->fetch_assoc();
             $encriptado_db = $data['clave'];
            //  if (password_verify($password, $encriptado_db)) {
              if (md5($password) == $encriptado_db) {
                $_SESSION['usuario'] = $data['usuario'];
                echo json_encode(array('conectado'=>true,'usuario'=>$data['usuario'], 'nombres'=>$data['nombres'],  'apellidos'=>$data['apellidos'], 'id'=>$data['id'], 'id_tipo_usuario'=>$data['id_tipo_usuario'], 'tipo_usuario'=>$data['tipo_usuario']  ) );
              } else {
                 echo json_encode(array('conectado'=>false, 'error' => 'La clave es incorrecta, vuelva a intentarlo.'));
              }
        } else {
          echo json_encode(array('conectado'=>false, 'error' => 'El usuario no existe.'));
        }
        $newQuery->close();
      } else {
        echo json_encode(array('conectado'=>false, 'error' => 'No se pudo conectar a BD'));
      }
  $mysqli->close();
?>
