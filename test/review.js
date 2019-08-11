describe('The product review form', () => {

    beforeEach(() => {
        // Go to the product page
        browser.url("/product-page.html");
    });
    
    it('should add a review when submitted properly', (done) => {
        // Enter the email address
        browser.$("#review-email").setValue("email@example.com");

        // Enter text in the comment form
        browser.$("#review-content").setValue("Robots rules!!!");

        // Submit the review
        browser.$("#comment-form > button").click();

        // Assert that our review now appears in the list
        const hasReview = browser.$(".comment=Robots rules!!!").isExisting();
        expect(hasReview, "comment text exists").to.be.true;
    });

    it('should show an error message if the input is wrong', () => {
        // assert that error message isn't showing to start
        let isErrorShowing = browser.$("p=There are some errors in your review.").isDisplayed();
        expect(isErrorShowing).to.be.false;
        
        // submit form without entering content
        browser.$("#comment-form > button").click();
        
        // assert that error message is now showing
        isErrorShowing = browser.$("p=There are some errors in your review.").isDisplayed();
        expect(isErrorShowing).to.be.true;
    });

    it('should hide the error message when input is corrected', () => {
        // submit form without entering content
        browser.$("#comment-form > button").click();

        // assert that error message is now showing
        let isErrorShowing = browser.$("p=Please enter a valid email address.").isDisplayed();
        expect(isErrorShowing).to.be.true;
        
        browser.$("#review-email").setValue("email@example.com");

        // move focus
        browser.$("#review-content").click();

        isErrorShowing = browser.$("p=Please enter a valid email address.").isDisplayed();
        expect(isErrorShowing).to.be.false;

        // Enter text in the comment form
        browser.$("#review-content").setValue("Robots rules!!!");

        // move focus and submit the review
        browser.$("#comment-form > button").click();
        browser.$("#comment-form > button").click();
        
        const isMainErrorShowing = browser.$("p=There are some errors in your review.").isDisplayed();
        const isContentErrorShowing = browser.$("p=A review without text isn't much of a review.").isDisplayed();
       
        expect(isMainErrorShowing, "Main error not showing").to.be.false;
        expect(isContentErrorShowing, "Content error not showing").to.be.false;
    });

    it.only('should focus on the first invalid input field on error', () => {
        let emailHasFocus = browser.$("#review-email").isFocused();
        expect(emailHasFocus, "email should not have focus").to.be.false;

        browser.$("#comment-form > button").click();
        
        emailHasFocus = browser.$("#review-email").isFocused();
        expect(emailHasFocus, "email should now have focus").to.be.true;

        browser.$("#review-email").setValue("email@example.com");

        // move focus and submit form
        browser.$("#comment-form > button").click();
        browser.$("#comment-form > button").click();
        
        const contentHasFocus = browser.$("#review-content").isFocused();
        expect(contentHasFocus, "review content field should have focus").to.be.true;
    });
});
