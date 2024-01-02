import loginPage from "../../support/pageObject/login.page"

const userlogin = require('../../fixtures/userlogin.json')

describe('Login', () => {

    beforeEach(() =>{
        cy.visit('/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2xvZ291dFN1Y2Nlc3Mv/')
        cy.get('.base').should('contain.text','Customer Login')
        cy.get('.login-container > .block-customer-login > .block-title > #block-customer-login-heading').should('contain.text','Registered Customer')
        cy.get('.block-customer-login > .block-title').should('contain.text','Registered Customer')
    })

    it.only('Success Login', () => {
        cy.login(userlogin.validEmail,userlogin.validPassword)
        cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
    })
    
    it('Failed Login-email invalid', () => {
       cy.login(userlogin.invalidEmail,userlogin.validPassword)
        cy.get(loginPage.Erroremail).should('contain.text','Please enter a valid email address (Ex: johndoe@domain.com).')
    })

    it('Failed Login-password invalid', () => {
        cy.login(userlogin.validEmail,userlogin.invalidPassword)
        cy.get(loginPage.ErrorAlert).should('contain.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    })

    it('Failed Login-blank password', () => {
        cy.login(userlogin.validEmail,'')
        cy.get(loginPage.Errorpassword).should('contain.text','This is a required field.')
    })

    it('Failed Login-blank email', () => {
        cy.login('',userlogin.validPassword)
        cy.get(loginPage.Erroremail).should('contain.text','This is a required field.')
    })

    it('Failed Login-blank email passsword', () => {
        cy.login('','')
        cy.get(loginPage.Erroremail).should('contain.text','This is a required field.')
        cy.get(loginPage.Errorpassword).should('contain.text','This is a required field.')
    })

    afterEach(() =>{
        // cy.get('.base').should('be.visible')
           })
    
    })
    
