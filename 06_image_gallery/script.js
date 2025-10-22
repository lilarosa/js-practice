// 🖼️ Image Gallery with Lightbox
// 🇩🇪 Bildergalerie mit Lightbox  ·  🇨🇳 图片库 + 弹窗预览

const images = [
  // 🇬🇧 You can replace with your real URLs/local images under ./img
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1025/600/400",
  "https://picsum.photos/id/1035/600/400",
  "https://picsum.photos/id/1045/600/400",
  "https://picsum.photos/id/1055/600/400",
  "https://picsum.photos/id/1065/600/400",
  "https://picsum.photos/id/1075/600/400",
  "https://picsum.photos/id/1085/600/400"
];

const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");
const lbClose = document.getElementById("lbClose");

let idx = 0;

function renderGrid() {
  grid.innerHTML = images.map((src, i) => `
    <div class="card" data-i="${i}">
      <img src="${src}" alt="thumb ${i+1}"/>
    </div>
  `).join("");
}
renderGrid();

function openLightbox(i){
  idx = i;
  lbImg.src = images[idx];
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden","false");
}
function closeLightbox(){
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden","true");
}
function prev(){ idx = (idx - 1 + images.length) % images.length; lbImg.src = images[idx]; }
function next(){ idx = (idx + 1) % images.length; lbImg.src = images[idx]; }

grid.addEventListener("click",(e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLightbox(Number(card.dataset.i));
});
lbPrev.addEventListener("click", prev);
lbNext.addEventListener("click", next);
lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click",(e)=>{ if(e.target === lightbox) closeLightbox(); });

window.addEventListener("keydown",(e)=>{
  if(lightbox.classList.contains("hidden")) return;
  if(e.key === "ArrowLeft") prev();
  if(e.key === "ArrowRight") next();
  if(e.key === "Escape") closeLightbox();
});
