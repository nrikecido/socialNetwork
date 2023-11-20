
const DeleteAccount = () => {
    return <>
        <div className="card rounded">
            <h2 className="card header">Eliminación de cuenta</h2>
            <p>Introduce tu correo electrónico</p>
            <input className="" type="email" id="email"></input>
            <p>Introduce tu cotraseña</p>
            <input className="" type="password" id="usuario"></input>
            <p>Introduce de nuevo tu contraseña</p>
            <input className="" type="password" id="usuario"></input>
            <button className="btn btn-icon text-muted">Eliminar cuenta</button>
        </div>
    </>
}

export default DeleteAccount;