import { FC } from "react";

interface Props {
  user: any;
}

const HeroDescription: FC<Props> = ({ user }) => (
  <p className="text-lg text-gray-600 mb-8 max-w-xl">
    {user
      ? "Continue your journey with our immersive, instructor-led courses."
      : "Break away from traditional education — explore knowledge your way."}
  </p>
);

export default HeroDescription;
