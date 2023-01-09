import styled from "styled-components";
import {
  lightBlueBackground,
  subtleBoxShadow,
  greenBoxShadow,
  redBoxShadow,
} from "./Styles";

const Tile = styled.div`
  ${subtleBoxShadow};
  ${lightBlueBackground};
  padding: 10px;
`;

const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow};
  }
`;

const DeletableTitle = styled(SelectableTile)`
  &:hover {
    cursor: pointer;
    ${redBoxShadow};
  }
`;

const DisabledTitle = styled(Tile)`
  pointer-events: none;
  opacity: 0.4;
`;

export { Tile, SelectableTile, DeletableTitle, DisabledTitle };
