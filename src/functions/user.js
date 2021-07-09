import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import { GetDataByID, POSTRequestWithParams } from 'functions/api';
import { CloseWSConnection, CreateWSConnection } from 'functions/ws';
import { Notify } from 'common/app-notification/notification';

const localLib = {
    'post': Library.getText('common.routes.post'),
    'video': Library.getText('common.routes.video'),
    'photo': Library.getText('common.routes.photo'),
    'user': Library.getText('common.routes.user'),
    'group': Library.getText('common.routes.group'),
    'sign': Library.getText('common.routes.signs.sign'),
    'changeUserDataError': Library.getText('functions.user.changeUserDataError'),
    'in': Library.getText('common.routes.signs.in'),
    'logouting': Library.getText('functions.user.logouting'),
    'logouted': Library.getText('functions.user.logouted'),
    'rlshipError': Library.getText('functions.user.toFollows.rlshipError'),
    'successText': type => Library.getText('functions.user.toFollows.' + type),
}

const ExceptedPaths = [
    localLib.post,
    localLib.video,
    localLib.photo,
    localLib.user,
    localLib.group,
    localLib.sign,
];

export const CheckIsExceptionPath = () => {
    const cur = decodeURI(window.location.pathname).split('/')[1];
    const isExcept = ExceptedPaths.includes(cur);
    return isExcept;
}

export const IsLogged = async() => {
    const res = await POSTRequestWithParams('/sign/status');
    if (res.err !== 'ok') {
        Notify('fail', res.err);
        return false;
    }
    return res.data.id;
}

// change USER const
const changeUserData = async(id) => {
    if (id !== undefined) {
        const res = (await GetDataByID(id, 'user'));
        if (res.err && res.err !== "ok") {
            return Notify('fail', localLib.changeUserDataError)
        }
        for (let [k, v] of Object.entries(res[0])) USER[k] = v;
        USER.status = 'online';
        return true;
    } else {
        for (let k in USER) USER[k] = '';
        USER.status = Date.now().toString();
        USER.nickname = "nickname";
        USER.avatar = "/img/default-avatar.png"
        return true;
    }
}

// Switch to online
export const UserOnline = async(id) => {
    const res = await changeUserData(id);
    CreateWSConnection();
    return res;
}

// Switch to offline
export const UserOffline = async() => {
    CloseWSConnection()
    return await changeUserData();
}

// send to server signal about sign out
export const SignOut = async(history) => {
    Notify('info', localLib.logouting);
    const res = await POSTRequestWithParams("/sign/out");
    if (res.err !== "ok") return false;
    const isSignOuted = await UserOffline();
    if (!isSignOuted) return;
    history.push('/' + localLib.sign + '/' + localLib.in);
    Notify('success', localLib.logouted);
}

/**
 * 
 * @var {type=0} Follow
 * @var {type=1} Unfollow
 * @var {type=2} SendRq
 * @var {type=3} RepealRq
 * @var {type=4} AcceptRq
 * @var {type=5} DeclineRq
 */
export const ToFollow = async(id, isUser = true, actionType = 0, callback = () => {}) => {
    const successTexts = ['flwSuccess', 'unflwSuccess', 'rqSuccess', 'repealSuccess', 'acceptSuccess', 'declineSuccess'];

    const params = {
        'isUser': isUser,
        'id': id,
        'type': actionType,
    }

    const res = await POSTRequestWithParams('/s/rlsh', params);
    if (res.err !== "ok") return Notify('fail', localLib.rlshipError);

    callback(res.data);
    Notify('success', localLib.successText(successTexts[actionType]));

    if (actionType === 0 || actionType === 4) {
        if (!isUser) return USER.groupsCount++;
        return actionType === 0 ? USER.followingCount++ : USER.followersCount++;
    }

    if (actionType === 1) return isUser ? USER.followingCount-- : USER.groupsCount--;
}