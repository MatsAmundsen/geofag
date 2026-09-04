import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://sokeresultat.udir.no/eksamensoppgaver.html")
        print(await page.title())
        
        # We need to fill the search input, wait for results, and print them.
        await page.fill('input[type="text"]', 'REA3043')
        await page.press('input[type="text"]', 'Enter')
        await page.wait_for_timeout(3000)
        
        links = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href => href.includes('.pdf') || href.includes('eksamen'));
        }''')
        for link in links:
            print(link)
        
        await browser.close()

asyncio.run(main())
