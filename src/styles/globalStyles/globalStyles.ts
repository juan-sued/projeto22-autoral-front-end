import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    background-color:#EEEDF4;
    font-family: 'Josefin Slab', serif;
  
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
  }
/* width */
::-webkit-scrollbar {
  width: 0px;
  -ms-overflow-style: none;
scrollbar-width: none;
overflow-x: hidden;
  overflow-y: hidden;
  display: none;

}
::-webkit-scrollbar-track {
  background: transparent;
 display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
overflow-x: hidden;
overflow-y: hidden;


 
  --purple-bold: rgb(142, 28, 90);

  button{
    border: none;
    font-family: 'Josefin Slab', serif;
    :hover{
      cursor: pointer;
    }
  }

input:focus{
outline: none;
  border: solid 1px rgb(142, 28, 90,0.5);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
}
input:focus{
outline: none;
  border: solid 1px rgb(142, 28, 90,0.5);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
}



strong{
  font-weight: 600;
}
@keyframes fadeSmallBig {
    0% {
      opacity: 0;
      scale: 0;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }
  @keyframes fadeTranslate {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes fadeTranslateXLeft {
    0% {
      opacity: 0;
      transform: translateX(60px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  @keyframes fadeTranslateXRight {
    0% {
      opacity: 0;
      transform: translateX(-60px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @keyframes fadeClicked {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      position: relative;
      display: none;
      transform: translateY(-100px);
    }
  }


 
`;

export default GlobalStyles;
