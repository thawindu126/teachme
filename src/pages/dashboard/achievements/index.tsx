import { NextSeo } from "next-seo";
import BackgroundPatternTransparent from "~/assets/background-pattern-transparent.webp";
import { Avatar, BackButton, DashboardLayout } from "~/components";
import { Loader, LoaderSize, Tooltip } from "~/components/ui";
import { defaultAvatarSrc } from "~/lib/defaultAvatarImage";
import { api } from "~/utils/api";

export default function Achievements() {
  const { data: user, isLoading: isUserLoading } = api.me.useQuery();

  return (
    <>
      <NextSeo title="Achievements | TeachMe" />
      <DashboardLayout>
        <div
          className="relative flex h-full flex-col space-y-4 bg-white bg-opacity-25 bg-cover bg-center bg-no-repeat px-4 bg-blend-color"
          style={{ backgroundImage: `url(${BackgroundPatternTransparent.src})` }}>
          {!user || isUserLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader size={LoaderSize.Five} />
            </div>
          ) : (
            <div className="mx-8 flex flex-auto flex-col items-center overflow-hidden shadow">
              <div className="flex w-full justify-between self-start bg-primary-700 py-4 pl-4 pr-16">
                <div className="space-y-4">
                  <BackButton className="self-start !text-white hover:!text-gray-100" />
                  <div className="mx-8 text-3xl text-gray-50 underline decoration-gray-50">Achievements</div>
                </div>
                <Tooltip content={`${user.points} / ${user.pointsOfNextLevel}`} placement="right">
                  <Avatar
                    imageSrc={defaultAvatarSrc({ email: user.email, size: 240 })}
                    alt={user.name || "You"}
                    size="2xl"
                    levelDetails={{
                      points: user.points,
                      level: user.level,
                      pointsOfNextLevel: user.pointsOfNextLevel,
                    }}
                  />
                </Tooltip>
              </div>
              <div className="relative flex w-full flex-auto overflow-hidden bg-gray-50 bg-opacity-80 shadow"></div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
