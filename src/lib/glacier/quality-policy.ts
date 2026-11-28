export function glacierPixelRatio() {
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  return Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.6);
}
