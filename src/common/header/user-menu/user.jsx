import { useState } from 'react';
import { withRouter } from 'react-router';
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

const UserItem = ({href, icon, actionText = ''}) => {
    const textChildrens = <span>{actionText}</span>
    return (
        <SHeaderPopupsLink to={href} >
            <HeaderPopupsItem icon={icon} textChildrens={textChildrens} />
        </SHeaderPopupsLink>
    )
}

const User = ({ history }) => {
    const [isOpened, setOpened] = useState(false);

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
                    actionText={Library.getText('common.header.user-menu.userItems.gallery')}
                    href={'/' + Library.getText('common.routes.profile.profile') + '/' + Library.getText('common.routes.profile.gallery')} 
                />

                <UserItem 
                    icon="cogs"
                    actionText={Library.getText('common.header.user-menu.userItems.settings')}
                    href={'/' + Library.getText('common.routes.profile.profile') + '/' + Library.getText('common.routes.profile.settings.settings')} 
                />

                <HeaderPopupsItem 
                    onClick={() => SignOut(history)} icon="sign-out" 
                    textChildrens={<span>{Library.getText('common.header.user-menu.userItems.logout')}</span>} 
                />
            </HeaderPopupsBody>
            
        </HeaderPopups>
    )
}

export default withRouter(User);