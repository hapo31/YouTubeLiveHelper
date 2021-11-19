import { useEffect, useMemo, useState } from "react";
import copy from "clipboard-copy";
import { Button } from "../../../components/Common/Button";
import parseVideoId from "../../../utils/parseVideoId";

const Tools = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      return;
    }
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url;
      if (url) {
        const id = parseVideoId(url);
        setVideoId(id);
      }
      setIsChecked(true);
    });
  }, [isChecked, videoId]);

  return (
    <>
      <Button
        disabled={videoId == null}
        onClick={() => {
          copy(`https://studio.youtube.com/live_chat?is_popout=1&v=${videoId}`);
        }}
      >
        チャットURLをコピー
      </Button>
      <Button
        disabled={videoId == null}
        onClick={() => {
          copy(`https://www.youtube.com/watch?v=${videoId}`);
        }}
      >
        配信URLをコピー
      </Button>
    </>
  );
};

export default Tools;
