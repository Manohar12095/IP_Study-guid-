(function(){
  var KEY_DONE = 'ip_done_v1';
  var KEY_THEME = 'ip_theme_v1';
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY_DONE) || '{}'); } catch(e){ done = {}; }

  var units = window.UNITS.slice().sort(function(a,b){return a.num-b.num;});
  var flat = [];
  units.forEach(function(u){
    var A = u.questions.filter(function(q){ return q.part === 'A'; });
    var B = u.questions.filter(function(q){ return q.part !== 'A'; });
    var order = { Theory: 0, Program: 1 };
    B.forEach(function(q, i){ q._i = i; });
    B.sort(function(a, b){
      var d = order[a.kind || 'Theory'] - order[b.kind || 'Theory'];
      return d !== 0 ? d : a._i - b._i;
    });
    u.questions = A.concat(B);
    u.questions.forEach(function(q){
      q.unit = u.num; q.unitTitle = u.title;
      q.part = q.part || 'B';
      q.also = (window.ALSO && window.ALSO[q.id]) || q.also || [];
      if(q.part === 'A'){ q.tags = q.qa.map(function(x){ return x.q; }); }
      flat.push(q);
    });
  });
  var countA = flat.filter(function(q){ return q.part === 'A'; }).length;
  var qaTotal = 0;
  flat.forEach(function(q){ if(q.part === 'A'){ qaTotal += q.qa.length; } });

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

  function navLabel(q){
    if(q.part === 'A'){ return 'Part A &middot; ' + q.qa.length + ' questions &middot; 2 marks'; }
    return (q.kind === 'Program' ? '<span class="star">&#9733;</span> ' : '') + q.title;
  }

  /* Adds Copy and Run buttons to code blocks after a page is rendered */
  function enhanceCode(root){
    root.querySelectorAll('pre.code').forEach(function(pre){
      if(pre.parentNode.classList.contains('codewrap')){ return; }
      var src = pre.textContent;
      var wrap = document.createElement('div');
      wrap.className = 'codewrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var bar = document.createElement('div');
      bar.className = 'codebar';
      var copy = document.createElement('button');
      copy.textContent = 'Copy';
      copy.onclick = function(){
        var done = function(){ copy.textContent = 'Copied'; setTimeout(function(){ copy.textContent = 'Copy'; }, 1400); };
        if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(src).then(done, done); }
        else { var ta = document.createElement('textarea'); ta.value = src; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); }catch(e){} document.body.removeChild(ta); done(); }
      };
      bar.appendChild(copy);

      var runnable = /^\s*(<!DOCTYPE html|<html)/i.test(src) &&
        !/<%|<\?php|javax\.|XMLHttpRequest|fetch\(|src="(subs|poster|campus)|<form[^>]*\saction=/i.test(src);
      if(runnable){
        var run = document.createElement('button');
        run.className = 'runbtn';
        run.textContent = '▶ Run';
        var frameBox = null;
        run.onclick = function(){
          if(frameBox){ frameBox.remove(); frameBox = null; run.textContent = '▶ Run'; return; }
          frameBox = document.createElement('div');
          frameBox.className = 'runout';
          var label = document.createElement('div');
          label.className = 'runlabel';
          label.textContent = 'Output';
          var fr = document.createElement('iframe');
          fr.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals');
          fr.srcdoc = src;
          frameBox.appendChild(label);
          frameBox.appendChild(fr);
          wrap.appendChild(frameBox);
          run.textContent = '■ Hide output';
        };
        bar.appendChild(run);
      }
      wrap.insertBefore(bar, pre);
    });
  }

  function buildNav(filter){
    var f = (filter||'').toLowerCase().trim();
    var html = '';
    units.forEach(function(u){
      var items = u.questions.filter(function(q){
        if(!f) return true;
        return (q.title+' '+(q.tags||[]).join(' ')+' '+(q.also||[]).join(' ')).toLowerCase().indexOf(f) !== -1;
      });
      if(!items.length) return;
      html += '<div class="unit-title">Unit '+u.num+' &middot; '+u.title+'</div>';
      items.forEach(function(q){
        html += '<button class="nav-item'+(done[q.id]?' done':'')+(q.part==='A'?' parta':'')+'" data-id="'+q.id+'"><span class="tick">'+(done[q.id]?'&#10003;':'')+'</span><span>'+navLabel(q)+'</span></button>';
      });
    });
    nav.innerHTML = html || '<div class="empty">No matching questions.</div>';
  }

  function buildHome(){
    var cards = units.map(function(u){
      return '<div class="unit-card"><h3>Unit '+u.num+'</h3><span class="tag">'+u.title+'</span>'+
        u.questions.map(function(q){
          return q.part === 'A'
            ? '<button class="btnA" data-id="'+q.id+'">Part A: 2 mark questions ('+q.qa.length+')</button>'
            : '<button data-id="'+q.id+'">'+q.title+'</button>';
        }).join('')+'</div>';
    }).join('');
    home.innerHTML =
      '<div class="hero"><h1>CS2301 Internet Programming</h1><p>Complete exam guide: <b>'+qaTotal+' Part A answers (2 marks)</b> and <b>'+(flat.length-countA)+' Part B answers (16 marks)</b> covering Units 1 to 5, with diagrams, tables and full programs. Pick a unit below to start.</p></div>'+
      '<div class="unit-grid">'+cards+'</div>';
  }

  function renderQA(q){
    return '<div class="block">'+q.qa.map(function(x,i){
      return '<details class="qa" open><summary><span class="qn">'+(i+1)+'</span><span>'+x.q+'</span></summary><div class="ans">'+x.a+'</div></details>';
    }).join('')+'</div>';
  }

  function show(id){
    var idx = flat.findIndex(function(q){return q.id===id;});
    if(idx<0){ showHome(); return; }
    var q = flat[idx];
    var prev = flat[idx-1], next = flat[idx+1];
    var isA = q.part === 'A';
    var title = isA ? 'Part A &ndash; Two Mark Questions' : q.title;
    var also = (q.also && q.also.length)
      ? '<div class="also"><b>This answer covers these question bank items:</b><ul>'+q.also.map(function(a){return '<li>'+a+'</li>';}).join('')+'</ul></div>' : '';
    var body = isA
      ? renderQA(q)
      : (q.intro ? '<div class="block">'+q.intro+'</div>' : '') + q.sections.join('') + (q.rapid ? rapid(q.rapid) : '');
    var label = isA ? 'Part A &middot; 2 Marks each' : '16 Marks';
    var kindChip = (!isA && q.kind === 'Program') ? '<span class="chip chipStar">&#9733; Program &middot; Most important</span>' : (!isA ? '<span class="chip">Theory</span>' : '');
    qEl.innerHTML =
      '<div class="crumb">Unit '+q.unit+' &rsaquo; '+q.unitTitle+'</div>'+
      '<h1 class="q-title">'+title+'</h1>'+
      '<div class="q-meta"><span class="chip'+(isA?' chipA':'')+'">'+label+'</span>'+kindChip+'<span class="chip">Item '+(idx+1)+' of '+flat.length+'</span></div>'+
      also+
      '<div class="q-actions"><button class="btn '+(done[q.id]?'done':'primary')+'" id="doneBtn">'+(done[q.id]?'&#10003; Completed':'Mark as completed')+'</button><button class="btn" id="printBtn">Print / Save PDF</button></div>'+
      body+
      '<div class="pager">'+(prev?'<button class="btn" data-id="'+prev.id+'">&larr; '+(prev.part==='A'?'Part A (Unit '+prev.unit+')':prev.title)+'</button>':'<span></span>')+(next?'<button class="btn primary" data-id="'+next.id+'">'+(next.part==='A'?'Part A (Unit '+next.unit+')':next.title)+' &rarr;</button>':'<span></span>')+'</div>';
    home.classList.add('hidden');
    qEl.classList.remove('hidden');
    enhanceCode(qEl);
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
