import React, { PropTypes } from 'react';
import _ from 'lodash';
import cn from 'classnames';

function TableItems(props) {
    let items = _(props.rows).map((rowData, index) => {
        let RendererComponent = props.renderer;
        return (
            <RendererComponent
                onSelectRow={props.onSelectRow}
                key={rowData.id}
                index={index}
                data={rowData}
                />
        );
    }).value();
    return (
        <div>
            {items}
        </div>
    );
}

TableItems.propTypes = {
    onSelectRow: PropTypes.func,
    renderer: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired
};

export default class TableList extends React.Component {
    onSelectRow(rowData) {
        if (this.props.onSelectRow) {
            this.props.onSelectRow(rowData);
        }
    }

    render() {
        const emptyMessage = this.props.emptyMessage;
        return (
            <div className={cn(this.props.className)}>
                {!this.props.rows || this.props.rows.length === 0 ?
                    <div className="empty">{emptyMessage || '当前没有可显示的数据'}</div> : null}
                {this.props.rows && this.props.rows.length > 0 ?
                    <TableItems
                        renderer={this.props.renderer}
                        onSelectRow={this.onSelectRow.bind(this)}
                        rows={this.props.rows}
                    />
                    : null}
            </div>
        );
    }
}

TableList.propTypes = {
    className: PropTypes.string,
    rows: React.PropTypes.array.isRequired,
    emptyMessage: React.PropTypes.string,
    renderer: React.PropTypes.func.isRequired,
    onSelectRow: React.PropTypes.func,
};