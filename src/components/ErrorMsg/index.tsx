import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import "./style.scss";
import ErrorAlert from "../../assets/icons/ErrorAlert";
import { ReactNode } from "react";

export type ErrorType = {
  error: {
    data: {
      status: string;
      message: string;
      errors?: any;
    };
    status: number;
  };
  status: number | string;
};

function ErrorMsg({
  error,
  button,
}: {
  error: ErrorType | FetchBaseQueryError | SerializedError | undefined | string;
  button?: ReactNode;
}) {
  let err = error as ErrorType | string;
  return (
    <div
      className="error-msg"
      style={{ margin: "2rem auto", minHeight: "50vh" }}
    >
      <ErrorAlert />
      <h2 className="text-xl font-semibold">Oops, Error</h2>
      <p>
        {typeof err === "string"
          ? err
          : err?.status === "FETCH_ERROR"
          ? "Connection failed please try again later."
          : err?.error?.data?.message}
      </p>
      {button && button}
    </div>
  );
}

export default ErrorMsg;
