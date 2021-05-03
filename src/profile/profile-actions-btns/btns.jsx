import { Library } from 'constants/language';
import { ToFollow } from 'functions/user';
import { PopupOpen } from 'common/popup/popup';
import { POSTRequestWithParams } from 'functions/api';
import Catalogue from 'common/catalogue-of/catalogue';

import ChangeProfile from 'profile/change-profile/change';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Notify } from 'common/app-notification/notification';

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

const calculateIcon = (isMy, InRlshState, OutRlshState) => {
    if (isMy) return 2;
    if ((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) return 1;
    return 0;
}

const calculateText = (isMy, isUser, isPrivate, InRlshState, OutRlshState) => {
    if (isMy) return [Library.getText('profile.actions-btns.subsBtn.ch')];
    if (InRlshState === -1) return [Library.getText('profile.actions-btns.subsBtn.rqAccept'), Library.getText('profile.actions-btns.subsBtn.rqDecline')]
    if (((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) && isUser) return [Library.getText('profile.actions-btns.subsBtn.unflw')];
    if (((InRlshState === 1 || InRlshState === 0) || (OutRlshState === 0 || OutRlshState === 1)) && !isUser) return [Library.getText('profile.actions-btns.subsBtn.unmember')];

    if (isPrivate && OutRlshState === null) return [Library.getText('profile.actions-btns.subsBtn.rqSend')];
    if (isPrivate && OutRlshState === -1) return [Library.getText('profile.actions-btns.subsBtn.rqRemove')];
    
    if (!isUser) return [Library.getText('profile.actions-btns.subsBtn.member')];
    return [Library.getText('profile.actions-btns.subsBtn.flw')];
}

const calculateClickNumber = (isMy, isPrivate, InRlshState, OutRlshState) => {
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
    if (res.err !== "ok") return Notify('fail', 'Can not create chat with thus user');
    history.push('/messenger/' + t[0] + id);
}

// generate subscription btn relatively from profile type, private type, isMy, have in follow
const GSubsBtn = ({history, id, isMy, isUser, isHaveAccess, profile, setProfile}) => {
    const icons = ['user-plus', 'user-times', 'window-restore'];
    const icon = icons[calculateIcon(isMy, profile.InRlshState, profile.OutRlshState)];
    const text = calculateText(isMy, isUser, profile.isPrivate, profile.InRlshState, profile.OutRlshState);
    let clickNumber = calculateClickNumber(isMy, profile.isPrivate, profile.InRlshState, profile.OutRlshState);

    const SubsClick = async() => {
        if (clickNumber === 0) return ToFollow(profile.id, isUser, clickNumber, () => setProfile(Object.assign({}, profile, {'OutRlshState': 1})));
        if (clickNumber === 1) return ToFollow(profile.id, isUser, clickNumber, () => setProfile(Object.assign({}, profile, {'OutRlshState': null, 'InRlshState': null})));
        if (clickNumber === 2) return ToFollow(profile.id, isUser, clickNumber, () => setProfile(Object.assign({}, profile, {'OutRlshState': -1})));
        if (clickNumber === 3) return ToFollow(profile.id, isUser, clickNumber, () => setProfile(Object.assign({}, profile, {'OutRlshState': null})));
        if (clickNumber === 4) return ToFollow(profile.id, isUser, clickNumber, () => setProfile(Object.assign({}, profile, {'InRlshState': 1})));
        if (clickNumber === 5) return ToFollow(profile.id, isUser, clickNumber, () => setProfile(Object.assign({}, profile, {'InRlshState': null})));
        return PopupOpen(ChangeProfile, {...profile, 'isUser': isUser});
    };

    return (
        <SHaveRq>
            <SRlshAction>
                <SActionBtnText>Actions</SActionBtnText>
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
            </SRlshAction>

            <SSubsActions>
                {
                    isHaveAccess && !isMy
                    ? <SRlshAction onClick={() => WriteBtnClick(history, isUser, id)}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        <SActionBtnText> write message </SActionBtnText>
                    </SRlshAction>
                    : null
                }

                <SRlshAction onClick={SubsClick}>
                    <i className={`fa fa-${icon}`} aria-hidden="true"></i>
                    <SActionBtnText>{text[0]}</SActionBtnText>
                </SRlshAction>
                
                {
                    text.length === 1 
                    ? null 
                    : <SRlshAction onClick={() => (clickNumber = 5) && SubsClick()}>
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
            <SPopupActions>
                {
                    isHaveAccess 
                        ? isUser 
                            ? <>
                                <GOneActionBtn 
                                    icon="0" 
                                    btnText={Library.getText('profile.actions-btns.btns.following')} 
                                    btnCount={profile.followingCount}
                                    onClick={() => HandleClick('user', 'users', 'following', profile.id, {'type':'following'})} 
                                />

                                <GOneActionBtn 
                                    icon="0" 
                                    btnText={Library.getText('profile.actions-btns.btns.followers')} 
                                    btnCount={profile.followersCount}
                                    onClick={() => HandleClick('user', 'users', 'followers', profile.id, {'type':'followers', 'flwType': 'all'})} 
                                />

                                <GOneActionBtn 
                                    icon="0" 
                                    btnText={Library.getText('profile.actions-btns.btns.groups')}    
                                    btnCount={profile.groupsCount}
                                    onClick={() => HandleClick('group', 'groups', 'groups', profile.id, {'type': 'all'})} 
                                />
                            </>
                            : <>
                                <GOneActionBtn 
                                    icon="0" 
                                    btnText={Library.getText('profile.actions-btns.btns.members')} 
                                    btnCount={profile.membersCount}
                                    onClick={() => HandleClick('user', 'users', 'members', profile.id, {'type':'members'})} 
                                />

                                <GOneActionBtn 
                                    icon="2" 
                                    btnText={Library.getText('profile.actions-btns.btns.events')}  
                                    btnCount={profile.eventsCount}
                                    onClick={() => HandleClick('event', 'events', 'events', profile.id, {'which': type})} 
                                />
                            </>
                        : null
                }
                {
                    !isHaveAccess 
                        ? null 
                        : <GOneActionBtn 
                            icon="1" 
                            btnText={Library.getText('profile.actions-btns.btns.gallery')} 
                            btnCount={profile.galleryCount}
                            onClick={() => HandleClick('gallery', 'gallery', 'gallery', profile.id, {'type': type, 'ownerID': profile.id, 'galleryType': 'all'})} 
                        /> 
                }
            </SPopupActions>

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