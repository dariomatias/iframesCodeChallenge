const fs = require('fs');
const { remote } = require('webdriverio');

(async () => {
  const outputFilePath = './output.txt'; // Update this with the correct file path

  // Set up WebDriverIO configuration
  const options = {
    capabilities: {
      browserName: 'chrome'
    }
  };

  // Initialize WebDriverIO instance
  const browser = await remote(options);

  try {
    // Navigate to the URL
    await browser.url('https://www.tutorialspoint.com/html/html_iframes.htm');
    await browser.maximizeWindow();
    // Dismiss the cookies banner if present
    let banner = await browser.$('div[id=privacy-banner]');
    if (await banner.isDisplayed()){
        console.log('Banner displayed on main page... Proceeding to close...');
        await banner.$('a[id="banner-accept"]').scrollIntoView();
        await banner.$('a[id="banner-accept"]').click();
        console.log('Cookies banner closed!');
    }

    // Switch to the iframe
    console.log('Switching to first Iframe...');
    let iframe = await browser.$('iframe.result');
    await browser.switchToFrame(iframe);
    console.log('Switching to internal Iframe...');
    iframe = await browser.$('iframe');
    await browser.switchToFrame(iframe);

    // Dismiss the cookies banner if present
    banner = await browser.$('div[id=privacy-banner]');
    if (await banner.isDisplayed()){
        console.log('Cookies banner displayed in internal iframe. Closing...');
        await banner.$('a[id="banner-accept"]').scrollIntoView();
        await banner.$('a[id="banner-accept"]').click();
        console.log('Cookies banner closed!');
    }

    // Find and click the "About us" link
    console.log('Clicking on About Us Link...');
    const aboutUsLink = await browser.$('a.nav-link[href="/about/index.htm"]');
    await aboutUsLink.click();

    // Get the URL of the new page
    console.log('Getting URL');
    const newPageUrl = await browser.getUrl();

    // Get a list of all URLs on the page
    console.log('Getting all links...');
    const links = await browser.$$('a');
    const allUrls = links.map(async link => await link.getAttribute('href'));

    // Get a list of all buttons on the page
    console.log('Getting all banners...');
    const buttons = await browser.$$('button');
    const allButtons = buttons.map(async button => await button.getAttribute('textContent'));

    // Get a list of all text input fields on the page
    console.log('Getting all input boxes');
    const inputs = await browser.$$('input[type="text"]');
    const allTextInputs = inputs.map(async input => await input.getAttribute('name'));

    // Create an account and log into the site (sample steps)
    console.log('Signing in...');
    await browser.$('div.nav-login').scrollIntoView();
    await browser.$('div.nav-login').click();
    await browser.$('input[id=user_email]').setValue('John Doe');
    await browser.$('input[id="user_password"]').setValue('pass123');
    await browser.$('button[id="user_login"]').click();

    // Prepare the output string
    let output = `New Page URL: ${newPageUrl}\n\n`;
    output += `All URLs on the page: \n${allUrls.join('\n')}\n\n`;
    output += `All Buttons on the page: \n${allButtons.join('\n')}\n\n`;
    output += `All Text Input Fields on the page: \n${allTextInputs.join('\n')}`;

    // Log the output to the console
    console.log(output);

    // Append the output to the file
    fs.appendFileSync(outputFilePath, output);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.deleteSession();
  }
})();
