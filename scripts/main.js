import { getClipboardContent, setClipboardContent } from "./clipboard.js";
import { displayError, displaySuccess } from "./notification.js";
import BLCConverter from "./converters/to/BLCConverter.js";

import CWConverter from "./converters/from/CWConverter.js";

window.addEventListener("load", () => {
  const button = document.querySelector(".cta");

  const converters = [CWConverter];

  button.addEventListener("click", async () => {
    const clipboardObject = await getClipboardContent();
    if (clipboardObject.error) {
      displayError("Failed to access your clipboard.");
      return;
    }

    const clipboardContent = clipboardObject.content;
    if (!clipboardContent) {
      displayError("Invalid clipboard content.");
      return;
    }

    let converter = converters.find((conv) =>
      conv.checkFormat(clipboardContent)
    );

    if (!converter) {
      displayError("Invalid waypoint format.");
      return;
    }

    const fromConverterResult = converter.convert(clipboardContent);
    if (fromConverterResult.error || !fromConverterResult.content) {
      displayError("An error occurred.");
    }

    const waypointList = fromConverterResult.content;

    const toConverterResult = BLCConverter.convert(waypointList);
    if (toConverterResult.error || !toConverterResult.content) {
      displayError("An error occurred.");
    }

    const convertedList = toConverterResult.content;

    const copied = await setClipboardContent(convertedList);
    if (copied) {
      displaySuccess("Converted waypoints copied to clipboard.");
    } else {
      displayError("Failed to access your clipboard.");
    }
  });
});
