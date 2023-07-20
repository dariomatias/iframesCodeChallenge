import Page from "./page";

class MainIframePage extends Page{
    public open () {
        return super.open('');
    }

    public async accessInternalIFrame() {
        for (const iframeSelector of ['iframe.result', 'iframe']) {
            const element = await browser.$(iframeSelector)
            await browser.switchToFrame(element)
        }
        await this.closeCookiesBanner();
    }

    private async closeCookiesBanner(){
        if (await $('div[id=privacy-banner]').isDisplayed())
            await $('a[id=banner-accept]').click()
    }
}

export default new MainIframePage();
