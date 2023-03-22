const socket = io()
const lista = document.getElementById('lista')

socket.on('productos', productos =>{
    let list = ''
    productos.forEach(item=>{
        list = list + `${item.id}----${item.nombre}</br>`
    })
    lista.innerHTML = list
})

socket.emit('nuevoProducto', {id:5, nombre: 'Gaby'})
socket.emit('eliminarProducto', 1)
