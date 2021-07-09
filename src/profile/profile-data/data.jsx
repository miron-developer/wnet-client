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

const localLib = {
    'nick': Library.getText('profile.data.nick'),
    'lName': Library.getText('profile.data.lName'),
    'fName': Library.getText('profile.data.fName'),
    'gender': Library.getText('profile.data.gender'),
    'dob': Library.getText('profile.data.dob'),
    'cdate': Library.getText('profile.data.cdate'),
    'title': Library.getText('profile.data.title'),
    'aboutMe': Library.getText('profile.data.aboutMe'),
    'description': Library.getText('profile.data.description'),
}

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
                <GProfileDataField which={localLib.nick} data={profile.nickname} />

                {
                    !isHaveAccess
                        ? null
                        : <>
                            <GProfileDataField which={localLib.lName}  data={profile.lName} />
                            <GProfileDataField which={localLib.fName}  data={profile.fName} />
                            <GProfileDataField which={localLib.gender} data={profile.gender} />
                            <GProfileDataField which={localLib.dob}    data={profile.dob} />
                        </>
                }

                <GProfileDataField which={localLib.aboutMe} data={profile.aboutMe} />
            </SProfileDataGeneral>
        );
    return (
        <SProfileDataGeneral>
            <GProfileDataField which={localLib.title} data={profile.title} />

            {
                !isHaveAccess 
                    ? null 
                    : <GProfileDataField which={localLib.cdate} data={profile.cdate} />
            }

            <GProfileDataField which={localLib.description} data={profile.description} />
        </SProfileDataGeneral>
    );
}