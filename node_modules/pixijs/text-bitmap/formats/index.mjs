import { TextFormat } from './TextFormat.mjs';
export { TextFormat } from './TextFormat.mjs';
import { XMLFormat } from './XMLFormat.mjs';
export { XMLFormat } from './XMLFormat.mjs';
import { XMLStringFormat } from './XMLStringFormat.mjs';
export { XMLStringFormat } from './XMLStringFormat.mjs';

const formats = [
  TextFormat,
  XMLFormat,
  XMLStringFormat
];
function autoDetectFormat(data) {
  for (let i = 0; i < formats.length; i++) {
    if (formats[i].test(data)) {
      return formats[i];
    }
  }
  return null;
}

export { autoDetectFormat };
//# sourceMappingURL=index.mjs.map
