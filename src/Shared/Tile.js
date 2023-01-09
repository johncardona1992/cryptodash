import styled from "styled-components";
import {
  lightBlueBackground,
  subtleBoxShadow,
  greenBoxShadow,
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

export { Tile, SelectableTile };
