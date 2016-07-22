import React, {PropTypes} from 'react';
import styles from '../less/lightingTalkList.less';

import TableList from './common/TableList';
import LightingTalkItemRenderer from './LightingTalkItemRenderer';

export default class LightingTalkList extends React.Component {

    render() {
        return (
            <TableList
                className={styles.table}
                renderer={LightingTalkItemRenderer}
                emptyMessage="No talks, publish one ?"
                rows={this.props.talks}
                onSelectRow={this.props.onVoteTalk}
                />
        );
    }
}

LightingTalkList.propTypes = {
    talks: PropTypes.array,
    onVoteTalk: PropTypes.func
};
