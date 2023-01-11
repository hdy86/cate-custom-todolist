import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, categoryState, Categories } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;

  @media all and (max-width: 767px) {
    font-size: 30px;
  }
`;
const BtnWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 2px solid #888;
`;
const Btn = styled.button<{ isActive: boolean }>`
  padding: 10px;
  border-width: 4px;
  border-style: solid;
  border-color: ${(props) =>
    props.isActive ? props.theme.accentColor : "#fff"};
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  font-size: 18px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onClick = (cate: Categories) => {
    setCategory(cate);
  };

  return (
    <Container>
      <Header>
        <Title>To Do List</Title>
      </Header>

      <BtnWrap>
        <Btn
          isActive={category === Categories.TO_DO}
          onClick={() => onClick(Categories.TO_DO)}
        >
          To Do
        </Btn>
        <Btn
          isActive={category === Categories.DOING}
          onClick={() => onClick(Categories.DOING)}
        >
          Doing
        </Btn>
        <Btn
          isActive={category === Categories.DONE}
          onClick={() => onClick(Categories.DONE)}
        >
          Done
        </Btn>
      </BtnWrap>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
