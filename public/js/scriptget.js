//capturar el componente botón del formulario
document.getElementById('enviar').addEventListener('click', (e) =>{
    e.preventDefault()
    //capturando el valor del campo de texto del formulario
    let dato1 = document.getElementById('dato1').value

    pedirDatos(dato1)
})

let exito = document.getElementById('exito')
let error = document.getElementById('error')
let datostabla = document.querySelectorAll('#datostabla td')


async function pedirDatos(dato1){

    const url = `http://localhost:3650/productos/${dato1}`

    try{
        const respuesta = await fetch(url)
        if(!respuesta.ok){
            mostrarError()
            return
        }
        const datos = await respuesta.json()
        mostrarDatos(datos)
    }catch(error){
        mostrarError()
    }

}


function mostrarDatos(datos){

    let id = document.getElementById('idp')
    id.textContent = datos.id
    let nombre = document.getElementById('nombrep')
    nombre.textContent = datos.nombre
    let descripcion = document.getElementById('descripcionp')
    descripcion.textContent = datos.descripcion
    let precio = document.getElementById('preciop')
    precio.textContent = datos.precio
    let cantidad = document.getElementById('cantidadp')
    cantidad.textContent = datos.cantidad

    exito.textContent = '¡Bien!, La consulta fue exitosa...'
    error.textContent = ''

}

function mostrarError(){

    exito.textContent = ''
    error.textContent = '¡Que mal!, El producto no existe...'

    datostabla.forEach( (datos) => {
        datos.textContent = ''
    })
}