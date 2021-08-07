type SuperChatColorInfo = {
  primary: string;
  secondary: string;
  header: string;
  authorName: string;
  timestamp: string;
  message: string;
};

export type ChatInfo = {
  message: string;
  author: string;
};

export type SuperChatInfo = {
  imgUrl: string;
  purches: string;
  author: string;
  message: string;
  superChatColorInfo: SuperChatColorInfo;
  authorRaw: string;
  messageRaw: string;
  checked: boolean;
};

export type LiveStreamingInfo = {
  videoId: string;
  superChatInfoList: SuperChatInfo[];
};

export type AppState = {
  showingVideoId: string;
  streamings: Record<string, LiveStreamingInfo>;
};

export type Actions = ReturnType<
  typeof SetShowingVideoId | typeof AddSuperchat | typeof CheckedSuperchat
>;

const SET_SHOWING_VIDEO_ID = "SET_SHOWING_VIDEOID" as const;
export const SetShowingVideoId = (videoId: string) => ({
  type: SET_SHOWING_VIDEO_ID,
  videoId,
});

const ADD_SUPERCHAT = "ADD_SUPERCHAT" as const;

export const AddSuperchat = (videoId: string, superChat: SuperChatInfo) => ({
  type: ADD_SUPERCHAT,
  videoId,
  superChat,
});

const CHECKED_SUPERCHAT = "CHECKED_SUPERCHAT" as const;

export const CheckedSuperchat = (videoId: string, index: number) => ({
  type: CHECKED_SUPERCHAT,
  videoId,
  index,
});

export default function createAppReducer(initialState: AppState) {
  return (state = initialState, action: Actions): AppState => {
    switch (action.type) {
      case SET_SHOWING_VIDEO_ID: {
        return {
          ...state,
          showingVideoId: action.videoId,
        };
      }

      case ADD_SUPERCHAT: {
        const streamings = state.streamings;
        if (streamings[action.videoId] == null) {
          streamings[action.videoId] = {
            videoId: action.videoId,
            superChatInfoList: [action.superChat],
          };
        } else {
          streamings[action.videoId].superChatInfoList = [
            ...streamings[action.videoId].superChatInfoList,
            action.superChat,
          ];
        }
        return {
          ...state,
          streamings,
        };
      }
      case CHECKED_SUPERCHAT: {
        state.streamings[action.videoId].superChatInfoList[
          action.index
        ].checked = true;
        state.streamings[action.videoId].superChatInfoList = [
          ...state.streamings[action.videoId].superChatInfoList,
        ];

        return {
          ...state,
        };
      }
    }

    return state;
  };
}
