import{a as f,S as h,i as p}from"./assets/vendor-B6jJ9_I0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const u=r=>`<li class="gallery-card">
              <section class="card">
              <a class="gallery-link" href="${r.largeImageURL}" target="_blank" rel="noopener noreferrer">
                <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
              </a>
              <div class="gallery-container">
                <div class="gallery-item">
                  <p class="gallery-title">Likes</p>
                  <p class="gallery-count">${r.likes}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Views</p>
                  <p class="gallery-count">${r.views}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Comments</p>
                  <p class="gallery-count">${r.comments}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Downloads</p>
                  <p class="gallery-count">${r.downloads}</p>
                </div>
              </div>
            </section>
          </li>`,y=(r,e)=>{const a={params:{q:r,key:"48306389-9c3f7e9b102fd2bc2270acf47",image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:15}};return f.get("https://pixabay.com/api/",a)},m=document.querySelector(".js-form-search"),d=document.querySelector(".js-gallery"),v=document.querySelector(".loader"),o=document.querySelector(".load-more-btn");new h(".gallery a",{captionsData:"alt",captionDelay:300});let i=1,c="";const L=async r=>{try{if(r.preventDefault(),v.style.display="none",c=r.currentTarget.elements.user_query.value.trim(""),c===""){p.error({title:"",messageColor:"Purple",color:"red",position:"topRight",message:"Please enter your request",messageSize:"20"});return}i=1,o.classList.add("hidden");const{data:e}=await y(c,i);if(e.total===0){p.error({title:"",messageColor:"Purple",color:"red",position:"topRight",messageSize:"20",message:"Sorry, there are no images. Please try again!"}),d.innerHTML="",m.reset();return}if(e.totalHits>1){o.classList.remove("hidden"),o.addEventListener("click".onLoadMoreBtnClick);const a=e.hits.map(l=>u(l)).join("");d.innerHTML=a,o.classList.remove("hidden"),o.addEventListener("click",g)}}catch(e){console.log(e)}};m.addEventListener("submit",L);const g=async r=>{try{i++;const{data:e}=await y(c,i),a=e.hits.map(l=>u(l)).join("");d.insertAdjacentHTML("beforeend",a),i===e.totalHits&&(loadMoreBtnEl.classList.add("is-hidden"),loadMoreBtnEl.removeEventListener("click",g))}catch(e){console.log(e)}};
//# sourceMappingURL=index.js.map
