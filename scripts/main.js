(function () {
  'use strict';

  const doc = document.documentElement;

  function find(name) { return document.getElementsByClassName(name)[0]; }
	function findAll(name) { return document.getElementsByClassName(name); }
	function getScroll() { return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0); }
	function setScroll(v) { console.log(v); window.scrollTo(0, v); }

  const works = find('works');
  const portfolios = findAll('portfolio');
  const content = find('content');
  const footer = find('footer');
  let was = getScroll();

  function view(id) {
    let work = works.getElementsByClassName("work-" + id);
    if (work.length > 0) {
      was = getScroll();
      work[0].style.display = "block";
      works.style.top = Math.max(0, was - content.offsetTop) + "px";
      works.style.transform = "translateX(0)";
      location.hash = '#' + id;

      window.setTimeout(function () {
        works.style.top = "0px";
        for(let i = 0; i < portfolios.length; i++) {
          portfolios[i].style.display = "none";
        }
        footer.style.display = "none";
      }, 400);
    } else {
      works.style.top = Math.max(0, was - content.offsetTop) + "px";

      for(let i = 0; i < portfolios.length; i++) {
        portfolios[i].style.display = "block";
      }
      footer.style.display = "block";
      works.style.transform = "translateX(100%)";
      location.hash = '';

      setScroll(was);
      window.setTimeout(function () {
        let allWork = findAll("work");
        for(let i = 0; i < allWork.length; i++) {
          allWork[i].style.display = "none";
        }
      }, 400);
    }
  }

  function resolveHash() {
    console.log('RESOLVE');
    view(location.hash.slice(1));
  }

  resolveHash();
  window.addEventListener("hashchange", resolveHash, false);

})();
