import { ReactNode } from "react";
import empty from "../../assets/images/emptyBox.svg";
import "./style.scss";
export type EmptyResponseProps = {
  image?: string;
  message: string;
  btn?: ReactNode;
  icon?: ReactNode;
  iconBg?: string;
  extraText?: string;
};

const EmptyResponse = ({
  image = empty,
  icon,
  message,
  extraText,
  iconBg,
  btn,
  ...props
}: EmptyResponseProps) => {
  return (
    <div {...props} className="empty-response-pg">
      {icon ? (
        <div className={`icon-wrap ${iconBg || "bg-primary-100"}`}>{icon}</div>
      ) : (
        <img src={image} alt="no result" />
      )}
      <p className="message_text">{message}</p>
      <p className="extra_text">{extraText}</p>
      {btn && btn}
    </div>
  );
};

export default EmptyResponse;
