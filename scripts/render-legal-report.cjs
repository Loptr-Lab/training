// Development-only rendering with the already available Playwright/Chromium.
// No PDF library or site runtime dependency is added. Review the generated PDF.
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox']});
 const context=await browser.newContext(); const page=await context.newPage();
 const report=fs.readFileSync(path.resolve(__dirname,'../docs/legal-rights/report.html'),'utf8');
 await page.setContent(report.replace('<link rel="stylesheet" href="report.css">',''));
 await page.addStyleTag({content:fs.readFileSync(path.resolve(__dirname,'../docs/legal-rights/report.css'),'utf8')});
 await page.pdf({path:path.resolve(__dirname,'../docs/legal-rights/report.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,tagged:true,outline:true});
 await browser.close();
})();
