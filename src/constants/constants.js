export const MIN_ACCESS_YEAR = new Date().getFullYear() - 100;
export const HOST = window.location.host.includes('localhost') ? "localhost:4330" : "api-wnet.herokuapp.com";
export const HOST_URL = "https://" + HOST;

// NOTIFICATION TYPES
export const NOTE_CREATE_POST = 1;
export const NOTE_INVITE_TO_EVENT = 2;
export const NOTE_CREATE_GROUP = 3;
export const NOTE_INVITE_TO_GROUP = 4;
export const NOTE_LIKED_POST = 10;
export const NOTE_LIKED_COMMENT = 11;
export const NOTE_LIKED_PHOTO = 12;
export const NOTE_LIKED_VIDEO = 13;
export const NOTE_COMMENT_POST = 20;
export const NOTE_COMMENT_COMMENT = 21;
export const NOTE_COMMENT_PHOTO = 22;
export const NOTE_COMMENT_VIDEO = 23;

// current user data
export const USER = {
    id: -1,
    email: '',
    avatar: '',
    nickname: '',
    fName: '',
    lName: '',
    gender: '',
    dob: '',
    aboutMe: '',
    status: '',
    isPrivate: false,
    followingCount: 0,
    followersCount: 0,
    groupsCount: 0,
    galleryCount: 0,
    eventsCount: 0,
};