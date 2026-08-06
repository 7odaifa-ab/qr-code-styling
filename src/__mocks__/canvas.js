module.exports = {
  createCanvas: (width, height) => {
    return {
      width,
      height,
      getContext: () => ({
        drawImage: () => {},
        fillRect: () => {},
        clearRect: () => {},
        beginPath: () => {},
        rect: () => {},
        stroke: () => {},
        closePath: () => {},
        save: () => {},
        restore: () => {},
        translate: () => {},
        rotate: () => {},
        resetTransform: () => {},
        setTransform: () => {}
      }),
      toBuffer: () => Buffer.from("mock"),
      toDataURL: () => "data:image/png;base64,mock"
    };
  },
  Image: class Image {
    constructor() {
      setTimeout(() => {
        if (this.onload) this.onload();
      }, 0);
    }
  }
};
