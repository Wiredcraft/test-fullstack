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
            <div className={styles.like}>
                {props.data.like}
            </div>
            <div className={styles.detail}>
                <div className={styles.speaker}>
                    {props.data.speaker}
                </div>
                <div className={styles.title}>
                    {props.data.title}
                </div>
                <div className={styles.description}>
                    {props.data.description}
                </div>
            </div>

            <div className={styles.date}>
                Published by {props.data.publisher}, {props.data.date}
            </div>
        </div>
    );
}

LightingTalkItemRenderer.propTypes = {
    data: PropTypes.object
};
