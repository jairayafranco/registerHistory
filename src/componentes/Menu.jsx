import React, {useState} from 'react';
import '../App.css';
import '../css/booststrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function Menu() {

  const storedData = [
    { id: 1, nombre: "Jefferson", compania: 241, state: "Activo" },
    { id: 2, nombre: "Andres", compania: 225, state: "En proceso" },
    { id: 3, nombre: "Rincon", compania: 216, state: "Finalizado" }
  ];

  const [data, setData] = useState(storedData);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [dataSeleccionado, setDataSeleccionado] = useState({
    id: '',
    nombre: '',
    compania: '',
    state: ''
  });

  const selectData = (elemento, caso) => {
    setDataSeleccionado(elemento);
    (caso==='Editar') ? setModalEditar(true) : setModalEliminar(true);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setDataSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = () => {
    var dataNueva = data;
    dataNueva.map(data=>{
      if(data.id === dataSeleccionado.id){
        data.nombre = dataSeleccionado.nombre;
        data.compania = dataSeleccionado.compania;
        data.state = dataSeleccionado.state;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(data=>data.id !== dataSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setDataSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar = () => {
    var valorInsertar = dataSeleccionado;
    valorInsertar.id = data[data.length-1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Historial Usuario</h2>
      <br/>
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Compañia</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.compania}</td>
              <td><select className="form-select">
                    <option value="DEFAULT">Seleccione compañia ...</option>
                    <option value={elemento.state} selected>{elemento.state}</option>
                </select>
              </td>
              <td><button className="btn btn-primary" onClick={()=>selectData (elemento, 'Editar')}>Editar</button>
              <button className="btn btn-danger" onClick={()=>selectData (elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
          <h3>Editar Datos</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={dataSeleccionado && dataSeleccionado.id}
            />
            <br/>

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={dataSeleccionado && dataSeleccionado.nombre}
              onChange={handleChange}
            />
            <br/>

            <label>Compañia</label>
            <input
              className="form-control"
              type="text"
              name="compania"
              value={dataSeleccionado && dataSeleccionado.compania}
              onChange={handleChange}
            />
            <br/>
            <label>Estado</label>
            <select className="form-select">
              <option value="DEFAULT">Seleccione compañia ...</option>
              <option value="Activo">Activo</option>
              <option value="En proceso">En proceso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar este datos {dataSeleccionado && dataSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Data</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br/>

            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={dataSeleccionado ? dataSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br/>

            <label>Compañia</label>
            <input
              className="form-control"
              type="text"
              name="compania"
              value={dataSeleccionado ? dataSeleccionado.compania: ''}
              onChange={handleChange}
            />
            <br/>

            <label>Estado</label>
            <select className="form-select">
              <option value={dataSeleccionado ? dataSeleccionado.state: ''}>Seleccione compañia ...</option>
              <option value={dataSeleccionado ? dataSeleccionado.state: ''}>Activo</option>
              <option value={dataSeleccionado ? dataSeleccionado.state: ''}>En proceso</option>
              <option value={dataSeleccionado ? dataSeleccionado.state: ''}>Finalizado</option>
            </select>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Menu;