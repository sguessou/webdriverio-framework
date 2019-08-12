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

            // waitForText on button
            browser.$("button=Buy Now").waitForDisplayed(3000);

            // Verify "buy now" is still disabled
            let isBtnEnabled = browser.$("#buyNowButton").isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after completing purchase").to.be.false;
        });
    });
});
