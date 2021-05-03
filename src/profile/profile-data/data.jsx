import { Library } from "constants/language";

import styled from "styled-components";

const SProfileDataGeneral = styled.div`
    width: 70%;
    margin: 1rem;
    display: flex;
    flex-direction: column;

    & div {
        margin: .25rem;
        display: flex;
    }
`;

const SProfileDataTitle = styled.span`
    text-transform: uppercase;
    color: #2F0B8D;
    width: 30%;
`;

const SProfileDataData = styled.span`
    width: 60%;
    color: var(--onHoverColor);
`;

const GProfileDataField = ({which, data}) => {
    return (
        <div>
            <SProfileDataTitle> {which}: </SProfileDataTitle>
            <SProfileDataData>{data}</SProfileDataData>
        </div>
    )
}

// generate profile data relatively from profile type and private type
export default function GProfileData({isUser, isHaveAccess, profile}) {
    if (isUser)
        return (
            <SProfileDataGeneral>
                <GProfileDataField which={Library.getText('profile.data.nick')} data={profile.nickname} />

                {
                    !isHaveAccess
                        ? null
                        : <>
                            <GProfileDataField which={Library.getText('profile.data.lName')}  data={profile.lName} />
                            <GProfileDataField which={Library.getText('profile.data.fName')}  data={profile.fName} />
                            <GProfileDataField which={Library.getText('profile.data.gender')} data={profile.gender} />
                            <GProfileDataField which={Library.getText('profile.data.dob')}    data={profile.dob} />
                        </>
                }

                <GProfileDataField which={Library.getText('profile.data.aboutMe')} data={profile.aboutMe} />
            </SProfileDataGeneral>
        );
    return (
        <SProfileDataGeneral>
            <GProfileDataField which={Library.getText('profile.data.title')} data={profile.title} />

            {
                !isHaveAccess 
                    ? null 
                    : <GProfileDataField which={Library.getText('profile.data.cdate')} data={profile.cdate} />
            }

            <GProfileDataField which={Library.getText('profile.data.description')} data={profile.description} />
        </SProfileDataGeneral>
    );
}