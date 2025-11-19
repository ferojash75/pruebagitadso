
//capturamos el boton de enviar, prevenimos su evento por defecto y llamamos a la funcion de consulta

document.getElementById('enviar').addEventListener('click', (e) => {
    e.preventDefault()

    let dato1 = document.getElementById('dato1').value

    pedirDatos(dato1)

})

//consulta de los productos
async function pedirDatos(dato1){

    let url = `/productos/${dato1}`

    let respuesta = await fetch(url)

    let datos = await respuesta.json()

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

    //capturamos la celda de la tabla para mostrar el boton de eliminar
    let btndel = document.getElementById('btndel')
    //creamos un boton y le asociamos clases de estilo
    let botondel = document.createElement('button')
    botondel.setAttribute('class', 'btn border-0 botonicon')
    //inserta el boton al dom dentro de la celda de la tabla
    btndel.append(botondel)

    btndel.addEventListener('click', confirmardel)

}

//generacion del evento de eliminacion
function confirmardel(){

    //console.log('Llamaste a la funcion de eliminación')
    //capturamos la fila de la tabla con id confirm
    let confirmar = document.getElementById('confirmar')
    //creamos el componente td para utilizarlo dentro de confirm
    let contenconfirm = document.createElement('td')
    //definimos el atributo para el tamaño de la celda
    contenconfirm.setAttribute('colspan', 6)
    //le asociamos la clase para que el texto se centre
    contenconfirm.setAttribute('class', 'text-center')
    contenconfirm.textContent = '¿Esta seguro de eliminar el producto?'
    //insertar al dom la celda contenconfirm
    confirmar.appendChild(contenconfirm)

    //crear el boton de confirmar eliminación
    let botonremover = document.createElement('button')
    botonremover.setAttribute('class', 'btn border-0 botonyes mx-4')
    //crear el boton de cancelar eliminación
    let botoncancelar = document.createElement('button')
    botoncancelar.setAttribute('class', 'btn border-0 botonnot mx-2')

    //agregar los botones al dom, dentro de la celda contenconfirm
    contenconfirm.appendChild(botonremover)
    contenconfirm.appendChild(botoncancelar)

    //asocial eventos para los botones
    botonremover.addEventListener('click', eliminardatos)
    botoncancelar.addEventListener('click', cancelarpeticion)

    btndel.removeEventListener('click', confirmardel)
    enviar.removeEventListener('click', pedirDatos) 
}

//confirmacion por si (aprobar eliminación)
async function eliminardatos(){
    //console.log('Se enviara la peticion de eliminar al servidor')
    let dato = document.getElementById('idp').textContent

    let url = `/productos/${dato}`

    let config = {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    }

    try{
        let peticion = await fetch(url, config)

        if(!peticion.ok){
            throw new Error('Hubo un error en el envío de la petición')
        }
        let valores = await peticion.json()

        alert('El producto se ha eliminado')
        location.reload()
    
    }catch(error){
        console.log('Error:', error)
    }
}

//confirmacion por no (cancelar eliminación)
function cancelarpeticion(){
    alert('Se ha cancelado la eliminación del producto')
    location.reload()
}