import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { TalkList } from "../../components/TalkList";
import { ResourceLoader } from "../../components/ResourceLoader";

import { listTalks } from "../../api";

import styles from "./styles.module.css";

const perPage = 20;

export const HomePage: React.FC = () => {
  const [params] = useSearchParams();
  const page = Number(params.get("page") ?? "0");

  const fetching = useMemo(async () => listTalks(page), [page]);

  return (
    <ResourceLoader
      resource={fetching}
      renderData={(talks) =>
        talks.length === 0 ? (
          <Welcome />
        ) : (
          <table>
            <TalkList start={page * perPage + 1} talks={talks} />
            <tr className={styles.more}>
              <td colSpan={2}></td>
              <td>{talks.length < perPage ? null : <a href={`/?page=${page + 1}`}>More</a>}</td>
            </tr>
          </table>
        )
      }
    />
  );
};

export const Welcome = () => {
  return (
    <p>
      Welcome!{" "}
      <b>
        <a href="/submit">Submit</a>
      </b>{" "}
      your talk now!
    </p>
  );
};
