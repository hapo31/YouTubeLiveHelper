export default function superChatColorTable(messageType: number) {
  return [
    ["rgba(21,101,192,1)", "", "rgba(255,255,255,1)"],
    ["rgba(0, 229, 255,1)", "rgba(0, 184, 212,1)", "rgba(0,0,0,1)"],
    ["rgba(0,191,165)", "rgba(29,233,182,1)", "rgba(0,0,0,1)"],
    ["rgba(255,202,40,1)", "rgba(255,179,0,1)", "rgba(0,0,0,0.87451)"],
    ["rgba(245,124,0,1)", "rgba(230,81,0,1)", "rgba(255,255,255,0.87451)"],
    ["rgba(233,30,99,1)", "rgba(194,24,91,1)", "rgba(255,255,255,1)"],
    ["rgba(230,33,23,1)", "rgba(208,0,0,1)", "rgba(255,255,255,1)"],
  ][messageType - 1] as [string, string, string];
}
