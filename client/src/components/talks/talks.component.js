import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNews } from '../../actions/news.actions';
import renderNewsRow from './render-talks-row';
import './talks.css';
import Icon from '../../assets/icon.png';

class Talks extends Component {
    componentDidMount() {
        this.props.fetchNews();
    }

    render() {
        return (
            <div className="talks">
                <div className="table">
                    <div className="header">
                        <div className="column number-column">
                            <img className="icon" src={Icon} alt="Icon" />
                        </div>
                        <div className="column title-column">
                            <Link className="title" to="/news">Hacker Talks</Link>
                            <Link to="/submit">submit</Link>
                        </div>
                        <div className="column auth-column">
                            login
                        </div>
                    </div>
                    {this.props.news.map(renderNewsRow.bind(this))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ news, auth }) => {
    return { news, auth };
};

export default connect(mapStateToProps, { fetchNews })(Talks);
