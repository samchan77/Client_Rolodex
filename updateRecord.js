import 'regenerator-runtime/runtime'
import { querySelectElement } from "./domMethods"
const QueryString = window.location.search
const urlParams = new URLSearchParams(QueryString)
const storedUserData = JSON.parse(localStorage.getItem('userData'))


const userIDParam = urlParams.get('userId')

const findRecord = storedUserData.filter(item => item.id == userIDParam)

let userRecord = findRecord[0]

const populateForm = () => {
    const { id, address, company, email, name, phone, username, website } = userRecord
    const { name: companyName, catchPhrase } = company
    let { street, suite, city, zipcode } = address

    const clientName = querySelectElement('#InputName')
    const clientCompany = querySelectElement('#InputCompanyName')
    const clientStreet = querySelectElement('#InputCompanyStreet')
    const clientSuite = querySelectElement('#InputCompanySuite')
    const clientCity = querySelectElement('#InputCompanyCity')
    const clientZip = querySelectElement('#InputCompanyZip')
    const clientCatchPhrase = querySelectElement('#InputCompanyCatchPhrase')
    const clientEmail = querySelectElement('#InputEmail')
    const clientPhone = querySelectElement('#InputPhoneNumber')
    const clientUsername = querySelectElement('#InputUsername')
    const clientWebsite = querySelectElement('#InputWebsite')
    const hiddenClientID = querySelectElement('#InputUserId')

    clientName.value = name
    clientCompany.value = companyName
    clientStreet.value = street
    clientSuite.value = suite
    clientCity.value = city
    clientZip.value = zipcode
    clientCatchPhrase.value = catchPhrase
    clientEmail.value = email
    clientPhone.value = phone
    clientUsername.value = username
    clientWebsite.value = website
    hiddenClientID.value = id
}

const bundleUpdatedData = async (e) => {
    e.preventDefault()
    const clientName = e.target['InputName'].value
    const clientCompany = e.target['InputCompanyName'].value
    const clientStreet = e.target['InputCompanyStreet'].value
    const clientSuite = e.target['InputCompanySuite'].value
    const clientCity = e.target['InputCompanyCity'].value
    const clientZip = e.target['InputCompanyZip'].value
    const clientCatchPhrase = e.target['InputCompanyCatchPhrase'].value
    const clientEmail = e.target['InputEmail'].value
    const clientPhone = e.target['InputPhoneNumber'].value
    const clientUsername = e.target['InputUsername'].value
    const clientWebsite = e.target['InputWebsite'].value
    const hiddenClientID = e.target['InputUserId'].value

    let reqBody = {
        name: clientName,
        username: clientUsername,
        email: clientEmail,
        address: {
            street: clientStreet,
            suite: clientSuite,
            city: clientCity,
            zipcode: clientZip,
        },
        phone: clientPhone,
        website: clientWebsite,
        company: {
            name: clientCompany,
            catchPhrase: clientCatchPhrase,
        },
        hiddenID: hiddenClientID
    }

    postData(reqBody)
}

const postData = async (data) => {
    let URL = 'https://jsonplaceholder.typicode.com/users/1'

    let headers = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    try {
        let res = await fetch(URL, headers)
        let json = await res.json()

        let recordsIndex = null
        const findRecord = storedUserData.filter((item, i) => {
            if (item.id == data['hiddenID']) {
                recordsIndex = i
            }
            return item.id == data['hiddenID']
        })

        // console.log(recordsIndex)
        let updatedUserRecord = findRecord[0]
        // console.log(userRecord)

        // Will need to be a splice
        storedUserData.splice(recordsIndex, 1, json)

        localStorage.setItem('userData', JSON.stringify(storedUserData))

        window.location.href = './index.html'
    } catch (error) {
        console.log(error)
    }





}

const updateForm = querySelectElement('form')
updateForm.addEventListener('submit', bundleUpdatedData)

populateForm()

