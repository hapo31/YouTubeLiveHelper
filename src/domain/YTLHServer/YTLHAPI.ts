export async function getOAuth2URL() {
  const res = await fetch("https://ytlh-server.herokuapp.com/authorize", {
    method: "POST",
  });

  const { oauth2Url }: { oauth2Url: string } = await res.json();

  return oauth2Url;
}
