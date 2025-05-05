import { FC } from "react";

interface Props {
  user: any;
}

const HeroHeading: FC<Props> = ({ user }) => (
  <>
    <span className="inline-block px-4 py-1 rounded-full bg-blue-800 bg-opacity-70 text-blue-100 text-sm font-semibold mb-6 tracking-wide shadow-sm">
      ისწავლე რაც მნიშვნელოვანია ✨
    </span>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
      {user ? (
        <>
          Thank you for coming back,{" "}
          <span className="text-blue-600">
            {user.displayName || user.email?.split("@")[0]}
          </span>
          .
        </>
      ) : (
        <>
          Welcome to the{" "}
          <span className="text-blue-600">alternative world</span> of learning.
        </>
      )}
    </h1>
  </>
);

export default HeroHeading;
