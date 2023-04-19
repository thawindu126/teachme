import { useMemo } from "react";
import { Avatar } from "~/components";
import { Loader } from "~/components/ui";
import { classNames } from "~/lib/classNames";
import { api } from "~/utils/api";

export default function UserProfile() {
  const { data: user, isLoading } = api.me.useQuery();

  const content = useMemo(() => {
    if (isLoading || !user?.name) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    return (
      <>
        <Avatar
          size="lg"
          imageSrc={user.avatar}
          alt={user.name}
          levelDetails={{
            points: user.points,
            level: user.level,
            pointsOfNextLevel: user.pointsOfNextLevel,
          }}
        />

        <span className={classNames("flex flex-col")}>
          <span className="text-xl font-semibold">{user.name}</span>
          <span className={classNames("flex items-center space-x-1")}>
            <span className="whitespace-nowrap text-sm tracking-wide">Total points:</span>
            <span>{user.points}</span>
          </span>
        </span>
        <span className={classNames("flex flex-row")}>No achievements unlocked</span>
      </>
    );
  }, [isLoading, user?.avatar, user?.level, user?.name, user?.points, user?.pointsOfNextLevel]);

  return (
    <div className="flex h-min w-full items-center justify-around space-x-4 rounded-2xl bg-gray-50 px-2 py-6 shadow">
      {content}
    </div>
  );
}
