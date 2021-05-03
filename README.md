# WNET social net.

## WNET - social net for conversation

### Figma link
[figma here](https://www.figma.com/file/ZF3iHH7HcIYk5juqYioTwj/wnet?node-id=1%3A2)

### WNET site
[site here](https://wnet.herokuapp.com/)

### Basic
[RU]WNET - это сайт для общения, звонков друзьям, публикации сообщений, сбора друзей в группы и приглашения на мероприятие.
[EN]WNET is the site for conversation, calling to friends, making post, gather friends to group and invite to a event
[KZ]WNET - сұхбаттасуға, достарына қоңырау шалуға, хабарламалар жіберуге, достарды топтарға жинауға және іс-шараға шақыруға арналған сайт.

### Functionality
WNET's functionality
- Sign-in/up with smtp
- Restore password with smtp
- Change user/group data
- Create post/group/event/comment
- Upload photo/video/audio/file
- See posts/comments/events/groups/users
- Set like/remove like
- See post/comment/photo/video carma
- Chat between 2 user/Group chat
- Typing progress in chat
- Video/audio calls, sharing screen
- Searching post/video/user/group
- Filtering search

### Project structure
`/SOMETHING` - mean that folder with file
`SOMETHING` - one file. Extension usually `jsx` or `js`.
* `root`: root
    * `/public`: public files, app's images and so on:
        * `/audio`: app's sfx.
        * `/img`: app's icons, imgs.
        * `/rights`: app's rights: T&Cs, Privacy policy.
        * `favicon.ico`: icon.
        * `*`: and others.
    * `/src`: site's logic files:
        * `/comment`: one comment page. Response for path `/comment/:id`.
        * `/common`: components, that using in different places, common components:
            * `/app-notification`: notifing when somenthing fail, success or just informing
            * `/aside`: app's aside bar:
                * `/language`: component for selecting language.
                * `aside`: navs, logo, logout.
            * `/avatar`: component that generating avatar with some options.
            * `/calls`: component, that response for video/audio calling, sharing screen, or accept/decline income call:
                * `/call-managing`: component, response for muting audio/video, to fullscreen, share screen and decline call.
                * `/call-notification`: component, notifying when someone call or user call.
                * `/call-video`: component, render all types of videos: user, share and 'my'.
                * `call`: main file for above components.
            * `/catalogue-of`: component, render catalogue of items
            * `/chat-item`: component, render item of messenger-chat.
            * `/clipped-files-plash`: component, render plash of clipped files\preloaded files.
            * `/clips`: component that clip file to message/comment:
                * `/get-gallery`: component, get user photo or video.
                * `clips`: clip file.
            * `/comments`: component, render comments, one comment with all need data.
            * `/datetime`: component, render datetime relatively from now.
            * `/event-item`: component, render one event-item:
                * `/event-info`: component, render event's info such as datetime, title
                * `/event-to-vote`: component, render options of votes.
                * `/event-votes`: component, render all votes by category: going, not going, idk.
                * `event`: main file, costruct event-item.
            * `/footer`: app's footer. Contain rights, links, notifying popup.
            * `/form-input`: component, render one input field.
            * `/gallery-item`: component, render gallery item:
            * `/header`: app's header:
                * `/create-a`: component, header's popup that render components that create post/group/event:
                    * `/event`: component, create event.
                    * `/field-textarea`: component, render textarea field.
                    * `/group`: component, create group.
                    * `/post`: component, create post with chosing followers(if post type almost private):
                        * `/get-followers`: component, render user's followers.
                        * `post`: main file, costruct post.
                    * `/type-btns`: component, render type btns(for ex: post type).
                    * `/type-btns-hint`: component, render hint for type btns.
                    * `create`: main file, costruct create component.
                * `/header-popups`: component, render wrapper for header popups.
                * `/header-popups-body`: component, render wrapper for header popups' body.
                * `/header-popups-icons`: component, render header popups item's icon.
                * `/header-popups-item`: component, render header popups' item.
                * `/notification`: component, headee's popup, render user's notifications.
                * `/page-id`: component, render current page's id.
                * `/user-menu`: component, header's popup, render user's actions: settings, gallery, sign-out.
                * `header`: main file, costruct header.
            * `/leave-comment-plash`: component, render plash to commenting something.
            * `/like`: component, render carma & do like\dislike function.
            * `/popup`: component, render popup wrapper.
            * `/post-item`: component, render one post item.
            * `/preloaded-files-plash`: component, render plash that contain preloaded files.
            * `/profile-item`: component, render one user\group item.
            * `/profile-path-item`: component, render one user\group item(for paths: `/profile/friends` & `/profile/groups`).
            * `/routes`: component, render possible routes, switch, is main wrapper.
            * `/send-audio`: component, get user's audio blob & using outer function create something(message for ex).
            * `/send-text`: component, get user's input + smiles & using outer function create something(message for ex).
            * `/smiles`: component, render smiles plash + export put smile function.
            * `/speech`: component, get convert user's audio to text.
            * `/video`: component, get video part from server step by step(as youtube or as other platforms). `TRIAL`.
        * `/contants`: contain mocks, library & contants:
            * `contants`: contain constants.
            * `language`: is library & it's functions.
            * `mocks`: app's mock datas.
        * `/event`: component, render one event page. Response for path `/event/:id`.
        * `/functions`: app's common functions:
            * `api`: functions for work with api.
            * `content`: functions for work with content. Render something, sort.
            * `effects`: functions for effect. Lazy load for ex.
            * `file`: functions for upload/preload/detecting type file.
            * `form`: functions for work with form.
            * `hooks`: custom hooks.
            * `user`: functions responding for user sign actions.
            * `ws`: functions for work websocket.
        * `/home`: main page. Response for path exact `/`.
        * `/messenger`: messenger page. Response for path `/messenger/`.
            * `/chat-header`: component, render chat's header.
            * `/chat-messages`: component, render chat's messages.
            * `/chat-typing-side`: component, render chat's typing side.
            * `messenger-chat`: one chat's page. Response for path `/messenger/:id`.
            * `messenger-chats`: user's all chats. Response for path `/messenger`.
            * `messenger`: switch. Response for all path `/messenger`.
        * `/nf404`: not found page. Response for path that not exist.
        * `/photo`: one photo page. Response for path `/photo/:id`.
        * `/post`: one post page. Response for path `/post/:id`.
        * `/profile`: component, render user/group profile. Response for path `/user/:id` or `/group/:id`:
            * `/change-profile`: component, render form on popup for changing user/group info.
            * `/profile-actions-btns`: component, render btns with actions(for ex show user's followers).
            * `/profile-data`: component, render user/group's data if possible(if not private).
            * `/profile-publications`: component, render publications by types: all, post, event.
            * `/profile-switch`: component, switch publication's type.
            * `profile`: component, construct profile component.
        * `/profile-path`: page-switch. Response for paths with start `/profile/`:
            * `/profile-gallery`: gallery page. Response for path `/profile/gallery`:
                * `/gallery-upload`: component, get user's video/photo.
                * `gallery`: component, construct gallery.
            * `/profile-search-link`: component, render search link.
            * `/profile-settings`: settings pages. Response for paths `/profile/settings/`:
                * `settings-account`: account settings page. Response for path `/profile/settings/account`.
                * `settings`: switch router.
            * `/profile-switch`: component, render switch with getted options.
            * `/profile-friends`: my friends page. Response for path `/profile/friends`.
            * `/profile-groups`: my groups page. Response for path `/profile/groups`.
            * `profile`: switch router.
        * `/search`: search pages. Response for all path `/search/`:
            * `/search-filter`: component, render filter for search.
            * `/search-input`: component, render search input.
            * `/search-result`: component, render search results:
                * `/result-profile`: component, render result users/groups.
                * `/result-video`: component, render result videos.
            * `/search-switch`: component, render search switch btns.
            * `search`: component, contruct searches.
        * `/signs`: sign pages. Response for all path `/sign`:
            * `/oauth2`: third party oauth component.
            * `/sign-about`: component, render about WNET.
            * `/sign-other-actions`: component, render links for other types of sign.
            * `/sign-password-field`: component, render form's password field with show/hide password function.
            * `/sign-submit`: component, render submit btn.
            * `reset-password`: reset password page. Response for path `/sign/re`.
            * `restore-password`: restore password page. Response for path `/sign/rst`.
            * `sign-in`: sign in page. Response for path `/sign/in`.
            * `sign-up`: sign up page. Response for path `/sign/up`.
            * `sign`: switch router.
        * `/video`: one video page. Response for path `/video/:id`.
        * `app.css`: main css file. sole css file.
        * `app.jsx`: app file. Contain app structure.
        * `app.test.js`: app test file. `not implemented`.
        * `index.js`: main app file. Root file.
        * `*`: and other.
