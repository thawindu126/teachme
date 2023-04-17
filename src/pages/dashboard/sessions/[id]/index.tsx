import { SessionRecordStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { DashboardLayout } from "~/components";
import { Loader } from "~/components/ui";
import SessionConversation from "~/pages/dashboard/sessions/[id]/SessionConversation";
import SessionStart from "~/pages/dashboard/sessions/[id]/SessionStart";
import { api } from "~/utils/api";

export default function Session() {
  const router = useRouter();
  const { id } = router.query;
  const [sessionRecordStatus, setSessionRecordStatus] = useState<SessionRecordStatus | null>(null);
  api.sessionRecords.get.useQuery(
    { id: id as string },
    {
      enabled: !!id,
      onSuccess(data) {
        if (!data) {
          return;
        }

        setSessionRecordStatus(data.status);
      },
    }
  );

  return (
    <DashboardLayout>
      {(() => {
        if (!id || Array.isArray(id)) {
          return null;
        }

        if (!sessionRecordStatus) {
          return (
            <div className="relative h-full w-full">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loader />
              </div>
            </div>
          );
        }

        if (sessionRecordStatus === SessionRecordStatus.PENDING) {
          return <SessionStart id={id} setSessionRecordStatus={setSessionRecordStatus} />;
        }

        return <SessionConversation id={id} status={sessionRecordStatus} />;
      })()}
    </DashboardLayout>
  );
}
