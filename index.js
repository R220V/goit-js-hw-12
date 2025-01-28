import{a as L,S as v,i as u}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const g=e=>`<li class="gallery-card">
              <section class="card">
              <a class="gallery-link" href="${e.largeImageURL}" target="_blank" rel="noopener noreferrer">
                <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
              </a>
              <div class="gallery-container">
                <div class="gallery-item">
                  <p class="gallery-title">Likes</p>
                  <p class="gallery-count">${e.likes}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Views</p>
                  <p class="gallery-count">${e.views}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Comments</p>
                  <p class="gallery-count">${e.comments}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Downloads</p>
                  <p class="gallery-count">${e.downloads}</p>
                </div>
              </div>
            </section>
          </li>`,y=(e,t)=>{const a={params:{q:e,key:"48306389-9c3f7e9b102fd2bc2270acf47",image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}};return L.get("https://pixabay.com/api/",a)},m=document.querySelector(".js-form-search"),n=document.querySelector(".js-gallery"),c=document.querySelector(".loader"),o=document.querySelector(".load-more-btn");let f=new v(".gallery a",{captionsData:"alt",captionDelay:300}),l=1,d="";const b=async e=>{try{if(e.preventDefault(),d=e.currentTarget.elements.user_query.value.trim(""),d===""){u.error({title:"",messageColor:"Purple",color:"red",position:"topRight",message:"Please enter your request",messageSize:"20"});return}l=1,o.classList.add("hidden"),c.classList.remove("is-hidden");const{data:t}=await y(d,l);if(t.total===0){u.error({title:"",messageColor:"Purple",color:"red",position:"topRight",messageSize:"20",message:"Sorry, there are no images. Please try again!"}),n.innerHTML="",m.reset();return}n.insertAdjacentHTML("beforeend",g(t.hits)),t.total.hits>l*15&&o.classList.remove("hidden"),f.refresh();const a=t.hits.map(i=>g(i)).join("");c.classList.add("is-hidden"),n.innerHTML=a,o.classList.remove("hidden"),o.addEventListener("click",h),c.classList.add("is-hidden"),f.refresh()}catch(t){console.log(t)}finally{c.classList.remove("is-hidden")}};m.reset();m.addEventListener("submit",b);const h=async()=>{await y(d,l);try{l++;const{data:e}=await y(query,l);if(n.insertAdjacentHTML("beforeend",g(e.hits)),l*15>=e.totalHits||e.hits.length===0){u.show({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue"}),o.classList.add("hidden"),o.removeEventListener("click",h);return}const t=document.querySelector(".gallery-item");if(t){const a=t.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}catch{u.error({title:"Error",position:"topRight",message:"The image you requested could not be loaded. Please try again later."})}};o.addEventListener("click",h);
//# sourceMappingURL=index.js.map
