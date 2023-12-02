import { useState } from "react";
import { Checkbox } from "@mantine/core";
import PropTypes from "prop-types";
import styled from "styled-components";

function CheckBox({ done, task }) {
  const [isChecked, setIsChecked] = useState(done);

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
          label={task}
        />
      </>
      <div className="image">
        <a>
          <i class="fa-regular fa-trash-can"></i>
        </a>
        <i class="fa-solid fa-pen"></i>
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
  task: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
};

CheckBox.defaultProps = {
  task: "Default Task",
  done: false,
};

export default CheckBox;
