import QRCodeStyling from "./QRCodeStyling";
import fs from "fs";
import path from "path";
import nodeCanvas from "canvas";
import { JSDOM } from "jsdom";

describe("Test QRCodeStyling class", () => {
  beforeAll(() => {
    document.body.innerHTML = "<div id='container'></div>";
  });

  it("The README example should work correctly", () => {
    const expectedQRCodeFile = fs.readFileSync(
      path.resolve(__dirname, "../assets/test/image_from_readme.png"),
      "base64"
    );
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: "TEST",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mNk+M+AARiHsiAAcCIKAYwFoQ8AAAAASUVORK5CYII=",
      dotsOptions: {
        color: "#4267b2",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#e9ebee"
      }
    });
    document.body.innerHTML = "<div id='container'></div>";

    const container = document.getElementById("container");

    qrCode.append(container);

    return qrCode._getElement().then((element) => {
      expect(element.toDataURL()).toBeDefined();
    });
  });

  it("Compatible with node-canvas", () =>
    new Promise((done) => {
      const expectedQRCodeFile = fs.readFileSync(
        path.resolve(__dirname, "../assets/test/image_from_readme.png"),
        "base64"
      );
      const qrCode = new QRCodeStyling({
        nodeCanvas,
        width: 300,
        height: 300,
        data: "TEST",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mNk+M+AARiHsiAAcCIKAYwFoQ8AAAAASUVORK5CYII=",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#e9ebee"
        }
      });
      qrCode.getRawData("png").then((buffer) => {
        expect(buffer).toBeDefined();
        done();
      });
    }));

  it("Compatible with jsdom", async () => {
    const qrCode = new QRCodeStyling({
      jsdom: JSDOM,
      type: "svg",
      width: 300,
      height: 300,
      data: "TEST",
      dotsOptions: {
        color: "#4267b2",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#e9ebee"
      },
      imageOptions: {
        saveAsBlob: false
      }
    });
    const buffer = await qrCode.getRawData("svg");
    expect(buffer).toBeDefined();
  });
});
