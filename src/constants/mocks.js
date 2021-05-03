export const EVENT = {
    id: 1,
    type: 'event',
    title: 'event title',
    datetime: '1580548500000',
    description: 'here event description',
    votes: [{
            title: 'going',
            count: 78,
        },
        {
            title: 'not going',
            count: 12,
        },
        {
            title: 'idk',
            count: 10,
        }
    ],
    isVoted: false,
    whichVoted: -1,
    avatar: '/img/default-avatar.png',
    status: '1607764500000',
    fName: 'First name',
    lName: 'Last name',
    userID: 1,
};

export const POST = {
    id: 1,
    type: 'post',
    title: 'post title',
    datetime: '1607764500000',
    carma: 0,
    body: 'post body',
    isLiked: false,
    avatar: '/img/default-avatar.png',
    status: '1607764500000',
    fName: 'First name',
    lName: 'Last name',
    userID: 1,
};

export const USER = {
    id: 1,
    type: 'user',
    avatar: '/img/default-avatar.png',
    nickname: 'nickname',
    fName: 'First name',
    lName: 'Last name',
    gender: 'Male',
    dob: '2020-12-12',
    aboutMe: 'this about me',
    status: 'online',
    isPrivate: false,
    isFollow: false,
    rqState: 0,
    followingCount: 5,
    followersCount: 5,
    groupsCount: 5,
    galleryCount: 5,
    eventsCount: 5,
    posts: [],
    news: []
};

export const GROUP = {
    id: 1,
    type: 'group',
    avatar: '/img/default-avatar.png',
    title: 'title',
    cdate: '2020-12-12',
    description: 'this about me',
    isPrivate: true,
    isFollow: false,
    rqState: 0,
    membersCount: 5,
    galleryCount: 5,
    eventsCount: 5,
    posts: [],
    ownerID: 2,
};

export const PHOTO = {
    id: 1,
    type: 'photo',
    src: '/img/logo192.png',
    title: 'title',
    avatar: '/img/default-avatar.png',
    lName: 'lname',
    fName: 'fname',
    ownerID: 1,
};

export const VIDEO = {
    id: 1,
    type: 'video',
    src: '/video-ex.mp4',
    preview: '/img/logo192.png',
    title: 'title here',
    avatar: '/img/default-avatar.png',
    lName: 'lname',
    fName: 'fname',
    ownerID: 1,
};

export const CHAT_USER = {
    id: 1,
    type: 'user',
    status: '1607764500000',
    avatar: '/img/default-avatar.png',
    lName: 'lname',
    fName: 'fname',
    msg: 'last message',
    datetime: '1607764500000',
};

export const CHAT_GROUP = {
    id: 1,
    type: 'group',
    avatar: '/img/default-avatar.png',
    title: 'title',
    msg: 'last message',
    datetime: '1607764500000',
};

export const CLIPPED_FILE_IMG = {
    id: 1,
    postID: 1,
    commentID: 0,
    messageID: 0,
    type: 'image',
    filename: 'filename.png',
    src: '/img/logo512.png',
}

export const CLIPPED_FILE_AUDIO = {
    id: 2,
    postID: 1,
    commentID: 0,
    messageID: 0,
    type: 'audio',
    filename: 'filename.png',
    src: '/audio/ex.mp3',
}

export const CLIPPED_FILE_VIDEO = {
    id: 3,
    postID: 1,
    commentID: 0,
    messageID: 0,
    type: 'video',
    filename: 'filename.png',
    src: '/video-ex.mp4',
}

export const CLIPPED_FILE_FILE = {
    id: 4,
    postID: 1,
    commentID: 0,
    messageID: 0,
    type: 'file',
    filename: 'filename.png',
    src: '/robots.txt',
}

export const COMMENT_POST = {
    id: 1,
    type: 'comment',
    commentType: 'post',
    body: 'comment body',
    isHaveAnswer: true,
    isHaveClippedFiles: true,
    isAnswer: false,
    datetime: '1607764500000',
    carma: 0,
    isLiked: false,
    userID: 1,
    lName: 'lname',
    fName: 'fname',
    avatar: '/img/default-avatar.png',
}

export const COMMENT_COMMENT = {
    id: 2,
    type: 'comment',
    commentType: 'comment',
    body: 'comment body',
    isHaveClippedFiles: true,
    isAnswer: true,
    datetime: '1607764500000',
    carma: 0,
    isLiked: false,
    userID: 1,
    lName: 'lname',
    fName: 'fname',
    avatar: '/img/default-avatar.png',
}

export const COMMENT_PHOTO = {
    id: 3,
    type: 'comment',
    commentType: 'photo',
    isHaveClippedFiles: false,
    isHaveAnswer: true,
    isAnswer: false,
    datetime: '1607764500000',
    carma: 0,
    isLiked: false,
    body: 'comment body',
    userID: 1,
    lName: 'lname',
    fName: 'fname',
    avatar: '/img/default-avatar.png',
}

export const COMMENT_VIDEO = {
    id: 4,
    type: 'comment',
    commentType: 'photo',
    body: 'comment body',
    datetime: '1607764500000',
    carma: 0,
    isLiked: false,
    isHaveClippedFiles: true,
    isHaveAnswer: true,
    isAnswer: false,
    userID: 1,
    lName: 'lname',
    fName: 'fname',
    avatar: '/img/default-avatar.png',
}