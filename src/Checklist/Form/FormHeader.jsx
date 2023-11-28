import styled from "styled-components";

const FormHeader = () => {
  return (
    <Header>
      <TitleDiv>
        <label className="Title" htmlFor="titre">
          Title :
        </label>
        <input type="text" id="title" name="title" placeholder="New title..." />
      </TitleDiv>
      <DescriptionDiv>
        <label className="Description" htmlFor="description">
          Description :
        </label>
        <input
          type="text"
          id="desciption"
          name="description"
          placeholder="Description..."
        />
      </DescriptionDiv>
    </Header>
  );
};

const Header = styled.div`
  input {
    margin: auto 0 auto 10px;
    background-color: #f78aa2;
    resize: none;
    border: none;
    border-radius: 10px;
    color: white;
    height: 3vh;
    width: 70%;
    &::placeholder {
      color: white;
    }
  }

  @media screen and (max-width: 700px) {
    input {
      margin-left: 0px;
      height: 4vh;
    }
  }
`;

const TitleDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 30px;
  border-radius: 20%;

  .Title {
    font-size: 35px;
    font-weight: 900;
    margin-left: 0;
  }
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    .Title {
      font-size: 25px;
    }
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-radius: 20%;

  .Description {
    font-size: 18px;
    font-weight: lighter;
  }
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    .Description {
      font-size: 18px;
    }
  }
`;

export default FormHeader;
