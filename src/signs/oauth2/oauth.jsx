import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Library } from 'constants/language';
import { POSTRequestWithParams } from 'functions/api';
import { AddScript } from 'functions/content';
import { Notify } from 'common/app-notification/notification';

import styled from 'styled-components';

const SOauth2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 1rem;
`;

const SOauth2Item = styled.div`
    padding: .5rem;
    display: flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 0 #0000005c;
    color: var(--onHoverColor);
    transition: var(--transitionApp);
    cursor: pointer;

    &#oauth2-fb {
        background: #0600ff;
    }

    &#oauth2-google {
        background: var(--onHoverColor);
        color: #000000;
    }

    &:hover {
        transform: scale(1.2);
        transition: var(--transitionApp);
    }

    & span {
        margin-left: .5rem;
    }
`;

const SSignOr = styled.div`
    margin: 1rem auto;
    text-transform: uppercase;
    color: var(--onHoverColor);
`;

let sign = "up";

const localLib = {
    'successIn': Library.getText('signs.sign-in.success'),
    'successUp': Library.getText('signs.sign-up.success'),
    'info': Library.getText('signs.oauth2.info'),
    'failIn': Library.getText('signs.sign-in.fail'),
    'failUp': Library.getText('signs.sign-up.fail'),
    'or': sign => Library.getText('signs.oauth2.or'+sign)
}

const fetchAuthData = async({history, name, email}) => {
    const res = await POSTRequestWithParams('/sign/oauth/'+sign, {
        "name" : name,
        "email": email
    });
    
    if (res.err === "ok") {
        if (sign === "in") Notify('success', localLib.successIn);
        else {
            Notify('success', localLib.successUp);
            Notify('info', localLib.info.replaceAll('email', email).replaceAll('pswrd', res.data.password), false);
        }
        history.push('/');
    } else {
        if (sign === "in") Notify('fail', localLib.failIn + ':' + res.err);
        else Notify('fail', localLib.failUp + ':' + res.err);
    }
}

/* global FB */
const FBAuth = ({history}) => {
    const addFBAuth = () => AddScript('fb-oauth2', "https://connect.facebook.net/en_US/sdk.js");
    const sendDataFB = resp => {
        const token = resp.authResponse.accessToken;
        FB.api(`/me?fields=name,email&access_token=${token}`, (response) => {
            fetchAuthData({
                history,
                'name' : response.name,
                'email': response.email,
            });
        });
    }

    const fbLogin = () => {
        FB.login(resp => {
            if (resp.status === 'connected') sendDataFB(resp);
        }, { scope: 'email' });
    }

    useEffect(()=> {
        async function FB_INIT() {
            try {
                await addFBAuth();
                const params = {
                    appId      : '419195346087931',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v9.0',
                }
                FB.init(params);
            }
            catch (error) {
                console.error(error);
            }
        }
        FB_INIT();
    })

    return (
        <SOauth2Item id="oauth2-fb" onClick={fbLogin}>
            <i className="fa fa-facebook-square" aria-hidden="true"></i>
            <span>Facebook</span>
        </SOauth2Item>
    )
}

/* global gapi */
const GGAuth = ({history}) => {
    const addGGAuth = () => AddScript('gg-oauth2', "https://apis.google.com/js/platform.js");

    const onSignIn = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        fetchAuthData({
            history,
            'name' : profile.getName(),
            'email': profile.getEmail()
        });
    }

    const onFail = error => console.error(error);

    useEffect(()=> {
        async function GG_INIT() {
            try {
                await addGGAuth();
                const params = {
                    'apiKey': 'qm9APnsMmlxd6ZHWDNXYHo86',
                    'clientId': '141338732012-22ctno9sfj2tjlrfcbq066l07i0sinia.apps.googleusercontent.com',
                    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                }
                gapi.load('auth2', () => {
                    const auth2 = gapi.auth2.init(params);
                    auth2.attachClickHandler('oauth2-google', {}, onSignIn, onFail);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
        GG_INIT();
    })

    return (
        <SOauth2Item id="oauth2-google">
            <img src="/img/ggicon.png" alt="gg icon"/>
            <span>Google</span>
        </SOauth2Item>
    )
}

export default function Oauth({signType}) {
    const history = useHistory();
    sign = signType;

    return (
        <>
            <SSignOr>{localLib.or(sign)}</SSignOr>
            <SOauth2>
                <FBAuth history={history} />
                <GGAuth history={history} />
            </SOauth2>
        </>
    )
}