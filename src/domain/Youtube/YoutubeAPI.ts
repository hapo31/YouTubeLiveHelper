import add from "date-fns/add";

export class YoutubeAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export type AuthInfo = {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
}

async function googleAPIFetch(method: string, url: string, authInfo: AuthInfo) {
  if (Date.now() > authInfo.expiresIn.getTime()) {
    throw new YoutubeAPIError("access_token expired");
  }
  return fetch(url, {
    method,
    mode: "cors",
    headers: {
      "Authorization": `Bearer ${authInfo.accessToken}`
    }
  });
}

export const updateAccessToken = async (authInfo: AuthInfo) => {
  const res = await fetch("http://localhost:8080/token", {
    method: "POST",
    mode: "cors",
    body: `refresh_token=${encodeURIComponent(authInfo.refreshToken)}`
  });

  const oauthInfo = await res.json();

  return {
    accessToken: oauthInfo.access_token as string,
    expiresIn: add(new Date(), { seconds: oauthInfo.expires_in }),
  }
}

export const fetchSuperChatEvents = async (authInfo: AuthInfo) => {
  const res = await googleAPIFetch("get", "https://www.googleapis.com/youtube/v3/superChatEvents", authInfo);
  const data = await res.json();
  return data.items;
}
