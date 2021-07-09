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

const localLib = {
    'search': Library.getText('common.routes.searches.search'),
    'all': Library.getText('common.routes.searches.all'),
    'user': Library.getText('common.routes.user'),
    'group': Library.getText('common.routes.group'),
    'post': Library.getText('common.routes.post'),
    'video': Library.getText('common.routes.video'),
}

export default function SearchSwitch() {
    const GSwitchBtn = ({text}) => <div className={`search-switch-${text}`}>{text}</div>

    return (
        <SSearchSwitch>
            {/* <SSearchSwitchBtn activeClassName="active" to={"/" + localLib.search + "/" + localLib.all}>
                <GSwitchBtn text={localLib.all} />
            </SSearchSwitchBtn> */}
            <SSearchSwitchBtn activeClassName="active" to={"/" + localLib.search + "/" + localLib.user}>
                <GSwitchBtn text={localLib.user} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn activeClassName="active" to={"/" + localLib.search + "/" + localLib.group}>
                <GSwitchBtn text={localLib.group} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn activeClassName="active" to={"/" + localLib.search + "/" + localLib.post}>
                <GSwitchBtn text={localLib.post} />
            </SSearchSwitchBtn>
            <SSearchSwitchBtn activeClassName="active" to={"/" + localLib.search + "/" + localLib.video}>
                <GSwitchBtn text={localLib.video} />
            </SSearchSwitchBtn>
        </SSearchSwitch>
    )
}