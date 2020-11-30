import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";
import {Talk} from "../../queries/schemas";

import "./TalkList.css";

const fmt = (time: string): string => formatDistanceToNow(new Date(time), {addSuffix: true});

type Props = {
    nodes: Talk[];
    start: number;
    onUpvote: (id: string) => void;
};

const TalkList: React.FunctionComponent<Props> = ({nodes = [], start, onUpvote}): JSX.Element => {
    return (
        <div className={"list"}>
            {nodes.map((value, index) => (
                <div key={value.id} className={"talk"}>
                    <div className="num">{start + index}.</div>
                    <div className="upvote" onClick={() => onUpvote(value.id)}>
                        <span />
                    </div>
                    <div>
                        <div className={"title"}>{value.title}</div>
                        <div className={"description"}>{value.description}</div>
                        <div className={"meta"}>
                            {value.votes} votes | by {value.author.name} {fmt(value.createdAt)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TalkList;
