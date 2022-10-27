import * as resvg from "@resvg/resvg-wasm";

let initPromise: Promise<any>;
(() => {
  initPromise = resvg.initWasm(
    fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm")
  );
})();

self.onmessage = async (e) => {
  await initPromise;
  const { svg, width, _id } = e.data;

  const renderer = new resvg.Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  });
  const pngData = renderer.render();
  const pngBuffer = pngData.asPng();
  const url = URL.createObjectURL(new Blob([pngBuffer], { type: "image/png" }));
  self.postMessage({ _id, url });
};
