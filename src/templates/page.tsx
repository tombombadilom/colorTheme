import React from "react";

import MailPage from "./examples/mail/page";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-[90dvh] overflow-hidden rounded-lg border bg-background shadow-lg">
      <MailPage />
    </div>
  );
};
export default IndexPage;
