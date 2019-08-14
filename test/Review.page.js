class Review {
    constructor(reviewIndex) {
        this.reviewContainer = browser.$(`.reviews > .comment:nth-of-type(${reviewIndex})`);
    }

    get email () { return this.reviewContainer.$('.email'); }
    get comment () { return this.reviewContainer.$('.comment'); }
}

module.exports = Review;
