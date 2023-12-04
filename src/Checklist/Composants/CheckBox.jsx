import { useState } from "react";
import { Checkbox } from "@mantine/core";
import PropTypes from "prop-types";
import styled from "styled-components";

function CheckBox({ statut, title }) {
  const [isChecked, setIsChecked] = useState(statut);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledCheckBox>
      <>
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          color="white"
          iconColor="#ef476f"
          size="md"
          radius="xl"
          label={title}
        />
      </>
      <div className="image">
        <a>
          <i className="fa-regular fa-trash-can"></i>
        </a>
        <i className="fa-solid fa-pen"></i>
      </div>
    </StyledCheckBox>
  );
}

//CSS

const StyledCheckBox = styled.div`
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  display: flex;

  .image {
    margin-left: auto;
    white-space: nowrap;
  }

  i {
    margin-left: 10px;
  }
`;

//propTypes

CheckBox.propTypes = {
  title: PropTypes.string.isRequired,
  statut: PropTypes.number,
};

CheckBox.defaultProps = {
  title: "Default Task",
  statut: 0,
};

export default CheckBox;
