import { SessionRecordStatus } from "@prisma/client";
import Link from "next/link";
import { SessionRecordStatusBadge } from "~/components";
import { Button, Loader } from "~/components/ui";
import { api } from "~/utils/api";

export default function SessionRecordsPreviewsList() {
  const {
    data: sessionRecords,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = api.sessionRecords.list.useInfiniteQuery(
    {
      status: SessionRecordStatus.FINISHED,
      limit: 10,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="relative mt-2 flex flex-auto flex-col items-center">
      {sessionRecords?.pages.map(({ items: sessionRecords }, i) => (
        <ul className="w-full flex-auto space-y-2" key={i}>
          {sessionRecords.map((sessionRecord) => (
            <li key={sessionRecord.id}>
              <Link
                href={`/dashboard/sessions/${sessionRecord.id}/summary`}
                className="flex items-center justify-between space-x-2 rounded-lg bg-white py-4 pl-6 pr-8 text-sm shadow hover:bg-gray-50 active:bg-gray-100">
                <div className="space-y-1">
                  <div className="space-x-2">
                    <span>Title:</span>
                    <span className="font-semibold">{sessionRecord.topic}</span>
                  </div>
                  <div className="space-x-2 text-gray-500">
                    <span>Date:</span>
                    <span className="font-semibold">
                      {sessionRecord.createdAt.toLocaleString("en-UK", {
                        dateStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <SessionRecordStatusBadge status={sessionRecord.status} size="sm" />
                </div>
                <div className="rounded-2xl bg-red-50 px-2 py-1 font-semibold text-red-500">
                  <span>{sessionRecord.score}/100</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ))}
      <div>
        {hasNextPage && (
          <Button onClick={() => void fetchNextPage()} loading={isFetchingNextPage} size="sm">
            Load more sessions
          </Button>
        )}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {status === "loading" || (isFetching && !isFetchingNextPage) ? <Loader /> : null}
      </div>
    </div>
  );
}
