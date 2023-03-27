const fecha = document.getElementById("fecha");
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const botonEnter = document.getElementById("enter");

//cada vez que yo agrego una tarea voy a tener 4 elementos: la tarea, el id de identificacion que me va a decir si es el 0 ,1 2 3, , estado realizado y el estado eliminado

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough ="line-through";
let id;// la primer tarea tiene como id el 0 
let LIST ; // guardamos los elementos que se van agregando en un array 


//creacion de fecha (que tome la fecha del navegador, que se vaya actualizando)

const FECHA = new Date () // la funcion date ya viene en el navegdor 
fecha.innerHTML = FECHA.toLocaleDateString("es-AR",{weekday:"long",month:"long",day:"numeric"})


//funcion agregar tarea

function agregarTarea (tarea, id, realizado,eliminado) {

    if(eliminado){
        return // uso de return para terminar la ejecucion del programa si la conidcion se cumple
    } // si eliminado es true 

    const REALIZADO = realizado ?check :uncheck;// operadores ternarios: ? (true), :(false). si relizado es true, marca check
    const LINE = realizado ?lineThrough :"" // si relizado es true, activa lineThrough, si es false activa una cadena vacia, no lo taches

    

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE} ">${tarea} </p> 
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento);
    
    
};

// aca arranca el programa 

botonEnter.addEventListener("click",()=> {
    const tarea = input.value;
    if(tarea) {
        agregarTarea(tarea,id, false, false);// el estado inicial de las tareas es no relizado, no eliminado(false,false)
        LIST.push({ // el metodo PUSH empuja los elementos a un array
            nombre: tarea,
            id: id,
            realizado:false,
            elminado:false
        })
    }
    localStorage.setItem("TODO",JSON.stringify(LIST))
    input.value="";
    id++ // que se vayan colocando id.
    
});

// AGREGAR TAREA CON UN ENTER
//Estoy en cualquier parte del documento 

document.addEventListener("keyup", function(event){
    if(event.key =="Enter"){
        const tarea = input.value // lo que el usuario ingreso como tarea
        if(tarea){ // si el usuario ingreso algo, si el input tiene algun valor
            agregarTarea(tarea,id,false,false)
            LIST.push({ // el metodo PUSH empuja los elementos a un array
                nombre: tarea,
                id: id,
                realizado:false,
                elminado:false
            })
        }
    localStorage.setItem("TODO",JSON.stringify(LIST))    
    input.value =""; // valor= "" (string vacio) significa que se borre cualquier letra o palabra.
    id++
    
};

});


//funcion tarea realizada

function tareaRealizada(element){
    element.classList.toggle("fa-check-circle");// accede a todas las clases del elemento clickeado y hace un toggle: si no existe la clase agregala y si esta removela.
    element.classList.toggle("fa-circle")
    element.parentNode.querySelector(".text").classList.toggle(lineThrough) // parent va a llamar al padre del nodo. ve al elemento padre que es el li, busca el elemento que tenga como clase .text (quiero afectar el texto) y agregale la clase line-through.
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true

    console.log(LIST)
    
};

// funcion de tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode) // del elemento clickeado ve a su nodo padre(li) luego ve a su elemento padre (ul).remove el hijo (li). poner element.parentNode = a li
    LIST[element.id].eliminado = true

}



// eventos de los botones circle y trash 

lista.addEventListener("click", (e)=>{
    const element = e.target // el e.target se refiere al elemento clickeado.
    console.log(element); // me trae el elemento clickeado
    const elementData = element.attributes.data.value;
    //console.log(element.attributes) // me trae todos los atributos que tiene el elemento clickeado.
    //console.log(element.attributes.data) // me trae el data="realizado"
    //console.log(element.attributes.data.value) // me trae solo el valor del atributo data.
    if(elementData==="realizado"){
        tareaRealizada(element)
    }
    else if (elementData==="eliminado"){
        tareaEliminada(element)
    }
    localStorage.setItem("TODO",JSON.stringify(LIST))    

});

// Usamos un recurso del navegador que es el LOCALSTORAGE que se usara para almacenar la info. el LOCALSTORAGE almacenamiento incluso si se cierra el navegador.

//localStorage.setItem("TODO",JSON.stringify(LIST)). el primer parametro es el nombre que se le va a asignar "TODO(por to do list", ese LIST es el elemento que quiero guardar que es el array. el JSON permite almacenar informacion en formato de texto

//localStorage.getItem("TODO")

//localStorage tiene dos metodos : setItem = agregar--- getItem= obtener

//local storage getItem

let data = localStorage.getItem("TODO")
if(data){
    LIST= JSON.parse(data)
    id = LIST.length // propiedad length permite ver cuantos elementos tiene el array
    cargarLista(LIST)
}else{ // es la primera vez que ingresamos, no hay ninguna data
    LIST= []
    id= 0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}