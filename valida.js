//valida que los inputs sean validos, es decir, del 1 al 8 y dejando 1 espacio en blanco
//devuelve un objeto, diciendo si las entradas son validas
//tambien con la informacion de las coordenadas
function valida_datos(){
  let celdas=document.getElementsByClassName('celda');
  celdas=Array.from(celdas)
  //obtener los datos centro de las celdas
  let datos_celdas=celdas.map(x => [x.getElementsByTagName('input')[0].id, x.getElementsByTagName('input')[0].value])
  datos_celdas.map(x =>{
    if (x[1]==""){
      x[1]=null;
    }
    return x
  });
  //separar aquellos que son de la tabla input y de la tabla output
  let tabla_input=datos_celdas.filter(x => x[0].endsWith('i'));
  let tabla_output=datos_celdas.filter(x => x[0].endsWith('e'));
  //validar si los datos estan bien
  //debe haber al menos un elemento vacío
  //debe haber elementos del 1 al 8
  //codigo de error
  let error_input=0;
  let error_output=0;
  //0 sin error
  //1 debe haber al menos uno vacío
  //2 solo numeros del 1 al 8
  datos_input=tabla_input.map(x => x[1]);
  datos_output=tabla_output.map(x => x[1]);
  if (!(datos_input.includes(null))){
    error_input=1;
  }
  if (!(datos_output.includes(null))){
    error_output=1;
  }
  for (i=1; i<9; i++){
    if (!(datos_input.includes(String(i)))){
      error_input=2;

    }
    if (!(datos_output.includes(String(i)))){
      error_output=2;
      break;
    }
  }
  //retorna un objeto
  retorno={
    error_input:error_input,
    tabla_input:tabla_input,
    error_output:error_output,
    tabla_output:tabla_output,
  };

  return(retorno);
}

//imprime en pantalla un mensaje de error
function manda_error(codigo_in, codigo_out){
  //codigo para error
  error = document.getElementById("error");
  //si existe el codigo para error, eliminalo
  if (error!=null){
    error.remove();
  }
  // de otra forma, crealo

  error=document.createElement('div');
  error.setAttribute("class", "contenedor alert alert-danger");
  error.setAttribute("id", "error");


  if (codigo_in==1){
    let texto_error = document.createTextNode("La tabla de inicio debe contener 1 espacio vacío");
    error.appendChild(texto_error)
  }
  else if (codigo_in==2){
    let texto_error = document.createTextNode("La tabla de inicio solo debe contener numeros del 1 al 8");
    error.appendChild(texto_error)
  }
  else if (codigo_out==1){
    let texto_error = document.createTextNode("El estado esperado debe contener 1 espacio vacío");
    error.appendChild(texto_error)
  }
  else if (codigo_out==2){
    let texto_error = document.createTextNode("El estado esperado solo debe contener numeros del 1 al 8");
    error.appendChild(texto_error)
  }

  document.body.appendChild(error)
}
