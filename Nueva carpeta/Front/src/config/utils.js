// utils.js
function validarCorreo(correo) {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return expresionRegular.test(correo);
  }

  const created = (time) => {
		const currentDate = new Date();
		const postDate = new Date(time);
	  
		const timeDiff = currentDate - postDate;
		const minutes = Math.floor(timeDiff / (1000 * 60));
		const hours = Math.floor(timeDiff / (1000 * 60 * 60));
		const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
	  
		if (minutes < 60) {
		  return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
		} else if (hours < 24) {
		  return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
		} else if (days < 7) {
		  return `${days} ${days === 1 ? 'día' : 'días'}`;
		} else {
		  return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
		}
	}

	function calcularMedia(valores) {
		if (valores.length === 0) {
		  return 0; // Manejo de división por cero
		}
	  
		const suma = valores.reduce((acumulador, valor) => acumulador + valor, 0);
		const media = suma / valores.length;
	  
		return media;
	}
  
  module.exports = {
    validarCorreo,
    created,
	calcularMedia
};

  
  