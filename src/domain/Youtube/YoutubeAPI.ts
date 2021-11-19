import add from "date-fns/add";
import qs from "qs";
import superChatColorTable from "../SuperChat/superchatColorTable";

export class YoutubeAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export type AuthInfo = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

async function googleAPIFetch(
  method: string,
  url: string,
  authInfo: AuthInfo,
  query?: unknown
) {
  if (Date.now() > new Date(authInfo.expiresIn).getTime()) {
    throw new YoutubeAPIError("access_token expired");
  }
  return fetch([url].concat(query ? [qs.stringify(query)] : []).join("?"), {
    method,
    mode: "cors",
    headers: {
      Authorization: `Bearer ${authInfo.accessToken}`,
    },
  });
}

export const updateAccessToken = async (authInfo: AuthInfo) => {
  const res = await fetch("https://ytlh-server.herokuapp.com/token", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: qs.stringify({ refresh_token: authInfo.refreshToken }),
  });

  const oauthInfo = await res.json();

  return {
    accessToken: oauthInfo.access_token as string,
    expiresIn: add(new Date(), { seconds: oauthInfo.expires_in }),
  };
};

export const fetchSuperChatEvents = async (
  authInfo: AuthInfo,
  test = false
): Promise<SuperChatEventResponse> => {
  if (test) {
    return (await import("../../../sample_data.json")).default.map((data) => ({
      ...data,
      id: Math.floor(Math.random() * 10000000).toString(),
    }));
  } else {
    const res = await googleAPIFetch(
      "get",
      "https://www.googleapis.com/youtube/v3/superChatEvents",
      authInfo,
      {
        part: "snippet",
      }
    );
    const data = await res.json();
    return data.items;
  }
};

export function fetchSuperChatToStore(result: SuperChatEvent) {
  const [primaryColor, secondaryColor, authorColor] = superChatColorTable(
    result.snippet.messageType
  );
  return {
    id: result.id,
    author: result.snippet.supporterDetails.displayName,
    checked: false,
    imgUrl: result.snippet.supporterDetails.profileImageUrl,
    message: result.snippet.commentText,
    purches: result.snippet.displayString,
    createdAt: new Date(result.snippet.createdAt).getTime(),
    videoId: "", // 日時から特定できそうだけど面倒ね
    superChatColorInfo: {
      text: authorColor,
      primary: primaryColor,
      secondary: secondaryColor,
      message: authorColor,
    },
    showing: true,
  };
}

type SuperChatEventResponse = SuperChatEvent[];

type SuperChatEvent = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

type Snippet = {
  channelId: string;
  supporterDetails: SupporterDetails;
  commentText: string;
  createdAt: string;
  amountMicros: string;
  currency: string;
  displayString: string;
  messageType: number;
};

type SupporterDetails = {
  channelId: string;
  channelUrl: string;
  displayName: string;
  profileImageUrl: string;
};
