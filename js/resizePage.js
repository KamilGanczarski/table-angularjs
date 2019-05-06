/**
 * Page must have three main section: header, main and footer
 */

 let heightPage = 0;

window.onload = () => {
  resizeHeight();
  document.getElementsByTagName("body")[0].onresize = resizeHeight;
};

function resizeHeight() {
  heightPage = window.innerHeight;
  heightPage -= document.getElementsByTagName("header")[0].clientHeight;
  heightPage -= document.getElementsByTagName("footer")[0].clientHeight;
  document.getElementsByTagName("main")[0].style.minHeight = heightPage+'px';
}
