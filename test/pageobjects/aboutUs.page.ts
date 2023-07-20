import Page from "./page";

class AboutUsPage extends Page{
    private get allLinks(){
        return $$(`a[href]`)
    }

    private get allButtons(){
        return $$('.btn')
    }

    private get inputFields(){
        return $$('input')
    }

    async getAllLinkUrls() {
        const links = await this.allLinks.map(link => link.getAttribute("href"))
        return links
    }

    async getAllButtons() {
        const buttons = await this.allButtons.map(button => button.getText)
        return buttons
    }

    async getAllInputFields() {
        const inputFields = await this.inputFields.map(input => input.getAttribute('name'))
        return inputFields
    }

    async showDetails() {
        const pageUrl = await browser.getUrl()
        const allLinksUrls = await this.getAllLinkUrls()
        const allButtons = await this.getAllButtons()
        const allInputFields = await this.getAllInputFields()

        console.log(`Page URL: ${pageUrl}`)
        console.log(`LinkUrls \n ${allLinksUrls.join('\n')}\n\n`)
        console.log(`Buttons \n ${allButtons.join('\n')}\n\n`)
        console.log(`Input Fields \n ${allInputFields.join('\n')}\n\n`)
    }
}

export default new AboutUsPage();
