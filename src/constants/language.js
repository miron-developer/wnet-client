const get = (src, path) => {
    let arr = path.split(".");
    for (let v of arr)
        if (src[v] !== undefined)
            src = src[v];
        else return undefined
    return src;
}

export const Library = {
    'account': {
        'groups': {
            'notLoad': {
                'ru': 'Не удалось загрузить группы!',
                'en': 'Can not load groups!',
                'kz': 'Топтарды жуктей алмадык!',
            },
        },
        'friends': {
            'notLoad': {
                'ru': 'Не удалось загрузить друзей!',
                'en': 'Can not load friends!',
                'kz': 'Достарды жуктей алмадык!',
            },
        },
        'gallery': {
            'notLoad': {
                'ru': 'Не удалось загрузить галлерею!',
                'en': 'Can not load gallery!',
                'kz': 'Галлереяны жуктей алмадык!',
            },
            'upload': {
                'upload': {
                    'ru': 'загрузить',
                    'en': 'upload',
                    'kz': 'жуктеу',
                },
                'titleRequired': {
                    'ru': 'Название обязательно!',
                    'en': 'Title required!',
                    'kz': 'Аты керек!',
                },
                'canNotUpload': {
                    'ru': 'Не удалось отправить!',
                    'en': 'Can not upload!',
                    'kz': 'Жиберилмеди!',
                },
                'clickToChange': {
                    'ru': 'нажмите здесь чтобы изменить',
                    'en': 'click here to change',
                    'kz': 'озгерту ушин мынаны басыныз',
                },
                'poster': {
                    'ru': 'постер',
                    'en': 'poster',
                    'kz': 'постер',
                }
            }
        },
        'settings': {
            'settings': {
                'nothingToChange': {
                    'ru': 'Ничего не меняется!',
                    'en': 'Nothing to change!',
                    'kz': 'Ештене озгермейди!',
                },
                'notSaveSettings': {
                    'ru': 'Не удалось сохранить настройки!',
                    'en': 'Can not save settings!',
                    'kz': 'Настройкилер озгермеди!',
                },
                'changeWhatYouWant': {
                    'ru': 'Измените то, что хотели бы изменить',
                    'en': 'Change what you want to change',
                    'kz': 'Калаганын озгертиниз',
                }
            },
            'account': {
                'avatar': {
                    'ru': 'Аватар',
                    'en': 'Avatar',
                    'kz': 'Аватар',
                },
                'canNotUploadAvatar': {
                    'ru': 'Не удалось отправить аватар!',
                    'en': 'Can not upload avatar!',
                    'kz': 'Аватар жиберилмеди!',
                },
                'private': {
                    'ru': 'Приватный',
                    'en': 'Private',
                    'kz': 'Жеке',
                },
                'public': {
                    'ru': 'Публичный',
                    'en': 'Public',
                    'kz': 'Публикалык',
                },
                'privateHint': {
                    'ru': 'Приватный аккаунт: Ваши посты, некоторые данные будут не видны для сторонних. Также чтобы следовать за Вами другие пользователи сначала будут отправлять запрос.',
                    'en': 'Private account: your posts, some datas will be hidden. You will be get requests before people follow you.',
                    'kz': 'Жеке аккаунт: Сиздин посттарыныз, кейбир декертер коринбейды баскаларга. Жане Сиздин изиннен еру ушин баска колданушылар алдымен руксат сурайды.',
                },
                'publicHint': {
                    'ru': 'Публичный аккаунт: Ваши данные будут видны всем пользователям. Также пользователи могут следовать за вами без Вашего запроса.',
                    'en': 'Public account: your datas will be visible for all people. People will follow without requests.',
                    'kz': 'Публикалык аккаунт: Сиздин деректериниз баршага коринеды. Сонымен катар баска колданушылар руксатсыз изинизден ере алады.',
                },
                'change': {
                    'ru': 'Изменить!',
                    'en': 'Change!',
                    'kz': 'Озгерту!',
                }
            },
            'confirm': {
                'confirmChange': {
                    'ru': 'Подтверждение изменения',
                    'en': 'Confirm change',
                    'kz': 'Озгеристи расстау',
                },
            }
        }
    },
    'general': {
        'notHaveClippedFiles': {
            'ru': 'Нет прикрепленных файлов',
            'en': 'Not have clipped files',
            'kz': 'Бекитилген файлдарды жок',
        },
        'notLoadComments': {
            'ru': 'Не удалось загрузить коментарии!',
            'en': 'Can not loaded comments!',
            'kz': 'Коментарийлерди жуктей алмадык!',
        },
    },
    'comment': {
        'notLoadComment': {
            'ru': 'Не удалось загрузить комментарий!',
            'en': 'Can not comment!',
            'kz': 'Комментарий жуктей алмадык!',
        }
    },
    'common': {
        'aside': {
            'logout': {
                'ru': 'выйти!',
                'en': 'sign out!',
                'kz': 'шыгу!',
            },
            'navs': {
                'home': {
                    'ru': 'главная',
                    'en': 'home',
                    'kz': 'басты бет',
                },
                'profile': {
                    'ru': 'мой профиль',
                    'en': 'my profile',
                    'kz': 'менин профилим',
                },
                'messenger': {
                    'ru': 'мессенджер',
                    'en': 'messenger',
                    'kz': 'мессенджер',
                },
                'groups': {
                    'ru': 'мои группы',
                    'en': 'my groups',
                    'kz': 'менин топтарым',
                },
                'friends': {
                    'ru': 'мои друзья',
                    'en': 'my friends',
                    'kz': 'менин достарым',
                }
            },
        },
        'avatar': {
            'statusTextOnline': {
                'ru': 'онлайн',
                'en': 'online',
                'kz': 'онлайн',
            },
            'statusTextOffline': {
                'ru': 'был',
                'en': 'was',
                'kz': 'болды',
            }
        },
        'calls': {
            'notification': {
                'youAreCalling': {
                    'ru': 'Вы делаете CALLTYPE звонок',
                    'en': 'You are CALLTYPE calling',
                    'kz': 'Сиз CALLTYPE конырау салып жатырсыз',
                },
                'somebodyAreCalling': {
                    'ru': 'NAME делает CALLTYPE звонок',
                    'en': 'NAME is CALLTYPE calling',
                    'kz': 'NAME Сизге CALLTYPE конырау шалуда',
                }
            },
            'calls': {
                'notPermission': {
                    'ru': 'Вы не можете звонить, т.к. не дали WNET разрешение на камеру и микрофон!',
                    'en': 'You can not call, bcs you do not give access to camera and micro to WNET!',
                    'kz': 'Сиз конырау шала алмайсыз, себеби WNET-ке камера мен микрофонга руксат берген жоксыз!',
                },
                'audioVideoOnOffFail': {
                    'ru': 'Не удалось вкл/откл. Нет звонка',
                    'en': 'Can not change mode. No call - nothing to change',
                    'kz': 'Оширу/сондиру болмады. Конырау жок',
                },
                'shareFail': {
                    'ru': 'Не удалось поделиться экраном. Кому поделиться?',
                    'en': 'Can not share! Share to nobody?',
                    'kz': 'Экранмен болису болмады. Ешкиммен болисесин ба?',
                },
                'alreadyShared': {
                    'ru': 'Не удалось поделиться экраном. Идет деление экрана',
                    'en': 'Can not share! Share is going',
                    'kz': 'Экранмен болису болмады. Экран болисип жатыр',
                },
                'toCallFail': {
                    'ru': 'Ты не сможешь поделиться на 2!',
                    'en': 'You can not be divided to 2!',
                    'kz': '2-ге болине алмайсын!',
                },
                'userNotFree': {
                    'ru': 'Пользователь недоступен!',
                    'en': 'User not available!',
                    'kz': 'Абонент бос емес!',
                },
                'userDecline': {
                    'ru': 'Пользователь отклонил!',
                    'en': 'User decline!',
                    'kz': 'Абонент кайтарып жиберди!',
                },
            },
        },
        'catalogue-of': {
            'notLoadDatas': {
                'ru': 'Не удалось загрузить данные!',
                'en': 'Can not loaded datas!',
                'kz': 'Деректерди жуктей алмадык!',
            }
        },
        'choose-list': {
            'noList': {
                'ru': 'Никого/ничего',
                'en': 'No one',
                'kz': 'Ешким/ештене',
            },
            'notLoadList': {
                'ru': 'Не удалось загрузить список!',
                'en': 'Can not load list!',
                'kz': 'Тизимди жуктей алмадык!',
            }
        },
        'clips': {
            'clips': {
                'notSaveFile': {
                    'ru': 'Не сохранилось!',
                    'en': 'File not saved!',
                    'kz': 'Файл сакталган жок!',
                },
            },
            'gallery': {
                'notHaveRecordedData': {
                    'ru': 'Нет записанных данных для сохранения!',
                    'en': 'You do not have recorded data to save!',
                    'kz': 'Сактауга арналган тусирилген деректер жок!',
                },
                'haveRecordedData': {
                    'ru': 'У вас есть записанные данные! Удалите или сохраните для начала.',
                    'en': 'You have recorded data! Save or remove before.',
                    'kz': 'Тусирилген деректер бар! Алдымен сактаныз немесе жойыныз.',
                },
                'areRecording': {
                    'ru': 'Вы записываете!',
                    'en': 'You are recording!',
                    'kz': 'Тусирип жатырсыз!',
                },
                'notGrantedPermissions': {
                    'ru': 'Нет предоставлены разрешения. Смените их в "Настройки -> Настройки сайтов -> `WNET` -> Очистить разрешения"',
                    'en': 'Not granted permissions. Change it on "Settings -> Site settings -> `WNET` -> Reset permissions"',
                    'kz': 'Руксат берилмеген. "Настройкилер -> Сайттардын настройкилери -> `WNET` -> Руксаттарды жанарту"',
                },
                'save': {
                    'ru': 'Сохранить',
                    'en': 'Save',
                    'kz': 'Сактау',
                },
                'remove': {
                    'ru': 'Удалить',
                    'en': 'Remove',
                    'kz': 'Жою',
                },
            },
        },
        'comments': {
            'answer': {
                'ru': 'Ответить',
                'en': 'Answer',
                'kz': 'Жауап жазу',
            },
            'showAnswers': {
                'ru': 'Показать ответы',
                'en': 'Show answers',
                'kz': 'Жауаптарды корсету',
            },
            'answers': {
                'ru': 'Ответы',
                'en': 'Answers',
                'kz': 'Жауаптар',
            },
            'comments': {
                'ru': 'Комментарии',
                'en': 'Comments',
                'kz': 'Комментарийлер',
            },
            'writeFirstComment': {
                'ru': 'Напишите комментарий первым',
                'en': 'Write first comment',
                'kz': 'Биринши комментарийди жазыныз',
            },
        },
        'event-item': {
            'event': {
                'voteSaved': {
                    'ru': 'Голос был сохранен!',
                    'en': 'Vote saved!',
                    'kz': 'Дауыс сакталды!',
                },
                'voteNotSaved': {
                    'ru': 'Сервер не отвечает... голос не сохранен!',
                    'en': 'Server do not response... vote do not saved!',
                    'kz': 'Сервер жауап бермей жатыр... дауыс сакталган жок!',
                },
                'invite': {
                    'ru': 'приглашает соучаствовать в событии',
                    'en': 'invite you to participate in the event',
                    'kz': 'окигага катысуга шакырады',
                },
                'yourVoteIs': {
                    'ru': 'Ваш голос',
                    'en': 'Your vote is',
                    'kz': 'Сиздин дауысыныз',
                },
                'title': {
                    'ru': 'Название',
                    'en': 'Title',
                    'kz': 'Аты',
                },
                'datetime': {
                    'ru': "Дата&время",
                    'en': "Date&time",
                    'kz': "Куни&сагаты",
                },
                'description': {
                    'ru': 'Описание',
                    'en': 'Description',
                    'kz': 'Сипаттама',
                },
                'notLoadEvent': {
                    'ru': 'Не удалось загрузить событие!',
                    'en': 'Can not load event!',
                    'kz': 'Окига жуктелмеди!',
                }
            }
        },
        'footer': {
            'rights': {
                'terms': {
                    'ru': 'Правило пользования',
                    'en': 'Terms&Conditions',
                    'kz': 'Колдану шарттары',
                },
                'privacy': {
                    'ru': 'Политика конфидециальности',
                    'en': 'Privacy policy',
                    'kz': 'Конфидециальность саясаты',
                },
            },
        },
        'form-input': {
            'required': {
                'ru': 'обязательно',
                'en': 'required',
                'kz': 'миндетти турде',
            },
            'length': {
                'ru': 'длина',
                'en': 'length',
                'kz': 'узындыгы',
            },
            'values': {
                'ru': 'данные',
                'en': 'values',
                'kz': 'деректер',
            }
        },
        'gallery-item': {
            'controlActions': {
                'edit': {
                    'ru': 'Редактировать',
                    'en': 'Edit',
                    'kz': 'Ондеу',
                },
                'remove': {
                    'ru': 'Удалить',
                    'en': 'Remove',
                    'kz': 'Жою',
                },
            },
            'notRemoved': {
                'ru': 'Не удалось удалить!',
                'en': 'Can not removed!',
                'kz': 'Жойалмадык!',
            }
        },
        'header': {
            'create-a': {
                'canNotSaved': {
                    'ru': 'Не сохранилось!',
                    'en': 'Can not saved!',
                    'kz': 'Сакталмады!',
                },
                'create': {
                    'ru': 'Создать',
                    'en': 'Create',
                    'kz': 'Куру',
                },
                'created': {
                    'ru': 'Создано!',
                    'en': 'Created!',
                    'kz': 'Курылды!',
                },
                'chooseGroup': {
                    'ru': 'Выберите группу, где хотите опубликовать:',
                    'en': 'Choose groups where you publish:',
                    'kz': 'Жариялайтын топты танданыз:',
                },
                'chooseFollowers': {
                    'ru': 'Выберите подписчиков, которым хотите дать доступ к посту:',
                    'en': 'Choose followers, that you want to grant access:',
                    'kz': 'Ерушилерден постка руксат бергиниз келгенди танданыз:',
                },
                'notChoosenGroup': {
                    'ru': 'выберите как минимум одну группу',
                    'en': 'choose atleast 1 group:',
                    'kz': 'кем дегенде бир топ танданыз',
                },
                'forMe': {
                    'ru': 'меня',
                    'en': 'me',
                    'kz': 'мен ушин',
                },
                'forGroup': {
                    'ru': 'группы',
                    'en': 'group',
                    'kz': 'группа ушин',
                },
                'createItems': {
                    'post': {
                        'ru': 'пост',
                        'en': 'post',
                        'kz': 'пост',
                    },
                    'group': {
                        'ru': 'группа',
                        'en': 'group',
                        'kz': 'топ',
                    },
                    'event': {
                        'ru': 'событие',
                        'en': 'event',
                        'kz': 'окига',
                    },
                    'photo': {
                        'ru': 'фото',
                        'en': 'photo',
                        'kz': 'фото',
                    },
                    'video': {
                        'ru': 'видео',
                        'en': 'video',
                        'kz': 'видео',
                    }
                },
                'fillTitle': {
                    'ru': 'Заполните название!',
                    'en': 'Fill title!',
                    'kz': 'Атын толтырыныз!',
                },
                'fillDescription': {
                    'ru': 'Заполните описание!',
                    'en': 'Fill description!',
                    'kz': 'Аныктамасын толтырыныз!',
                },
                'post': {
                    'almostPrivate': {
                        'ru': 'Полностью приватный',
                        'en': 'Almost private',
                        'kz': 'Толык жеке',
                    },
                    'publicHint': {
                        'ru': 'Публичный пост: видно всем пользователям.',
                        'en': 'Public post: be visible for all users.',
                        'kz': 'Публикалык пост: баршага коринеди.',
                    },
                    'privateHint': {
                        'ru': 'Приватный пост: видно только Вашим подписчикам.',
                        'en': 'Private post: be visible for your followers.',
                        'kz': 'Жеке пост: тек Сиздин изинизден ергендерге коринеди.',
                    },
                    'almostPrivateHint': {
                        'ru': 'Польность приватный: видно только выбранным подписчикам.',
                        'en': 'Almost private: be visible just selected followers.',
                        'kz': 'Толык жеке: тек белгиленген ерушилерге коринеди.',
                    },
                    'clipFile': {
                        'ru': 'Прикрепить файл',
                        'en': 'Clip file',
                        'kz': 'Файл кыстыру',
                    },
                    'postFor': {
                        'ru': 'пост для',
                        'en': 'post for',
                        'kz': 'не ушин пост',
                    },
                },
                'group': {
                    'publicHint': {
                        'ru': 'Публичная группа: видно всем пользователям.',
                        'en': 'Public group: be visible for all users.',
                        'kz': 'Публикалык топ: баршага коринеди.',
                    },
                    'privateHint': {
                        'ru': 'Приватная группа: видно только Вашим подписчикам.',
                        'en': 'Private group: be visible for your followers.',
                        'kz': 'Жеке топ: тек Сиздин изинизден ергендерге коринеди.',
                    },
                },
                'photo': {
                    'photoFor': {
                        'ru': 'фото для',
                        'en': 'photo for',
                        'kz': 'не ушин сурет',
                    },
                    'choosePhoto': {
                        'ru': 'выберите фото для загрузки',
                        'en': 'choose photo to upload',
                        'kz': 'жуктеу ушин сурет танданыз',
                    },
                },
                'video': {
                    'videoFor': {
                        'ru': 'видео для',
                        'en': 'video for',
                        'kz': 'не ушин видео',
                    },
                    'chooseVideo': {
                        'ru': 'выберите видео для загрузки',
                        'en': 'choose video to upload',
                        'kz': 'жуктеу ушин видео танданыз',
                    },
                    'choosePoster': {
                        'ru': 'выберите постер для видео',
                        'en': 'choose poster for video',
                        'kz': 'видео ушин постер танданыз',
                    },
                }
            },
            'notification': {
                'whatDid': {
                    'create': {
                        'ru': 'создал:',
                        'en': 'create:',
                        'kz': 'курды:',
                    },
                    'invite': {
                        'ru': 'пригласил:',
                        'en': 'invite you:',
                        'kz': 'шакырды:',
                    },
                    'liked': {
                        'ru': 'лайкнул:',
                        'en': 'liked:',
                        'kz': 'лайк басты:',
                    },
                    'commented': {
                        'ru': 'прокоментировал:',
                        'en': 'commented:',
                        'kz': 'комментировать етти:',
                    },
                    'requested': {
                        'ru': 'отправил запрос:',
                        'en': 'requested:',
                        'kz': 'сурау жиберди:',
                    },
                },
                'additionalInfos': {
                    'participate': {
                        'ru': 'участвовать в',
                        'en': 'to participate in the',
                        'kz': 'катысуга',
                    },
                    'beMemb': {
                        'ru': 'стать членом',
                        'en': 'to be member of the',
                        'kz': 'муше болуга',
                    },
                    'toFollow': {
                        'ru': 'стать последователем',
                        'en': 'to follow to you',
                        'kz': 'артыннан еруге',
                    }
                },
                'notLoadNotifications': {
                    'ru': 'Не удалось загрузить уведомления!',
                    'en': 'Can not load notifications!',
                    'kz': 'Уведомлениелерди жуктей алмадык!',
                },
                'notLoadNotification': {
                    'ru': 'Не удалось загрузить уведомление!',
                    'en': 'Can not load notification!',
                    'kz': 'Уведомление жуктей алмадык!',
                }
            },
            'page-id': {
                'home': {
                    'ru': 'главная',
                    'en': 'home',
                    'kz': 'басты',
                }
            },
            'header': {
                'actions': {
                    'ru': 'Действия',
                    'en': 'Actions',
                    'kz': 'Арекеттер',
                }
            },
        },
        'leave-comment-plash': {
            'writeComment': {
                'ru': 'Напишите комментарий',
                'en': 'Write comment',
                'kz': 'Комментарий жазыныз',
            }
        },
        'post-item': {
            'likeSaved': {
                'ru': 'Лайк сохранен!',
                'en': 'Like saved!',
                'kz': 'Лайк сакталды!',
            },
            'likeNotSaved': {
                'ru': 'Сервер не отвечает... лайк не сохранен!',
                'en': 'Server do not response... like do not saved!',
                'kz': 'Сервер жауап бермей жатыр... лайк сакталган жок!',
            }
        },
        'routes': {
            'user': {
                'ru': 'пользователь',
                'en': 'user',
                'kz': 'пайдаланушы',
            },
            'group': {
                'ru': 'группа',
                'en': 'group',
                'kz': 'топ',
            },
            'messenger': {
                'ru': 'мессенджер',
                'en': 'messenger',
                'kz': 'мессенджер',
            },
            'comment': {
                'ru': 'комментарий',
                'en': 'comment',
                'kz': 'комментарий',
            },
            'event': {
                'ru': 'событие',
                'en': 'event',
                'kz': 'окига',
            },
            'signs': {
                'sign': {
                    'ru': 'вход',
                    'en': 'sign',
                    'kz': 'киру',
                },
                'in': {
                    'ru': 'войти',
                    'en': 'in',
                    'kz': 'киру',
                },
                'up': {
                    'ru': 'регистрация',
                    'en': 'up',
                    'kz': 'тиркеу',
                },
                're': {
                    'ru': 'обновить пароль',
                    'en': 're',
                    'kz': 'пароль жанарту',
                },
                'rst': {
                    'ru': 'новый пароль',
                    'en': 'rst',
                    'kz': 'жана пароль',
                },
                's': {
                    'ru': 'с',
                    'en': 's',
                    'kz': 'с',
                }
            },
            'searches': {
                'search': {
                    'ru': 'поиск',
                    'en': 'search',
                    'kz': 'издеу',
                },
                'all': {
                    'ru': 'всех',
                    'en': 'all',
                    'kz': 'барин',
                },
            },
            'post': {
                'ru': 'пост',
                'en': 'post',
                'kz': 'пост',
            },
            'photo': {
                'ru': 'фото',
                'en': 'photo',
                'kz': 'сурет',
            },
            'video': {
                'ru': 'видео',
                'en': 'video',
                'kz': 'бейнежазба',
            },
            'account': {
                'account': {
                    'ru': 'аккаунт',
                    'en': 'account',
                    'kz': 'аккаунт',
                },
                'gallery': {
                    'ru': 'галерея',
                    'en': 'gallery',
                    'kz': 'галерея',
                },
                'settings': {
                    'settings': {
                        'ru': 'настройки',
                        'en': 'settings',
                        'kz': 'настройкилер',
                    },
                    'personal': {
                        'ru': 'личные',
                        'en': 'personal',
                        'kz': 'жеке',
                    }
                },
                'groups': {
                    'ru': 'группы',
                    'en': 'groups',
                    'kz': 'топтар',
                },
                'friends': {
                    'friends': {
                        'ru': 'друзья',
                        'en': 'friends',
                        'kz': 'достар',
                    },
                    'all': {
                        'ru': 'все',
                        'en': 'all',
                        'kz': 'бари',
                    },
                    'onlines': {
                        'ru': 'онлайн',
                        'en': 'onlines',
                        'kz': 'желиде',
                    },
                    'requests': {
                        'ru': 'заявки',
                        'en': 'requests',
                        'kz': 'сураулар',
                    }
                },
            },
        },
        'send-audio': {
            'started': {
                'ru': 'Началось запись аудио',
                'en': 'Audio recording started',
                'kz': 'Аудио жазу басталды',
            },
            'finished': {
                'ru': 'Запись аудио завершена',
                'en': 'Audio recording finished',
                'kz': 'Аудио жазу битти',
            }
        },
        'smiles': {
            'smilesPatternNames': {
                'all': {
                    'ru': 'Все',
                    'en': 'All',
                    'kz': 'Бари',
                }
            },
        },
        'speech': {
            'onStart': {
                'ru': 'Говорите',
                'en': 'Speaking',
                'kz': 'Сойлениз',
            },
            'onEnd': {
                'ru': 'Разговор закончен',
                'en': 'Speaking finished',
                'kz': 'Ангиме битти',
            },
            'onErrorNoSpeech': {
                'ru': 'Вас не поняли',
                'en': 'Do not understand you',
                'kz': 'Сизди тусинген жок',
            },
            'onError': {
                'ru': 'Ваш браузер не поддерживает разговорную функцию. Пожалуйста, смените браузер',
                'en': 'Your browser do not support speech recognition. Please, change browser',
                'kz': 'Сиздин браузер сойлеу функциясын колдамайды. Отиниш, браузерди ауыстырыныз',
            },
        },
    },
    'functions': {
        'api': {
            '500err': {
                'ru': '500: сервер не отвечает',
                'en': '500: server not response',
                'kz': '500: сервер жауап бермейди',
            },
        },
        'content': {
            'notPublications': {
                'ru': 'Публикации нет',
                'en': 'Not publication yet',
                'kz': 'Публикациялар жок',
            },
            'calculateDateTimes': {
                's': {
                    'ru': '',
                    'en': 's',
                    'kz': '',
                },
                'in': {
                    'ru': 'через',
                    'en': 'in',
                    'kz': 'кеин',
                },
                'ago': {
                    'ru': 'назад',
                    'en': 'ago',
                    'kz': 'алдын',
                },
                'second': {
                    'ru': 'секунд',
                    'en': 'second',
                    'kz': 'секунд',
                },
                'minute': {
                    'ru': 'минут',
                    'en': 'minute',
                    'kz': 'минут',
                },
                'hour': {
                    'ru': 'час',
                    'en': 'hour',
                    'kz': 'сагат',
                },
                'day': {
                    'ru': 'день',
                    'en': 'day',
                    'kz': 'кун',
                },
                'week': {
                    'ru': 'неделя',
                    'en': 'week',
                    'kz': 'апта',
                },
                'month': {
                    'ru': 'месяц',
                    'en': 'month',
                    'kz': 'ай',
                },
                'year': {
                    'ru': 'год',
                    'en': 'year',
                    'kz': 'жыл',
                },
            },
            'readableCounts': {
                'k': {
                    'ru': 'тыс',
                    'en': 'K',
                    'kz': 'мын',
                },
                'm': {
                    'ru': 'млн',
                    'en': 'M',
                    'kz': 'млн',
                },
                'b': {
                    'ru': 'млрд',
                    'en': 'B',
                    'kz': 'млрд',
                },
                't': {
                    'ru': 'трлн',
                    'en': 'T',
                    'kz': 'трлн',
                },
            }
        },
        'form': {
            'notifyInvalid': {
                'ru': 'это поле неправильно',
                'en': 'this is wrong',
                'kz': 'осы жер дурыс емес',
            },
            'wrongInputValidation': {
                'ru': 'Не корретная валидация полей',
                'en': 'Wrong input validation',
                'kz': 'Енгизген деректер дурыс емес',
            }
        },
        'user': {
            'changeUserDataError': {
                'ru': 'Что-то пошло не так... Пожалуйста, обновите страницу',
                'en': 'Something wrong...Please refresh the page',
                'kz': 'Бирдене дурыс емес... Отиниш, паракшаны жанартыныз',
            },
            'logouting': {
                'ru': 'Производится выход...',
                'en': 'Sign out...',
                'kz': 'Шыгып жатырсыз...',
            },
            'logouted': {
                'ru': 'Вышли!',
                'en': 'Sign outed!',
                'kz': 'Шыктыныз!',
            },
            'toFollows': {
                'rlshipError': {
                    'ru': 'Ошибка! Попробуйте позднее или обратитесть в тех.поддержку',
                    'en': 'Failed! Retry later or write to support',
                    'kz': 'Кате! Кеинирек кориниз немесе тех.коммекке хабарласыныз',
                },
                'flwSuccess': {
                    'ru': 'Вы теперь следуете!',
                    'en': 'You are follow!',
                    'kz': 'Енди онын изинен андыйсыз!',
                },
                'unflwSuccess': {
                    'ru': 'Вы теперь не следуете!',
                    'en': 'You are unfollow!',
                    'kz': 'Енди онын изинен андымайсыз!',
                },
                'rqSuccess': {
                    'ru': 'Запрос отправлен! Ожидайте...',
                    'en': 'Request sended! Waiting for answer...',
                    'kz': 'Сураныс жиберилди! Кутиниз...',
                },
                'repealSuccess': {
                    'ru': 'Запрос отменен!',
                    'en': 'Request repealed!',
                    'kz': 'Сураныс кайтарылды!',
                },
                'acceptSuccess': {
                    'ru': 'Принято!',
                    'en': 'Accepted!',
                    'kz': 'Кабылданды!',
                },
                'declineSuccess': {
                    'ru': 'Отклонено!',
                    'en': 'Declined!',
                    'kz': 'Кайтарылды!',
                },
            }
        },
        'effects': {
            'notSaveComment': {
                'ru': 'Не удалось сохранить комментарий!',
                'en': 'Can not save comment!',
                'kz': 'Комментарий сакталмады!',
            },
        },
        'hooks': {
            'notLoadComments': {
                'ru': 'Не удалось загрузить комментарий!',
                'en': 'Can not load comments!',
                'kz': 'Комментарийлер жуктелмеди!',
            },
        }
    },
    'home': {
        'notLoad': {
            'ru': 'Не удалось загрузить данные профиля!',
            'en': 'Can not loaded profile news!',
            'kz': 'Профильдын деректери жуктелмеди!',
        },
    },
    'messenger': {
        'chats': {
            'notLoad': {
                'ru': 'Не удалось загрузить данные мессенджера',
                'en': 'Can not load messenger data',
                'kz': 'Мессенджер декетери жуктелмеди',
            }
        },
        'chat': {
            'notLoadUser': {
                'ru': 'Не удалось загрузить информацию собеседника',
                'en': 'Can not load user data',
                'kz': 'Сойлесушинин декетери жуктелмеди',
            },
            'notLoadMessages': {
                'ru': 'Не удалось загрузить сообщения',
                'en': 'Can not load messages',
                'kz': 'Хаттарды декетери жуктелмеди',
            },
            'notSendMessage': {
                'ru': 'Не удалось отправить сообщение!',
                'en': 'Message do not sended!',
                'kz': 'Хат жиберилмеди!',
            },
        },
    },
    'nf404': {
        'nf': {
            'ru': 'не найдено',
            'en': 'not found',
            'kz': 'табылмады',
        },
        'goHome': {
            'ru': 'домой!',
            'en': 'go home!',
            'kz': 'басты бетке!',
        }
    },
    'photo': {
        'notLoadPhoto': {
            'ru': 'Не удалось загрузить фото!',
            'en': 'Can not load photo!',
            'kz': 'Фото жуктелмеди!',
        },
        'notLoadComments': {
            'ru': 'Не удалось загрузить комментарий!',
            'en': 'Can not load comments!',
            'kz': 'Комментарийлер жуктелмеди!',
        },
        'notSaveComment': {
            'ru': 'Не удалось сохранить комментарий!',
            'en': 'Can not save comment!',
            'kz': 'Комментарий сакталмады!',
        }
    },
    'post': {
        'notLoadPost': {
            'ru': 'Не удалось загрузить пост!',
            'en': 'Can not load post!',
            'kz': 'Пост жуктелмеди!',
        },
        'notSaveComment': {
            'ru': 'Не удалось сохранить комментарий!',
            'en': 'Can not save comment!',
            'kz': 'Комментарий сакталмады!',
        }
    },
    'profile': {
        'change-profile': {
            'changeData': {
                'ru': 'Изменить данные',
                'en': 'Change data',
                'kz': 'Деректерди озгерту',
            },
            'change': {
                'ru': 'Изменить!',
                'en': 'Change!',
                'kz': 'Озгерту!',
            },
            'somethingError': {
                'ru': 'Что-то пошло не так...',
                'en': 'Something error...',
                'kz': 'Бирдене дурыс емес...',
            },
            'dataChanged': {
                'ru': 'Данные изменены!',
                'en': 'Data is changed!',
                'kz': 'Деректер озгертилди!',
            },
            'genderMale': {
                'ru': 'Мужской',
                'en': 'Male',
                'kz': 'Ер',
            },
            'genderFemale': {
                'ru': 'Женский',
                'en': 'Female',
                'kz': 'Айел',
            },
            'genderDefault': {
                'ru': 'Не установлено',
                'en': 'Default',
                'kz': 'Жок',
            }
        },
        'actions-btns': {
            'subsBtn': {
                'flw': {
                    'ru': 'Следуй за мной!',
                    'en': 'Follow me!',
                    'kz': 'Артымнан ер!',
                },
                'unflw': {
                    'ru': 'Перестать следовать!',
                    'en': 'Unfollow!',
                    'kz': 'Еруди кою!',
                },
                'member': {
                    'ru': 'Стать членом!',
                    'en': 'Be member!',
                    'kz': 'Муше болу!',
                },
                'unmember': {
                    'ru': 'Перестать быть членом!',
                    'en': 'Unmember!',
                    'kz': 'Муше болуды кою!',
                },
                'rqSend': {
                    'ru': 'Отправить заявку!',
                    'en': 'Send request!',
                    'kz': 'Сураныс жиберу!',
                },
                'rqRemove': {
                    'ru': 'Удалить заявку!',
                    'en': 'Remove request!',
                    'kz': 'Суранысты жою!',
                },
                'rqAccept': {
                    'ru': 'Принять заявку!',
                    'en': 'Accept request!',
                    'kz': 'Суранысты кабылдау!',
                },
                'rqDecline': {
                    'ru': 'Отвергнуть заявку!',
                    'en': 'Decline request!',
                    'kz': 'Суранысты кайтару!',
                },
                'ch': {
                    'ru': 'Сменить данные!',
                    'en': 'Change data!',
                    'kz': 'Деректер озгерту!',
                },
                'canNotCreateChat': {
                    'ru': 'Не удалось создать чат!',
                    'en': 'Can not create chat!',
                    'kz': 'Чат кура алмадык!',
                },
                'actions': {
                    'ru': 'Действия',
                    'en': 'Actions',
                    'kz': 'Арекеттер',
                },
                'writeMessage': {
                    'ru': 'написать сообщение',
                    'en': 'write message',
                    'kz': 'хабарлама жазу',
                },
            },
            'btns': {
                'following': {
                    'ru': 'следующие',
                    'en': 'following',
                    'kz': 'ерушилер',
                },
                'followers': {
                    'ru': 'следую',
                    'en': 'followers',
                    'kz': 'еремин',
                },
                'groups': {
                    'ru': 'группы',
                    'en': 'groups',
                    'kz': 'топтар',
                },
                'gallery': {
                    'ru': 'галлерея',
                    'en': 'gallery',
                    'kz': 'галлерея',
                },
                'members': {
                    'ru': 'члены группы',
                    'en': 'members',
                    'kz': 'топ мушелери',
                },
                'events': {
                    'ru': 'события',
                    'en': 'events',
                    'kz': 'окигалар',
                },
                'requests': {
                    'ru': 'запросы',
                    'en': 'requests',
                    'kz': 'сураулар',
                },
            }
        },
        'data': {
            'nick': {
                'ru': 'Прозвище',
                'en': 'Nickname',
                'kz': 'Лакап аты',
            },
            'lName': {
                'ru': 'Фамилия',
                'en': 'Last name',
                'kz': 'Фамилия',
            },
            'fName': {
                'ru': 'Имя',
                'en': 'First name',
                'kz': 'Аты',
            },
            'gender': {
                'ru': 'Пол',
                'en': 'Gender',
                'kz': 'Жыныс',
            },
            'dob': {
                'ru': 'Дата рождения',
                'en': 'Date of Birth',
                'kz': 'Туылган куни',
            },
            'cdate': {
                'ru': 'Дата создания',
                'en': 'Creation date',
                'kz': 'Курылган уакыты',
            },
            'title': {
                'ru': 'Название группы',
                'en': 'Group name',
                'kz': 'Топтын аты',
            },
            'aboutMe': {
                'ru': 'Обо мне',
                'en': 'About me',
                'kz': 'Мен туралы',
            },
            'description': {
                'ru': 'Описание',
                'en': 'Description',
                'kz': 'Сипаттама',
            },
        },
        'publications': {
            'privateAcc': {
                'ru': 'этот Аккаунт является приватным!',
                'en': 'this Account is private!',
                'kz': 'осы Аккаунт жеке!',
            },
            'privateGroup': {
                'ru': 'эта Группа является приватным!',
                'en': 'this Group is private!',
                'kz': 'осы Топ жеке!',
            },
            'sendRqFr': {
                'ru': 'отправьте запрос и будьте друзьями чтобы увидеть другую информацию.',
                'en': 'send request and be friend to see other information.',
                'kz': 'калган деректерди кору ушин сурау жибериниз жане дос болыныз.',
            },
            'sendRqMemb': {
                'ru': 'отправьте запрос и будьте членом группы чтобы увидеть другую информацию.',
                'en': 'send request and be member to see other information.',
                'kz': 'калган деректерди кору ушин сурау жибериниз жане топ мушеси болыныз.',
            },
            'publications': {
                'ru': 'Публикации:',
                'en': 'Publications:',
                'kz': 'Жарияланымдар:',
            },
        },
        'profile': {
            'notLoadProfile': {
                'ru': 'Не удалось загрузить данные профиля!',
                'en': 'Can not load profile data!',
                'kz': 'Профиль деректерин жуктей алмадык!',
            },
            'notLoadPublications': {
                'ru': 'Не удалось загрузить публикации!',
                'en': 'Can not load publications!',
                'kz': 'Жарияланымдарды жуктей алмадык!',
            }
        },
        'switch': {
            'all': {
                'ru': 'все',
                'en': 'all',
                'kz': 'бари',
            },
            'posts': {
                'ru': 'посты',
                'en': 'posts',
                'kz': 'посттар',
            },
            'events': {
                'ru': 'события',
                'en': 'events',
                'kz': 'окигалар',
            },
        }
    },
    'search': {
        'filter': {
            'close': {
                'ru': 'Закройте для применения фильтра!',
                'en': 'Close filter to apply!',
                'kz': 'Фильтрды истету ушин жабыныз!',
            },
            'from': {
                'ru': 'с',
                'en': 'from',
                'kz': 'осыдан',
            },
            'to': {
                'ru': 'до',
                'en': 'to',
                'kz': 'деин',
            },
            'filterDefines': {
                'sort': {
                    'ru': 'сортировать',
                    'en': 'sort',
                    'kz': 'сурыптау',
                },
                'popularity': {
                    'ru': 'популярности',
                    'en': 'popularity',
                    'kz': 'танымалдылык',
                },
                'date': {
                    'ru': 'дате',
                    'en': 'date',
                    'kz': 'кун',
                },
                'age': {
                    'ru': 'возраст',
                    'en': 'age',
                    'kz': 'жас',
                },
                'subs': {
                    'ru': 'кол-во подписчиков',
                    'en': 'subscription count',
                    'kz': 'жазулышылар саны',
                },
                'genderAll': {
                    'ru': 'любой',
                    'en': 'all',
                    'kz': 'барибир',
                },
                'carma': {
                    'ru': 'кол-во кармы',
                    'en': 'carma count',
                    'kz': 'карма саны',
                },
                'member': {
                    'ru': 'кол-во членов',
                    'en': 'member count',
                    'kz': 'муше саны',
                },
                'view': {
                    'ru': 'кол-во просмотров',
                    'en': 'viewed count',
                    'kz': 'корген саны',
                },
                'private': {
                    'ru': 'приватность',
                    'en': 'private',
                    'kz': 'жекешилик',
                },
            }
        },
        'search': {
            'notLoadRes': {
                'ru': 'Не удалось загрузить результат поиска!',
                'en': 'Can not load results!',
                'kz': 'Издеу натижелери жуктелмеди!',
            }
        },
    },
    'signs': {
        'sign': {
            'in': {
                'ru': 'Вход',
                'en': 'Sign in',
                'kz': 'Киру',
            },
            'up': {
                'ru': 'Регистрация',
                'en': 'Sign up',
                'kz': 'Тиркелу',
            },
            're': {
                'ru': 'Сбросить пароль',
                'en': 'Reset password',
                'kz': 'Парольди жанарту',
            },
            'rst': {
                'ru': 'Поставить новый пароль',
                'en': 'Create new password',
                'kz': 'Жана пароль кою',
            },
            's': {
                'ru': 'Подтверждение пользователя',
                'en': 'Confirm user',
                'kz': 'Колданушыны растау',
            },
        },
        'oauth2': {
            'info': {
                'ru': 'Ваш логин по умолчанию - email и пароль pswrd',
                'en': 'Your default login is email and default password is: pswrd',
                'kz': 'Сиздин адепки логин - email жане пароль pswrd',
            },
            'orin': {
                'ru': 'или войдите через',
                'en': 'or sign in with',
                'kz': 'немесе кириниз аркылы',
            },
            'orup': {
                'ru': 'или регистрируйтесь через',
                'en': 'or sign up with',
                'kz': 'немесе тиркелиниз аркылы',
            }
        },
        'about': {
            'ru': 'WNET - это сайт для общения, звонков друзьям, публикации сообщений, сбора друзей в группы и приглашения на мероприятие.',
            'en': 'WNET is the site for conversation, calling to friends, making post, gather friends to group and invite to a event',
            'kz': 'WNET - сұхбаттасуға, достарына қоңырау шалуға, хабарламалар жіберуге, достарды топтарға жинауға және іс-шараға шақыруға арналған сайт.',
        },
        'sign-up': {
            'sign-up': {
                'ru': 'зарегистрироваться',
                'en': 'sign up',
                'kz': 'профиль куру',
            },
            'success': {
                'ru': 'Профиль создан!',
                'en': 'Profile is created!',
                'kz': 'Профиль курылды!',
            },
            'fail': {
                'ru': 'Профиль не создан!',
                'en': 'Profile is not created!',
                'kz': 'Профиль курылган жок!',
            },
            'createAcc': {
                'ru': 'или создать новый аккаунт?',
                'en': 'or create new account?',
                'kz': 'алде жана аккаунт куру ма?',
            },
            'repPass': {
                'ru': 'Повторите пароль:',
                'en': 'Repeat password:',
                'kz': 'Парольды кайтадан териниз:',
            },
            'verificationMsg': {
                'ru': 'Письмо подтвержения отправлено на Вашу почту. Проверьте',
                'en': 'Verification msg sended to your email. Check it',
                'kz': 'Расстау хат почтанызга жиберилди. Тексериниз',
            },
        },
        'sign-in': {
            'sign-in': {
                'ru': 'войти',
                'en': 'sign in',
                'kz': 'киру',
            },
            'success': {
                'ru': 'Вы вошли!',
                'en': 'Signed in!',
                'kz': 'Кирдиниз!',
            },
            'fail': {
                'ru': 'Не вошли!',
                'en': 'Do not signed in!',
                'kz': 'Кирмединиз!',
            },
            'remember': {
                'ru': 'вспомнили пароль?',
                'en': 'remember your password?',
                'kz': 'пароль еске тусирдинизба?',
            },
            'submit': {
                'ru': 'Присоединиться!',
                'en': 'Join!',
                'kz': 'Косылу!',
            },
            'login': {
                'ru': 'Логин:',
                'en': 'Login:',
                'kz': 'Логин:',
            },
            'pass': {
                'ru': 'Пароль:',
                'en': 'Password:',
                'kz': 'Пароль:',
            },
            'haveAcc': {
                'ru': 'уже есть аккаунт?',
                'en': 'do you not have account?',
                'kz': 'аккаунт бар ма?',
            }
        },
        'reset': {
            'submit': {
                'ru': 'Сбросить пароль!',
                'en': 'Reset password!',
                'kz': 'Парольды жою!',
            },
            'fail': {
                'ru': 'Пароль не сброшен!',
                'en': 'Password was not resetted!',
                'kz': 'Парольды жойылмады!',
            },
            'success': {
                'ru': 'Пароль сброшен!',
                'en': 'Password is resetted!',
                'kz': 'Парольды жойылды!',
            },
            'forgot': {
                'ru': 'забыли пароль?',
                'en': 'forgot your password?',
                'kz': 'парольды умыттыныз ба?',
            }
        },
        'restore': {
            'submit': {
                'ru': 'Восстановить пароль!',
                'en': 'Restore password!',
                'kz': 'Парольды кайтадан кою!',
            },
            'fail': {
                'ru': 'Пароль не создан!',
                'en': 'Password was not created!',
                'kz': 'Жана пароль койылмады!',
            },
            'success': {
                'ru': 'Новый пароль создан!',
                'en': 'New password is created!',
                'kz': 'Жана пароль койылды!',
            },
            'newPass': {
                'ru': 'Новый пароль:',
                'en': 'New password:',
                'kz': 'Жана пароль:',
            },
            'code': {
                'ru': 'Код:',
                'en': 'Code:',
                'kz': 'Код:',
            }
        },
    },
    'video': {
        'notLoadVideo': {
            'ru': 'Не удалось загрузить видео!',
            'en': 'Can not load video!',
            'kz': 'Видео жуктелмеди!',
        },
        'notLoadComments': {
            'ru': 'Не удалось загрузить комментарий!',
            'en': 'Can not load comments!',
            'kz': 'Комментарийлер жуктелмеди!',
        },
        'notSaveComment': {
            'ru': 'Не удалось сохранить комментарий!',
            'en': 'Can not save comment!',
            'kz': 'Комментарий сакталмады!',
        }
    }
}

Library.lang = window.localStorage.getItem('lang') || 'en';

Library.getText = (path = '') => get(Library, path)[Library.lang];

Library.calculatePath = (paths = {}, path = [], index = 0) => {
    if (index === path.length) return path.join('/');
    if (path[index] === '' || /\d/.test(path[index])) return Library.calculatePath(paths, path, index + 1);

    const pathsVals = Object.values(paths);
    for (let curPath of pathsVals) {
        const keys = Object.keys(curPath);
        const vals = Object.values(curPath);
        if (keys.includes('en') && !vals.includes(path[index])) continue;
        if (keys.includes('en') && vals.includes(path[index])) {
            path[index] = curPath[Library.lang];
            return Library.calculatePath(pathsVals, path, ++index);
        }
        Library.calculatePath(curPath, path, index);
    }

    return path.join('/');
}