describe('Shop CTA Button', () => {

    it('should match the title of the main page', () => {
        browser.url('./');
        
        const title = browser.getTitle();
        expect(title).to.be.equal('Robot Parts Emporium');
    });

    it('should link to the product page and match the title', () => {
        browser.url('./');
        
        const link = browser.$('.shop-callout a');
        link.click();

        const title = browser.getTitle();
        expect(title).to.be.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');

        const url = browser.getUrl();
        expect(url).to.include('product-page.html', 'URL mismatch');
    });
    
});
