
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

/*
function ds(inicio, final, movimientos, intentos){
  //ordenalos en funcion de su puntaje
  movimientos=qs(movimientos);

  //LOGS PARA DEBUGEAR
  console.log("MOVIMIENTOS DISPONIBLES");
  console.log(movimientos);
  console.log("INICIO/ACTUAL");
  console.log(inicio);
  console.log("FINAL");
  console.log(final);

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

    //DEBUG LOGS

    console.log("MOVIMIENTO REMOVIDO");
    console.log(actual);

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

    console.log("INTENTOS");
    console.log(intentos);

    return lista_mov.concat(ds(actual, final, tabla_movimientos, intentos));
  }
}
*/

/*
function ds(obj){
  //COPIAR EL OBJETO
  obj_copy={...obj};

  //ordenalos en funcion de su puntaje
  obj_copy['posibilidades']=qs(obj_copy['posibilidades']);
  obj_copy['intentos'].push(obj_copy['inicio']);
  //ELIMINA LOS CAMINOS QUE YA FUERON RECORRIDOS
  obj_copy['posibilidades'].filter((x)=> !(obj_copy['intentos'].includes(x)));
  //CASO BASE 2
  //SI LAS POSIBILIDADES FUERON YA TODAS RECORRIDAS
  //
  if (obj_copy['posibilidades'].length==0){
    obj_copy['']
  }
  
  //LOGS PARA DEBUGEAR
  console.log("MOVIMIENTOS DISPONIBLES");
  console.log(obj_copy['posibilidades']);
  console.log("INICIO/ACTUAL");
  console.log(obj_copy['inicio']);
  console.log("FINAL");
  console.log(obj_copy['final']);
  console.log("RUTA");
  console.log(obj_copy['movimientos']);
  
  //CASO BASE, EL INCIO ES IGUAL AL FINAL
  if(JSON.stringify(obj_copy['inicio'])==JSON.stringify(obj_copy['final'])){
    return obj_copy;
  }

  //AÑADIR LA POSIBILIDAD 1 A LOS MOVIMIENTOS Y A LOS INTENTOS
  //obj_copy['intentos'].push(obj_copy['posibilidades'][0]);
  obj_copy['movimientos'].push(obj_copy['posibilidades'][0]);
  console.log(obj_copy);

  
  //
}
*/



//-----------------------------------------------
//CONVIERTE LOS PASOS EN ELEMENTOS GRAFICOS DE UNA TABLA HTML
//CREA UNA CELDA HTML
function crea_celda_graf(celd){
  let celda=document.createElement('div');
  celda.setAttribute("class", "celda");
  let text=document.createElement('text');
  text.setAttribute("class", "tabla_in");
  col=celd.columna;
  fil=celd.fila;
  let texto_id=`${fil}${col}r`;
  text.setAttribute("id", texto_id);
  celda.appendChild(text);
  if (celd.dato==null){
    dato=document.createTextNode('');
  }

  else{
    dato=document.createTextNode(celd.dato);
  }

  text.appendChild(dato);
  return(celda);
}

//CREA UNA FILA Y AÑADELE LAS CELDAS
function crea_fila_graf(celdas){
  let fila=document.createElement('div');
  fila.setAttribute('class', 'fila');
  celdas.forEach((item, i) => {
    fila.appendChild(item)
  });
  return fila;
}

//CREA UNA TABLA Y AÑADELE LAS FILAS
function crea_tabla_graf(filas){
  let tabla=document.createElement('div');
  tabla.setAttribute('id', 'tabla_resultado');
  filas.forEach((item, i) => {
    tabla.appendChild(item)
  });
  return tabla;
}

//-----------------------------------------------
//verifica si existe la tabla de resultados
//si no existe, la inserta, si si, la elimina y la inserta
function inserta_tab_res(tabla_insertar){
  tab_res = document.getElementById("tabla_resultado");
  //si si existe, remuevela
  if (tab_res!=null){
    tab_res.remove();
  }
  document.body.appendChild(tabla_insertar);
}

//-----------------------------------------------
//obtiene la tabla de estados e itera sobre ella con recursividad
//para cada estado obten su tabla
function pasos(tabla_estados){
  if (tabla_estados.length==0){
    return [];
  }
  else{
    estado=tabla_estados.shift();
    let filas=[];
    let tabla=[];
    estado.celdas.forEach((item, i) => {
      filas.push(crea_celda_graf(item));
      if ((i+1)%3==0){
        tabla.push(crea_fila_graf([... filas]));
        filas=[];
      }
    });
    tab=crea_tabla_graf(tabla);
    inserta_tab_res(tab)
    setTimeout((() => pasos(tabla_estados)), 200);
  }
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
    let tabla_movimientos=[];
    //caldas adyacentes a la vacia
    let adyacentes=inicio.getAdyacentes(inicio.getNull());
    adyacentes.forEach((item, i) => {
      let hip=interDatos(inicio, inicio.getNull(), item);
      let puntaje=compara_tablas(hip, final);
      movimiento={
        estado:hip,
        puntaje:puntaje
      }
      tabla_movimientos.push(movimiento);
    });
    tabla_movimientos=qs(tabla_movimientos);
    
    //VACIAR EL PRIMER ESTADO EN UN NODO RAIZ DE ARBOL
    raiz=new Nodo({estado: inicio,puntaje:compara_tablas(inicio, final)}, null, null);
    puntero=raiz;
    contador_raiz=0;
    //almacena los arboles fallidos
    arbol_fallido=[];
    //SI EL PUNTERO DEL ARBOL ES IGUAL AL ESTADO DESEADO, TERMINA EL CICLO
    while((JSON.stringify(puntero.getDato().estado))!=(JSON.stringify(final)) || (raiz.getHijo()==null)){
      //BANDERA QUE INDICA QUE EL HIJO NO SE HA ASIGNADO
      hijos=0;
      //ASIGNA LA TABLA DE POSIBLES MOVIMIENTOS COMO NODOS DEL ARBOL      
      //SI ALGUNO DE LOS HIJOS SUPERIORES ESTAN NO LA LISTA, NO PERMITAS QUE INGRESEN AL ARBOL
      lista_hijos=recorre_profundidad(raiz).map(x=> JSON.stringify(x.estado));
      //console.log('---------------------');
      //console.log(recorre_profundidad(raiz).map(x=> x.estado.getCeldas().map(y=> y.getDato())));
      tabla_movimientos.forEach((item, i) => {
        if ((i==0) || hijos==0){
          if(lista_hijos.includes(JSON.stringify(item.estado))){
          }
          else{
            if (contador_raiz>0){
              puntero.setHijo(new Nodo(item, null, null));    
            }
            else{
              raiz.setHijo(new Nodo(item, null, null));    
            }
            hijos+=1;
          }
        }
        else if ((i==1) || (hijos==1)){
          if (lista_hijos.includes(JSON.stringify(item.estado))){
          }
          else{
            if (contador_raiz>0){
              asigna_hermanos=puntero.getHijo()
              asigna_hermanos.setHermano(new Nodo(item, null, null));
            }
            else{
              asigna_hermanos=raiz.getHijo()
              asigna_hermanos.setHermano(new Nodo(item, null, null));
            }
            hijos+=1;
          }
        }
        else{
          while(asigna_hermanos.getHermano()!=null){
            asigna_hermanos=asigna_hermanos.getHermano()
          }
          asigna_hermanos.setHermano(new Nodo(item, null, null));
        }  
      });
      
      //SI AL FINAL DE LA ITERACIÓN NO QUEDAN HIJOS, SUBE UN NIVEL
      //ELIMINAR LOS HIJOS QUE SEAN HIJOS DIRECTOS DE LA RAIZ
      //console.log(JSON.stringify(puntero.getDato().estado));
      contador_raiz+=1;
      /*
      if (contador_raiz==100){
        break;
      }*/
      puntero=puntero.getHijo();
      tabla_movimientos=[];
      //caldas adyacentes a la vacia
      adyacentes=puntero.getDato().estado.getAdyacentes(puntero.getDato().estado.getNull());
      adyacentes.forEach((item, i) => {
        hip=interDatos(puntero.getDato().estado, puntero.getDato().estado.getNull(), item);
        puntaje=compara_tablas(hip, final);
        movimiento={
          estado:hip,
          puntaje:puntaje
        }
        tabla_movimientos.push(movimiento);
      });
      tabla_movimientos=qs(tabla_movimientos);
      if (JSON.stringify(puntero.getDato().estado)==(JSON.stringify(final))){
        break;
      }
    }

    lista_hijos=recorre_profundidad(raiz).map(x=> (x.estado));
    console.log(lista_hijos);
    pasos(lista_hijos);
    //console.log(raiz);
    //console.log('-----------------');
    //console.log(puntero);
    //prof=recorre_profundidad(raiz);
    //console.log(prof);
    //console.log(JSON.stringify(puntero.getDato().estado));
    //console.log(JSON.stringify(final));
    //console.log(raiz);
    /*
    while ((puntero.getHijo().getDato().estado)!=JSON.stringify(final)){
      console.log('Valio pito xd');
      console.log(puntero.getHijo().getDato().estado);
      console.log(JSON.stringify(final));
      break;
    }
    
    //OBTENER LA LISTA DE MOVIMIENTOS
    puntero=raiz;
    lista_mov=[JSON.parse(JSON.stringify(puntero.getDato()))];
    while (puntero.getHijo()!=null){
      punteto=puntero.getHijo()
      lista_mov.push(JSON.parse(JSON.stringify(puntero.getDato())))
    }
    console.log(lista_mov);
    */

    /*
    //-----------------------------------
    //INICIA LA FUNCION RECURSIVA
    obj={
      'inicio': inicio,
      'final': final,
      'movimientos': [],
      'posibilidades': tabla_movimientos,
      'intentos':[],
    }
    */
    
    //let pasos_solucion=ds(obj);
    //---------------------------------
    //INICIA LA FUNCION RECURSIVA
    //let pasos_solucion=ds(inicio,final, tabla_movimientos,[]);
    //console.log(pasos_solucion);
    //pasos(pasos_solucion);
    /*
    console.log(pasos_solucion[0].celdas[0]);
    //prueba para celda
    console.log(crea_celda_graf(pasos_solucion[0].celdas[0]));
    */
    //prueba para fila
    /*
    let cel1=crea_celda_graf(pasos_solucion[0].celdas[0]);
    let cel2=crea_celda_graf(pasos_solucion[0].celdas[1]);
    let cel3=crea_celda_graf(pasos_solucion[0].celdas[2]);
    celds=[cel1,cel2,cel3];
    //console.log(crea_fila_graf(celds));
    fil1=crea_fila_graf(celds);
    fils=[fil1,fil1,fil1];
    console.log(crea_tabla_graf(fils));
    */

  }
}
