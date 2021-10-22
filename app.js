function main(){
  datos=valida_datos();
  //si hay algun error en la introducción de datos, manda el error
  if (datos.error_input>0 || datos.error_output>0){
    manda_error(datos.error_input ,datos.error_output)
  }
  //si no hay error, inicia el programa
  else{
    //elimina el mensaje de error
    error = document.getElementById("error");
    //si existe el codigo para error, eliminalo
    if (error!=null){
      console.log(error)
      error.remove();
    }
    //escribe los datos en una estructura de datos
    const inicio=new Tabla(convierteACeldas(datos.tabla_input));
    const final=new Tabla(convierteACeldas(datos.tabla_output));
    console.log(inicio);
    //almacena el estado de las tablas para llegar a la solución
    let estados=[];
    //mientras el resultado esperado sea diferente del final, intera para enontrar el modelo
    do{
      estados.push(inicio);
      //obten todos los adyacentes a la celda sin pieza
      let adyacentes=inicio.getAdyacentes(inicio.getNull());
      //crear una nueva tabla por cada adyacente dispobible
      //esa tabla hipotetica es el dato alternado con el vacío
      let tabla_hipo=[];
      adyacentes.forEach((item, i) => {
        let hip=interDatos(inicio, inicio.getNull(), item);
        let puntaje=compara_tablas(hip, final);
        tabla_hipo.push(hip)
      });

      //console.log(tabla_hipo);
      break;
    }while (JSON.stringify(inicio)!=JSON.stringify(final));
  }
}
