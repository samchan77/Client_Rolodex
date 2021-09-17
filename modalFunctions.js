import { querySelectElement } from "./domMethods"

const storedUserData = JSON.parse(localStorage.getItem('userData'))

export const openModal = async (e) => {
    e.preventDefault()
    const userID = e.target.dataset.userid
    const findRecord = storedUserData.filter(item => item.id == userID)
    console.log(findRecord)
    populateModal(findRecord[0])
}

export const closeModal = () => {
    const backDrop = querySelectElement('#backdrop').style.display = 'none'
    const grabModal = querySelectElement('#contactModal')
    grabModal.style.display = "none"
    grabModal.classList.remove("show")
}

export const populateModal = (data) => {
    let { address, company, email, name, phone, username, website } = data
    let { catchPhrase, name: companyName } = company
    let { street, suite, city, zipcode } = address

    const backDrop = querySelectElement('#backdrop').style.display = 'block'

    const grabModal = querySelectElement('#contactModal')
    grabModal.style.display = "block"
    grabModal.classList.add("show")


    const modalTitle = querySelectElement('.modal-title')
    const companyNameTag = querySelectElement('.company-name')
    const catchPhraseTag = querySelectElement('.catch-phrase')
    const contactsEmailTag = querySelectElement('.email')
    const contactsPhoneTag = querySelectElement('.phone')
    const contactsWebsiteTag = querySelectElement('.website')
    const contactsUsernameTag = querySelectElement('.username')
    const companyAddress = querySelectElement('.address')


    modalTitle.innerHTML = name
    companyNameTag.innerHTML = companyName
    companyAddress.innerHTML = `${street}, ${suite}, ${city}, ${zipcode}`
    catchPhraseTag.innerHTML = catchPhrase
    contactsEmailTag.innerHTML = email
    contactsPhoneTag.innerHTML = phone
    contactsUsernameTag.innerHTML = username
    contactsWebsiteTag.innerHTML = website
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    const modal = querySelectElement('#contactModal');

    if (e.target === modal) {
        closeModal()
    }
}