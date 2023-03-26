const fecha = document.getElementById("fecha");
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const botonEnter = document.getElementById("enter");

//cada vez que yo agrego una tarea voy a tener 4 elementos: la tarea, el id de identificacion que me va a decir si es el 0 ,1 2 3, , estado realizado y el estado eliminado

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough ="line-through";
let id = 0;// la primer tarea tiene como id el 0 




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

//funcion tarea realizada



botonEnter.addEventListener("click",()=> {
    const tarea = input.value;
    if(tarea) {
        agregarTarea(tarea,id, false, false); // el estado inicial de las tareas es no relizado, no eliminado(false,false)
    }
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
        }
    input.value =""; // valor= "" (string vacio) significa que se borre cualquier letra o palabra.
    id++ 
};

});


//funcion tarea realizada

function tareaRealizada(element){
    element.classList.toggle("fa-check-circle");// accede a todas las clases del elemento clickeado y hace un toggle: si no existe la clase agregala y si esta removela.
    element.classList.toggle("fa-circle")
    element.parentNode.querySelector(".text").classList.toggle(lineThrough) // parent va a llamar al padre del nodo. ve al elemento padre que es el li, busca el elemento que tenga como clase .text (quiero afectar el texto) y agregale la clase line-through.
};

// funcion de tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode) // del elemento clickeado ve a su nodo padre(li) luego ve a su elemento padre (ul).remove el hijo (li). poner element.parentNode = a li

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

});

