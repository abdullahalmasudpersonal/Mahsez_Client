/* eslint-disable @typescript-eslint/no-explicit-any */

import { Helmet } from "react-helmet-async";

const PageTitle = ({ pageTitle }: any) => {
  const title =
    pageTitle && pageTitle !== "Home"
      ? `${pageTitle} || Mahsez Online Shopping`
      : "Mahsez Online Shopping";
  return (
    <Helmet>
      <title>{title} || Mahsez Online Shopping</title>
    </Helmet>
  );
};

export default PageTitle;
