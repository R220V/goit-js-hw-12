import{a as d,S as u,i as n}from"./assets/vendor-Cy0aPxr6.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const y=r=>`<li class="gallery-card">
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
          </li>`,g=r=>{const s={params:{q:r,key:"48306389-9c3f7e9b102fd2bc2270acf47",image_type:"photo",orientation:"horizontal",safesearch:"true",page:1,per_page:"15"}};return d.get("https://pixabay.com/api/",s)},c=document.querySelector(".js-form-search"),p=document.querySelector(".js-gallery"),i=document.querySelector(".loader");let m=new u(".gallery a",{captionsData:"alt",captionDelay:300});const f=r=>{r.preventDefault();const s=r.currentTarget.elements.user_query.value.trim("");if(s===""){n.error({title:"Error",messageColor:"Purple",color:"red",position:"topRight",message:"Please enter your request",messageSize:"20"});return}i.classList.remove("is-hidden"),g(s).then(l=>{if(l.total===0){n.error({title:"Error",messageColor:"Purple",color:"red",position:"topRight",messageSize:"20",message:"Sorry, there are no images. Please try again!"}),p.innerHTML="",c.reset();return}const a=l.hits.map(e=>y(e)).join("");p.innerHTML=a,i.classList.add("is-hidden"),m.refresh()}).catch(l=>{i.style.display="none",console.log(l)}),c.reset()};c.addEventListener("submit",f);
//# sourceMappingURL=index.js.map
