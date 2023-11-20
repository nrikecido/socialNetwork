import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import APP from './pages/app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Context from './config/contextGlobal';

	// Componentes
		import Profesional from './componentes/Profesional'
		import Home from './componentes/Home';
		import Quedadas from './componentes/Quedadas';
		import Social from './componentes/Social';
		import Mensajes from './componentes/Mensajes';
		import Perfil from './componentes/Perfil';
		import Login from './login';
		import Forgot from './login/forgot';
		import Register from './login/register';
		import Reset from './login/reset';
		import ModifyEvent from './componentes/Quedadas/modifyBar/modifyEvent';
		import Profile from './componentes/Perfil/index';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Context>
  <React.StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<APP><Home></Home></APP>}  />
			<Route path='/musin/' element={<Login></Login>} />
			<Route path="/app/quedadas/" element={<APP><Quedadas /></APP>}  />
			<Route path="/app/quedadas/modify/:id" element={<APP><ModifyEvent /></APP>}  />
			<Route path="/app/profesional/" element={<APP><Profesional /></APP>}  />
			<Route path="/app/social/" element={<APP><Social/></APP>}  />
			<Route path="/app/profile/:id" element= {<APP><Profile /></APP>} />
			<Route path="/app/mensajes/:user?" element={<APP><Mensajes/></APP>}  />
			<Route path="/app/perfil/" element={<APP><Perfil/></APP>}  />
			<Route path="/login/" element={<Login/>}  />
			<Route path="/login/forgot" element={<Forgot/>}  />
			<Route path="/login/register" element={<Register/>}  />
			<Route path="/login/reset" element={<Reset/>}  />
		</Routes>
	</BrowserRouter>
  </React.StrictMode>
</Context>
);


