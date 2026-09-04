import asyncio
import os
import zipfile
import base64
from playwright.async_api import async_playwright

async def main():
    desktop_path = os.path.expanduser("~/Desktop")
    zip_path = os.path.join(desktop_path, "Geofag2_Eksamen_Figurer.zip")
    
    print("🚀 Starter nedlasting av eksamensfigurer...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        print("🌍 Åpner Udir-portalen...")
        await page.goto("https://deltager.eps.udir.no/?deliveryExecutionId=8d42f7265341-suomynona%252345f395373147%2523504a3bd1d38b79d8e78a027b1848cd7a58c04481%25232&refreshTokenId=8d42f7265341-suomynona%252345f395373147%2523504a3bd1d38b79d8e78a027b1848cd7a58c04481%25232")
        
        # Vent på passord-felt
        print("🔑 Leter etter innloggingsfelt...")
        await page.wait_for_selector('input', timeout=15000)
        
        # TAO bruker ofte en form med et inputfelt
        inputs = await page.query_selector_all('input')
        if inputs:
            await inputs[0].fill('Eksamen')
            await page.keyboard.press('Enter')
            print("✅ Skrev inn passord 'Eksamen'.")
            
        await page.wait_for_timeout(5000)
        
        # Klikk på eventuell "Start prøve" knapp eller lignende hvis vi står på forside
        try:
            start_btns = await page.query_selector_all('button')
            for b in start_btns:
                text = (await b.inner_text()).lower()
                if 'start' in text or 'videre' in text or 'bekreft' in text:
                    await b.click()
                    await page.wait_for_timeout(3000)
                    break
        except Exception as e:
            pass
            
        all_image_data = []
        
        # Bla gjennom opp til 30 sider
        for page_num in range(1, 31):
            print(f"Skanner side {page_num}...")
            await page.wait_for_timeout(3000) # Vent på at alt rendres
            
            # Extract images on current page
            page_images = await page.evaluate('''async () => {
                const results = [];
                let images = Array.from(document.querySelectorAll('img'));
                document.querySelectorAll('iframe').forEach(ifr => {
                    try { images.push(...ifr.contentDocument.querySelectorAll('img')); } catch(e) {}
                });
                
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    if (img.width < 50 || img.height < 50 || img.src.includes('logo')) continue;
                    
                    let oppgave = "Oppgave_Ukjent";
                    let node = img;
                    while (node && node !== document.body) {
                        const text = node.innerText || "";
                        const match = text.match(/Oppgave\s*\d+[a-z]?/i);
                        if (match) {
                            oppgave = match[0].replace(/\s+/g, "_");
                            break;
                        }
                        node = node.parentElement;
                    }
                    
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth || img.width || 800;
                        canvas.height = img.naturalHeight || img.height || 600;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        const dataUrl = canvas.toDataURL('image/png');
                        results.push({ oppgave: oppgave, data: dataUrl });
                    } catch(e) {
                        // ignore
                    }
                }
                return results;
            }''')
            
            all_image_data.extend(page_images)
            
            # Prøv å gå til neste side
            # Se etter en knapp som representerer 'Neste'
            try:
                next_btn = await page.query_selector('button.next-item, button[aria-label*="Neste"], button[aria-label*="Next"]')
                if not next_btn:
                    # Let etter knapper med tekst 'Neste'
                    btns = await page.query_selector_all('button')
                    for b in btns:
                        if 'neste' in (await b.inner_text()).lower():
                            next_btn = b
                            break
                            
                if next_btn:
                    is_disabled = await page.evaluate('(btn) => btn.disabled || btn.classList.contains("disabled")', next_btn)
                    if is_disabled:
                        print("Ferdig med alle sider.")
                        break
                    await next_btn.click()
                else:
                    print("Fant ingen Neste-knapp, antar at dette er den eneste siden.")
                    break
            except Exception:
                break
                
        if not all_image_data:
            print("❌ Fant ingen figurer.")
        else:
            with zipfile.ZipFile(zip_path, 'w') as zipf:
                count = 1
                seen_data = set()
                for item in all_image_data:
                    if 'data' in item:
                        # Unngå duplikater
                        b64_data = item['data'].split(',')[1]
                        if b64_data in seen_data:
                            continue
                        seen_data.add(b64_data)
                        
                        binary_data = base64.b64decode(b64_data)
                        filename = f"{item['oppgave']}_figur_{count}.png"
                        zipf.writestr(filename, binary_data)
                        print(f"📦 Lagret: {filename}")
                        count += 1
                        
            print(f"🎉 Suksess! Lagret {count-1} unike figurer i {zip_path}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
