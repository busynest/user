import { css } from 'lit';
export const iconStyles = css `

  .icon, .login {
    cursor:                   pointer;
    margin:                   auto;
    overflow:                 hidden;
    border:                   var(--pwa_icon_border, 0);
    background-color:         var(--pwa_icon_background_color, #2a6b45);
    color:                    white;
    font-size:                15px;
    text-decoration:          none;
    transition-duration:      0s;
  }

  .icon:hover,
  .login:hover {
    background-color:         var(--pwa_icon_hover_color, #214f34);
  }

  .icon:focus-visible,
  .login:focus-visible {
    outline:                  2px solid var(--pwa_action_border_color, #214f34);
    outline-offset:           2px;
  }

  .icon {
    height:                   var(--pwa_icon_diameter, 44px);
    width:                    var(--pwa_icon_diameter, 44px);
    border-radius:            50%;
    padding:                  0;
  }

  .login {
    width:                    auto;
    border-radius:            var(--pwa_icon_radius, 10px);
    height:                   var(--pwa_icon_height, 44px);
    padding:                  var(--pwa_icon_padding, 0 18px);
    font-family:              var(--pwa_icon_font, "Avenir Next", "Segoe UI", system-ui, sans-serif);
    font-weight:              500;
    text-align:               center;
  }

  .userImage {
    object-fit:               cover; 
    transition-property:      all;
    transition-duration:      2s;
    clip-path:                circle(50%);
    overflow:                 hidden;
    width:                    100%;
    height:                   100%;
    margin:                   auto;
  }  
  
`;
//# sourceMappingURL=icon.js.map