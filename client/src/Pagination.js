import React from 'react';
import { Link } from '@reach/router';

const Pagination = ({ prev, next }) => {

  return (
    <div className='pagination'>
      {prev && <React.Fragment>
        <Link to='/?first'>First</Link>
        <Link to={`/?end_at=${prev}`}>Previous</Link>
      </React.Fragment>}
      {next && <React.Fragment>
        <Link to={`/?start_at=${next}`}>Next</Link>
        <Link to='/?last'>Last</Link>
      </React.Fragment>}
    </div>
  );
}

export default Pagination;
