import { useState } from "react";
import { useNavigate } from "react-router";
import { CreateTalkParams } from "types";

import { TalkForm } from "../../components/TalkForm";
import { ResourceLoader } from "../../components/ResourceLoader";

import { createTalk } from "../../api";

export const SubmitPage: React.FC = () => {
  const [submitting, setSubmitting] = useState<Promise<void>>();

  const navigate = useNavigate();

  const onSubmit = (data: CreateTalkParams) => {
    const promise = createTalk(data).then((talk) => {
      setSubmitting(undefined);
      navigate(`/talk/${talk.id}`);
    });
    setSubmitting(promise);
  };

  return submitting ? <ResourceLoader resource={submitting} /> : <TalkForm onSubmit={onSubmit} />;
};
