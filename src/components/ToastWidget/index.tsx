import { useAppSelector, closeToast } from "../../store/store.hooks";
import { selectToasts } from "../../store/slice/ToasterSlice";


import "./style.scss";


const ToastWidget = () => {
  const toasts = useAppSelector(selectToasts);

  return (
    <>
      {toasts.length && toasts[0] && toasts[0]?.messageType ? (
        <div
          className={`fixed right-4 bottom-4 grid gap-y-4 pr-5 pt-5 z-[2000] pd_toast_container ${
            !toasts.length ? "hidden" : ""
          }`}
        >
          {toasts?.map((toast: any) => (
            <div
              className={`toast_box  ${
                toast.isOpen ? "animate-slide" : "translate-x-[150vw]"
              } transition-transform duration-700`}
              key={`toast-${toast.id}`}
            >
              <div className="toast_p_box flex-grow flex flex-col">
              

                <span className="text-[16px] font-medium mt-[8px] text-[#ffffff]  ">
                  {toast.messageType === "success" ? "Success" : "Unsuccessful"}
                </span>
                <p className="exact_toast_p text-[#9BA2AC] text-[14px] font-medium">
                  {toast.text}
                </p>
              </div>
              {/* <div
                onClick={() => closeToast(toast.id)}
                className="cursor-pointer"
              >
                X
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ToastWidget;
