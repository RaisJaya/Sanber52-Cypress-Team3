import createAccountPageCy from "../../support/pageObject/createAccountPage.cy"
import editAccountInformationPageCy from "../../support/pageObject/editAccountInformationPage.cy"
const user = require("../../fixtures/user.json") 

describe ('Edit Account', () => {
    beforeEach(() =>{
        cy.visit('')
        cy.login()
        cy.wait(2500) // Waiting for dropdown
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.wait(1000)
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
    })


    it.only('unsuccessfully changed the name - empty first name',() => {
        cy.get(editAccountInformationPageCy.editBtn).click()
        cy.get(editAccountInformationPageCy.Name1).clear()
        cy.get(editAccountInformationPageCy.Name2).clear().type(user.newLastName)
        cy.get(editAccountInformationPageCy.saveEditBtn).click()
        cy.get('#firstname-error', { timeout: 100}).should('contain.text', 'This is a required field')
    })

    it('unsuccessfully changed the name - empty last name',() => {
        cy.get(editAccountInformationPageCy.editBtn).click()
        cy.get(editAccountInformationPageCy.Name1).clear().type(user.newFirstName)
        cy.get(editAccountInformationPageCy.Name2).clear()
        cy.get(editAccountInformationPageCy.saveEditBtn).click()
        cy.get('#lastname-error', { timeout: 100}).should('contain.text', 'This is a required field')
    })

    it.only('Successfully changed the name - first name and last name',() => {
        cy.get(editAccountInformationPageCy.editBtn).click()
        cy.get(editAccountInformationPageCy.Name1)
        .clear()
        .type(user.newFirstName)
        cy.get(editAccountInformationPageCy.Name2).clear()
        .type(user.newLastName)
        cy.get(editAccountInformationPageCy.saveEditBtn).click()
        cy.get(editAccountInformationPageCy.msgAlert, { timeout: 3000}).should('contain.text', 'You saved the account information.')
    })

    it('unsuccessfully changed the name - and valid email',() => {
        cy.get(editAccountInformationPageCy.editBtn).click()
        cy.get(editAccountInformationPageCy.checkEmailBtn).click()
        cy.wait(500)
        cy.get(editAccountInformationPageCy.Name1)
        .clear()
        .type(user.newFirstName)
        cy.get(editAccountInformationPageCy.Name2).clear()
        .type(user.newLastName)
        cy.get(editAccountInformationPageCy.Email)
        .clear()
        .type(user.newEmail)
        cy.get(editAccountInformationPageCy.saveEditBtn).click()
    })

    it.skip('Successfully changed the name - and valid email',() => {
        cy.get(editAccountInformationPageCy.editBtn).click()
        cy.get(editAccountInformationPageCy.checkEmailBtn).click()
        cy.wait(500)
        cy.get(editAccountInformationPageCy.Name1)
        .clear()
        .type(user.newFirstName)
        cy.get(editAccountInformationPageCy.Name2).clear()
        .type(user.newLastName)
        cy.get(editAccountInformationPageCy.Email)
        .clear()
        .type(user.newInvalidEmail)
        cy.get(editAccountInformationPageCy.Pass)
        .clear()
        .type(user.password)
        cy.get(editAccountInformationPageCy.saveEditBtn).click()
    })

    it.skip('Successfully changed the name - and valid email but False Password',() => {
        cy.get(editAccountInformationPageCy.editBtn).click()
        cy.get(editAccountInformationPageCy.checkEmailBtn).click()
        cy.wait(500)
        cy.get(editAccountInformationPageCy.Name1)
        .clear()
        .type(user.newFirstName)
        cy.get(editAccountInformationPageCy.Name2).clear()
        .type(user.newLastName)
        cy.get(editAccountInformationPageCy.Email)
        .clear()
        .type(user.newInvalidEmail)
        cy.get(editAccountInformationPageCy.Pass)
        .clear()
        .type(user.newInvalidPass)
        cy.get(editAccountInformationPageCy.saveEditBtn).click()
    })
})

