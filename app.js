(function(){
  var KEY_DONE = 'ip_done_v1';
  var KEY_THEME = 'ip_theme_v1';
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY_DONE) || '{}'); } catch(e){ done = {}; }

  var units = window.UNITS.slice().sort(function(a,b){return a.num-b.num;});
  var flat = [];
  units.forEach(function(u){ u.questions.forEach(function(q){ q.unit=u.num; q.unitTitle=u.title; flat.push(q); }); });

  var $ = function(id){ return document.getElementById(id); };
  var nav=$('nav'), home=$('home'), qEl=$('question'), sidebar=$('sidebar'), overlay=$('overlay');

  function saveDone(){ try{ localStorage.setItem(KEY_DONE, JSON.stringify(done)); }catch(e){} }
  function doneCount(){ return flat.filter(function(q){return done[q.id];}).length; }

  function updateProgress(){
    var n = doneCount();
    $('doneCount').textContent = n;
    $('totalCount').textContent = flat.length;
    $('progressBar').style.width = (flat.length ? n*100/flat.length : 0) + '%';
  }

  function buildNav(filter){
    var f = (filter||'').toLowerCase().trim();
    var html = '';
    units.forEach(function(u){
      var items = u.questions.filter(function(q){
        if(!f) return true;
        return (q.title+' '+(q.tags||[]).join(' ')).toLowerCase().indexOf(f) !== -1;
      });
      if(!items.length) return;
      html += '<div class="unit-title">Unit '+u.num+' &middot; '+u.title+'</div>';
      items.forEach(function(q){
        html += '<button class="nav-item'+(done[q.id]?' done':'')+'" data-id="'+q.id+'"><span class="tick">'+(done[q.id]?'&#10003;':'')+'</span><span>'+q.title+'</span></button>';
      });
    });
    nav.innerHTML = html || '<div class="empty">No matching questions.</div>';
  }

  function buildHome(){
    var cards = units.map(function(u){
      return '<div class="unit-card"><h3>Unit '+u.num+'</h3><span class="tag">'+u.title+' &middot; '+u.questions.length+' questions</span>'+
        u.questions.map(function(q){return '<button data-id="'+q.id+'">'+q.title+'</button>';}).join('')+'</div>';
    }).join('');
    home.innerHTML =
      '<div class="hero"><h1>Internet Programming</h1><p>All '+flat.length+' important questions from Units 1 to 5, written as complete 16 mark answers with definitions, diagrams, tables and code. Pick a question to start.</p></div>'+
      '<div class="unit-grid">'+cards+'</div>';
  }

  function show(id){
    var idx = flat.findIndex(function(q){return q.id===id;});
    if(idx<0){ showHome(); return; }
    var q = flat[idx];
    var prev = flat[idx-1], next = flat[idx+1];
    var body = (q.intro ? '<div class="block">'+q.intro+'</div>' : '') + q.sections.join('') + (q.rapid ? rapid(q.rapid) : '');
    qEl.innerHTML =
      '<div class="crumb">Unit '+q.unit+' &rsaquo; '+q.unitTitle+'</div>'+
      '<h1 class="q-title">'+q.title+'</h1>'+
      '<div class="q-meta"><span class="chip">16 Marks</span><span class="chip">Question '+(idx+1)+' of '+flat.length+'</span></div>'+
      '<div class="q-actions"><button class="btn '+(done[q.id]?'done':'primary')+'" id="doneBtn">'+(done[q.id]?'&#10003; Completed':'Mark as completed')+'</button><button class="btn" id="printBtn">Print / Save PDF</button></div>'+
      body+
      '<div class="pager">'+(prev?'<button class="btn" data-id="'+prev.id+'">&larr; '+prev.title+'</button>':'<span></span>')+(next?'<button class="btn primary" data-id="'+next.id+'">'+next.title+' &rarr;</button>':'<span></span>')+'</div>';
    home.classList.add('hidden');
    qEl.classList.remove('hidden');
    window.scrollTo(0,0);
    document.querySelectorAll('.nav-item').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-id')===id); });
    $('doneBtn').onclick = function(){ done[q.id] = !done[q.id]; saveDone(); updateProgress(); buildNav($('search').value); show(id); };
    $('printBtn').onclick = function(){ window.print(); };
    closeMenu();
    if(location.hash !== '#'+id){ history.replaceState(null,'','#'+id); }
  }

  function showHome(){
    qEl.classList.add('hidden');
    home.classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(function(b){ b.classList.remove('active'); });
    history.replaceState(null,'',location.pathname);
    window.scrollTo(0,0);
  }

  function openMenu(){ sidebar.classList.add('open'); overlay.classList.remove('hidden'); }
  function closeMenu(){ sidebar.classList.remove('open'); overlay.classList.add('hidden'); }

  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-id]');
    if(t){ show(t.getAttribute('data-id')); }
  });
  $('menuBtn').onclick = function(){ sidebar.classList.contains('open') ? closeMenu() : openMenu(); };
  overlay.onclick = closeMenu;
  document.querySelector('.brand').onclick = showHome;
  $('search').addEventListener('input', function(){ buildNav(this.value); });
  $('resetBtn').onclick = function(){
    if(confirm('Reset all completed marks?')){ done = {}; saveDone(); updateProgress(); buildNav($('search').value); if(!qEl.classList.contains('hidden')){ show(location.hash.slice(1)); } }
  };

  function applyTheme(t){ document.documentElement.setAttribute('data-theme', t); }
  var savedTheme = null;
  try { savedTheme = localStorage.getItem(KEY_THEME); } catch(e){}
  if(!savedTheme){ savedTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'; }
  applyTheme(savedTheme);
  $('themeBtn').onclick = function(){
    var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(t);
    try{ localStorage.setItem(KEY_THEME, t); }catch(e){}
  };

  window.addEventListener('hashchange', function(){ var id = location.hash.slice(1); if(id) show(id); });

  buildNav(); buildHome(); updateProgress();
  if(location.hash.length>1){ show(location.hash.slice(1)); }
})();
