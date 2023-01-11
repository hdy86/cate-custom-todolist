import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

const Li = styled.li`
  margin: 30px 0;
`;
const Text = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 5px;
`;
const Btn = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  background: #fff;
  cursor: ${(props) => !props.disabled && "pointer"};
`;
const DeleteBtn = styled(Btn)`
  background: #ff2e4b;
  color: #fff;
`;

function ToDo({ id, text, category }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onChangeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((state) => {
      const targetIdx = state.findIndex((item) => item.id === id);
      const newToDo = { id, text, category: name as any };
      return [
        ...state.slice(0, targetIdx),
        newToDo,
        ...state.slice(targetIdx + 1),
      ];
    });
  };
  const onDeleteCategory = () => {
    setToDos((state) => {
      const targetIdx = state.findIndex((item) => item.id === id);
      return [...state.slice(0, targetIdx), ...state.slice(targetIdx + 1)];
    });
  };

  return (
    <Li>
      <Text>{text}</Text>
      <BtnWrap>
        {categories.map((item) => (
          <Btn
            key={item}
            disabled={item === category}
            name={item}
            onClick={onChangeCategory}
          >
            {item}
          </Btn>
        ))}
        <DeleteBtn onClick={onDeleteCategory}>삭제</DeleteBtn>
      </BtnWrap>
    </Li>
  );
}

export default ToDo;
