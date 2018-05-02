import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './submit.css';
import Icon from '../../assets/icon.png';

class Submit extends Component {
    render() {
        return (
            <div className="submit">
                <div className="table">
                    <div className="header">
                        <div className="column">
                            <Link to="/talks">
                                <img className="icon" src={Icon} alt="Icon" />
                            </Link>
                        </div>
                        <div className="column title-column">
                            <span className="title">Submit</span>
                        </div>
                    </div>
                    <div className="row submit-row">
                        <div className="column first-column">title</div>
                        <div className="column">
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column first-column">description</div>
                        <div className="column">
                            <textarea></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column first-column-offset">
                            <button>Submit</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column first-column-offset">
                            Leave url blank to submit a question for discussion. If there is no url, the text (if any) will appear at the top of the thread.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ news, auth }) => {
    return { news, auth };
};

export default connect(mapStateToProps)(Submit);
