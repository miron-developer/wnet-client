import { useEffect, useState } from 'react';

import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';
import { GetOne } from 'functions/api';
import Avatar from 'common/avatar/avatar';

import GProfileData from 'profile/profile-data/data';
import GActionBtns from 'profile/profile-actions-btns/btns';
import GSwitchPublications from 'profile/profile-switch/switch';
import GPublications from 'profile/profile-publications/publications';

import styled from 'styled-components';

const SProfile = styled.div`
    padding: 2rem;
`;

const SProfileData = styled.div`
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ava-wrapper {
        width: 30%;
    }
`;

const SAvatarWrapper = styled.div`
    width: 30%;
    & > * {
        width: max-content;
        margin: auto;
    }
`;

const SProfileHR = styled.div`
    height: 3px;
    width: 60%;
    margin: 3rem auto;
    background: var(--violetColor);
`;

const SProfileActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const localLib = {
    'user': Library.getText('common.routes.user'),
    'notLoadProfile': Library.getText('profile.profile.notLoadProfile'),
    'notLoadPublications': Library.getText('profile.profile.notLoadPublications'),
}

export default function UserGroupProfile({match, history}) {
    const ID = parseInt(match.params.id);
    const isUser = decodeURI(window.location.pathname).split('/')[1] === localLib.user;
    const [profile, setProfile] = useState({});
    
    const type = isUser ? 'user' : 'group';
    const isMy = isUser ? profile && profile.id === USER.id && ID === USER.id : profile.ownerUserID === USER.id;
    const isHaveAccess = profile.isPrivate && !isMy && (
            (profile.InRlshState === null || profile.InRlshState === -1) && 
            (profile.OutRlshState === -1 || profile.OutRlshState === null)
        )? false : true;
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo([], 20);
    const [isLoaded, setLoaded] = useState(false)
    const [prevType, setPrevType] = useState();
    const [publicationsType, setPuplicatonsType] = useState('all');

    // get data about user
    useEffect(() => {
        if (Object.values(profile).length === 0) {
            GetOne({'id':ID, 'type':'profile'}, type, localLib.notLoadProfile, setProfile)
                .then(exist => !exist ? history.push('/') : null)
        } else {
            if (isHaveAccess && !isLoaded) {
                getPart('publications', { 'publicationType': publicationsType, 'type': type, 'id': profile.id }, localLib.notLoadPublications, true);
                setLoaded(true);
            }
            if (prevType !== publicationsType) {
                setDataList([]);
                setLoaded(false);
            }
            setPrevType(publicationsType);
        }
    }, [ID, isHaveAccess, type, isLoaded, profile, prevType, publicationsType, history, setDataList, getPart]);

    return (
        <SProfile>
            <SProfileData>
                <SAvatarWrapper>
                    <Avatar isUser={isUser} avatar={profile.avatar} status={profile.status} isNeedText={true} size="big" />
                </SAvatarWrapper>
                <GProfileData isHaveAccess={isHaveAccess} isUser={isUser} profile={profile} />
            </SProfileData>

            <SProfileHR />

            <SProfileActions>
                <GActionBtns id={ID} type={type} isHaveAccess={isHaveAccess} isUser={isUser} isMy={isMy} profile={profile} setProfile={setProfile} />
            </SProfileActions>

            <SProfileHR />

            <section className="profile-posts">
                {
                    isHaveAccess ? <GSwitchPublications publicationsType={publicationsType} setSwitchType={setPuplicatonsType} /> : null
                }

                <GPublications 
                    isHaveAccess={isHaveAccess}
                    isUser={isUser}
                    profile={profile}
                    publications={datalist} 
                    onScroll={
                        e => 
                        ScrollHandler(
                            e, 
                            isStopLoad, 
                            false, 
                            () => getPart(
                                'publications', 
                                { 'publicationType': publicationsType, 'type': type, 'id': profile.id }, 
                                localLib.notLoadPublications, 
                                true,
                            )
                        )
                    }
                />
            </section>
        </SProfile>
    )
}