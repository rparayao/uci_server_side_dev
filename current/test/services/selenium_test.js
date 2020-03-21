const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:4000');

    await driver.findElement(By.id("input-label")).sendKeys("Test Bills Item")
    
    await driver.findElement(By.id("createButton")).click();

    await driver.wait(until.titleContains('Monthly Budget'), 1000);

  } finally {
    await driver.quit();
  }
})();


