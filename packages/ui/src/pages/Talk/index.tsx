import { useMemo } from "react";
import { useParams } from "react-router";

import { TalkDetail } from "../../components/TalkDetail";
import { ResourceLoader } from "../../components/ResourceLoader";

import { getTalk } from "../../api";

export const TalkPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const fetching = useMemo(async () => getTalk(id!), [id]);

  return <ResourceLoader resource={fetching} renderData={(talk) => <TalkDetail talk={talk} />} />;
};
