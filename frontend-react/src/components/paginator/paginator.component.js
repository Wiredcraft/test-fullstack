import { Link } from 'react-router-dom';

import './paginator.component.css';

function Paginator({ pageIndex, maxPageCount, setPageIndex }) {
  const safeIndex = (i) => Math.max(1, Math.min(i, maxPageCount));

  return (
    <div className="row">
      <div className="col">
        <nav className="pt-3" aria-label="Page navigation">
          <ul className="pagination pagination-sm mb-2">
            <li className={'page-item ' + (pageIndex === 1 ? 'disabled' : '')}>
              <Link className="page-link"
                    to="?page=1"
                    onClick={() => setPageIndex(1)}>First</Link>
            </li>
            <li className={'page-item ' + (pageIndex === 1 ? 'disabled' : '')}>
              <Link className="page-link"
                    to={'?page=' + safeIndex(pageIndex - 1)}
                    onClick={() => setPageIndex(safeIndex(pageIndex - 1))}>Previous</Link>
            </li>
            <li className="page-item disabled">
              <span className="page-link">{pageIndex} / {maxPageCount}</span>
            </li>
            <li className={'page-item ' + (pageIndex === maxPageCount ? 'disabled' : '')}>
              <Link className="page-link"
                    to={'?page=' + safeIndex(pageIndex + 1)}
                    onClick={() => setPageIndex(safeIndex(pageIndex + 1))}>Next</Link>
            </li>
            <li className={'page-item ' + (pageIndex === maxPageCount ? 'disabled' : '')}>
              <Link className="page-link"
                    to={'?page=' + maxPageCount}
                    onClick={() => setPageIndex(maxPageCount)}>Last</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Paginator;
