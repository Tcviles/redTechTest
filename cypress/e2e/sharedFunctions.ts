import { OrderTypeEnum } from "../../src/utils/types"

export const goHome = () => {
    cy.visit('http://localhost:3000/')
}

export const clickButton = (dataCy: string) => {
    cy.get(`[data-cy="${dataCy}"]`).click()
}

export const localNav = (page: string) => {
    switch (page) {
        case "home": clickButton('red-tech-logo')
            break
        case "createOrder": clickButton('create-order-btn')
            break
        case "updateUser": clickButton('update-user-btn')
            break
        default:
            break
    }
}

export const login = (username: string) => {
    cy.get('[data-cy="username-fld"]').type(username)
    clickButton('user-submit-btn')
}

export const populateOrderForm = (customer: string, orderType: OrderTypeEnum) => {
    cy.get('[data-cy="customer-fld"]').type(customer)
    clickButton('order-type-select')
    clickButton(`value-${orderType}`)
}

export const updateSearch = (customer: string) => {
    cy.get('[data-cy="search-fld"]').clear().type(customer)
}

export const updateTypeFilter = (orderType: OrderTypeEnum | "all-types") => {
    clickButton('type-fltr')
    clickButton(`value-${orderType}`)
}

export const createDraft = (customer: string, orderType: OrderTypeEnum) => {
    populateOrderForm(customer, orderType)
    clickButton('save-draft-btn')
}

export const createOrder = (customer: string, orderType: OrderTypeEnum) => {
    populateOrderForm(customer, orderType)
    clickButton('order-submit-btn')
}

export const verifyOrderOnTable = (userName: string, customer: string, orderType: OrderTypeEnum) => {
    localNav('home')
    cy.get('tbody')
        .contains('tr', customer)
        .should('contain', userName)
        .should('contain', orderType)
        .should('contain', customer)
}

export const verifyOrderNotOnTable = (customer: string) => {
    localNav('home')
    cy.get('tbody')
        .should('not.contain', customer)
}

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
    clickButton('delete-selected-btn')
    cy.wait(500)
}

export const deleteOrders = (ordersToDelete: {userName: string, customer: string, orderType: OrderTypeEnum}[]) => {
    ordersToDelete.forEach(order => {
        cy.get('tbody')
            .contains('tr', order.customer)
            .should('contain', order.userName)
            .should('contain', order.orderType)
            .find('input[type="checkbox"]')
            .check({ force: true })
    })
    clickButton('delete-selected-btn')
    cy.wait(500)
}

export const updateOrder = (customer: string, orderType: OrderTypeEnum) => {
    populateOrderForm(customer, orderType)
    clickButton('update-order-btn')
    cy.wait(500)
}

export const verifyPath = (path: string) => {
    cy.url().should('eq', `http://localhost:3000${path}`)
}

export const checkHelloUserText = (username: string) => {
    cy.get('[data-cy="hello-user-txt"]').should('have.text', `Hello ${username}`)
}
