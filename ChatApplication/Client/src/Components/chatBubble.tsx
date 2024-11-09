import React from "react";

const chatBubble = ({ time, sender, content, user, profile }) => {
  return (
    <div
      className={`flex items-start gap-2.5 ${sender ? "flex-row-reverse" : ""}`}
    >
      <img
        className="w-8 h-8 rounded-full border"
        src={profile}
        alt="Jese image"
      />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 ">
          <span className="text-sm font-semibold text-gray-900 dark:text-black">
            {user}
          </span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
            {time}
          </span>
        </div>
        <div
          className={`flex flex-col leading-1.5 p-2 border-gray-200  dark:bg-[#f37c49]  ${sender
              ? "rounded-bl-xl rounded-tl-xl rounded-b-xl"
              : "rounded-tr-xl rounded-br-xl rounded-bl-xl"
            } `}
        >
          {/* added */}
          <p
            className={`text-[14px] font-normal text-gray-900 dark:text-white ${sender ? "text-right" : ""
              }`}
          >
            {content}
          </p>
        </div>
        {sender ? (
          <span className="flex items-center  justify-end space-x-1 text-xs font-normal text-gray-500 dark:text-gray-400">
  Delivered
  <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* <!-- First Checkmark (Black) --> */}
    <path d="M15 24L20 29L33 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    
    {/* <!-- Second Checkmark (Orange) --> */}
    <path d="M18 27L23 32L36 19" stroke="#FF9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</span>

        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default chatBubble;
