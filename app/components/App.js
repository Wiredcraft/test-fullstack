import React from 'react';
import { connect } from 'react-redux';
import styles from '../less/main.less';

class App extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.app}>
                    App Status：{this.props.app.status}
                </div>
            </div>
        );
    }
}

let componentState = ({root}) => ({
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(App);