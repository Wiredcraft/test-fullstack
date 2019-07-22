import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

export const FEED_QUERY = gql`
  query FeedQuery($orderBy: LinkOrderByInput) {
    feed(orderBy: $orderBy) {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const isNewPage = this.props.location.pathname.includes('new');
    const page = parseInt(this.props.match.params.page, 10);

    const orderBy = isNewPage ? 'createdAt_DESC' : null;
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { orderBy }
    });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  };

  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('new');
    const page = parseInt(this.props.match.params.page, 10);

    const orderBy = isNewPage ? 'createdAt_DESC' : null;
    return { orderBy };
  };

  _getLinksToRender = data => {
    const isNewPage = this.props.location.pathname.includes('new');
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  };

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = this._getLinksToRender(data);
          const pageIndex = this.props.match.params.page
            ? (this.props.match.params.page - 1) * LINKS_PER_PAGE
            : 0;

          return (
            <Fragment>
              {linksToRender.length === 0 ? (
                <div>
                  <h1>List is empty! Go and add your talk right away!</h1>
                </div>
              ) : (
                linksToRender.map((link, index) => (
                  <Link
                    key={link.id}
                    link={link}
                    index={index + pageIndex}
                    updateStoreAfterVote={this._updateCacheAfterVote}
                  />
                ))
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }

  //read the current state of the cached data
  //retrieve the link the the user just voted for
  //take the modified data and write to the store
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };
}

export default LinkList;
