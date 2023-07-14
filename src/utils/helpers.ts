import { ChatGPTModel } from "./types";

export function isMobileDevice() {
  return window.innerWidth <= 768;
}

export function getMaxTokensForModel(model: ChatGPTModel) {
  switch(model) {
    case "gpt-4":
      return 8192;
    case "gpt-4-32k":
      return 32768;
    case "gpt-3.5-turbo":
      return 4096;
    case "gpt-3.5-turbo-16k":
      return 16384;
    default:
      return 4096;
  }
}