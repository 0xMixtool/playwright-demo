const { chromium } = require('playwright')

const vw = 1920
const vh = 1080
const userDataDir = __dirname + '\\data'
;(async () => {
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // Whether to run browser in headless mode.
    locale: 'en-GB',
    timezoneId: 'America/Chicago',
    logger: false,
    args: [
      '--window-position=0,0',
      '--lang=en',
      '--blink-settings=imagesEnabled=false',
      '--disable-notifications=true',
      '--no-default-browser-check',
      '--hide-crash-restore-bubble', // Does not show the crash restore bubble when the browser is started during the system startup phase in ChromeOS, if the ChromeOS full restore feature is enabled, because the ChromeOS full restore notification is shown for the user to select restore or not.
      '--test-type' // Disable Infobar：Google API keys are missing. Some functionality of Chromium will be disabled.
    ], // https://peter.sh/experiments/chromium-command-line-switches
    ignoreDefaultArgs: [
      '--mute-audio',
      '--no-sandbox', // Disable Infobar：Stability and security will suffer.
      '--enable-automation' // Disable Infobar：Chrome is being controlled by automated test software.
    ],
    screen: {
      width: vw,
      height: vh
    },
    viewport: {
      width: vw,
      height: vh
    }
  })
  let [page] = await browser.pages()
  await page.goto('http://whatsmyuseragent.org/') // chrome://version
})()
