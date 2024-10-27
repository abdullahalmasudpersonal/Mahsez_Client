/* eslint-disable @typescript-eslint/no-explicit-any */

import { Helmet } from "react-helmet-async";

const PageTitle = ({ pageTitle }: any) => {
  return (
    <Helmet>
      <title>{pageTitle}&nbsp;Mahsez Online Shopping</title>
    </Helmet>
  );
};

export default PageTitle;
