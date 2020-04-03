import { darken } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles/colors';

export const Form = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 1;

    input {
      flex: 1;
      width: 99%;
      border: 1px solid ${colors.border};
      padding: 10px 35px 10px 10px;
      border-radius: 4px;
      font-size: 16px;
    }

    svg{
      text-align: center;
      margin-left: -30px;
    }

  }

  select {
    max-width: 90px;
    padding: 10px 5px;
    border: 1px solid ${colors.border};
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const List = styled.ul`
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
  margin-top: 15px;
  justify-content: space-between;

  li {
    max-width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: ${colors.background};
    border-radius: 4px;
    padding: 10px;

    img {
      align-items: center;
      max-width: 200px;
      margin: 0 auto;
      border-radius: 50%;

      width: 150px;
      height: 150px;
      border: 1px solid ${colors.primary};
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: ${colors.title};
      margin-top: 5px;
    }

    > span {
      font-size: 12px;
      text-align: left;
      margin: 5px 0 10px;
    }

    > div {
      display: flex;
      margin-top: auto;
      font-size: 14px;
      font-weight: bold;
      align-items: center;
      justify-content: space-between;
      color: ${colors.title};

      a {
        color: ${colors.title};

        &:hover {
          color: ${darken(0.03, colors.primary)};
        }
      }

      svg {
        margin-right: 3px;
      }
    }
  }
`;

export const Loading = styled.div``;
