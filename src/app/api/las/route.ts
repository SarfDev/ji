import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function GET(req: Request, res:Response){
    
    chromium.setHeadlessMode = true;

    // Optional: If you'd like to disable webgl, true is the default.
    chromium.setGraphicsMode = false;
    await chromium.font(
        "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
      );

      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    
      const page = await browser.newPage();
      await page.goto("https://example.com");
      const pageTitle = await page.title();
      await browser.close();
    
    return NextResponse.json("okay");
}