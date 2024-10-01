import Alpine, { stringifyStyle } from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

document.addEventListener('alpine:init',()=> {
 Alpine.data('products',() => {
    items: [
        { id: 1, name: 'capucino', img: 'img/1.jpg' , harga: 20000},
        { id: 2, name: 'gula aren ', img: 'img/2.jpg' , harga: 15000},
        { id: 3, name: 'capucino', img: 'img/3.jpg' , harga: 18000},
    ]
 })
