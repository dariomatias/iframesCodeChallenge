import Page from "./page";

class InternalIframePage extends Page{
    public get aboutUsLink(){
        return $(`a.nav-link[href='/about/index.htm']`)
    }
    async accessAboutPage() {
        this.aboutUsLink.scrollIntoView()
        this.aboutUsLink.click()
    }
}

export default new InternalIframePage();
