import React, { FC, ReactNode } from "react";

interface IProps {
  condition: boolean;
  fallback?: any | null;
  children: any;
}

const ShowWidget: FC<IProps> = ({
  children,
  condition,
  fallback,
}): JSX.Element | null => {
  if (!condition && fallback) {
    return <>{fallback}</>;
  }

  if (!condition) {
    return null;
  }

  return <>{children}</>;
};

export default ShowWidget;
