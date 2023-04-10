
import { css } from 'lit';

export const Settings = css`

form { box-sizing:          border-box; }
.pageTitle          { margin: 0; }

form {
  max-width:        600px;
  margin:           auto;
  border:           0;
}

.setMenu {
  display:          grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap:         8px;
  margin:           0px;
  padding:          0px;
}
  
.topButton {
  color:                    grey;
  border:                   0;
  width:                    100%;
  height:                   36px;
  margin:                   auto;
  padding:                  0px;
  font-weight:              800;
  font-size:                .8em;
  border-radius:            5px;
  background-color:         transparent;
}

.topButton[on] {
  /* background-color: rgba(0,0,0, .1); */
  color: var(--app-black-color);
}

.topButton:hover {
  cursor: pointer;
}

.topButton > p {
  margin: 0px;
}

  `;