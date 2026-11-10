/* Interações front-end demonstrativas: sem backend, pagamento ou reserva automática. */
(()=>{
  const $ = (sel,root=document)=>root.querySelector(sel);
  const $$ = (sel,root=document)=>[...root.querySelectorAll(sel)];
  const nav=$('.nav-links'),toggle=$('.menu-toggle');
  const closeNav=()=>{nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menu')};
  toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
  $$('.nav-links a').forEach(a=>a.addEventListener('click',closeNav));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeNav();closeModal();}});
  document.addEventListener('click',e=>{if(nav?.classList.contains('is-open')&&!nav.contains(e.target)&&!toggle.contains(e.target))closeNav()});
  const filters=$$('.filter'),dishes=$$('.dish');
  filters.forEach(btn=>btn.addEventListener('click',()=>{const cat=btn.dataset.cat;filters.forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});dishes.forEach(d=>d.hidden=cat!=='todos'&&d.dataset.cat!==cat);const visible=dishes.filter(d=>!d.hidden);$('#menu-status').textContent=`${visible.length} ${visible.length===1?'destaque exibido':'destaques exibidos'}`;}));
  const reveal=$$('.reveal');if('IntersectionObserver' in window){const ob=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');ob.unobserve(en.target)}}),{threshold:.12});reveal.forEach(n=>ob.observe(n));}else reveal.forEach(n=>n.classList.add('in'));
  const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
  const modal=$('#contact-modal');
  function closeModal(){if(modal){modal.classList.remove('is-open');document.body.classList.remove('no-scroll')}}
  $$('[data-modal-open]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();modal?.classList.add('is-open');document.body.classList.add('no-scroll');$('#contact-type')?.focus()}));
  $$('[data-modal-close]').forEach(btn=>btn.addEventListener('click',closeModal));
  modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  $('#contact-submit')?.addEventListener('click',()=>{const val=$('#contact-type').value;const name=document.body.dataset.restaurant;const number=document.body.dataset.number;const hasWa=document.body.dataset.whatsapp==='true';if(hasWa){window.open('https://wa.me/55'+number+'?text='+encodeURIComponent('Olá! Vi a página do '+name+' e gostaria de informações sobre '+val+'.'),'_blank','noopener,noreferrer')}else{window.location.href='tel:+55'+number}closeModal()});
})();
