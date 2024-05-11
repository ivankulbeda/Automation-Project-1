beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

it('Check radio buttons and its content', () => {
    
    cy.get('input[type="radio"]').should('have.length', 4)

    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
})

it('list of cities changes depending on the choice of country', () => {
    cy.get('#country').children().should('have.length', 4)

    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

    cy.get('#country').select('Spain')

    cy.get('#city').children().should('have.length', 5)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
    cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
    cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

    cy.get('#country').select('Estonia')

    cy.get('#city').children().should('have.length', 4)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
    
    cy.get('#country').select('Austria')

    cy.get('#city').children().should('have.length', 4)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
    cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
    cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

    cy.get('#country').select('Austria')
    cy.get('#city').select('Vienna')
    cy.get('#country').select('Spain')
    cy.get('#city').children().should('have.length', 5)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
    cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
    cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
})
it('Check the checkboxes, their content and links', () => {
    cy.get('input[type="checkbox"]').should('have.length', 2)
    cy.get('input[type="checkbox"]').parent().should('contain','Accept our privacy policy')
    cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')
    cy.get('input[type="checkbox"]').next().eq(1).children().should('have.attr', 'href', 'cookiePolicy.html').click()

    cy.go('back')
    cy.log('Back in registration form 3')
 
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    
})
it('Check the email format', () => {

cy.get('input[type="email"').type('ivankulbeda')
cy.get('span[ng-show="myForm.email.$error.email"]').should('be.visible').and('have.text', 'Invalid email address.')
cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('ivankulbeda@gmail.com')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('not.be.visible')
       

})  

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

it('All fields are filled in + corresponding assertions', () => {
cy.get('#name').type('Ivan Kulbeda')
cy.get('input[type="email"').type('ivankulbeda@gmail.com')
cy.get('#country').select('Spain')
cy.get('#city').select('Madrid')
cy.get('input[type="date"]').eq(0).type('2024-05-10')
cy.get('input[type="radio"]').eq(0).check().should('be.checked')
cy.get('input[type="date"]').eq(1).type('1996-10-12')
cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('input[type="submit"]').should('be.enabled')
        cy.get('input[type="submit"]').click()
})

it('Only mandatory fields are filled in + corresponding assertions', () => {
    cy.get('input[type="email"').type('ivankulbeda@gmail.com')
    cy.get('#country').select('Spain')
    cy.get('#city').select('Madrid')
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="submit"]').should('be.enabled')
            cy.get('input[type="submit"]').click()
    })

it('Mandatory fields are absent + corresponding assertions', () => {
    cy.get('input[name="email"]').type('ivankulbeda@gmail.com')
    cy.get('input[name="email"]').clear()
    cy.get('span[ng-show="myForm.email.$error.required"]').should('be.visible').and('have.text', 'Email is required.')
    cy.get('#country').select('')
    cy.get('input[type="date"]').eq(0).type('2024-05-10')
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="date"]').eq(1).type('1996-10-12')
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
    cy.get('input[type="submit"]').should('be.disabled')
        })

    it.only('uploads a file', () => {
        const filename = 'Screenshot_58.png'
        cy.get('#myFile').attachFile(filename)
        cy.get('#myFile').next().should('have.text', 'Submit file').click()
        cy.get('h1').contains('Submission received')
        cy.go('back')
        cy.log('Back in registration form 3')
            });