import styled from "styled-components";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoriesState, CATEGORIES_KEY, categoryState } from "../atoms";

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid ${(props) => props.theme.lineColor};
  border-radius: 10px;
  background: ${(props) => props.theme.btnBgColor};
  font-size: 16px;
  color: ${(props) => props.theme.textColor};

  &::placeholder {
    color: ${(props) => props.theme.textColor};
  }
`;
const Btn = styled.button`
  width: 40px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.accentColor};
  font-size: 16px;
  color: ${(props) => props.theme.textColor2};
  font-weight: bold;
  cursor: pointer;
`;
const ToDoBtnWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 2px solid ${(props) => props.theme.lineColor};
`;
const ToDoBtn = styled.button<{ isActive: boolean }>`
  padding: 10px;
  border-width: 4px;
  border-style: solid;
  border-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.lineColor};
  border-radius: 10px;
  background: ${(props) =>
    props.isActive ? props.theme.btnPickBgColor : props.theme.btnBgColor};
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  font-size: 18px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
`;

interface IForm {
  cate: string;
}

function CategoryBtns() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ cate }: IForm) => {
    setCategories((state) => [...state, cate]);
    setValue("cate", "");
  };
  const onClick = (cate: string) => {
    setCategory(cate);
  };

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    categories.length === 1 && setCategory(categories[0]);
  }, [categories]);

  return (
    <>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("cate", { required: "Please write Category" })}
          placeholder={`Add category`}
        />
        <Btn>+</Btn>
      </Form>
      <ToDoBtnWrap>
        {categories.map((item) => (
          <ToDoBtn
            key={item}
            isActive={item === category}
            onClick={() => onClick(item)}
          >
            {item}
          </ToDoBtn>
        ))}
      </ToDoBtnWrap>
    </>
  );
}

export default CategoryBtns;
