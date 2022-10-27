import * as resvg from "@resvg/resvg-wasm";
import { LRUCache } from "../utils/cache";

let initPromise: Promise<any>;
(() => {
  initPromise = resvg.initWasm(
    fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm")
  );
})();

const cache = new LRUCache();

self.onmessage = async (e) => {
  await initPromise;
  const { svg, width, _id } = e.data;
  if (cache.get(width + svg)) {
    self.postMessage({
      url: URL.createObjectURL(cache.get(width + svg)),
      blob: cache.get(width + svg),
      _id,
      cached: true,
    });
    return;
  }

  const renderer = new resvg.Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  });
  const pngData = renderer.render();
  const pngBuffer = pngData.asPng();
  const blob = new Blob([pngBuffer], { type: "image/png" });
  cache.set(width + svg, blob);

  const url = URL.createObjectURL(blob);
  self.postMessage({ _id, url, blob });

  pngData.free();
};
