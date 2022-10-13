describe("When user navigates opens StopButton page...", () => {
  it("it loads the page with a single button in the middle", () => {
    cy.visit("http://localhost:3000/StopButton");
    cy.contains("Stop");
  });
});

describe("when user clicks on the button", () => {
  let currentColor = "rgb(255, 255, 255)";

  it("it changes color", () => {
    const button = cy.get("#__next > div > div.appMain > button");
    button
      .should("have.css", "background-color", currentColor)
      .click()
      .invoke("css", "background-color")
      .then((bgColor) => {
        expect(bgColor).to.not.eq(currentColor);
        currentColor = JSON.stringify(bgColor).slice(1, -1);
      });
  });
  let currentHeight = 110;
  it("and the height increases", () => {
    const button = cy.get("#__next > div > div.appMain > button");
    button
      .should("have.css", "height", `${currentHeight}px`)
      .click()
      .invoke("css", "height")
      .then((height) => {
        expect(height).to.not.eq(currentHeight);
        currentHeight = Number(JSON.stringify(height).slice(1, -3));
      });
  });
});
