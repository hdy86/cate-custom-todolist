import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  gap: 10px;
`;
const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid #fff;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
`;
const Btn = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.accentColor};
  font-size: 16px;
  color: ${(props) => props.theme.textColor2};
  font-weight: bold;
  cursor: pointer;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((state) => [{ id: Date.now(), text: toDo, category }, ...state]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "Please write To Do" })}
        placeholder="Write a to do"
      />
      <Btn>Add</Btn>
    </Form>
  );
}

export default CreateToDo;
