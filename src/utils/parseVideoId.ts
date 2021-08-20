const videoIdParseRegExp =
  /https:\/\/studio\.youtube\.com\/video\/(.+)\/livestreaming/.compile();

export default function parseVideoId(url: string) {
  const match = url.match(
    /https:\/\/studio\.youtube\.com\/video\/(.+)\/livestreaming/
  );
  console.log({ match });
  if (match?.[1]) {
    return match[1];
  } else {
    return null;
  }
}
