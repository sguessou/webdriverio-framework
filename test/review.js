describe('The product review form', () => {
    it('should add a review when submitted properly', (done) => {
        // Go to the product page
        browser.url("/product-page.html");

        // Enter the email address
        browser.$("#review-email").setValue("email@example.com");

        // Enter text in the comment form
        browser.$("#review-content").setValue("Robots rules!!!");

        // Submit the review
        browser.$("#comment-form > button").click();

        const hasReview = browser.$(".comment=Robots rules!!!").isExisting();
        expect(hasReview, "comment text exists").to.be.true;
    });
    
    // Assert that our review now appears in the list
    // it should show an error message if the input is wrong
    // it should hide the error message when input is corrected
    // it should focus on the first invalid input field on error
});
