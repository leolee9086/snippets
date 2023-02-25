import { url } from '../url.mjs';

let tempAnchor;
function determineCrossOrigin(url$1, loc = globalThis.location) {
  if (url$1.startsWith("data:")) {
    return "";
  }
  loc = loc || globalThis.location;
  if (!tempAnchor) {
    tempAnchor = document.createElement("a");
  }
  tempAnchor.href = url$1;
  const parsedUrl = url.parse(tempAnchor.href);
  const samePort = !parsedUrl.port && loc.port === "" || parsedUrl.port === loc.port;
  if (parsedUrl.hostname !== loc.hostname || !samePort || parsedUrl.protocol !== loc.protocol) {
    return "anonymous";
  }
  return "";
}

export { determineCrossOrigin };
//# sourceMappingURL=determineCrossOrigin.mjs.map
