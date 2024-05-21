import{a as w,S as B,i as a}from"./assets/vendor-9a8cfc74.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const E="https://pixabay.com/api/",I="43965450-8f7f6d09b5429fd61500b9928";async function f(t,o=1,s=15){const n=new URLSearchParams({key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o.toString(),per_page:s.toString()}),e=`${E}?${n.toString()}`;return(await w.get(e)).data}const m=document.getElementById("gallery"),h=document.getElementById("loader"),y=document.getElementById("no-results"),g=document.getElementById("load-more");let d;function v(){m.innerHTML=""}function p(){h.classList.remove("is-hidden")}function L(){h.classList.add("is-hidden")}function S(){y.style.display="block"}function P(){y.style.display="none"}function $(){g.style.display="block"}function u(){g.style.display="none"}function b(t){const o=t.map(s=>`
    <a class="gallery-item" href="${s.largeImageURL}">
      <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy">
      <div class="info">
        <p>Likes: ${s.likes}</p>
        <p>Views: ${s.views}</p>
        <p>Comments: ${s.comments}</p>
        <p>Downloads: ${s.downloads}</p>
      </div>
    </a>
  `).join("");m.insertAdjacentHTML("beforeend",o),d?d.refresh():d=new B(".gallery-item")}function R(){const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}let l=1,i="";const M=document.getElementById("search-form"),O=document.getElementById("load-more"),N=document.getElementById("search-input");M.addEventListener("submit",async t=>{if(t.preventDefault(),i=N.value.trim(),i===""){a.error({title:"Error",message:"Search query cannot be empty!"});return}l=1,v(),P(),p(),u();try{const o=await f(i,l);o.hits.length===0?S():(b(o.hits),o.hits.length===15&&$())}catch{a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{L()}});O.addEventListener("click",async()=>{l+=1,p();try{const t=await f(i,l);t.hits.length===0?(u(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):(b(t.hits),R(),t.hits.length<15&&u())}catch{a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{L()}});
//# sourceMappingURL=commonHelpers.js.map