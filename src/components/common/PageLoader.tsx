// src/components/common/PageLoader.tsx

import { Skeleton } from "antd";

const PageLoader = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Skeleton active title paragraph={{ rows: 8 }} />
    </div>
  );
};

export default PageLoader;
