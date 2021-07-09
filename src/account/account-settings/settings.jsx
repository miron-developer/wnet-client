import { Redirect } from "react-router";

import { Library } from "constants/language";
import { POSTRequestWithParams } from "functions/api";
import { Notify } from "common/app-notification/notification";

import Switch  from 'account/account-switch/switch';
import AccountSettings from 'account/account-settings/settings-account/account';
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

const localLib = {
    'account': Library.getText('common.routes.account.account'),
    'settings': Library.getText('common.routes.account.settings.settings'),
    'nothingToChange': Library.getText('account.settings.settings.nothingToChange'),
    'notSaveSettings': Library.getText('account.settings.settings.notSaveSettings'),
    'changeWhatYouWant': Library.getText('account.settings.settings.changeWhatYouWant'),
}

const possibleTypes = [localLib.account];

const settingsTypes = ['account'];

const switchDatas = [{
    to: "/" + localLib.account + "/" + localLib.settings + "/" + localLib.account,
    textPath: localLib.account,
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
    if (Object.values(comparedSettings).length === 0) return Notify('info', localLib.nothingToChange);

    const res = await POSTRequestWithParams('/e/settings', {
        ...comparedSettings,
        'type': settingsTypes[0],
    });
    if (res.err !== "ok") return Notify('fail', localLib.notSaveSettings + ":" + res.err);
    history.push("/" + localLib.account + "/" + localLib.settings + "/s/")
}

export default function Settings({history}) {
    const settingType = decodeURI(window.location.pathname).split('/')[3];

    return !possibleTypes.includes(settingType) ? <Redirect to={switchDatas[0].to} /> : (
        <div className="settings">
            <Switch switchDatas={switchDatas} />
            
            <SSettingsBody>
                <STitle>{ localLib.account + ' ' + localLib.settings }</STitle>
                <SGeneralNotification>{localLib.changeWhatYouWant}</SGeneralNotification>
                {
                    <AccountSettings  Wrapper={SForm} saveSettings={(settings, currentAccountSettings) => saveSettings(settings, currentAccountSettings, history)} />
                }
            </SSettingsBody>
        </div>
    )
}