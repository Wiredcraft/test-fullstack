import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNews } from '../../actions';
import renderNewsRow from './render-news-row';
import './news.css';
import 'bootstrap/scss/bootstrap.scss';
import Icon from '../../assets/icon.png';

class News extends Component {
    componentDidMount() {
        this.props.fetchNews();
    }

    render() {
        return (
            <div className="news">
                <div className="news-table">
                    <div className="header">
                        <div className="column number-column">
                            <img className="icon" src={Icon} alt="Icon" />
                        </div>
                        <div className="column">
                            <Link className="title" to="/news">Hacker News</Link>
                            <Link to="/submit">submit</Link>
                        </div>
                    </div>
                    <div>
                        {this.props.news.map(renderNewsRow.bind(this))}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ news }) => {
    return { news };
};

export default connect(mapStateToProps, { fetchNews })(News);
