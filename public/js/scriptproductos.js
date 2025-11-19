
//buscar y capturar boton de registro
// const registrarbtn = document.getElementById('registrar')
// registrarbtn.addEventListener('click', registroproducto)

pedirId()

document.getElementById('registrar').addEventListener('click', (e) =>{
    e.preventDefault()

    registroproducto()
})

function pedirId(){
    //definimos la ruta para recuperar los datos de los productos
    let url = 'http://localhost:3650/productos'

    fetch(url)
        .then(respuesta => respuesta.json())
            .then(datos =>{
                //capturamos el tamaño del vector
                let tam = datos.length
                //capturamos el ultimo indice del vector
                let ultimo = datos[tam-1]
                //al valor del ultimo indice en su clave id le sumamos 1
                let ultid = parseInt(ultimo.id) + 1
                //capturamos el campo html para el id
                let id = document.getElementById('dato1')
                //al campo le asignamos el valor del ultimo id + 1
                id.value = ultid
                id.readOnly = true
            })
}

async function registroproducto(){

    //buscar y capturar el formulario
    const formulario = document.getElementById('formupost')

    let datos = new FormData(formulario) //creamos una instancia de FormData y le asociamos nuestro formulario

    let datosjson = Object.fromEntries(datos.entries()) //capturamos los datos ingresados por el usuario

    const urlpeticion = 'http://localhost:3650/registro' 

    const config = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(datosjson)
    }

    let peticion = await fetch(urlpeticion, config)

    let valores = await peticion.json()
    //alert de confirmacion de recepción de la respuesta
    alert('Producto Registrado')
    //hacer un reset al formulario
    document.getElementById('formupost').reset()
    //formulario.reset()
    //pedir el id del ultimo producto
    pedirId()
    console.log('Respuesta desde el servidor', valores)

}

