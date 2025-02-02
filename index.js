import{a as h,S as L,i as d}from"./assets/vendor-B6jJ9_I0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function u(s){return s.map(({webformatURL:e,largeImageURL:o,tags:a,likes:t,views:r,comments:i,downloads:f})=>`<li class="gallery-card">
              <section class="card">
              <a class="gallery-link" href="${o}" target="_blank" rel="noopener noreferrer">
                <img class="gallery-img" src="${e}" alt="${a}" />
              </a>
              <div class="gallery-container">
                <div class="gallery-item">
                  <p class="gallery-title">Likes</p>
                  <p class="gallery-count">${t}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Views</p>
                  <p class="gallery-count">${r}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Comments</p>
                  <p class="gallery-count">${i}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Downloads</p>
                  <p class="gallery-count">${f}</p>
                </div>
              </div>
            </section>
          </li>`).join("")}function y(s,e){const o={params:{q:s,key:"48306389-9c3f7e9b102fd2bc2270acf47",image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:15}};return h.get("https://pixabay.com/api/",o)}const b=document.querySelector(".js-form-search"),g=document.querySelector(".js-gallery"),p=document.querySelector(".loader"),n=document.querySelector(".load-more-btn");let m=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:500}),l=1,c="";p.style.display="none";n.classList.add("is-hidden");const v=async s=>{s.preventDefault();try{if(c=s.target.elements.query.value.trim(),g.innerHTML="",!c){d.error({title:"",messageColor:"Purple",color:"red",position:"topRight",message:"Please enter your request",messageSize:"20"});return}p.style.display="inline-block",l=1,n.classList.add("is-hidden");const{data:e}=await y(c,l);if(!e.hits||e.hits.length===0){d.show({title:"",messageColor:"Purple",color:"red",position:"topRight",messageSize:"20",message:"Sorry, there are no images. Please try again!"});return}g.insertAdjacentHTML("beforeend",u(e.hits)),e.totalHits>l*15&&n.classList.remove("is-hidden"),m.refresh()}catch(e){console.error(e.message)}finally{p.style.display="none",s&&s.target&&s.target.reset()}};b.addEventListener("submit",v);const S=async s=>{s.preventDefault();try{l++;const{data:e}=await y(c,l);if(g.insertAdjacentHTML("beforeend",u(e.hits)),!e.hits||l*15>=e.totalHits||e.hits.length===0){d.info({title:"Info",messageColor:"teal",color:"blue",position:"topRight",messageSize:"20",message:"We're sorry, but you've reached the end of search results."}),n.classList.add("is-hidden");return}m.refresh();const o=document.querySelector(".gallery-item");if(o){const a=o.getBoundingClientRect().height;window.scrollBy({top:a*2+600,behavior:"smooth"})}}catch{d.error({title:"Error",position:"topRight",message:"Please try again later."})}};n.addEventListener("click",S);
//# sourceMappingURL=index.js.map
