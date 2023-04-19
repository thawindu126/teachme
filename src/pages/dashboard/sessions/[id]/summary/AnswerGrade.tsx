import { SessionRecordAnswerGrade } from "@prisma/client";
import { classNames } from "~/lib/classNames";

export default function AnswerGrade({
  grade,
  className,
}: {
  grade: SessionRecordAnswerGrade;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "relative h-8 w-8 rounded-full text-white shadow",
        {
          "bg-green-600": grade === SessionRecordAnswerGrade.A,
          "bg-emerald-600 saturate-50": grade === SessionRecordAnswerGrade.B,
          "bg-lime-600 saturate-50": grade === SessionRecordAnswerGrade.C,
          "bg-yellow-600": grade === SessionRecordAnswerGrade.D,
          "bg-red-600 saturate-50": grade === SessionRecordAnswerGrade.F,
        },
        className
      )}>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{grade}</span>
    </span>
  );
}
