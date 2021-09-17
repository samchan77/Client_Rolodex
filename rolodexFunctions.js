import { deleteRecord, updateRecord } from "./crudFunctions"
import { querySelectElement, createElement } from "./domMethods"
import { openModal } from "./modalFunctions"

export const createRolodexList = (allUserData) => {
    console.log(allUserData)
    allUserData.forEach(user => createRolodexCard(user))
}

export const createRolodexCard = (userData) => {
    const container = querySelectElement('.container')

    const { id, company, name } = userData
    const { name: companyName, catchPhrase } = company
    catchPhrase
    const cardDiv = createElement('div', 'container d-flex flex-wrap')
    const cardBody = createElement('div', 'card-body rolodex-body')
    const cardTitle = createElement('h5', 'card-title')
    const cardSubtitle = createElement('h6', 'card-subtitle mb-2 text-muted')
    const cardText = createElement('p', 'card-text')

    cardDiv.setAttribute('style', 'width: auto;')

    cardTitle.innerHTML = name
    cardSubtitle.innerHTML = companyName
    cardText.innerHTML = catchPhrase

    const buttonContainer = createElement('div', 'container flex-column flex-wrap')

    const contactInfoButton = createElement('button', 'btn btn-primary btn-sm crud-button')
    contactInfoButton.addEventListener('click', openModal)
    contactInfoButton.setAttribute('data-userid', id)
    contactInfoButton.innerHTML = 'Contact Info'

    const deleteButton = createElement('button', 'btn btn-danger btn-sm crud-button')
    deleteButton.addEventListener('click', deleteRecord)
    deleteButton.setAttribute('data-userid', id)
    deleteButton.innerHTML = 'Delete Contact'

    const updateButton = createElement('button', 'btn btn-warning btn-sm crud-button')
    updateButton.addEventListener('click', updateRecord)
    updateButton.setAttribute('data-userid', id)
    updateButton.innerHTML = 'Update Contact'

    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardSubtitle)
    cardBody.appendChild(cardText)
    container.appendChild(cardDiv)
    cardBody.appendChild(buttonContainer)
    buttonContainer.appendChild(contactInfoButton)
    buttonContainer.appendChild(deleteButton)
    buttonContainer.appendChild(updateButton)
}
