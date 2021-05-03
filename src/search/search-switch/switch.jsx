import { NavLink } from 'react-router-dom';

import { Library } from 'constants/language';

import styled from 'styled-components';

const SSearchSwitch = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 100%;
`;

const SSearchSwitchBtn = styled(NavLink)`
    display: inline-block;
    color: var(--onHoverColor);
    text-transform: uppercase;
    padding: 2rem;
    text-align: center;
    width: 25%;
    background: rgba(19, 0, 61, 0.6);
    text-decoration: none;

    &.active {
        background: rgba(19, 0, 61, 0.75);
    }
`;

export default function SearchSwitch() {
    const GSwitchBtn = ({text}) => <div className={`search-switch-${text}`}>{text}</div>

    return (
        <SSearchSwitch>
            <SSearchSwitchBtn 
                activeClassName="active" 
                to={"/"+Library.getText('common.routes.searches.search')+"/"+Library.getText('common.routes.searches.all')}
            >
                <GSwitchBtn text={Library.getText('common.routes.searches.all')} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn 
                activeClassName="active" 
                to={"/"+Library.getText('common.routes.searches.search')+"/"+Library.getText('common.routes.searches.user')}
            >
                <GSwitchBtn text={Library.getText('common.routes.searches.user')} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn 
                activeClassName="active" 
                to={"/"+Library.getText('common.routes.searches.search')+"/"+Library.getText('common.routes.group')}
            >
                <GSwitchBtn text={Library.getText('common.routes.group')} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn 
                activeClassName="active" 
                to={"/"+Library.getText('common.routes.searches.search')+"/"+Library.getText('common.routes.post')}
            >
                <GSwitchBtn text={Library.getText('common.routes.post')} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn 
                activeClassName="active" 
                to={"/"+Library.getText('common.routes.searches.search')+"/"+Library.getText('common.routes.video')}
            >
                <GSwitchBtn text={Library.getText('common.routes.video')} />
            </SSearchSwitchBtn>
        </SSearchSwitch>
    )
}