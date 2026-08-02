import { useCopyToClipboard } from "react-use";

export function useClipboard() {
  const [copied, copyToClipboard] = useCopyToClipboard();

  return {
    copy: (text: string) => copyToClipboard(text),
    copied: copied.value ?? false,
  };
}
