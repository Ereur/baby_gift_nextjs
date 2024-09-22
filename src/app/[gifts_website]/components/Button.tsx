import { ReactNode,MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-4 bg-[#FF9689] text-white rounded-full font-bold"
    >
      {children}
    </button>
  );
};
// const Button = ({ children }: { children: ReactNode }) => {
//   return (
//     <button className="px-6 py-4 bg-[#FF9689] text-white rounded-full font-bold">
//       {children}
//     </button>
//   );
// };

export default Button;
