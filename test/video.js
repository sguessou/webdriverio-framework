browser.addCommand('isVideoPaused', function () {
    return browser.execute(() => {
        const video = document.querySelector('#dance-video');
        return video.paused;
    });
    
});

describe('About us video', () => {
    beforeEach(() => {
        browser.url('/');
        browser.$('=About Us').click();
    });

    it('should open the modal with video paused', () => {
        const isPaused = browser.isVideoPaused();
        expect(isPaused).to.be.true;
    });

    it('play video on "play" click', () => {
        browser.$("#play-btn").click();
        
        const isPaused = browser.isVideoPaused();
        expect(isPaused).to.be.false;
    });

    it('pause video on "pause" click', () => {
        browser.$("#play-btn").click();

        browser.pause(500);

        browser.$("#pause-btn").click();

        const isPaused = browser.isVideoPaused();
        expect(isPaused).to.be.true;
    });
});
