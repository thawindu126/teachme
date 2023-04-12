import {
  HighestEducationalExperience,
  type HighestEducationalExperience as HighestEducationalExperienceType,
} from "@prisma/client";
import { useRouter } from "next/router";
import { type ChangeEvent, useCallback, useState, useMemo } from "react";
import { Button, Input, MultiValueInput, Select, type SelectItem } from "~/components/ui";
import { classNames } from "~/lib/classNames";
import { api } from "~/utils/api";

const HIGHEST_EDUCATIONAL_EXPERIENCES: SelectItem<HighestEducationalExperienceType>[] = [
  {
    id: 0,
    name: HighestEducationalExperience.LESS_THAN_HIGH_SCHOOL_DIPLOMA,
    title: "Less than high school diploma",
  },
  {
    id: 1,
    name: HighestEducationalExperience.HIGH_SCHOOL_DIPLOMA,
    title: "High school diploma or GED",
  },
  {
    id: 2,
    name: HighestEducationalExperience.SOME_COLLEGE_NO_DEGREE,
    title: "Some college, but no degree",
  },
  {
    id: 3,
    name: HighestEducationalExperience.ASSOCIATES_DEGREE,
    title: "Associate's Degree (for example: AA, AS)",
  },
  {
    id: 4,
    name: HighestEducationalExperience.BACHELORS_DEGREE,
    title: "Bachelor's Degree (for example: BA, BBA, BS)",
  },
  {
    id: 5,
    name: HighestEducationalExperience.MASTERS_DEGREE,
    title: "Master's Degree (for example: MA, MS, MEng)",
  },
  {
    id: 6,
    name: HighestEducationalExperience.PROFESSIONAL_DEGREE,
    title: "Professional Degree (for example: MD, DDS, JD)",
  },
  {
    id: 7,
    name: HighestEducationalExperience.DOCTORATE,
    title: "Doctorate (for example: PhD, EdD)",
  },
];

export default function OnboardingForm() {
  const router = useRouter();
  const mutation = api.profile.finishOnboarding.useMutation({
    async onSuccess() {
      await router.push("/dashboard");
    },
    onError() {
      resetFields();
    },
  });
  const [name, setName] = useState("");
  const [highestEducationalExperience, setHighestEducationalExperience] =
    useState<SelectItem<HighestEducationalExperienceType>>();
  const [interestedTopics, setInterestedTopics] = useState<string[]>([]);
  const [interestedTopicsInputFieldValue, setInterestedTopicsInputFieldValue] = useState("");
  const disabled = useMemo(
    () => !name.trim() || !highestEducationalExperience,
    [highestEducationalExperience, name]
  );

  const resetFields = useCallback(() => {
    setName("");
    setHighestEducationalExperience(undefined);
    setInterestedTopics([]);
  }, []);

  const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  return (
    <div
      className={classNames(
        "relative mx-auto mt-8 w-[42rem] max-w-2xl space-y-6 rounded-3xl bg-white px-12 pb-12 pt-8 shadow-md"
      )}>
      <Input
        value={name}
        onChange={onNameChange}
        placeholder="Jane Doe"
        className="text-lg"
        wrapperClassName="space-y-4"
        label="Your full name"
        labelClassName="text-2xl"
      />

      <Select
        state={[highestEducationalExperience, setHighestEducationalExperience]}
        items={HIGHEST_EDUCATIONAL_EXPERIENCES}
        className="text-lg"
        wrapperClassName="space-y-4"
        label="Highest Educational Experience"
        labelClassName="text-2xl"
      />

      <MultiValueInput
        values={interestedTopics}
        setValues={setInterestedTopics}
        valueOnInputField={interestedTopicsInputFieldValue}
        setValueOnInputField={setInterestedTopicsInputFieldValue}
        placeholder="Radiation techniques, Nuclear fusion, Isomorphism"
        label="Interested topics"
        className="text-lg"
        wrapperClassName="space-y-4"
        labelClassName="text-2xl"
      />

      <Button
        size="lg"
        className={classNames("absolute -bottom-6 right-8")}
        onClick={() => {
          if (!highestEducationalExperience) {
            return;
          }
          mutation.mutate({
            name,
            highestEducationalExperience: highestEducationalExperience.name,
            interestedTopics: (() => {
              if (interestedTopics.length === 0) {
                return [interestedTopicsInputFieldValue];
              }
              return interestedTopics;
            })(),
          });
        }}
        disabled={disabled}>
        Next
      </Button>
    </div>
  );
}
