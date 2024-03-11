import { OrderTypeEnum } from "../../src/utils/types";

export const goHome = () => {
        cy.visit('http://localhost:3000/');
    };

export const login = (username: string) => {
    cy.get('[data-cy="username-fld"]')
        .should('exist')
        .type(username);

    cy.get('[data-cy="user-submit-btn"]').click();
};

export const createOrder = (customer: string, orderType: OrderTypeEnum) => {
    cy.get('[data-cy="customer-fld"]')
        .should('exist')
        .type(customer);

    cy.get('[data-cy="order-type-select"]')
        .should('exist')
        .click();

    cy.get(`[data-value="${orderType}"]`)
        .should('exist')
        .click();

    cy.get('[data-cy="order-submit-btn"]').click();
};

export const verifyOrderOnTable = (userName: string, customer: string, orderType: OrderTypeEnum) => {
    cy.get('tbody')
        .contains('tr', userName)
        .should('contain', userName)
        .should('contain', orderType)
        .should('contain', customer)
}

export const deleteOrder = (userName: string, customer: string, orderType: string) => {
    cy.get('tbody')
        .contains('tr', customer)
        .should('contain', userName)
        .should('contain', orderType)
        .find('input[type="checkbox"]')
        .check({force:true});

    cy.get('[data-cy="delete-selected-btn"]').click();

    cy.wait(3000);
};


export const verifyPath = (path: string) => {
    cy.url().should('eq', `http://localhost:3000${path}`);
};

export const checkHelloUserText = (username: string) => {
    cy.get('[data-cy="hello-user-txt"]')
        .should('exist')
        .should('have.text', `Hello ${username}`);
};