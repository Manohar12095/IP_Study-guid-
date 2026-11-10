/* Helper functions used by the unit files to build answer content. */
window.UNITS = window.UNITS || [];

function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function p(t){ return '<p>'+t+'</p>'; }
function ul(items){ return '<ul>'+items.map(function(i){return '<li>'+i+'</li>';}).join('')+'</ul>'; }
function ol(items){ return '<ol>'+items.map(function(i){return '<li>'+i+'</li>';}).join('')+'</ol>'; }
function h3(t){ return '<h3>'+t+'</h3>'; }
function ic(t){ return '<code class="inline">'+esc(t)+'</code>'; }
function code(label, src){
  var l = label ? '<span class="code-label">'+esc(label)+'</span>' : '';
  return l+'<pre class="code"><code>'+esc(src.replace(/^\n/,''))+'</code></pre>';
}
function table(head, rows){
  var h = '<tr>'+head.map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr>';
  var r = rows.map(function(row){return '<tr>'+row.map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';}).join('');
  return '<div class="table-wrap"><table>'+h+r+'</table></div>';
}
function note(t){ return '<div class="note">'+t+'</div>'; }
function tip(t){ return '<div class="note tip">'+t+'</div>'; }
function diagram(svg, caption){
  return '<div class="diagram">'+svg+(caption?'<div class="cap">'+caption+'</div>':'')+'</div>';
}
function section(title, body){ return '<div class="block"><h2>'+title+'</h2>'+body+'</div>'; }
function rapid(items){ return '<div class="block rapid"><h2>Quick revision points</h2>'+ul(items)+'</div>'; }

/* SVG building helpers (use classes bx, bx2, bx3, ln styled in CSS). */
function svgBox(x,y,w,h,label,cls){
  var lines = String(label).split('\n');
  var ty = y + h/2 - (lines.length-1)*8 + 5;
  var t = lines.map(function(L,i){return '<text x="'+(x+w/2)+'" y="'+(ty+i*16)+'" text-anchor="middle" font-size="13">'+esc(L)+'</text>';}).join('');
  return '<rect class="'+(cls||'bx')+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8"/>'+t;
}
function svgArrow(x1,y1,x2,y2,label){
  var id = 'ar'+Math.floor(Math.random()*1e9);
  var s = '<defs><marker id="'+id+'" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8892a6"/></marker></defs>';
  s += '<line class="ln" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" marker-end="url(#'+id+')"/>';
  if(label){ s += '<text x="'+((x1+x2)/2)+'" y="'+((y1+y2)/2-5)+'" text-anchor="middle" font-size="11">'+esc(label)+'</text>'; }
  return s;
}
function svg(w,h,inner){
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" role="img">'+inner+'</svg>';
}

/* Register a unit. Each question: {id,title,marks,tags,intro,sections:[html],rapid:[...]} */
function addUnit(num, title, questions){
  var existing = window.UNITS.filter(function(u){ return u.num === num; })[0];
  if(existing){
    questions.forEach(function(q){ existing.questions.push(q); });
  } else {
    window.UNITS.push({num:num,title:title,questions:questions.slice()});
  }
}
/* Part A (2 mark) page: list of {q, a} */
window.ALSO = window.ALSO || {};
