import styled from "styled-components";

const STypeBtn = styled.label`
    display: block;
    padding: 1rem;
    margin: 1rem;
    color: var(--onHoverColor);
    background: rgba(3, 0, 167, 0.2);
    border-radius: 50px;
    box-shadow: var(--boxShadow);
    transition: var(--transitionApp);
    cursor: pointer;

    &:hover {
        background: #0300A7;
    }
`;

const STypeBtnsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 1rem 0;

    & span {
        color: var(--onHoverColor);
        text-transform: capitalize;
    }

    & input {
       display: none; 
    }

    & input:checked + ${STypeBtn}{
        background: #0300A7;
        transition: var(--transitionApp);
    }
`;

export default function TypeBtns({ title, type, btns = []}) {
    return (
        <STypeBtnsWrapper>
            <span >{title}: </span>

            {
                btns.map(
                    ({id, btnType, onChange, text}, index) => 
                    <div className="btn-wrapper" key={index} >
                        <input id={id} type="radio" checked={ type === btnType ? true : false} 
                            onChange={onChange} />
                        <STypeBtn htmlFor={id} >{text}</STypeBtn>
                    </div>
                )
            }
        </STypeBtnsWrapper>
    )
}