import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      url: ''
    };
  }

  //Add the input values to the state.
  handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            placeholder="A description for the talk"
            className="mb2"
            type="text"
            onChange={this.handleChange}
          />
          <input
            placeholder="The URL for the Talk"
            className="mb2"
            type="text"
            onChange={this.handleChange}
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          // After completed mutation, RRD will navigate back to the LinkList component.
          onCompleted={() => this.props.history.push('/')}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
