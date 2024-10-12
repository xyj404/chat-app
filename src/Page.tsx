import React from 'react';

import { useChatBot } from './useChatBot';

export const Page = () => {
  const { node, show, hide } = useChatBot({ appId: 'storybook' });
  return (
    <div>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      {node}
    </div>
  );
};
