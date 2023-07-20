/**
 * test with page objects
 */
import MainIframePage from "../pageobjects/mainIframe.page";
import InternalIframePage from "../pageobjects/internalIframe.page";
import AboutUsPage from "../pageobjects/aboutUs.page";

describe('Iframes code challenge', () => {
    it('challenge', async () => {
        await MainIframePage.open()
        await MainIframePage.accessInternalIFrame()
        await InternalIframePage.accessAboutPage()

        //Account creation is not working on the site at the moment.
        AboutUsPage.showDetails()
    })
})

