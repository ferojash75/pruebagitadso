//capturamos el boton del login y prevenimos su evento por defecto y cargamos la funcion de login
document.getElementById('logear').addEventListener('click', (e) =>{
    e.preventDefault()
    //buscamos y capturamos en formulogin el formulario html
    const formulogin = document.getElementById('loginform')
    //instanciamos un nuevo objeto de tipo FormData y le asignamos el formulario de login
    let datos = new FormData(formulogin)
    //capturamos solo lo que el usuario digita como valor en los campos de texto
    let datojson = Object.fromEntries(datos.entries())
    //pasar como parametro los valores que digito el usuario a la funcion de loginPost()
    loginPost(datojson)
})

async function loginPost(datojson){

    const urllogin = 'http://localhost:3650/login'

    const config = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(datojson)
    }
    //realizo la peticion a la rutalogin con el formato de config
    let peticion = await fetch(urllogin, config)

    let valores = await peticion.json()
    
    let usuario = valores.nombreus
    let rutahtml = valores.rutahtml

    window.location = `${rutahtml}?usuario=${usuario}`
}