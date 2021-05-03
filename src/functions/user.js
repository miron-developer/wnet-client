import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import { GetDataByID, POSTRequestWithParams } from 'functions/api';
import { CloseWSConnection, CreateWSConnection } from 'functions/ws';
import { Notify } from 'common/app-notification/notification';

const ExceptedPaths = [
    Library.getText('common.routes.post'),
    Library.getText('common.routes.video'),
    Library.getText('common.routes.photo'),
    Library.getText('common.routes.user'),
    Library.getText('common.routes.group'),
    Library.getText('common.routes.signs.sign'),
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
            return Notify('fail', Library.getText('functions.user.changeUserDataError'))
        }
        for (let [k, v] of Object.entries(res[0])) USER[k] = v;
        USER.status = 'online';
        return true;
    } else {
        for (let k in USER) USER[k] = '';
        USER.status = Date.now().toString();
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
export const SignOut = async() => {
    const res = await POSTRequestWithParams("/sign/out");
    if (res.err !== "ok") return false;
    return await UserOffline();
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
    if (res.err !== "ok") return Notify('fail', Library.getText('functions.user.toFollows.rlshipError'));

    callback(res.data);
    Notify('success', Library.getText('functions.user.toFollows.' + successTexts[actionType]));

    if (actionType === 0 || actionType === 4) {
        if (!isUser) return USER.groupsCount++;
        return actionType === 0 ? USER.followingCount++ : USER.followersCount++;
    }

    if (actionType === 1) return isUser ? USER.followingCount-- : USER.groupsCount--;
}