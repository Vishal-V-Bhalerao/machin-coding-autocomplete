

const autoCompleteInput = document.getElementById('ac-input')
const autoCompleteResult = document.getElementById('ac-result')

const renderSearchList = (products) => {
    const listEle = document.createDocumentFragment()
    products.forEach(product => {
        const searchEl = document.createElement('div')
        searchEl.innerHTML = product.title
        searchEl.setAttribute('data-key', product.title)
        searchEl.classList.add('search-item')
        listEle.appendChild(searchEl)
    });
    autoCompleteResult.appendChild(listEle) 
}

const handleInputChange = async (event) => {
    if(event.target.value.length > 0){
        autoCompleteResult.style.display = 'block'
        autoCompleteResult.innerHTML = ""
        const result = await getProducts(event.target.value)
        if(result.total > 0){
          searchListElement = renderSearchList(result.products)
        }
    }
    else{
        autoCompleteResult.style.display = 'none'
    }
}

const handleOnSearchClick = (event) => {
    const { key } = event.target.dataset
    if(key) autoCompleteInput.value = key
    autoCompleteResult.style.display = "none"
}

autoCompleteInput.addEventListener('input', toDebouncedFunction(handleInputChange, 10)) 
autoCompleteResult.addEventListener('click', handleOnSearchClick)