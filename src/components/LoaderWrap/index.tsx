import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";

interface ILoaderWrap {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const LoaderWrap = observer(
  ({ isLoading, className, children }: ILoaderWrap) => {
    if (isLoading) {
      return (
        <div className={`${className ? className : ""} loader`}>
          <Spin />
        </div>
      );
    }
    return <>{children}</>;
  }
);
