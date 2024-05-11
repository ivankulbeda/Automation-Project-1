beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass123')
    cy.get('h2').contains('Password').click()
}

describe('Section 1: Functional tests', () => {
    it('User can use only same both first and validation passwords', ()=>{
        
        inputValidData('ThankYouBrother')
        cy.get('.submit_button').should('not.be.enabled')
        cy.contains('Password section').click()
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('[name="confirm"]').clear('').type('MyPass')
        cy.contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
        
    })
    
    it('User can submit form with all fields added', ()=>{
        
        inputValidData('ThankYouBrother')
        cy.get('[type="radio"]').check('JavaScript')
        cy.get('[type="checkbox"]').check('Bike')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('cat')
        cy.get('[name="confirm"]').clear('').type('MyPass')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        
        inputValidData('ThankYouBrother')
        cy.get('[name="confirm"]').clear('').type('MyPass')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled').click()

    })

    it('User can not submit form with 1 mandatory field absence', ()=>{
        
        inputValidData('TThankYouBrother')
        cy.get('[name="confirm"]').clear('').type('MyPass')
        cy.get('#email').clear()
        cy.get('.submit_button').click().should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible')
    
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {

        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
        
    })

    it('Check that the Cypress logo is correct and has correct size', () => {
        
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.greaterThan', 115).and('be.lessThan', 117)
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.greaterThan', 87).and('be.lessThan', 89)
        
    });

    it('Check navigation part 1', () => {

        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part 2', () => {

        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
     

    it('Check that radio button list is correct', () => {

        cy.get('input[type="radio"]').should('have.length', 4)

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

    it('Check that checkbox list is correct', () => {
        
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    })


    it('Car dropdown is correct', () => {
        
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        
        cy.get('#animal').select(4).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])

            cy.get('#animal').select(1).should('have.value', 'cat')
            cy.get('#animal').select(4).should('have.value', 'cow')
            cy.get('#animal').select(1).should('not.be.selected')
        })
    })

})

