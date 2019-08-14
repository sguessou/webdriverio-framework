class Cart  {
    get btn() { return browser.$("#buyNowButton"); }
    get qty() { return browser.$("#qty"); }
    get thankYou() { return browser.$(".callout*=Thank you human"); }
}

module.exports = new Cart();

