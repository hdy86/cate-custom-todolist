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
  cursor: pointer;
`;

function ToDo({ id, text, category }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  return (
    <Li>
      <Text>{text}</Text>
      <BtnWrap>
        {categories.map(
          (item) =>
            item !== category && (
              <Btn key={item} name={item} onClick={onClick}>
                {item}
              </Btn>
            )
        )}
      </BtnWrap>
    </Li>
  );
}

export default ToDo;
