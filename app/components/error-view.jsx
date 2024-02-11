import { BiErrorAlt } from "react-icons/bi";
import classNames from "classnames";

const ErrorView = ({ message, version }) => {
  return (
      <div
        className={classNames({
          "flex items-center gap-2 p-1 dark:text-gray-300": true,
          "rounded-md  border-[1px] border-border-clr dark:border-dark-border-clr select-none shadow-none hover:shadow smooth-animation":
            version === "input-like",
        })}
      >
        <BiErrorAlt fill={"red"} size={20} />
        <p>{message}</p>
      </div>
  );
};


export default ErrorView;
