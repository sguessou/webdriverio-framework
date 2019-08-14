const cart = require('./cart.page.js');

describe("Cart Functionality", () => {
    beforeEach(() => {
        browser.url("/product-page.html"); 
    });

    it('should only let you buy after setting a quantity', () => {
        let isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "buy now 'should be disabled to begin'").to.be.false;

        // Add qty
        cart.qty.setValue(10);

        isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "buy now 'should be disabled to begin'").to.be.true;
    });

    describe("checkout process", () => {
        beforeEach(() => {
            // Add qty
            cart.qty.setValue(10);

            // Click "buy now"
            cart.btn.click();
        });

        it('should disable buy now button during processing', () => {
            // Verify "buy now" is disabled
            let isBtnEnabled = cart.btn.isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after clicking").to.be.false;

            let btnText = cart.btn.getText();
            expect(btnText, "Verify 'buy now' text has changed").to.contain("Purchasing");
        });

        it('should reset button text and state', () => {
            let isBuyNowTextExisting = browser.$("button=Buy Now").isExisting();
            expect(isBuyNowTextExisting, "'buy now' should be disabled after completing purchase").to.be.false;

            // waitForDisplayed on button
            browser.$("button=Buy Now").waitForDisplayed(3000);

            // Verify "buy now" is still disabled
            let isBtnEnabled = cart.btn.isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after completing purchase").to.be.false;
        });

        it('should clear input after completion', () => {
            // waitForDisplayed for qty input
            cart.qty.waitUntil(() => {
                return cart.qty.getValue() === '';
            }, 3000, 'Expected qty value to be empty after 3s');
        });

        it('should hide thank you message after clicking close button', () => {
            // waitForExist "thank you message"
            cart.thankYou.waitForExist(3000);

            // click close button
            browser.$(".close-button").click();

            // check the style of text after it has disappeared
           browser.$(".callout").waitUntil(() => {
                return browser.$(".callout").getCSSProperty("display").value === "none";
            }, 3000, "Expected display style of text to be 'none'");
        });

        it('should reset button text after purchase completes', () => {
            // Verify button now says 'buy now'
            let btnText = cart.btn.getText();
            cart.btn.waitUntil(() => {
                return cart.btn.getText() === "Buy Now";
            }, 3000, 'Button text should change to `Buy Now`');
        });
    });
});
