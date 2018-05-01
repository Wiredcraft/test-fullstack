import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions';
import renderNewsRow from './render-news-row';
import './news.css';

class News extends Component {
    componentDidMount() {
        this.props.fetchNews();
    }

    render() {
        return (
            <div className="news">
                <table className="news-table">
                    <thead>
                        <tr>
                            <th colSpan="2">Hacker News</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.news.map(renderNewsRow.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = ({ news }) => {
    return { news };
};

export default connect(mapStateToProps, { fetchNews })(News);
