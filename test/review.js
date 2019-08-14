const request = require('sync-request');
const reviewForm = require('./reviewForm.page.js');
const Review = require('./Review.page.js');

describe('The product review form', () => {

    beforeEach(() => {
        // Go to the product page
        browser.url("/product-page.html");
    });
    
    it('should add a review when submitted properly', () => {

        reviewForm.submit("email@example.com", "Robots rules!!!");

        // Assert that our review now appears in the list
        browser.$("#panel").waitUntil(() => {
            return browser.$(".comment=Robots rules!!!").isExisting() === true;
        }, 3000, "Review should appear in the list");
    });

    it('should show an error message if the input is wrong', () => {
        // assert that error message isn't showing to start
        let isErrorShowing = reviewForm.reviewError.isDisplayed();
        expect(isErrorShowing).to.be.false;
        
        // submit form without entering content
        reviewForm.submit();
        
        // assert that error message is now showing
        isErrorShowing = reviewForm.reviewError.isDisplayed();
        expect(isErrorShowing).to.be.true;
    });

    it('should hide the error message when input is corrected', () => {
        // submit form without entering content
        reviewForm.submit();

        // assert that error message is now showing
        let isErrorShowing = reviewForm.emailError.isDisplayed();
        expect(isErrorShowing).to.be.true;
        
        reviewForm.submit("email@example.com");

        isErrorShowing = reviewForm.emailError.isDisplayed();
        expect(isErrorShowing, ).to.be.false;

        reviewForm.submit("email@example.com", "Wassup Robot!");

        const isMainErrorShowing = reviewForm.reviewError.isDisplayed();
        const isContentErrorShowing = reviewForm.reviewError.isDisplayed();
        expect(isMainErrorShowing, "Main error not showing").to.be.false
        expect(isContentErrorShowing, "Content error not showing").to.be.false;
    });

    it('should focus on the first invalid input field on error', () => {
        let emailHasFocus = browser.$("#review-email").isFocused();
        expect(emailHasFocus, "email should not have focus").to.be.false;

        reviewForm.submit();
        
        emailHasFocus = browser.$("#review-email").isFocused();
        expect(emailHasFocus, "email should now have focus").to.be.true;

        reviewForm.submit("email@example.com");
        
        const contentHasFocus = browser.$("#review-content").isFocused();
        expect(contentHasFocus, "review content field should have focus").to.be.true;
    });

    it('should allow multiple reviews', () => {
        const res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');

        let comments = JSON.parse(res.getBody().toString('utf8'));
        comments = comments.slice(0, 20);

        comments.forEach((comment, idx) => {
            reviewForm.submit(comment.email, comment.name);
            const review = new Review(idx + 3);
            
            const email = review.email.getText();
            expect(email).to.equal(comment.email);

            const reviewText = review.comment.getText();
            expect(reviewText).to.equal(comment.name);
        });
    });
});
