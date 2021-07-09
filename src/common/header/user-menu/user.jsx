import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import { SignOut } from 'functions/user';

import HeaderPopups from 'common/header/header-popups/popups';
import HeaderPopupsIcons from 'common/header/header-popups-icons/icons';
import HeaderPopupsBody from 'common/header/header-popups-body/body';
import HeaderPopupsItem from 'common/header/header-popups-item/item';
import styled from 'styled-components';

const SHeaderPopupsLink = styled(Link)`
    text-decoration: none;
    color: #000000;
`;

const localLib = {
    'account': Library.getText('common.routes.account.account'),
    'gallery': Library.getText('common.routes.account.gallery'),
    'settings': Library.getText('common.routes.account.settings.settings'),
    'logout': Library.getText('common.aside.logout'),
}

const UserItem = ({href, icon, actionText = ''}) => {
    const textChildrens = <span>{actionText}</span>
    return (
        <SHeaderPopupsLink to={href} >
            <HeaderPopupsItem icon={icon} textChildrens={textChildrens} />
        </SHeaderPopupsLink>
    )
}

export default function User() {
    const [isOpened, setOpened] = useState(false);
    const history = useHistory();

    return (
        <HeaderPopups isOpened={isOpened} setOpened={setOpened} >
            <HeaderPopupsIcons>
                <img src={USER.avatar} alt="default-avatar"/>
            </HeaderPopupsIcons>

            <div className="user-popup-icon">
                <i className="fa fa-caret-down" aria-hidden="true"></i>
            </div>

            <HeaderPopupsBody isOpened={isOpened} >
                <UserItem 
                    icon="picture-o" 
                    actionText={localLib.gallery}
                    href={'/' + localLib.account + '/' + localLib.gallery} 
                />

                <UserItem 
                    icon="cogs"
                    actionText={localLib.settings}
                    href={'/' + localLib.account + '/' + localLib.settings} 
                />

                <HeaderPopupsItem 
                    onClick={() => SignOut(history)} icon="sign-out" 
                    textChildrens={<span>{localLib.logout}</span>} 
                />
            </HeaderPopupsBody>
        </HeaderPopups>
    )
}