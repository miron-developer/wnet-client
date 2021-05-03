import styled from "styled-components";

const SHeaderPopups = styled.div`
    position: relative;
    margin: 0 1rem;
    padding: .5rem;
    display: flex;
    align-items: center;
    transition: var(--transitionApp);
    
    &:hover{
        background: #0000001c;
        cursor: pointer;
    }    
`;

export default function HeaderPopups({ children, isOpened, setOpened = ()=>{} }) {
    return (
        <SHeaderPopups isOpened={isOpened} onClick={()=> setOpened(true)} onMouseLeave={()=> setOpened(false)}>
            {children}
        </SHeaderPopups>
    )
}