import Sabina from '../img/ha-sabina.jpeg';
import moment from 'moment';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ModifySide = () => {
    return <>
        <div className="col-xl-6">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center bg-white rounded">ACADEMIA MOZART</h1>
                    <div className="card rounded">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h3>Información profesional</h3> 
                            </div>
                        </div>
                        <form className="card-body">
                            <div>
                                <h5>Añade una descripción profesional</h5>
                                <textarea name="descripcion" className="dato form-control" rows="4" cols="50" placeholder="Introduce descripción"></textarea>
                            </div>
                            <div className='mt-3'>
                                <h5>Experiencia previa</h5>
                                <textarea name="descripcion" className="dato form-control" rows="4" cols="50" placeholder="Introduce tu experiencia aquí"></textarea>
                            </div>
                            <div className='mt-3'>
                                <h5>Especialidad</h5>
                                <input type="text" className="dato form-control" placeholder="Introduce nuevo"></input>
                            </div>
                            <div className='mt-3'>
                                <h5>Método de contacto</h5>
                                <input type="text" className="dato form-control" placeholder="Introduce nuevo"></input>
                            </div>
                            <div className='mt-3'>
                                <h5>Redes sociales</h5>
                                <input type="text" className="dato form-control" placeholder="Introduce nuevo"></input>
                            </div>
                        </form>
                        <button className='btn btn-primary'>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ModifySide;