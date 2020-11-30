import Header from "components/Header/Header";
import React, {useContext} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import TalkList from "../../components/TalkList";
import {useAllTalksQuery, useUpvoteTalkMutation} from "../../queries/hooks";
import {SortDirection, Talk, TalkField} from "../../queries/schemas";

import "./TalksContainer.css";

type Props = {
    pageSize?: number;
};

function usePage() {
    const location = useLocation();
    const p = new URLSearchParams(location.search).get("p");
    return p ? parseInt(p, 10) : 0;
}

const TalksContainer: React.FunctionComponent<Props> = ({pageSize = 30}): JSX.Element => {
    const page = usePage();
    const {loading, data} = useAllTalksQuery({
        variables: {
            order: {
                field: TalkField.Votes,
                direction: SortDirection.Desc
            },
            pagination: {
                limit: pageSize,
                offset: page * pageSize
            }
        }
    });

    const [upvoteTalkMutation] = useUpvoteTalkMutation();

    const hasMore = (page + 1) * pageSize < (data?.allTalks?.totalCount || 0);
    const history = useHistory();

    const handleUpvote = async (id: string) => {
        if (!data.me) {
            history.push("/login");
            return;
        }
        await upvoteTalkMutation({variables: {id}});
    };

    if (loading) {
        return null;
    }

    return (
        <div className="wrapper">
            <Header user={data?.me} />
            <TalkList
                nodes={data?.allTalks?.nodes as Talk[]}
                start={page * pageSize + 1}
                onUpvote={handleUpvote}
            />
            {hasMore && (
                <Link to={`/talks?p=${page + 1}`}>
                    <div className="more">More</div>
                </Link>
            )}
        </div>
    );
};

export default TalksContainer;
