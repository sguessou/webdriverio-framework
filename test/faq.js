describe("Homepage FAQ Accordion", () => {
    beforeEach(() => {
        browser.url("./");
    });
    
    it("should show first section on page load", () => {
        const $el = browser.$(".accordion .accordion-item:first-child .accordion-content");
        const firstHeight =  $el.getCSSProperty("height");
        expect(firstHeight.parsed.value).to.be.greaterThan(0);
    });

    it("should not show other content", () => {
        const $el = browser.$(".accordion .accordion-item:nth-of-type(2) .accordion-content");
        const secondDisplay =  $el.getCSSProperty("display");
        expect(secondDisplay.value).to.equal("none");
    });

    it("should expand/hide content on click", () => {
        const $link = browser.$(".accordion .accordion-item:nth-of-type(2) a");
        $link.click();
        browser.pause(500);
        const $el = browser.$(".accordion .accordion-item:nth-of-type(2) .accordion-content"); 
        const secondHeight = $el.getCSSProperty("height");
        expect(secondHeight.parsed.value).to.be.greaterThan(0);

        const $first = browser.$(".accordion .accordion-item:first-child .accordion-content");
        const firstDisplay =  $first.getCSSProperty("display");
        expect(firstDisplay.value).to.equal("none");
    });

    it('should handle multiple clicks in rapid succession', () => {
        // click 20 times
        for (let i = 0; i < 50; i++) {
            var num = (i % 3) + 1;
            browser.$(`.accordion .accordion-item:nth-child(${num}) a`).click();
        }
        const classnames = browser.$(`.accordion .accordion-item:nth-child(${num})`).getAttribute('class');
        expect(classnames).to.contain('is-active');
    });
});
