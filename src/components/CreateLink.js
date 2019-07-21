import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from './LinkList';

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
  handleChange = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            name="description"
            placeholder="A description for the talk"
            className="mb2"
            type="text"
            onChange={this.handleChange}
          />
          <input
            name="url"
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
          update={(store, { data: { post } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data
            });
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
