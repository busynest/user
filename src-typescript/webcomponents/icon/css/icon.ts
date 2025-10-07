import { css } from 'lit';

export const iconStyles = css`

  :host {
    margin:                   auto;
    display:                  grid;
  }

  /* Shared Styles */
  .icon, .login {
    cursor:                   pointer;
    margin:                   auto;
    overflow:                 hidden;
    border:                   var(--pwa_icon_border, 2px solid black);
    background-color:         var(--pwa_icon_background, #6cc04a);
    color:                    white;
    font-size:                15px;
    text-decoration:          none;
    transition-duration:      2s; 
  }

  /* Hover Styles */
  .icon:hover,
  .login:hover {
    background-color:         var(--pwa_icon_hover, lightgrey);
  }

  /* Logged-in State: The Icon Button */
  .icon {
    height:                   var(--pwa_icon_diameter, 32px);
    width:                    var(--pwa_icon_diameter, 32px);
    border-radius:            50%;
    padding:                  0;
  }

  /* The Login Button */
  .login {
    width:                    auto;
    border-radius:            var(--pwa_icon_radius, 6px);
    height:                   var(--pwa_icon_height, 32px);
    padding:                  var(--pwa_icon_padding, 0px 16px);
    font-family:              var(--pwa_icon_font, 'Arial', sans-serif);
    font-weight:              500;
    text-align:               center;
  }

  /* Icon Artwork */
  .userImage {
    object-fit:               cover; 
    transition-property:      all;
    transition-duration:      2s;
    clip-path:                circle(50%);
    overflow:                 hidden;
    width:                    calc(var(--pwa_icon_diameter, 32px) - 2px);
    height:                   calc(var(--pwa_icon_diameter, 32px) - 2px);
    margin:                   auto;
  }  
  
`;