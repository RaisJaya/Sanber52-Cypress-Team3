// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


// Cypress.Commands.add('createAccount', (options = {}) => {
//     function makeid(length, includeAtSign = true) {
//       var result = '';
//       var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//       var charactersLength = characters.length;
//       for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//       }
//       if(includeAtSign) {
//         result += '@gmail.com'
//       }
//       return result;
//     }
  
//     const {
//       firstName = 'Dzikril',
//       lastName = 'Auliya',
//       invalidEmail = true,
//       password = 'Abcde12345' 
//     } = options;
    
//     const name = firstName.trim() !== '' ? firstName : ' ';
//     const email = makeid(6,invalidEmail);
  
//     cy.get('#firstname').type(name);
//     cy.get('#lastname').type(lastName);
//     cy.get('#email_address').type(email);
//     if (password.trim() !== '') {
//         cy.get('#password').type(password, { force: true });
//         cy.get('#password-confirmation').type(password, { force: true });
//       }
//     cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

//   });
    

//type 2 with fixture

// Cypress.Commands.add('createAccount', () => {
//     const generateRandomEmail = () => {
//       const randomPart = Math.floor(Math.random() * 10000);
//       return `user.${randomPart}@gmail.com`;
//     };
  
//     cy.fixture('user').then((userData) => {
//       userData.email = generateRandomEmail();
  
//       // Log the generated email untuk menampilkan random email
//       cy.log(`Generated email: ${userData.email}`);
  
//       cy.get('#firstname').type(userData.firstName);
//       cy.get('#lastname').type(userData.lastName);
//       cy.get('#email_address').type(userData.email);
//       cy.get('#password').type(userData.password);
//       cy.get('#password-confirmation').type(userData.password);
//       cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
//     });
//   });
//import createAccountPageCy from "../../support/pageObject/createAccountPage.cy"

 Cypress.Commands.add('createAccount', (options = {}) => {
     const generateRandomEmail = (includeAtSign = true, invalidEmail = false) => {
       const randomPart = Math.floor(Math.random() * 10000);
       const domain = includeAtSign && !invalidEmail ? '@gmail.com' : '';
       return `user.${randomPart}${domain}`;
     };
    
     const {
         firstName = 'Dzikril',
         lastName = 'Auliya',
         weakPassword = false,
         emptyPassword = false,
     }=options;

     cy.fixture('user').then((userData) => {
         // Use the provided email from options or generate a random/invalid email
         userData.email = options.email ? options.email : generateRandomEmail(options.includeAtSign, options.invalidEmail);
         // use the weak password
         userData.password = weakPassword ? 'weak' : 'StrongPassword123';

         //function for blank name
         userData.firstName = firstName;
         userData.lastName = lastName;


         // Log the generated email to the Cypress Command Log
         cy.log(`Generated email: ${userData.email}`);
         cy.log(`Generated password: ${userData.password}`);

    
       //userData.firstName = options.firstName !== undefined ? options.firstName : '';
      
    
         cy.get('#firstname').type(userData.firstName);
         cy.get('#lastname').type(userData.lastName);
         cy.get('#email_address').type(userData.email);
         cy.get('#password').invoke('val', emptyPassword ? '' : userData.password);
         cy.get('#password-confirmation').invoke('val', emptyPassword ? '' : userData.password);

     

       cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
     });
   });

   Cypress.Commands.add('login',()=>{
    cy.get('.panel > .header > .authorization-link > a').click()
    cy.get('#email').type('adhytia9@gmail.com')
    cy.get('#pass').type('StrongPassword123')
    cy.get('#send2').click()
   })

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })