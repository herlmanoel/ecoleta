function populateUfs() {
    const ufSelect = document.querySelector('#uf');
    console.log(ufSelect)
    // retorna uma Promise
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
        states.sort()
        for(state of states){    
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    }).catch((err) => console.log(err))
}
populateUfs();
const getCities = (event) => {
    // https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('[name=state]');

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const ufValue = event.target.value;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    // limpando
    citySelect.innerHTML = `<option value>Selecione uma cidade</option>`;
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        
        for(city of cities){    
            
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;

    }).catch((err) => console.log(err))
}
document.querySelector('select[name=uf]')
.addEventListener('change', getCities);

// itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li');
for (const item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');

// o 2 está no index 0
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    // adicionar ou remover class
    itemLi.classList.toggle('selected')
    
    // data-id="" do html
    const itemId = itemLi.dataset.id;

    //  verificar se existem items selecionados
    // get items selecionados

    // se não encontrou retorna -1
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId;
        return itemFound;
    });

    // console.log(alreadySelected);
    // se já tiver selecionado tirar da seleção
    // >= 0 está no index
    if(alreadySelected >= 0) {
        //  tirar da seleção
        // novo array filteredItems
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        
        selectedItems = filteredItems;
    } else {
        // senão estiver selecionado
        // add a seleção
        selectedItems.push(itemId);
    }

    // console.log(selectedItems)

    collectedItems.value = selectedItems;    
}
