
//nabar fix 
window.onscroll = function(){
    const headr = document.querySelector('header');
    const navbarfix = headr.offsetTop
    
    
    if(window.pageYOffset > navbarfix){
        headr.classList.add('navbar-fix');
    }else{
        headr.classList.remove('navbar-fix');
    }
    
    }
    
    
    // hanberger 
    const hamberger = document.querySelector('#hamberger');
    const navmenu = document.querySelector('#nav-menu');
    const shop_id = document.querySelector('#shop-id')
    const card_on = document.querySelector('#card_on');

    card_on.addEventListener('click' , () => {
        shop_id.classList.toggle('hidden');
    })
   
   
   
    hamberger.addEventListener('click',function(){
        hamberger.classList.toggle('hamburger-active');
        navmenu.classList.toggle('hidden');
    });




    const card = () => {
        const rupiah = (nomber) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0 
            }).format(nomber);
        };
    
        fetch('respon.json')
            .then(response => response.json())
            .then(data => {
                const databese = data;
                let cardHTML = ''; 
    
                databese.forEach(m => {
                    cardHTML += shawcard(m, rupiah); 
                });
    
                const dat = document.querySelector('.orang');
                dat.innerHTML = cardHTML;
    
                let totalcard = 0;
    
                const cekoutker = document.querySelectorAll('.keranjang');
                cekoutker.forEach(button => {
                    button.addEventListener('click', () => {
                        if (totalcard < 5) {
                            const gambar = button.getAttribute('data-gambar');
                            const harga = parseFloat(button.getAttribute('data-harga').replace(/\D/g, '')); 
                            const nama = button.getAttribute('data-nama');
                            const id = button.closest('.w-full').getAttribute('id');
    
                            // Cek jika item sudah ada di keranjang
                            const existingItem = document.querySelector(`.kalo .item-keranjang[data-id="${id}"]`);
                            if (existingItem) {
                                const jumlahItem = existingItem.querySelector('.jumlah-item');
                                const totalHarga = existingItem.querySelector('.total-harga');
                                let jumlah = parseInt(jumlahItem.textContent);
                                
                                if (jumlah < 5) {
                                    jumlah++;
                                    jumlahItem.textContent = jumlah; 
                                    totalHarga.textContent = rupiah(harga * jumlah);
                                }
                                 

                                return
                            }
    
                            
                            let jumlah = 1;  
                            let keranjangg = keranjang(gambar, rupiah(harga), nama, jumlah, id); 
                            
                            const keranjangi = document.querySelector('.kalo');
                            keranjangi.innerHTML += keranjangg;
    
                            totalcard++;  
    
                          
                            const keranjangTerakhir = keranjangi.lastElementChild;
                            const tambahBtn = keranjangTerakhir.querySelector('.tambah');
                            const kurangBtn = keranjangTerakhir.querySelector('.kurang');
                            const jumlahItem = keranjangTerakhir.querySelector('.jumlah-item');
                            const totalHarga = keranjangTerakhir.querySelector('.total-harga');
                            // Menampilkan harga awal
                            totalHarga.textContent = rupiah(harga * jumlah);
    
                            tambahBtn.addEventListener('click', () => {
                                if (jumlah < 5) {
                                    jumlah++;
                                    jumlahItem.textContent = jumlah; 
                                    totalHarga.textContent = rupiah(harga * jumlah); 
                                } else {
                                    alert('Maksimum order 5 item per produk');
                                }
                            });
    
                            // Event listener untuk tombol kurang
                            kurangBtn.addEventListener('click', () => {
                                jumlah--; 
                                if (jumlah > 0) {
                                    jumlahItem.textContent = jumlah;  
                                    totalHarga.textContent = rupiah(harga * jumlah);
                                } else {
                                    const itemToRemove = document.querySelector(`.kalo .item-keranjang[data-id="${id}"]`);
                                    if (itemToRemove) {
                                        itemToRemove.remove();
                                        totalcard--; 
                                        alert(`${nama} telah dihapus dari keranjang.`);
                                    }
                                }
                            });
                        } else {
                            alert('Maksimum 5 produk dalam keranjang');
                        }
                    });
                });
            });
    };
    
    function shawcard(m, formatHarga) {
        return `
            <div class="w-full gap-3 px-4 max-w-md" id="${m.id}">
                <div class="relative group w-60 h-64 overflow-hidden">
                    <img class="w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-125" src="${m.gambar}" alt="Gambar">
                    <div class="absolute -bottom-16 px-4 py-3 bg-heropik text-white w-full text-center group-hover:bottom-0">${m.name}</div>
                </div>
                <div class="font-medium text-center">
                    <h4 class="font-medium">${m.name}</h4>
                    <h3 class="font-primeriy">${formatHarga(m.harga)}</h3>
                </div>
                <button class="keranjang" 
                    data-gambar="${m.gambar}" 
                    data-harga="${m.harga}" 
                    data-nama="${m.name}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather idfor feather-shopping-cart">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>
            </div>
        `;
    }
    
    function keranjang(m, r, t, j, id) {
        return `
            <div class="flex items-center justify-between gap-1 px-4 infobos item-keranjang" data-id="${id}"> <!-- Gunakan ID di sini -->
                <img src="${m}" class="rounded-full" width="50px" alt="">
                <h3 class="font-semibold text-xl">${t}</h3>
                <span class="text-xl font-bold tambah cursor-pointer">+</span>
                <span class="jumlah-item">${j}</span>
                <span class="font-bold text-xl total-harga">${r}</span> 
                <span class="font-bold text-3xl kurang cursor-pointer">-</span>
            </div>
        `;
    }
    
    // Panggil fungsi card untuk menjalankan seluruh proses
    card();
    
    