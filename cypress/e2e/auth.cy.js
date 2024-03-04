describe("auth checking", () => {
  it("login and logout", () => {
    cy.visit("http://localhost:3000/");
    cy.get("a").contains("Зарегистрироваться").click();
    cy.location("pathname").should("include", "registration");
    cy.get('input[placeholder="Введите email"]').type("test@gmail.com");
    cy.get('input[placeholder="Введите пароль"]').type("Query12345");
    cy.get("button").contains("Зарегистрироваться").click();
    cy.get('input[placeholder="Введите email"]').type("{selectall}{backspace}");
    cy.get('input[placeholder="Введите email"]').type("test@gmail.com");
    cy.get('input[placeholder="Введите пароль"]').type("{selectall}{backspace}");
    cy.get('input[placeholder="Введите пароль"]').type("Query12345");
  });
});
