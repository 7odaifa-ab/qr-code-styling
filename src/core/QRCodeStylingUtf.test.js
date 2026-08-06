import QRCodeStyling from "./QRCodeStyling";
import { JSDOM } from "jsdom";
import nodeCanvas from "canvas";

describe("Test QRCodeStyling UTF-8 encoding support", () => {
  it("Should accept byteModeStringEncoding UTF-8 and render QR code for multi-byte Unicode strings", async () => {
    const qrCode = new QRCodeStyling({
      jsdom: JSDOM,
      nodeCanvas,
      width: 300,
      height: 300,
      data: "مرحبا بالعالم 🌍 - Special UTF-8 Test",
      qrOptions: {
        byteModeStringEncoding: "UTF-8"
      }
    });

    const element = await qrCode._getElement("svg");
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe("svg");
  });

  it("Should fallback correctly when byteModeStringEncoding is default or SJIS", async () => {
    const qrCodeDefault = new QRCodeStyling({
      jsdom: JSDOM,
      nodeCanvas,
      width: 300,
      height: 300,
      data: "Hello World",
      qrOptions: {
        byteModeStringEncoding: "default"
      }
    });

    const elementDefault = await qrCodeDefault._getElement("svg");
    expect(elementDefault).toBeDefined();

    const qrCodeSjis = new QRCodeStyling({
      jsdom: JSDOM,
      nodeCanvas,
      width: 300,
      height: 300,
      data: "こんにちは",
      qrOptions: {
        byteModeStringEncoding: "SJIS"
      }
    });

    const elementSjis = await qrCodeSjis._getElement("svg");
    expect(elementSjis).toBeDefined();
  });
});
