import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from "../../actions";

class News extends Component {
    componentDidMount() {
        this.props.fetchNews();
    }

    render() {
        return (
            <div className="news">
                {this.props.news.map(item => {
                    return (<div key={item.id}>{item.title}</div>);
                })}
            </div>
        );
    }
}
const mapStateToProps = ({ news }) => {
    return { news };
};

export default connect(mapStateToProps, { fetchNews })(News);
