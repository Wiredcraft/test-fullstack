import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions';
import { getDateDiff } from "./date.util";
import './news.css';

class News extends Component {
    componentDidMount() {
        this.props.fetchNews();
    }

    renderNewsRow(newsItem, index) {
        const { hours, minutes } = getDateDiff(newsItem.publishDate);
        const timeText = hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
        return (
            <tr key={newsItem.id}>
                <td>{`${index + 1}.`}</td>
                <td>
                    <div className="news-item">
                        <div>
                            <span className="upvote"></span>
                            <span className="title">{newsItem.title}</span>
                            {newsItem.url && newsItem.url.length && <span>{newsItem.url}</span>}
                        </div>
                        <div>{`${newsItem.rating} points by ${newsItem.username} ${timeText}`}</div>
                    </div>
                </td>
            </tr>
        );
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
                        {this.props.news.map(this.renderNewsRow.bind(this))}
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
