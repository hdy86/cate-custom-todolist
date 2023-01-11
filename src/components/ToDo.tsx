import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

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
        {category !== Categories.TO_DO && (
          <Btn name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Btn>
        )}
        {category !== Categories.DOING && (
          <Btn name={Categories.DOING} onClick={onClick}>
            Doing
          </Btn>
        )}
        {category !== Categories.DONE && (
          <Btn name={Categories.DONE} onClick={onClick}>
            Done
          </Btn>
        )}
      </BtnWrap>
    </Li>
  );
}

export default ToDo;
