beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('Ivan_Kulbeda')
        cy.get('#email').type('ivankulbeda@gmail.com')
        cy.get('[name="name"]').type('Ivan')
        cy.get('#lastName').type('Kulbeda')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('cat')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('IvanKulbeda')
        cy.get('[name="confirm"]').type('Ivan')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('have.css', 'display', 'block')
        cy.get('#password_error_message').should('contain', 'Passwords do not match!')

    })

    it('User can use only same both first and validation passwords', ()=>{
        
        cy.get('#username').type('Ivan_Kulbeda')
        cy.get('#email').type('ivankulbeda@gmail.com')
        cy.get('[name="name"]').type('Ivan')
        cy.get('#lastName').type('Kulbeda')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('cat')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('IvanKulbeda')
        cy.get('[name="confirm"]').type('IvanKulbeda')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

        })
       
   
    
    it('User can submit form with all fields added', ()=>{
        
            cy.get('#username').type('Ivan_Kulbeda')
            cy.get('#email').type('ivankulbeda@gmail.com')
            cy.get('[name="name"]').type('Ivan')
            cy.get('#lastName').type('Kulbeda')
            cy.get('#cars').select('Opel')
            cy.get('#animal').select('cat')
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('#htmlFavLanguage').check ()
            cy.get('input[name="password"]').type('IvanKulbeda')
            cy.get('[name="confirm"]').type('IvanKulbeda')
            cy.get('#vehicle1').check ()
            cy.get('.submit_button').should('be.enabled')
            cy.get('.submit_button').click()
            cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')
    
           
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('Ivan_Kulbeda') 
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')
      
  

    })

    
    it('User can not submit form when at least one mandatory field is not filled', ()=>{
        cy.get('#username').type('Ivan_Kulbeda')
        cy.get('#username').clear()
        cy.get('#email').type('ivankulbeda@gmail.com')
        cy.get('[name="name"]').type('Ivan')
        cy.get('#lastName').type('Kulbeda')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('cat')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#htmlFavLanguage').check ()
        cy.get('input[name="password"]').type('IvanKulbeda')
        cy.get('[name="confirm"]').type('IvanKulbeda')
        cy.get('#vehicle1').check ()
        cy.get('.submit_button').should('be.disabled')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 100)
           .and('be.greaterThan', 50) 
    });

    it.only('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.viewport(750, 1080)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 3)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

 
    it.only('Check that checkbox list is correct', () => {
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[class="checkbox vehicles"]').eq(0).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')

        cy.get('input[class="checkbox vehicles"]').eq(0).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')
    })  

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animals dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

    })     
})

function inputValidData(Ivan_Kulbeda) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Ivan_Kulbeda')
    cy.get('#email').type('ivankulbeda@gmail.com')
    cy.get('[data-cy="name"]').type('Ivan')
    cy.get('#lastName').type('Kulbeda')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    cy.get('#password').type('IvanKulbeda')
    cy.get('#confirm').type('IvanKulbeda')
    cy.get('h2').contains('Password').click()
}