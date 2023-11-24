import { useState } from "react";
import { Checkbox } from "@mantine/core";
import PropTypes from "prop-types";
import styled from "styled-components";

function CheckBox({ value, task }) {
  const [isChecked, setIsChecked] = useState(value);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledCheckBox>
      <Checkbox
        checked={isChecked}
        onChange={handleChange}
        color="white"
        iconColor="#ef476f"
        size="md"
        radius="xl"
        label={task}
      />
    </StyledCheckBox>
  );
}

//CSS

const StyledCheckBox = styled.div`
  border-bottom: 1px solid white;
  margin-bottom: 10px;
`;

CheckBox.propTypes = {
  task: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

CheckBox.defaultProps = {
  task: "Default Task",
  value: true,
};

export default CheckBox;
