import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { categoriesState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CategoryBtns from "./CategoryBtns";

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
const Ul = styled.ul`
  list-style: none;
  padding: 0 20px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);

  return (
    <Container>
      <Header>
        <Title>To Do List</Title>
      </Header>

      <CategoryBtns />

      {categories.length !== 0 && (
        <>
          <CreateToDo />
          <Ul>
            {toDos?.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </Ul>
        </>
      )}
    </Container>
  );
}

export default ToDoList;
