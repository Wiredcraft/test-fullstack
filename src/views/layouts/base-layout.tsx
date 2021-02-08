import * as React from 'react';

import {
  useHistory
} from "react-router-dom";

import * as PageService from '../../services/page-service';

import '../../styles/main';


type Props = {
  children: React.ReactNode
}


const BaseLayout = ({ children }: Props) => {
  const history = useHistory();

  React.useEffect(() => {
  });

  function showHome(event: React.MouseEvent) {
    try {
      const urlPrefix = PageService.urlPrefix;
      history.push(`${urlPrefix}/talks`);
    } catch (error) {
      // console.log(error.message);
    }
  }

  function showNew(event: React.MouseEvent) {
    try {
      const urlPrefix = PageService.urlPrefix;
      history.push(`${urlPrefix}/talks/new`);
    } catch (error) {
      // console.log(error.message);
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <ul>
            <li onClick={showHome}>
              Home
            </li>

            <li onClick={showNew}>
              New Talk
            </li>
          </ul>
        </div>
      </header>
      { children }
    </>
  )
}

export default BaseLayout;
