import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header, Button, LightningTalkCard } from "@/components";
import { getLightningTalks, LightningTalk, addPoll } from "@/apis";

import "./index.css";

const { useState, useEffect } = React;

function sortByPollDesc(data: LightningTalk[]) {
  return data.sort((a, b) => {
    if (a.poll < b.poll) {
      return 1;
    }
    if (a.poll > b.poll) {
      return -1;
    }
    return 0;
  });
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

export default function LightningTalkList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [lightningTalks, setLightningTalks] = useState<LightningTalk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadTalks = async () => {
    const response = await getLightningTalks();
    if (!response.error) {
      setLightningTalks(sortByPollDesc(response.data));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await loadTalks();
      if (location.state === "newest") {
        // Optimization::in complex multi-user environments, this approach may be inaccurate
        scrollToBottom();
      }
    })();
  }, []);

  const handlePoll = async (talkId: number) => {
    await addPoll(talkId);
    loadTalks();
  };

  return (
    <>
      <Header
        action={
          <Button onClick={() => navigate("/new-talk")}>Create Talk</Button>
        }
      />
      <div className="Page__LightningTalkList">
        {lightningTalks.length ? (
          <ul className="LightningTalkList">
            {lightningTalks.map((item) => (
              <li key={item.id}>
                <LightningTalkCard item={item} onClickPoll={handlePoll} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="LightningTalkList LightningTalkList--Empty">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <div className="LightningTalkList__EmptyText">
                  No talks yet, this is a big opportunity to show people your
                  talent
                </div>
                <Button onClick={() => navigate("/new-talk")}>
                  Create You Own Talk Now!
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
