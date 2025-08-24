
import { css } from 'lit';

export const loginStyles = css`

  ul {
    list-style-type:          none;
    padding:                  0;
    margin:                   0;
  }

  label         { font-size: .9em; }
  .divide       { border: 2px solid #606060; margin: 6px 0 0 0; border-radius: 50%; }

  input {
    box-sizing:               border-box;
    width:                    100%;
    padding:                  12px 20px;
    margin:                   8px 0 0 0;
    display:                  inline-block;
    border:                   1px solid #ccc;
    border-radius:            4px;
  }

  a {
    text-transform:           uppercase;
    font-size:                .6em;
    color:                    rgb(105,105,105);
    font-weight:              800;
    text-decoration:          none;
  }

  p {
    text-align: center;
  }

  @media (max-width: 460px) {

    label { font-size: .8em; }

  }

`;
