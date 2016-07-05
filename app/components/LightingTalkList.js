import React from 'react';
import styles from '../less/lightingTalkList.less';

import TableList from './common/TableList';
import LightingTalkItemRenderer from './LightingTalkItemRenderer';

export default class LightingTalkList extends React.Component {

    render() {
        return (
            <TableList
                className={styles.table}
                renderer={LightingTalkItemRenderer}
                emptyMessage="No talks available, try to publish one ?"
                rows={this.props.talks}
                onSelectRow={null}
                />
        );
    }
}