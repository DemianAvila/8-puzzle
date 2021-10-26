
//------------------------------------------------
//busqueda en profundidad
//recibe el estado actual, el final y los posibles movimientos
//es recursiva
//los casos bases son:
//el estado actual y el final son el mismo
//retorna los movimientos necesarios para llegar al resultado
//tambien retorna un solucion=true

//se vacia la pila de movimientos
//retorna los movimientos hechos
//soluion=false

function ds(inicio, final, movimientos, intentos){
  movimientos=qs(movimientos);
  /*
  LOGS PARA DEBUGEAR
  console.log("MOVIMIENTOS DISPONIBLES");
  console.log(movimientos);
  console.log("INICIO/ACTUAL");
  console.log(inicio);
  console.log("FINAL");
  console.log(final);
  */
  intentos.push(inicio);
  let lista_mov=[inicio];
  if(JSON.stringify(inicio)==JSON.stringify(final)){
    return [inicio];

  }
  if(movimientos.length==0){
    return [];
  }
  //si la pila aun tiene movimientos,
  //aplica la funcion recursiva para el estado de la tabla actual
  if (movimientos.length>0){
    let actual=movimientos.pop()
    /*
    DEBUG LOGS

    console.log("MOVIMIENTO REMOVIDO");
    console.log(actual);
    */
    actual=actual.estado
    //-----------------------------------
    //obten los movimientos iniciales posibles
    let tabla_movimientos=[]
    //caldas adyacentes a la vacia
    let adyacentes=actual.getAdyacentes(actual.getNull());
    adyacentes.forEach((item, i) => {
      let explorado=false;
      let hip=interDatos(actual, actual.getNull(), item);
      //SALTATE AQUELLOS ESTADOS HIPOTETICOS QUE YA HAYAN SIDO EXPLORADOS
      intentos.forEach((item_a, a) => {
        if (JSON.stringify(hip)==JSON.stringify(item_a)){
          explorado=true;
        }
      });
      //SI NO HA SIDO EXPLORADO
      if (! explorado){
        let puntaje=compara_tablas(hip, final);
        movimiento={
          estado:hip,
          puntaje:puntaje
        }
        tabla_movimientos.push(movimiento);
      }
    });
    /*
    console.log("INTENTOS");
    console.log(intentos);
    */
    return lista_mov.concat(ds(actual, final, tabla_movimientos, intentos));
  }
}

//-----------------------------------------------
//CONVIERTE LOS PASOS EN ELEMENTOS GRAFICOS DE UNA TABLA HTML
function crea_celda_graf(celda){

}


//-----------------------------------------------
//flujo principal del programa
function main(){
  datos=valida_datos();
  //si hay algun error en la introducción de datos, manda el error
  if (datos.error_input>0 || datos.error_output>0){
    manda_error(datos.error_input ,datos.error_output);
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

    //-----------------------------------
    //obten los movimientos iniciales posibles
    let tabla_movimientos=[]
    //caldas adyacentes a la vacia
    let adyacentes=inicio.getAdyacentes(inicio.getNull());
    adyacentes.forEach((item, i) => {
      let hip=interDatos(inicio, inicio.getNull(), item);
      let puntaje=compara_tablas(hip, final);
      movimiento={
        estado:hip,
        puntaje:puntaje
      }
      tabla_movimientos.push(movimiento)
    });
    //---------------------------------
    //INICIA LA FUNCION RECURSIVA
    let pasos_solucion=ds(inicio,final, tabla_movimientos,[]));

  }
}
