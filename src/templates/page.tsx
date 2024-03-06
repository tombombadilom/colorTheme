import React from 'react';

import MailPage from './examples/mail/page';

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-[90dvh] backdrop-blur-md bg-opacity-light hover:bg-opacity-medium dark:hover:bg-opacity-medium dark:bg-opacity-light overflow-hidden rounded-lg border bg-background-transparent shadow-lg">
      <MailPage />
    </div>
  );
};
export default IndexPage;
