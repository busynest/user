
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// @ts-check

import { css } from 'lit-element';

export const Settings = css`

#button-wrapper {
    width: 450px;
    text-align: center;
    padding: 0 100px;
    box-sizing: border-box;
    -webkit-transition: .3s all ease .3s;
    transition: .3s all ease .3s;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
}

button {
    width: 100%;
    background: #8e44ad;
    border: none;
    border-radius: 50px;
    padding: 5px 0;
    cursor: pointer;
    -webkit-transition: .3s all ease;
    transition: .3s all ease;
    position: relative;
}

button p {
    color: white;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    max-height: 40px;
    -webkit-transition: .3s all ease;
    transition: .3s all ease;
}

button .fa {
    font-size: 25px;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 50px;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
}

#button-wrapper.clicked button .fill {
    width: 100%;
    -webkit-transition: .3s all ease .3s;
    transition: 2s all ease .6s;
}

#button-wrapper.success button .fa {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transition: .3s all ease .3s;
    transition: .3s all ease .3s;
}

`;