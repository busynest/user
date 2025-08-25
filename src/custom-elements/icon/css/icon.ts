import { css } from 'lit';

export const iconStyles = css`

  /* Animation background-color, transform, width, height, clip-path */
  .icon, .login {
    transition-property:      width, border-radius;
    transition-duration:      2s;
  }

  /* Shared Styles */
  .icon, .login {
    height:                   40px;
    cursor:                   pointer;
    margin:                   auto;
    overflow:                 hidden;
    border:                   2px solid black;
    background-color:         green;
    color:                    white;
    font-size:                15px;
    text-decoration:          none;
  }

  /* Hover Styles */
  .icon:hover, .login:hover { background-color: lightgrey; }

  /* The Icon Button */
  .icon {
    width:                    40px;

    border-radius:            50%;

    padding:                  0;
  }

  /* The Login Button */
  .login {
    width:                  80px;

    border-radius:          6px;

    padding:                10px 20px;
  }
 
  /* Icon Artwork Wrapper */
  .iconArea {
    border-radius:          50%;
    overflow:               hidden;
    width:                  38px;
    height:                 38px;
    margin:                 auto;
  }

  /* Icon Artwork */
  .userImage {
    object-fit:             cover; 
    transition-property:    all;
    transition-duration:    2s;
    clip-path:              circle(50%);
    margin:                 auto;
  }  
  
`;



  /*


  svg{ margin:auto;}

    display:          block;
    background:       #fff;
    background-color, transform, width, height, clip-path
    clip-path:        circle(50%);
    transition: background-color 5s;
  */