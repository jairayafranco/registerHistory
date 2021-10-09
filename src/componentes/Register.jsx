import React, { useState } from 'react'; 
import { useHistory } from "react-router-dom";

const URL_LOGIN_DOS = "http://localhost/e-commerce/controller/registrar.php";
  
function Register() {  

    const [error, setError] = useState(null);
    const history = useHistory();

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

    const [name, setName] = useState("");  
    const [lastName, setLastName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [compañia, setCompañia] = useState("");

    const submitCallback = async e => {
        e.preventDefault();
        const dataa = {
            "name": `${name}`,
            "lastName": `${lastName}`,
            "user": `${user}`,
            "password": `${password}`,
            "compañia": `${compañia}`
        } 
        const respuestaJson = await enviarData( URL_LOGIN_DOS, dataa );
        setError( respuestaJson.msj );
        history.push({pathname: '/', state: dataa});
    }
  
    return (
        <div className="login">
            <div className="row">
                <div className="col-sm-6 offset-3 mt-5">
                    <div className="card pt-5">
                        <div className="card-header text-center">
                            <h2>®️ Registrarse</h2>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">
                                📚
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombres"
                                    aria-label="Username"
                                    aria-describedby="basic-addon3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon4">
                                📚
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellidos"
                                    aria-label="lastName"
                                    aria-describedby="basic-addon4"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    📧
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Usuario"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text">🔣</label>
                                <select className="form-select" id="basic-addon5" value={compañia} 
                                onChange={(e) => setCompañia(e.target.value)}>
                                    <option value="DEFAULT">Seleccione compañia ...</option>
                                    <option value={1}>Administradores</option>
                                    <option value={2}>Desarrolladores</option>
                                    <option value={3}>Diseñadores</option>
                                </select>
                            </div>

                            {
                                error && 
                                <div className="alert alert-success">
                                    {error}
                                </div>
                            }

                            <button className="btn btn-info" onClick={submitCallback}>guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}  
  
export default Register;