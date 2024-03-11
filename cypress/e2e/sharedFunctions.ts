import { OrderTypeEnum } from "../../src/utils/types"

export const goHome = () => {
    cy.visit('http://localhost:3000/')
}

export const clickHome = () => {
    cy.get('[data-cy="red-tech-logo"]').click()
}

export const clickCreateOrder = () => {
    cy.get('[data-cy="create-order-btn"]').click()
}

export const clickUpdateUser = () => {
    cy.get('[data-cy="update-user-btn"]').click()
}

export const login = (username: string) => {
    cy.get('[data-cy="username-fld"]')
        .should('exist')
        .type(username)

    cy.get('[data-cy="user-submit-btn"]').click()
}

export const populateOrderForm = (customer: string, orderType: OrderTypeEnum) => {
    cy.get('[data-cy="customer-fld"]')
        .should('exist')
        .type(customer)

    cy.get('[data-cy="order-type-select"]')
        .should('exist')
        .click()

    cy.get(`[data-value="${orderType}"]`)
        .should('exist')
        .click()
}

export const createDraft = (customer: string, orderType: OrderTypeEnum) => {
    populateOrderForm(customer, orderType)

    cy.get('[data-cy="save-draft-btn"]').click()
}

export const createOrder = (customer: string, orderType: OrderTypeEnum) => {
    populateOrderForm(customer, orderType)

    cy.get('[data-cy="order-submit-btn"]').click()
}

export const verifyOrderOnTable = (userName: string, customer: string, orderType: OrderTypeEnum) => {
    cy.get('tbody')
        .contains('tr', userName)
        .should('contain', userName)
        .should('contain', orderType)
        .should('contain', customer)
        .should('exist')
}

export const verifyOrderNotOnTable = (userName: string, customer: string, orderType: OrderTypeEnum) => {
    clickHome()
    cy.get('tbody')
        .should('not.contain', customer)
        .should('not.contain', orderType)
};

export const verifyDraft = (customer: string, orderType: OrderTypeEnum) => {
    cy.get('[data-cy="customer-fld"]')
        .should('exist')
        .invoke('html')
        .should('include', customer)

    cy.get('[data-cy="order-type-select"]')
        .should('exist')
        .invoke('text')
        .should('include', orderType)
}

export const deleteOrder = (userName: string, customer: string, orderType: OrderTypeEnum) => {
    cy.get('tbody')
        .contains('tr', customer)
        .should('contain', userName)
        .should('contain', orderType)
        .find('input[type="checkbox"]')
        .check({ force: true })

    cy.get('[data-cy="delete-selected-btn"]').click()

    cy.wait(500)
}

export const updateOrder = (customer: string, orderType: OrderTypeEnum) => {
    populateOrderForm(customer, orderType)

    cy.get('[data-cy="update-order-btn"]').click()

    cy.wait(500)
}


export const verifyPath = (path: string) => {
    cy.url().should('eq', `http://localhost:3000${path}`)
}

export const checkHelloUserText = (username: string) => {
    cy.get('[data-cy="hello-user-txt"]')
        .should('exist')
        .should('have.text', `Hello ${username}`)
}