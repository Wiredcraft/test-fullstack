import React, { PropTypes } from 'react';
import styles from '../less/lightingTalkList.less';

export default function LightingTalkItemRenderer(props) {
    const coverURL = props.data.coverURL;
    return (
        <div className={styles.item}>
            <div
                className={styles.cover}
                style={{backgroundImage: 'url(' + coverURL + ')'}}
                />
            <div className={styles.like} onClick={() => props.onSelectRow(props.data.id)}>
                {props.data.voteCount}
            </div>
            <div className={styles.detail}>
                <div className={styles.speaker}>
                    {props.data.speaker}
                </div>
                <a className={styles.title} href={props.data.talkURL} target="_blank">
                    {props.data.title}
                </a>
                <div className={styles.description}>
                    {props.data.description}
                </div>
            </div>

            <div className={styles.date}>
                Published by {props.data.publisher}
            </div>
        </div>
    );
}

LightingTalkItemRenderer.propTypes = {
    data: PropTypes.object,
    onSelectRow: PropTypes.func
};
