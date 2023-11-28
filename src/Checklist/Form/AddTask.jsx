import styled from "styled-components";

const AddTask = () => {
  return (
    <Add>
      <i className="fa-solid fa-plus"></i>
      <input type="text" placeholder="Add a task..." />
    </Add>
  );
};

// CSS
const Add = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  text-decoration: none;

  i {
    margin-right: 20px;
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }
  }
  input {
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    color: white;
    width: 150px;
    &::placeholder {
      color: white;
    }
  }
`;

export default AddTask;
