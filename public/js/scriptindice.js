//capturar los botones y generar peticiones a rutas en el servidor

document.querySelectorAll('.itemsmenu').forEach(button =>{
    button.addEventListener('click', function(e) {
        e.preventDefault()

        let rutaUrl = this.dataset.value
        console.log(rutaUrl)
        rutasMenu(rutaUrl)
    })
})

async function rutasMenu(rutaUrl){

    const urlpet = 'http://localhost:3650/rutas'

    const config = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'ruta': rutaUrl})
    }
    
    let respuesta = await fetch(urlpet, config)

    let valores = await respuesta.json()

    console.log(valores)

    window.location.href = valores.route

}