class Celda {
  constructor(columna, fila, dato) {
    this.columna=columna;
    this.fila=fila;
    this.dato=dato;
  }
  getColumna(){
    return this.columna;
  }
  getFila(){
    return this.fila;
  }
  getDato(){
    return this.dato;
  }
  setColumna(nuevaC){
    this.columna=nuevaC;
  }
  setFila(nuevaF){
    this.fila=nuevaF;
  }
  setDato(nuevoD){
    this.dato=nuevoD
  }
}

//tabla, conjunto ordenado de celdas
class Tabla {
  constructor(celdas) {
    let n_celdas=[];
    celdas.forEach((item, i) => {
      let n_celda=new Celda (item.getColumna(), item.getFila(), item.getDato());
      n_celdas.push(n_celda);
    });
    this.celdas=n_celdas;
  }
  //retorna todas las celdas
  getCeldas(){
    return this.celdas;
  }
  //regresa el objeto celda
  getCelda(col, fil){
    let celda=this.getCeldas().filter(x => x.getColumna()==col && x.getFila()==fil);
    if (celda.length==0){
      return undefined;
    }
    else{
    return celda[0];
  }
  }
  //regresa una lista con las celdas de la columna
  getFullColumna(col){
    let celdas_col=this.celdas.filter(x => x.getColumna(col));
    if (celdas_col.length==0){
      return undefined;
    }
    else{
      return celdas_col;
    }
  }
  //regresa una lista con las celdas de la fila
  getFullFila(fil){
    let celdas_fil=this.celdas.filter(x => x.getFila(fil));
    if (celdas_fil.length==0){
      return undefined;
    }
    else{
      return celdas_fil;
    }
  }
  //devuelve un objeto con las celdas adyadentes y sus posiciones
  getAdyacentes(celda){
    let arriba=this.getCelda((celda.getFila()-1),(celda.getColumna()));
    let abajo=this.getCelda((celda.getFila()+1),(celda.getColumna()));
    let derecha=this.getCelda((celda.getFila()),(celda.getColumna())+1);
    let izquierda=this.getCelda((celda.getFila()),(celda.getColumna())-1);
    let adyacentes=[arriba, abajo, izquierda, derecha];
    adyacentes=adyacentes.filter(x => x!=undefined);
    return adyacentes;
  }
  //obten la celda que no tiene valor
  getNull(){
    let nullCel=this.getCeldas().filter(x => x.getDato()==null);
    if (nullCel.length==0){
      return undefined;
    }
    else{
      return nullCel[0];
    }
  }
  /*
  //intercambia los datos de una celda a otra
  interDatos(celdaDesde, celdaHacia){
    let tmpDato=celdaDesde.getDato();
    celdaDesde.setDato(celdaHacia.getDato());
    celdaHacia.setDato(tmpDato);
  }*/
  //encuentra una celda por su dato
  findDato(dato){
    let celda_dato=this.getCeldas().filter(x => x.getDato()==dato);
    if (celda_dato.length==0){
      return undefined;
    }
    else{
      return celda_dato[0];
    }
  }
}


//intercambia las celdas de una cuadriula
//recibe la tabla, la celda inicio  y la celda destino
//retorna una nueva tabla

function interDatos(tab, ini, des){
  let n_tab= new Tabla(tab.getCeldas());
  let ini_copia=n_tab.getCelda(ini.getColumna(), ini.getFila());
  let des_copia=n_tab.getCelda(des.getColumna(), des.getFila());
  n_des=new Celda(des.getColumna(), des.getFila(), des.getDato());
  n_ini=new Celda(ini.getColumna(), ini.getFila(), ini.getDato());
  ini_copia.setDato(n_des.getDato());
  des_copia.setDato(n_ini.getDato());
  return n_tab;

}



function convierteACeldas(lista_datos){
  let lista_objetos=[];
  lista_datos.forEach((item, i) => {
    //el primer caracter del primer elemento es la columna
    columna=parseInt(item[0][1]);
    fila=parseInt(item[0][0]);
    if (item[1]==null){
      dato=item[1];
    }
    else{
      dato=parseInt(item[1]);
    }
    objeto=new Celda(columna, fila, dato);
    lista_objetos.push(objeto);
    //el segundo la fila
  });
  return lista_objetos;
}

function compara_tablas(tabla1, tabla2){
  //iterar sobre cada celda de la tabla2
  //compararla con el dato de la tabla 1
  puntaje=0;
  tabla2.getCeldas().forEach((item, i) => {
    let item1= tabla1.getCeldas()[i]
    //si tienen el mismo dato, columna y fila sube el puntaje +1
    if (JSON.stringify(item)==JSON.stringify(item1)){
      puntaje+=1;
    }
    //si no
    else{
      let celda_tabla1=tabla1.findDato(item.getDato());
      let col=Math.abs(item.getColumna()-celda_tabla1.getColumna());
      let fil=Math.abs(item.getFila()-celda_tabla1.getFila());
      let punt=(col+fil)*(-1);
      puntaje+=punt;
    }
  });
  return(puntaje);
}

//----------------------------------------------
//ordena la lista de objetos por puntaje
//usa metodo quick
function qs(arr){
  if (arr.length==0){
    return []
  }
  else {
    var pivote=arr.pop();
    return [].concat(qs(arr.filter((x)=>x.puntaje<pivote.puntaje)), [pivote], qs(arr.filter((x)=>x.puntaje>=pivote.puntaje)))
  }

}
