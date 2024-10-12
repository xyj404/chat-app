import React, { useState, useEffect, useMemo } from 'react';

import ChatContent from './ChatContent';

interface IChatBot {
  appId: string;
}

interface IChatBotRes {
  node: JSX.Element;
  show: () => void;
  hide: () => void;
}

export const useChatBot = (props: IChatBot): IChatBotRes => {
  const { appId } = props;
  const [visible, setVisible] = useState(false);

  const node = useMemo(() => {
    return visible ? (
      <div id={appId}>
        <ChatContent></ChatContent>
      </div>
    ) : (
      <></>
    );
  }, [visible, appId]);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return { node, show, hide };
};
