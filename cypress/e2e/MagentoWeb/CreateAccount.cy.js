import createAccountPageCy from "../../support/pageObject/createAccountPage.cy"

describe ('Create Account', () => {
    beforeEach(() =>{
        cy.visit('/customer/account/create/')
    })


it('Verify Success Create Account', () => {
    cy.createAccount()

    cy.get(createAccountPageCy.SuccessAlert).should('contain','Thank you for registering with Main Website Store.')
})

it('verify Success Create Account With Specific Email', () => {
    const specifiedEmail = 'adhytia9@gmail.com';
    cy.createAccount({ email: specifiedEmail })
})

it('Verify Failed Create Account with Exist Email', () => {
    const specifiedEmail = 'adhytia9@gmail.com';
    cy.createAccount({ email: specifiedEmail })

    cy.get(createAccountPageCy.ErorrAlert).should('contain','There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
})

it('verify Failed Create Account with invalid email', () => {
    cy.createAccount({invalidEmail:true})
    cy.get(createAccountPageCy.ErorrEmail).should('have.text','Please enter a valid email address (Ex: johndoe@domain.com).')
})

it('verify failed create account with blank name', () => {
    cy.createAccount({ firstName: ' ' });
    cy.get(createAccountPageCy.ErorrName).should('have.text','This is a required field.')
})

it('Verify Failed Create Account with weak password', () => {
    cy.createAccount({ weakPassword: true });
    cy.get(createAccountPageCy.ErorPass).should('have.text','Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
})

it.only('Verify Failed Create Account with Blank Password', () => {
    cy.createAccount({emptyPassword: true});
    cy.get(createAccountPageCy.ErorPass).should('have.text','This is a required field.')
})


})