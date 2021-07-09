import { withRouter } from 'react-router';

import { Library } from 'constants/language';
import { ToFollow } from 'functions/user';
import { PopupOpen } from 'common/popup/popup';
import { POSTRequestWithParams } from 'functions/api';
import { Notify } from 'common/app-notification/notification';
import Catalogue from 'common/catalogue-of/catalogue';

import ChangeProfile from 'profile/change-profile/change';
import styled from 'styled-components';

const SPopupActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-grow: 1;
`;

const SActionBtnText = styled.span`
    margin: 2px;
    color: var(--onHoverColor);
    text-transform: uppercase;
`;

const SActionsAction = styled.div`
    flex-grow: 1;
    margin: .5rem;
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 17, 173, 0.5);
    box-shadow: var(--boxShadow);
    border-radius: 5px;
    cursor: pointer;
    transition: var(--transitionApp);

    & i {
        margin: 5px;
        font-size: 1.5rem;
        color: #000000;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.5);
    }

    &:hover ${SActionBtnText} {
        color: var(--violetColor);
        transition: var(--transitionApp);
    }

    @media screen and (max-width: 900px) {
        & {
            flex-direction: column;
        }
    }
`;

const SSubsActions = styled.div`
    position: absolute;
    display: none;
    width: 100%;
    flex-direction: column;
    right: 0;
    z-index: 5;
`;

const SHaveRq = styled.div`
    position: relative;
    flex-grow: 1;
    
    &:hover ${SSubsActions} {
        display: flex;
    }
`;

const SRlshAction = styled(SActionsAction)`
    justify-content: center;
    flex-direction: row;
    margin: 0;
`;

const localLib = {
    'ch': Library.getText('profile.actions-btns.subsBtn.ch'),
    'rqAccept': Library.getText('profile.actions-btns.subsBtn.rqAccept'),
    'rqDecline': Library.getText('profile.actions-btns.subsBtn.rqDecline'),
    'unflw': Library.getText('profile.actions-btns.subsBtn.unflw'),
    'unmember': Library.getText('profile.actions-btns.subsBtn.unmember'),
    'rqSend': Library.getText('profile.actions-btns.subsBtn.rqSend'),
    'rqRemove': Library.getText('profile.actions-btns.subsBtn.rqRemove'),
    'member': Library.getText('profile.actions-btns.subsBtn.member'),
    'flw': Library.getText('profile.actions-btns.subsBtn.flw'),
    'canNotCreateChat': Library.getText('profile.actions-btns.subsBtn.canNotCreateChat'),
    'messenger': Library.getText('common.routes.messenger'),
    'actions': Library.getText('profile.actions-btns.subsBtn.actions'),
    'writeMessage': Library.getText('profile.actions-btns.subsBtn.writeMessage'),
    'following': Library.getText('profile.actions-btns.btns.following'),
    'followers': Library.getText('profile.actions-btns.btns.followers'),
    'groups': Library.getText('profile.actions-btns.btns.groups'),
    'members': Library.getText('profile.actions-btns.btns.members'),
    'events': Library.getText('profile.actions-btns.btns.events'),
    'gallery': Library.getText('profile.actions-btns.btns.gallery'),
}

export const CalculateSubsIcon = (isMy, InRlshState, OutRlshState) => {
    if (isMy) return 2;
    if ((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) return 1;
    return 0;
}

const calculateSubsText = (isMy, isUser, isPrivate, InRlshState, OutRlshState) => {
    if (isMy) return [localLib.ch];
    if (InRlshState === -1) return [localLib.rqAccept, localLib.rqDecline];
    if (((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) && isUser) return [localLib.unflw];
    if (((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) && !isUser) return [localLib.unmember];

    if (isPrivate && OutRlshState === null) return [localLib.rqSend];
    if (isPrivate && OutRlshState === -1) return [localLib.rqRemove];
    
    if (!isUser) return [localLib.member];
    return [localLib.flw];
}

export const CalculateSubsNumberType = (isMy, isPrivate, InRlshState, OutRlshState) => {
    if (isMy) return 10; // change data
    if ((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) return 1; // unsubs
    if (InRlshState === -1) return 4; // accept decline rq
    if (isPrivate && OutRlshState === null) return 2; // send rq
    if (isPrivate && OutRlshState === -1) return 3; // repeal rq
    return 0; // subs
}

const WriteBtnClick = async(history, isUser, id) => {
    const t = isUser ? "user" : "group";
    const res = await POSTRequestWithParams('/s/chat', {'id': id, 'type': t})
    if (res.err !== "ok") return Notify('fail', localLib.canNotCreateChat);
    history.push(`/${localLib.messenger}/` + t[0] + id);
}

export const SubsClick = async(clickNumber, isUser, subsState = {'id': 0, 'OutRlshState': 1, 'InRlshState': 1}, setSubsState, isNeedPopup = true) => {
    if (clickNumber === 0) return ToFollow(subsState.id, isUser, clickNumber, () => setSubsState(Object.assign({}, subsState, {'OutRlshState': 1})));
    if (clickNumber === 1) return ToFollow(subsState.id, isUser, clickNumber, () => setSubsState(Object.assign({}, subsState, {'OutRlshState': null, 'InRlshState': null})));
    if (clickNumber === 2) return ToFollow(subsState.id, isUser, clickNumber, () => setSubsState(Object.assign({}, subsState, {'OutRlshState': -1})));
    if (clickNumber === 3) return ToFollow(subsState.id, isUser, clickNumber, () => setSubsState(Object.assign({}, subsState, {'OutRlshState': null})));
    if (clickNumber === 4) return ToFollow(subsState.id, isUser, clickNumber, () => setSubsState(Object.assign({}, subsState, {'InRlshState': 1})));
    if (clickNumber === 5) return ToFollow(subsState.id, isUser, clickNumber, () => setSubsState(Object.assign({}, subsState, {'InRlshState': null})));
    if (isNeedPopup) return PopupOpen(ChangeProfile, {...subsState, 'isUser': isUser});
};

// generate subscription btn relatively from profile type, private type, isMy, have in follow
const GSubsBtn = ({history, id, isMy, isUser, isHaveAccess, profile, setProfile}) => {
    const icons = ['user-plus', 'user-times', 'window-restore'];
    const icon = icons[CalculateSubsIcon(isMy, profile.InRlshState, profile.OutRlshState)];
    const text = calculateSubsText(isMy, isUser, profile.isPrivate, profile.InRlshState, profile.OutRlshState);
    let clickNumber = CalculateSubsNumberType(isMy, profile.isPrivate, profile.InRlshState, profile.OutRlshState);

    return (
        <SHaveRq>
            <SRlshAction>
                <SActionBtnText>{localLib.actions}</SActionBtnText>
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
            </SRlshAction>

            <SSubsActions>
                {
                    (isHaveAccess && !isMy && isUser) || (profile.OutRlshState === 1 && !isUser)
                    ? <SRlshAction onClick={() => WriteBtnClick(history, isUser, id)}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        <SActionBtnText> {localLib.writeMessage} </SActionBtnText>
                    </SRlshAction>
                    : null
                }

                <SRlshAction onClick={() => SubsClick(clickNumber, isUser, profile, setProfile)}>
                    <i className={`fa fa-${icon}`} aria-hidden="true"></i>
                    <SActionBtnText>{text[0]}</SActionBtnText>
                </SRlshAction>
                
                {
                    text.length === 1 
                    ? null 
                    : <SRlshAction onClick={() => (clickNumber = 5) && SubsClick(clickNumber, isUser, profile, setProfile)}>
                        <i className={`fa fa-${icons[1]}`} aria-hidden="true"></i>
                        <SActionBtnText>{text[1]}</SActionBtnText>
                    </SRlshAction>
                }
            </SSubsActions>
        </SHaveRq>
    )
}

// generate one action btn
const GOneActionBtn = ({icon, btnText, btnCount, onClick}) => {
    const icons = ['users', 'picture-o', 'calendar'];
    return (
        <SActionsAction onClick={onClick}>
            <i className={`fa fa-${icons[icon]}`}></i>
            <div className="btn-text-wrapper">
                <SActionBtnText>{btnText}:</SActionBtnText>
                <SActionBtnText>{btnCount}</SActionBtnText>
            </div>
        </SActionsAction>
    )
}

// btns' actions
const HandleClick = (type, get, title, userID,  params = {}) => 
    PopupOpen(Catalogue, {'type': type, 'get': get, 'title':title, 'params': params, 'userID': userID});

// generate action btns relatively from profile type and private type
const GActionBtns = ({history, id, isMy, isHaveAccess, type, isUser, profile, setProfile = ()=>{}}) => {
    return (
        <>
            {
                isHaveAccess
                    ? <SPopupActions>
                        {
                            isUser 
                                ? <>
                                    <GOneActionBtn 
                                        icon="0" 
                                        btnText={localLib.following} 
                                        btnCount={profile.followingCount}
                                        onClick={() => HandleClick('user', 'users', 'following', profile.id, {'type':'following'})} 
                                    />

                                    <GOneActionBtn 
                                        icon="0" 
                                        btnText={localLib.followers} 
                                        btnCount={profile.followersCount}
                                        onClick={() => HandleClick('user', 'users', 'followers', profile.id, {'type':'followers', 'flwType': 'all'})} 
                                    />

                                    <GOneActionBtn 
                                        icon="0" 
                                        btnText={localLib.groups}    
                                        btnCount={profile.groupsCount}
                                        onClick={() => HandleClick('group', 'groups', 'groups', profile.id, {'type': 'all'})} 
                                    />
                                </>
                                : <>
                                    <GOneActionBtn 
                                        icon="0" 
                                        btnText={localLib.members} 
                                        btnCount={profile.membersCount}
                                        onClick={() => HandleClick('user', 'users', 'members', profile.id, {'type':'members'})} 
                                    />

                                    <GOneActionBtn 
                                        icon="2" 
                                        btnText={localLib.events}  
                                        btnCount={profile.eventsCount}
                                        onClick={() => HandleClick('event', 'events', 'events', profile.id, {'which': type})} 
                                    />
                                </>
                        }

                        <GOneActionBtn 
                            icon="1" 
                            btnText={localLib.gallery} 
                            btnCount={profile.galleryCount}
                            onClick={() => HandleClick('gallery', 'gallery', 'gallery', profile.id, {'type': type, 'ownerID': profile.id, 'galleryType': 'all'})} 
                        />
                    </SPopupActions>
                    : null
            }
            <GSubsBtn 
                isMy={isMy} 
                isUser={isUser}
                isHaveAccess={isHaveAccess}
                profile={profile}
                history={history}
                id={id}
                setProfile={setProfile}
            />
           
        </>
    )
}

export default withRouter(GActionBtns)