import { useCopyToClipboard } from "react-use";

export function useClipboard() {
  const [copied, copyToClipboard] = useCopyToClipboard();

  return {
    copied: copied.value ?? false,
    copy: (text: string) => copyToClipboard(text),
  };
}
