import React, { useEffect, useRef, useState } from 'react';
import '../css/login.css';
import { useHistory } from "react-router-dom";

const URL = "http://localhost/e-commerce/controller/login.php";

const enviarData = async ( url, data ) => {
const  resp =  await fetch ( url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    const json = await resp.json();

    return json;
}

export default function Login() {

    const [error, setError] = useState(false);
    const [espera, setEspera] = useState(false);

    const [conectado, setConnectado] = useState(false);
    const history = useHistory();

    useEffect(() => {
    if (conectado) {  
        history.push('/menu');
    }
    }, [conectado]);

    const acceder = (estado) => {
        setConnectado(estado);
    }

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin = async () => {

        setEspera(true);
        const data = {
            "usuario": refUsuario.current.value,
            "clave": refClave.current.value
        }

        const respuestaJson = await enviarData( URL, data );
        acceder( respuestaJson.conectado );
        setError( respuestaJson.error );
        setEspera(false);
    }

    const register = () => {
        history.push('/register');
    }

    return (
        <div className="login">
            <div className="row">
                <div className="col-sm-6 offset-3 mt-5">
                    <div className="card pt-5">
                        <div className="card-header text-center">
                            <h2>👤 Iniciar</h2>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    📧
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="correo"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={refUsuario}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">
                                    🔒
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="contraseña"
                                    aria-label="clave"
                                    aria-describedby="basic-addon2"
                                    ref={refClave}
                                />
                            </div>

                            {
                                error && 
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            }

                            <button onClick={handleLogin} 
                            disabled = { espera }
                            className="btn btn-info">Logearse</button>
                            <button onClick={register} 
                            className="btn">Register</button>


                            <div className="card-footer">
                                <span>¿Olvidó su contraseña?</span> <a href="http://">Recuperar</a> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}