import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

class ServerSideUnitTest {
    WebDriver driver;// = new FirefoxDriver(); 
    @BeforeEach
    void setUp() throws Exception {
        System.setProperty("webdriver.gecko.driver", "C:\\tools\\geckodriver-v0.26.0-win64\\geckodriver.exe");
        driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http://localhost:4000");
    }

    @AfterEach
    void tearDown() throws Exception {
        driver.quit();
    }

    @Test
    void testAddBill() {
        WebElement label = driver.findElement(By.id("input-label"));
        label.clear();
        label.sendKeys("Test Bills Item");
        
        driver.findElement(By.id("createButton")).click();
        WebElement itemConst = driver.findElement(By.id("div-bill-item"));
        itemConst.findElements(By.xpath("*"));
        //label.clear();
    }

}
