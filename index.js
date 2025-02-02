import{a as g,S as y,i as d}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const b="48306389-9c3f7e9b102fd2bc2270acf47",L="https://pixabay.com/api/";function f(s,t){const o={params:{key:b,page:t,per_page:15,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}};return g.get(`${L}`,o)}function p(s){return s.map(({webformatURL:t,largeImageURL:o,tags:n,likes:e,views:r,comments:a,downloads:h})=>`<li class="gallery-item">
  <article class="card">
    <a class="gallery-link" href="${o}"
      ><img class="gallery-img" src="${t}" alt="${n}"
    /></a>
    <ul class="info-list">
      <li class="info-item">
        <h2 class="info-subtitle">Likes:</h2>
        <p class="info-text">${e}</p>
      </li>
      <li class="info-item">
        <h2 class="info-subtitle">Views:</h2>
        <p class="info-text">${r}</p>
      </li>
      <li class="info-item">
        <h2 class="info-subtitle">Comments:</h2>
        <p class="info-text">${a}</p>
      </li>
      <li class="info-item">
        <h2 class="info-subtitle">Downloads:</h2>
        <p class="info-text">${h}</p>
      </li>
    </ul>
  </article>
</li>`).join("")}const S=document.querySelector(".form-search"),u=document.querySelector(".gallery"),m=document.querySelector(".loader"),l=document.querySelector(".button-load");let i=1,c="";m.style.display="none";l.classList.add("is-hidden");const P=new y(".gallery a",{captions:!0,captionsData:"alt",captionsPosition:"bottom",captionsDelay:500}),q=async s=>{try{if(s.preventDefault(),c=s.target.query.value.trim(),u.innerHTML="",!c){d.error({title:"Error",messageColor:"Purple",color:"red",position:"topRight",message:"Please enter your request",messageSize:"20"});return}i=1,l.classList.add("is-hidden");const{data:t}=await f(c,i);if(t.hits.length===0){d.error({title:"",messageColor:"Purple",color:"red",position:"topRight",messageSize:"20",message:"Sorry, there are no images. Please try again!"});return}u.insertAdjacentHTML("beforeend",p(t.hits)),t.totalHits>i*15&&l.classList.remove("is-hidden"),P.refresh(),s.preventDefault()}catch(t){console.error(t.message)}finally{m.style.display="none"}s.target.reset()};S.addEventListener("submit",q);const w=async()=>{try{i++;const{data:s}=await f(c,i);if(u.insertAdjacentHTML("beforeend",p(s.hits)),i*15>=s.totalHits||s.hits.length===0){d.info({title:"Info",messageColor:"teal",color:"blue",position:"topRight",messageSize:"20",message:"We're sorry, but you've reached the end of search results."}),l.classList.add("is-hidden");return}const t=document.querySelector(".gallery-item");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}catch{d.error({title:"Error",position:"topRight",message:"Please try again later."})}};l.addEventListener("click",w);
//# sourceMappingURL=index.js.map
