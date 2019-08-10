describe('Shop CTA Button', () => {

    it('should match the title of the main page', () => {
        browser.url('./');
        
        browser.getTitle().should.be.equal('Robot Parts Emporium');
    });

    it('should link to the product page and match the title', () => {
        browser.url('./');
        
        const link = browser.$('.shop-callout a');
        link.click();

        browser.getTitle().should.be.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');

        browser.getUrl().should.be.equal('http://127.0.0.1:8303/product-page.html');
    });
    
});
