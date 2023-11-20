import Sabina from '../img/ha-sabina.jpeg';

const ModifySide = () => {
    return <>
        <div className="col-xl-6">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center bg-white rounded">ACADEMIA MOZART</h1>
                    <div className="card rounded">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h3>Instalaciones</h3> 
                            </div>
                        </div>
                        <form className="card-body">
                            <div>
                                <h5>Añade fotos de las instalaciones con las que cuentas</h5>
                                <input type='file'></input>
                            </div>
                            <div className='mt-3'>
                                <h5>Añade una descripción de las instalaciones</h5>
                                <textarea name="descripcion" className="dato form-control" rows="4" cols="50" placeholder="Introduce tu experiencia aquí"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="card rounded mt-3">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h3>Cursos</h3> 
                            </div>
                        </div>
                        <form className="card-body">
                            <div>
                                <h5>Añade los cursos que impartes</h5>
                                <p>Título: <input type='text' className='form-control'></input></p>
                                <p>Descripción: <textarea name="descripcion" className="dato form-control" rows="4" cols="50" placeholder="Introduce tu experiencia aquí"></textarea></p>
                            </div>
                        </form>
                    </div>
                    <div className="card rounded mt-3">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h3>Últimos eventos organizados</h3> 
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <h5>Solfeo con mayores</h5>
                                <p>Título: </p>
                                <p>Descripción: <textarea name="descripcion" className="dato form-control" rows="4" cols="50" placeholder="Introduce tu experiencia aquí"></textarea></p>
                                <p>Fotos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ModifySide;