import React, { Suspense, lazy } from "react";
import Loader from "../../components/Loader";
const PageComponent = lazy(() => import("./index"));

export const Loadable = props => (
  <Suspense fallback={<Loader />}>
    <PageComponent {...props} />
  </Suspense>
);
export default Loadable;
