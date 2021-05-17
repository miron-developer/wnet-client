import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import { RandomKey } from 'functions/content';
import Avatar from 'common/avatar/avatar';

import styled from "styled-components";

const SChoose = styled.div`
    margin: 1rem 0;
    color: var(--onHoverColor);
`;

const SList = styled.div`
    max-height: 20rem;
    padding: 1rem;
    background: #d4d4d4;
    border-radius: 5px;
    overflow-y: auto;
`;

const SChooseListItem = styled.div`
    margin: .5rem;
    padding: .5rem;
    display: flex;
    align-items: center;
    background: ${props => props.isChoosen ? 'var(--purpleColor)' : 'var(--violetColor)'};
    border-radius: 5px;
    cursor: pointer;

    & span {
        margin: .5rem;
    }
`;

const localLib = {
    'notLoadList': Library.getText('common.choose-list.notLoadList'),
    'noList': Library.getText('common.choose-list.noList'),
}

const GListItem = ({ isChoosen, nickname, title, avatar, onClick }) => {
    const name = nickname ? nickname : title;

    return (
        <SChooseListItem isChoosen={isChoosen} onClick={() => onClick(isChoosen)}>
            <Avatar avatar={avatar} size="" />
            <span>{name}</span>
        </SChooseListItem>
    )
}

export default function GetList({ title, type = "followers", params = {}, choosenList = [], add = ()=>{}, remove = ()=>{} }) {
    const [isLoaded, setLoaded] = useState(false)
    const {datalist, isStopLoad, getPart} = useFromTo();

    useEffect(
        () => {
            if (datalist.length === 0 && !isLoaded) {
                getPart(type, params, localLib.notLoadList, true);
                setLoaded(true);
            }
        },
        [datalist, isLoaded, type, params, getPart]
    );
    
    const isChoosen = (id) => choosenList.find(item => item.id === id);
    const switchChoosen = (isChoosen, id) => isChoosen ? remove(id) : add(id);

    return (
        <SChoose>
            <span>{title}</span>
            <SList 
                onScroll={
                    e => ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => getPart(type, params, localLib.notLoadList, true)
                    )
                }
            >
                {
                    datalist.length === 0 
                        ? <span>{localLib.noList}</span>
                        : datalist.map(
                            item => 
                            <GListItem key={RandomKey()} {...item} 
                                isChoosen={isChoosen(item.id)} onClick={(isChoosen) => switchChoosen(isChoosen, item.id)} 
                            />)
                }    
            </SList> 
        </SChoose>
    )
}