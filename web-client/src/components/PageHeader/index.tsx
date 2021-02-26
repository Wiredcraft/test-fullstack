import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeedxButton } from 'components/FeedxButton';
import FEEDxLogo from 'components/FeedxLogo';
import FlexWrapper from 'containers/BaseWrappers/FlexWrapper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../containers/BaseWrappers/ContentWrapper';
import AuthStatus from './AuthStatus';
import './index.scss';
import Navbar from './Navbar';

export default function PageHeader() {
  // Toggle navbar collapse state while in mobile mode
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false)
  const toggleNavbarCollapsed = () => {
    console.log(isNavbarCollapsed)
    setIsNavbarCollapsed(!isNavbarCollapsed)
  }

  return (
    <nav id="fdx-page-header">
      <header>
        <ContentWrapper>
          <FlexWrapper alignItems="center" justifyContent="space-between">
            <FlexWrapper alignItems="center" justifyContent="flex-start">
              {/* <FeedxButton onClick={toggleNavbarCollapsed} btnType="ghost" style={{ marginRight: "15px" }}>
                <FontAwesomeIcon style={{fontSize: '14px'}} icon={faBars} />
              </FeedxButton> */}
              <Link to={{ pathname: "/home" }}><FEEDxLogo style={{ height: '36px' }} /></Link>
            </FlexWrapper>
            <AuthStatus />
          </FlexWrapper>
        </ContentWrapper>
      </header>
      <nav>
        <ContentWrapper>
          <FlexWrapper flexDirection="row" alignItems="baseline" justifyContent="space-between">
            <Navbar />
          </FlexWrapper>
        </ContentWrapper>
      </nav>
    </nav>
  )
}
