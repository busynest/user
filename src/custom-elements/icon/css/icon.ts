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
    border:                   var(--pwa_icon_border);
    background-color:         var(--pwa_icon_background);
    color:                    white;
    font-size:                15px;
    text-decoration:          none;
    transition-duration:      2s; 
  }

  /* Hover Styles */
  .icon:hover,
  .login:hover {
    background-color:         var(--pwa_icon_hover);
  }

  /* Logged-in State: The Icon Button */
  .icon {
    height:                   var(--pwa_icon_diameter);
    width:                    var(--pwa_icon_diameter);
    border-radius:            50%;
    padding:                  0;
  }

  /* The Login Button */
  .login {
    width:                    auto;
    border-radius:            var(--pwa_icon_radius);
    height:                   var(--pwa_icon_height);
    line-height:              var(--pwa_icon_height);
    padding:                  var(--pwa_icon_padding);
    font-family:              var(--pwa_icon_font);
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
    width:                    calc(var(--pwa_icon_diameter) - 2px);
    height:                   calc(var(--pwa_icon_diameter) - 2px);
    margin:                   auto;
  }  
  
`;

 /* Icon Artwork Wrapper 
  .iconArea {
    border-radius:            50%;
    overflow:                 hidden;
    width:                    calc(var(--pwa_icon_diameter) - 2px);
    height:                   calc(var(--pwa_icon_diameter) - 2px);
    margin:                   auto;
  }
    */
