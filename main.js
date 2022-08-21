
const divIspis = document.querySelector('#ispis');
let brojStranice = document.querySelector('#brojStranice');
let paginacijaDiv = document.querySelector('#paginacija');

let page = 1;



async function dohvatiRase(page) {

	paginacijaDiv.style.display = 'flex';


	const options = {
		method: 'GET',
		headers: {
			"x-api-key": "0d730cf0-5abb-476d-8d99-d7391be628b4"
		}
	};
	
	const response = await fetch(`https://api.thedogapi.com/v1/breeds?limit=12&page=${page}`, options);
    const respData = await response.json();
	
    
	ispis(respData);
	
	return respData;
}
dohvatiRase(page);





async function ispis(data){
	divIspis.innerHTML = '';
	

	data.forEach(elem => {
		
		let div = document.createElement('div');
		div.classList.add('jednaVrsta');
		div.innerHTML = `
		<h2 class="naziv">${elem.name}</h2>
		<img src="${elem.image.url}" alt="${elem.name}" class="slika" data-id="${elem.id}">
		`;

		divIspis.append(div);
	});

	let jednaVrsta = document.querySelectorAll('.slika');

	jednaVrsta.forEach(elem =>{
		
		elem.addEventListener('click', ()=>{

			let vrednost = elem.dataset.id;
			
			let odabrani = data.filter( elem => elem.id == vrednost);
			
			let ispis = `
			
			<div class="jedanModal">
            	<div>
                	<i class="fa-solid fa-xmark close"></i>
            	</div>
            	<h2 class="modalNaslov">${odabrani[0].name}</h2>
            	<img src="${odabrani[0].image.url}" alt="${odabrani[0].name}" class="modalSlika">
            	<p class="modalOpis">Bred for: ${odabrani[0].bred_for?odabrani[0].bred_for:odabrani[0].breed_group }</p>
            	<p class="modalGodine">Life: ${odabrani[0].life_span}</p>
            	<p class="modalTemperament">Temperament: ${odabrani[0].temperament}</p>
        	</div>
			`;
			let modal = document.querySelector('#modal');
			modal.innerHTML = ispis;
			let close = document.querySelector('.close');
			
			close.addEventListener('click', closeFnc)

		})
				
	});
	


	if(data.length<12){
		document.querySelector('#next').style.display = 'none';
	}else{
		document.querySelector('#next').style.display = 'block';
	};

	if(page==1){
		document.querySelector('#previous').style.display = 'none';
	}else{
		document.querySelector('#previous').style.display = 'block';
	}

}


let next = document.querySelector('#next');

next.addEventListener('click', ()=>{
	divIspis.innerHTML = '';
	dohvatiRase(++page);
	brojStranice.innerHTML = page;
	

})


let previous = document.querySelector('#previous');

previous.addEventListener('click', ()=>{
	divIspis.innerHTML = '';
	dohvatiRase(--page);
	brojStranice.innerHTML = page;
	

});


function closeFnc(){
			let modal = document.querySelector('#modal');
			modal.innerHTML = '';
	
}



let srcBtn = document.querySelector(`#btn`);


srcBtn.addEventListener('click',()=>{
	let input = document.querySelector('#pretraga');
	let vrednost = input.value.toLowerCase();
	
	
	
	if(vrednost){
		
		dohvatiTrazeneRase(vrednost);
		async function dohvatiTrazeneRase(vrednost) {



			const options = {
				method: 'GET',
				headers: {
					"x-api-key": "0d730cf0-5abb-476d-8d99-d7391be628b4"
				}
			};
			
			const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${vrednost}`, options);
			const respData = await response.json();
			
			
			ispisTrazeneRase(respData);
			
			
		}

	}else{
		divIspis.innerHTML = '';
		dohvatiRase(page);
	}


});

async function ispisTrazeneRase(data) {
	if(data.length > 0){

		divIspis.innerHTML = '';
		
		let niz =[];
	
		data.forEach(elem=>{
			niz.push(elem.id)
		})
	
		console.log(niz);
		const options = {
			method: 'GET',
			headers: {
				"x-api-key": "0d730cf0-5abb-476d-8d99-d7391be628b4"
			}
		};
		
		const response = await fetch(`https://api.thedogapi.com/v1/breeds`, options);
		const respData = await response.json();
	
		
	
		let noviNiz = [];
	
		respData.forEach(elem =>{
			niz.forEach(element=>{
				if(elem.id==element){
					noviNiz.push(elem);
				}
	
			})
		})
	
	
		
		ispisTrazeneRaseNovi(noviNiz);
	}else{
		alert('There are no search results');
		let input = document.querySelector('#pretraga');
		input.value = '';
		page = 1;
		brojStranice.innerHTML = '1';
		dohvatiRase(page);
	}
};



let allBreed = document.querySelector('#allBreedBtn');

allBreed.addEventListener('click',()=>{
	page = 1;
	brojStranice.innerHTML = '1';
	let input = document.querySelector('#pretraga');
	input.value = '';
	dohvatiRase(page);

});


function ispisTrazeneRaseNovi(noviNiz){
	divIspis.innerHTML = '';
	
	paginacijaDiv.style.display = 'none';

	noviNiz.forEach(elem => {
		
		let div = document.createElement('div');
		div.classList.add('jednaVrsta');
		div.innerHTML = `
		<h2 class="naziv">${elem.name}</h2>
		<img src="${elem.image.url}" alt="${elem.name}" class="slika" data-id="${elem.id}">
		`;

		divIspis.append(div);
	})

	let jednaVrsta = document.querySelectorAll('.slika');
	

	jednaVrsta.forEach(elem =>{
		
		elem.addEventListener('click', ()=>{

			let vrednost = elem.dataset.id;
			
			let odabrani = noviNiz.filter( elem => elem.id == vrednost);
			
			let ispis = `
			
			<div class="jedanModal">
            	<div>
                	<i class="fa-solid fa-xmark close"></i>
            	</div>
            	<h2 class="modalNaslov">${odabrani[0].name}</h2>
            	<img src="${odabrani[0].image.url}" alt="${odabrani[0].name}" class="modalSlika">
            	<p class="modalOpis">Bred for: ${odabrani[0].bred_for?odabrani[0].bred_for:odabrani[0].breed_group }</p>
            	<p class="modalGodine">Life: ${odabrani[0].life_span}</p>
            	<p class="modalTemperament">Temperament: ${odabrani[0].temperament}</p>
        	</div>
			`;
			let modal = document.querySelector('#modal');
			modal.innerHTML = ispis;
			let close = document.querySelector('.close');
			
			close.addEventListener('click', closeFnc)

		})
				
	});

}