const socket = io()
const lista = document.getElementById('lista')
const formAgregar = document.getElementById('formAgregar')
const formEliminar = document.getElementById('formEliminar')



socket.on('productos', productos =>{
    let list = ''
    productos.forEach(item=>{
        list = list + `${item.id}----${item.nombre}</br>`
    })
    lista.innerHTML = list
    
})

formAgregar.addEventListener('submit',e=>{
    e.preventDefault()
    const nombre = document.getElementById('nombre').value;
    const item = {
        nombre,
    }
    socket.emit('nuevoProducto', item)
    document.getElementById('nombre').value = ''

})

formEliminar.addEventListener('submit',e=>{
    e.preventDefault()
    const idPro = Number(document.getElementById('idPro').value);
    socket.emit('eliminarProducto', idPro)
    document.getElementById('idPro').value = ''

})




