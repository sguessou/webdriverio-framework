class ReviewForm {
    get formButton() { return browser.$("#comment-form > button"); }
    get email() { return browser.$("#review-email"); }
    get content() { return browser.$("#review-content"); }

    get formError() { return browser.$("p=There are some errors in your review."); }
    get emailError() { return browser.$("p=Please enter a valid email address."); }
    get reviewError() { return browser.$("p=A review without text isn't much of a review."); }
    
    submit (email, review) {
        if (email) {
            // Enter the email address
            this.email.setValue(email);
        }

        if (review) {
            // Enter text in the comment form
            this.content.setValue(review);
        }

        // Move focus and click button to submit the review
        this.formButton.click();
        this.formButton.click();
    }
}

module.exports = new ReviewForm();
