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
      url: '',
      formErr:
        'Cannot be blank, keep title under 20 letters & description under 50 letters',
      formOK: false
    };
  }

  //Add the input values to the state.
  handleChange = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    await this.setState({ [name]: value });
    await this.validateInput();
  };

  //This function will validate the input fields.
  validateInput = async () => {
    let { description, url } = this.state;
    console.log(description.length);
    console.log(url.length);
    console.log(this.state.err);
    if (
      description.length < 21 &&
      description.length > 0 &&
      url.length < 51 &&
      url.length > 0
    ) {
      await this.setState({
        formErr: 'Validation OK!',
        formOK: true
      });
      //Setting state formOK to true if whatever validation is OK
    } else {
      await this.setState({
        formOK: false,
        formErr:
          'Cannot be blank, keep title under 20 letters & description under 50 letters'
      });
      //Setting state formOK to false if whatever validation is OK.
      //Setting state formErr to some error message.
    }
  };

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            name="description"
            placeholder="The title of the talk"
            className="mb2"
            type="text"
            onChange={this.handleChange}
          />
          <small>Letters left: {20 - this.state.description.length}</small>
          <input
            name="url"
            placeholder="Description of the talk"
            className="mb2"
            type="text"
            onChange={this.handleChange}
          />
          <small>Letters left: {50 - this.state.url.length}</small>
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          // After completed mutation, React Router Dom will navigate back to the LinkList component.
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
          {/* Hiding the submit button if the form validation is not OK */}
          {postMutation =>
            this.state.formOK ? (
              <button onClick={postMutation}>Submit</button>
            ) : (
              <small>{this.state.formErr}</small>
            )
          }
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
