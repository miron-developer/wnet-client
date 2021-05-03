import { Redirect } from "react-router";

import { Library } from "constants/language";
import { POSTRequestWithParams } from "functions/api";
import { Notify } from "common/app-notification/notification";

import Switch  from 'profile-path/profile-switch/switch';
import AccountSettings from 'profile-path/profile-settings/settings-account/account';
import styled from "styled-components";

const SSettingsBody = styled.div`
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    background: rgba(0, 26, 75, 0.16);
`;

const STitle = styled.h2`
    color: var(--onHoverColor);
    text-align: center;
    text-transform: uppercase;
`;

const SGeneralNotification = styled.div`
    text-align: center;
`;

const SForm = styled.form`
    margin: 1rem auto;
`;

const possibleTypes = [
    Library.getText('common.routes.profile.settings.account')
];

const settingsTypes = ['account'];

const switchDatas = [{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.settings.settings')+
        "/"+Library.getText('common.routes.profile.settings.account'),
    textPath: 'common.routes.profile.settings.account',
}];

const compareSettings = (newSettings, currentSettings) => {
    const res = {};
    
    for (let [k, v] of Object.entries(newSettings)) {
        if (newSettings[k] !== currentSettings[k]) {
            res[k] = v;
        }
    }

    return res;
}

const saveSettings = async(newSettings, currentAccountSettings, history) => {
    const comparedSettings = compareSettings(newSettings, currentAccountSettings);
    if (Object.values(comparedSettings).length === 0) return Notify('info', Library.getText('profile-path.settings.settings.nothingToChange'));

    const res = await POSTRequestWithParams('/e/settings', {
        'type': settingsTypes[0],
        ...comparedSettings,
    });
    if (res.err !== "ok") return Notify('fail', Library.getText('profile-path.settings.settings.notSaveSettings')+":"+res.err);
    history.push(
        "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.settings.settings')+
        "/s/"
    )
}

export default function Settings({history}) {
    const settingType = decodeURI(window.location.pathname).split('/')[3];

    return !possibleTypes.includes(settingType) 
        ? <Redirect to={"/"+Library.getText('common.routes.profile.profile')+
                        "/"+Library.getText('common.routes.profile.settings.settings')+
                        "/"+Library.getText('common.routes.profile.settings.account')} /> 
        : (
            <div className="settings">
                <Switch switchDatas={switchDatas} />
                
                <SSettingsBody>
                    <STitle>
                        { Library.getText('common.routes.profile.settings.account') + ' ' + Library.getText('common.routes.profile.settings.settings') } 
                    </STitle>
                    <SGeneralNotification>{Library.getText('profile-path.settings.settings.changeWhatYouWant')}</SGeneralNotification>

                    {
                        <AccountSettings  Wrapper={SForm} saveSettings={(settings, currentAccountSettings) => saveSettings(settings, currentAccountSettings, history)} />
                    }
                </SSettingsBody>
            </div>
    )
}