describe("Cart Functionality", () => {
    
    beforeEach(() => {
        browser.url("/product-page.html"); 
    });

    it('should only let you buy after setting a quantity', () => {
        let isBtnEnabled = browser.$("#buyNowButton").isEnabled();
        expect(isBtnEnabled, "buy now 'should be disabled to begin'").to.be.false;

        // Add qty
        browser.$("#qty").setValue(10);

        isBtnEnabled = browser.$("#buyNowButton").isEnabled();
        expect(isBtnEnabled, "buy now 'should be disabled to begin'").to.be.true;
    });

    describe("checkout process", () => {
        beforeEach(() => {
            // Add qty
            browser.$("#qty").setValue(10);

            // Click "buy now"
            browser.$("#buyNowButton").click();
        });

        it('should disable buy now button during processing', () => {
            // Verify "buy now" is disabled
            let isBtnEnabled = browser.$("#buyNowButton").isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after clicking").to.be.false;

            let btnText = browser.$("#buyNowButton").getText();
            expect(btnText, "Verify 'buy now' text has changed").to.contain("Purchasing");
        });

        it('should reset button text and state', () => {
            let isBuyNowTextExisting = browser.$("button=Buy Now").isExisting();
            expect(isBuyNowTextExisting, "'buy now' should be disabled after completing purchase").to.be.false;

            // waitForDisplayed on button
            browser.$("button=Buy Now").waitForDisplayed(3000);

            // Verify "buy now" is still disabled
            let isBtnEnabled = browser.$("#buyNowButton").isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after completing purchase").to.be.false;
        });

        it('should clear input after completion', () => {
            // waitForDisplayed for qty input
            browser.$("#qty").waitUntil(() => {
                return browser.$("#qty").getValue() === '';
            }, 3000, 'Expected qty value to be empty after 3s');
        });

        it('should hide thank you message after clicking close button', () => {
            // waitForExist "thank you message"
            browser.$(".callout*=Thank you human").waitForExist(3000);

            // click close button
            browser.$(".close-button").click();

            // check the style of text after it has disappeared
           browser.$(".callout").waitUntil(() => {
                return browser.$(".callout").getCSSProperty("display").value === "none";
            }, 3000, "Expected display style of text to be 'none'");
        });

        it('should reset button text after purchase completes', () => {
            // Verify button now says 'buy now'
            let btnText = browser.$("#buyNowButton").getText();
            browser.$("#buyNowButton").waitUntil(() => {
                return browser.$("#buyNowButton").getText() === "Buy Now";
            }, 3000, 'Button text should change to `Buy Now`');
        });
    });
});
