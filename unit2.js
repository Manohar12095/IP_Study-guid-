addUnit(2, 'JavaScript & DOM', [

/* ---------- 1. Structure of DOM & Methods ---------- */
{
  id: 'u2q1',
  title: 'Structure of DOM and Methods',
  tags: ['dom','document object model','getElementById','querySelector','createElement','nodes'],
  intro:
    p('The <b>Document Object Model (DOM)</b> is a W3C standard, language-neutral programming interface that represents an HTML/XML document as a <b>tree of objects (nodes)</b>. JavaScript uses the DOM to access, change, add or delete elements, attributes and styles, which makes web pages dynamic.'),
  sections: [
    section('1. DOM Tree Structure',
      p('When a browser loads a page, it parses the HTML and builds a tree. The <code class="inline">document</code> object is the root.') +
      diagram(
        svg(560,300,
          svgBox(220,5,120,36,'document','bx') +
          svgBox(220,65,120,36,'html','bx2') +
          svgBox(110,130,110,36,'head','bx2') + svgBox(340,130,110,36,'body','bx2') +
          svgBox(40,200,100,34,'title','bx3') + svgBox(300,200,80,34,'h1','bx3') + svgBox(400,200,80,34,'p','bx3') +
          svgBox(300,255,80,32,'"Hello"','bx') + svgBox(400,255,80,32,'class="x"','bx') +
          svgArrow(280,41,280,65) + svgArrow(260,101,165,130) + svgArrow(300,101,395,130) +
          svgArrow(150,166,90,200) + svgArrow(380,166,340,200) + svgArrow(410,166,440,200) +
          svgArrow(340,234,340,255) + svgArrow(440,234,440,255)
        ),
        'Figure 1: DOM tree for a simple HTML page (text and attributes are also nodes)') +
      table(['Node type','Description','Example'],[
        ['Document node','Root of the tree','document'],
        ['Element node','HTML tags','&lt;div&gt;, &lt;p&gt;'],
        ['Attribute node','Attributes of elements','id="main"'],
        ['Text node','Text inside an element','"Hello"'],
        ['Comment node','HTML comments','&lt;!-- note --&gt;']
      ]) +
      h3('Relationships between nodes') +
      ul([
        '<b>Parent</b> (parentNode), <b>Child</b> (childNodes, firstChild, lastChild)',
        '<b>Siblings</b> (nextSibling, previousSibling)',
        'Element-only versions: parentElement, children, firstElementChild, nextElementSibling'
      ])
    ),
    section('2. Important DOM Methods and Properties',
      h3('(a) Selecting elements') +
      table(['Method','Returns'],[
        ['<code class="inline">document.getElementById("id")</code>','Single element'],
        ['<code class="inline">document.getElementsByClassName("c")</code>','Live HTMLCollection'],
        ['<code class="inline">document.getElementsByTagName("p")</code>','Live HTMLCollection'],
        ['<code class="inline">document.querySelector("css")</code>','First matching element'],
        ['<code class="inline">document.querySelectorAll("css")</code>','Static NodeList of all matches']
      ]) +
      h3('(b) Changing content and attributes') +
      table(['Member','Use'],[
        ['<code class="inline">innerHTML</code>','Get/set HTML content'],
        ['<code class="inline">textContent</code> / <code class="inline">innerText</code>','Get/set plain text'],
        ['<code class="inline">getAttribute() / setAttribute() / removeAttribute()</code>','Work with attributes'],
        ['<code class="inline">element.style.property</code>','Change inline CSS'],
        ['<code class="inline">classList.add/remove/toggle</code>','Change CSS classes'],
        ['<code class="inline">value</code>','Value of form fields']
      ]) +
      h3('(c) Creating, adding, removing nodes') +
      table(['Method','Use'],[
        ['<code class="inline">createElement("tag")</code>','Create a new element'],
        ['<code class="inline">createTextNode("text")</code>','Create a text node'],
        ['<code class="inline">appendChild(node)</code>','Add as last child'],
        ['<code class="inline">insertBefore(new, ref)</code>','Insert before a child'],
        ['<code class="inline">replaceChild(new, old)</code>','Replace a child'],
        ['<code class="inline">removeChild(node)</code> / <code class="inline">remove()</code>','Delete a node'],
        ['<code class="inline">cloneNode(deep)</code>','Copy a node']
      ])
    ),
    section('3. Example Program',
      code('dom-demo.html', `
<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Original Heading</h1>
  <ul id="list">
    <li>HTML</li>
    <li>CSS</li>
  </ul>
  <input type="text" id="item" placeholder="Add subject">
  <button onclick="addItem()">Add</button>
  <button onclick="changeHeading()">Change Heading</button>
  <button onclick="removeLast()">Remove Last</button>

<script>
  // select & modify
  function changeHeading() {
    var h = document.getElementById("title");
    h.innerHTML = "Heading changed using DOM";
    h.style.color = "crimson";
    h.setAttribute("title", "Modified by JS");
  }

  // create & append
  function addItem() {
    var text = document.getElementById("item").value;
    if (text === "") return;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    document.getElementById("list").appendChild(li);
    document.getElementById("item").value = "";
  }

  // remove
  function removeLast() {
    var list = document.getElementById("list");
    if (list.lastElementChild) list.removeChild(list.lastElementChild);
  }

  // traversal
  var first = document.querySelector("#list").firstElementChild;
  console.log(first.textContent);               // HTML
  console.log(first.nextElementSibling.textContent); // CSS
  console.log(first.parentNode.id);             // list
<\/script>
</body>
</html>
`)
    ),
    section('4. DOM Levels and Advantages',
      ul([
        'Standardised by W3C in levels: DOM Level 1 (core), Level 2 (events, CSS), Level 3 (XPath, load/save).',
        'Platform and language independent.',
        'Allows dynamic update of content, structure and style without reloading the page.',
        'Disadvantage: the entire tree is kept in memory, so very large documents use a lot of memory.'
      ])
    )
  ],
  rapid: [
    'DOM = tree representation of a document; document is the root.',
    'Selecting: getElementById, getElementsByClassName/TagName, querySelector(All).',
    'Modify: innerHTML, textContent, setAttribute, style, classList.',
    'Create/Remove: createElement, appendChild, insertBefore, replaceChild, removeChild.'
  ]
},

/* ---------- 2. JS Event Handling ---------- */
{
  id: 'u2q2',
  title: 'JavaScript Event Handling',
  tags: ['events','addEventListener','onclick','bubbling','capturing','event object','preventDefault'],
  intro:
    p('An <b>event</b> is an action or occurrence detected by the browser, such as a mouse click, key press, form submit or page load. <b>Event handling</b> is the process of writing JavaScript functions (<i>event handlers / listeners</i>) that run when a specific event occurs on an element.'),
  sections: [
    section('1. Event Handling Model',
      diagram(
        svg(560,150,
          svgBox(10,50,120,50,'User action\n(click, key)','bx') +
          svgBox(190,50,120,50,'Browser fires\nEvent','bx2') +
          svgBox(370,50,170,50,'Event handler\nfunction runs','bx3') +
          svgArrow(130,75,190,75) + svgArrow(310,75,370,75)
        ),
        'Figure 1: Event flow from action to handler')
    ),
    section('2. Common Events',
      table(['Category','Events'],[
        ['Mouse','click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, contextmenu'],
        ['Keyboard','keydown, keyup, keypress'],
        ['Form','submit, change, input, focus, blur, reset, select'],
        ['Window / Document','load, DOMContentLoaded, resize, scroll, unload'],
        ['Touch / Drag','touchstart, touchend, dragstart, drop']
      ])
    ),
    section('3. Ways to Attach Event Handlers',
      h3('(a) Inline HTML attribute') +
      code('', `<button onclick="alert('Clicked!')">Click</button>`) +
      h3('(b) DOM property (traditional)') +
      code('', `
var btn = document.getElementById("btn");
btn.onclick = function () { alert("Clicked!"); };
`) +
      p('Only one handler per event can be assigned this way (a new one overwrites the old).') +
      h3('(c) addEventListener() (modern, recommended)') +
      code('', `
btn.addEventListener("click", function (e) {
  console.log("First handler");
});
btn.addEventListener("click", showMsg);   // multiple handlers allowed
function showMsg() { console.log("Second handler"); }

btn.removeEventListener("click", showMsg);
`) +
      p('Syntax: <code class="inline">element.addEventListener(event, function, useCapture)</code>')
    ),
    section('4. The Event Object',
      p('The browser passes an <b>event object</b> to the handler containing details about the event.') +
      table(['Property / Method','Use'],[
        ['<code class="inline">e.type</code>','Event name, e.g. "click"'],
        ['<code class="inline">e.target</code>','Element that triggered the event'],
        ['<code class="inline">e.currentTarget</code>','Element the handler is attached to'],
        ['<code class="inline">e.clientX, e.clientY</code>','Mouse position'],
        ['<code class="inline">e.key, e.code</code>','Key pressed'],
        ['<code class="inline">e.preventDefault()</code>','Stop the default action (e.g. form submit, link navigation)'],
        ['<code class="inline">e.stopPropagation()</code>','Stop the event from bubbling/capturing further']
      ])
    ),
    section('5. Event Propagation (Capturing and Bubbling)',
      p('When an event occurs on an element it travels in three phases:') +
      ol([
        '<b>Capturing phase:</b> from window down to the target element.',
        '<b>Target phase:</b> the event reaches the target.',
        '<b>Bubbling phase:</b> from the target back up to window (default for handlers).'
      ]) +
      diagram(
        svg(420,230,
          svgBox(20,10,380,210,'','bx2') +
          '<text x="30" y="30" font-size="12">div (parent)</text>' +
          svgBox(60,50,300,150,'','bx') +
          '<text x="70" y="70" font-size="12">p (child)</text>' +
          svgBox(110,95,200,70,'button (target)','bx3') +
          '<text x="330" y="40" font-size="11">Capture: down</text>' +
          '<text x="330" y="215" font-size="11">Bubble: up</text>'
        ),
        'Figure 2: Event bubbling moves from button to p to div') +
      p('<b>Event delegation:</b> attaching one listener to a parent and using <code class="inline">e.target</code> to handle events of many children (efficient for dynamic lists).')
    ),
    section('6. Example Program',
      code('events.html', `
<!DOCTYPE html>
<html>
<body>
  <h2 id="msg">Event Handling Demo</h2>
  <button id="btn">Click / Double click me</button>
  <input type="text" id="name" placeholder="Type here">
  <p id="out"></p>
  <form id="f"><input required placeholder="Email"><button>Submit</button></form>
  <ul id="menu"><li>Home</li><li>About</li><li>Contact</li></ul>

<script>
  var btn = document.getElementById("btn");
  var out = document.getElementById("out");

  btn.addEventListener("click", function (e) {
    out.textContent = "Clicked at X=" + e.clientX + ", Y=" + e.clientY;
  });
  btn.addEventListener("dblclick", function () {
    document.body.style.background = "#ffe8a3";
  });
  btn.addEventListener("mouseover", function () { btn.style.color = "red"; });
  btn.addEventListener("mouseout",  function () { btn.style.color = "";    });

  document.getElementById("name").addEventListener("keyup", function (e) {
    out.textContent = "You typed: " + e.target.value;
  });

  document.getElementById("f").addEventListener("submit", function (e) {
    e.preventDefault();                       // stop page reload
    out.textContent = "Form validated and submitted via JS";
  });

  // event delegation
  document.getElementById("menu").addEventListener("click", function (e) {
    if (e.target.tagName === "LI") out.textContent = "Menu: " + e.target.textContent;
  });

  window.addEventListener("load", function () { console.log("Page loaded"); });
<\/script>
</body>
</html>
`)
    )
  ],
  rapid: [
    'Event = user/browser action; handler = function that runs in response.',
    'Three ways: inline attribute, DOM property (onclick), addEventListener (best, allows multiple).',
    'Event object: type, target, clientX/Y, key, preventDefault(), stopPropagation().',
    'Propagation: capturing, target, bubbling. Delegation uses bubbling.'
  ]
},

/* ---------- 3. DHTML application ---------- */
{
  id: 'u2q3',
  title: 'DHTML Application that Dynamically Modifies Size and Colour of a Web Page',
  tags: ['dhtml','dynamic html','style','font size','color','background','program'],
  intro:
    p('<b>DHTML (Dynamic HTML)</b> is not a language but a combination of <b>HTML + CSS + JavaScript + DOM</b> used to create web pages that change their content, appearance and behaviour <i>after</i> the page has loaded, without contacting the server.') +
    diagram(
      svg(520,150,
        svgBox(10,50,100,50,'HTML\n(structure)','bx') + '<text x="125" y="80" font-size="22">+</text>' +
        svgBox(145,50,100,50,'CSS\n(style)','bx') + '<text x="260" y="80" font-size="22">+</text>' +
        svgBox(280,50,100,50,'JavaScript\n(logic)','bx') + '<text x="395" y="80" font-size="22">+</text>' +
        svgBox(415,50,95,50,'DOM\n(access)','bx3')
      ),
      'Figure 1: Components of DHTML'),
  sections: [
    section('1. Principle',
      p('JavaScript reads and changes the DOM and the <code class="inline">style</code> object of elements in response to events (button click, mouse move, slider input). The browser immediately repaints the page.') +
      table(['Task','JavaScript statement'],[
        ['Change font size','<code class="inline">el.style.fontSize = "24px"</code>'],
        ['Change text colour','<code class="inline">el.style.color = "red"</code>'],
        ['Change background','<code class="inline">el.style.backgroundColor = "#ffeb3b"</code>'],
        ['Change width/height','<code class="inline">el.style.width = "400px"</code>'],
        ['Change font family','<code class="inline">el.style.fontFamily = "Georgia"</code>']
      ])
    ),
    section('2. Complete Program: Dynamic Size and Colour Modifier',
      p('The page has controls (buttons, colour pickers, sliders and a dropdown) that modify the size and colour of the text box and the page background at run time.') +
      code('dhtml.html', `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DHTML - Dynamic Size and Colour</title>
<style>
  body { font-family: Arial, sans-serif; background:#ffffff; padding:20px; transition: background .3s; }
  #box { border:2px solid #333; padding:20px; margin:20px 0; width:400px; height:150px;
         font-size:20px; color:#000; background:#e8f0fe; transition: all .3s; overflow:auto; }
  .panel { margin:10px 0; }
  button { padding:6px 12px; margin:2px; cursor:pointer; }
</style>
</head>
<body>
  <h2>Dynamic HTML Demo</h2>

  <div id="box">This is a sample paragraph. Use the controls below to change its size and colour dynamically.</div>

  <div class="panel">
    <b>Font size:</b>
    <button onclick="changeFont(2)">A+</button>
    <button onclick="changeFont(-2)">A-</button>
    <button onclick="resetAll()">Reset</button>
  </div>

  <div class="panel">
    <b>Box width:</b>
    <input type="range" id="w" min="200" max="700" value="400" oninput="setWidth(this.value)">
    <b>Height:</b>
    <input type="range" id="h" min="80" max="400" value="150" oninput="setHeight(this.value)">
  </div>

  <div class="panel">
    <b>Text colour:</b> <input type="color" id="tc" value="#000000" oninput="setTextColor(this.value)">
    <b>Box colour:</b>  <input type="color" id="bc" value="#e8f0fe" oninput="setBoxColor(this.value)">
    <b>Page colour:</b> <input type="color" id="pc" value="#ffffff" oninput="setPageColor(this.value)">
  </div>

  <div class="panel">
    <b>Quick themes:</b>
    <button onclick="theme('#222','#fff','#333')">Dark</button>
    <button onclick="theme('#fffde7','#3e2723','#fff9c4')">Sepia</button>
    <button onclick="theme('#e8f5e9','#1b5e20','#c8e6c9')">Green</button>
  </div>

  <div class="panel">
    <b>Font:</b>
    <select onchange="document.getElementById('box').style.fontFamily = this.value">
      <option>Arial</option><option>Georgia</option><option>Courier New</option><option>Verdana</option>
    </select>
  </div>

  <p id="info"></p>

<script>
  var box  = document.getElementById("box");
  var size = 20;

  function changeFont(delta) {
    size = Math.max(10, Math.min(60, size + delta));
    box.style.fontSize = size + "px";
    show();
  }
  function setWidth(v)      { box.style.width  = v + "px"; show(); }
  function setHeight(v)     { box.style.height = v + "px"; show(); }
  function setTextColor(c)  { box.style.color = c; show(); }
  function setBoxColor(c)   { box.style.backgroundColor = c; show(); }
  function setPageColor(c)  { document.body.style.backgroundColor = c; show(); }

  function theme(page, text, boxc) {
    setPageColor(page); setTextColor(text); setBoxColor(boxc);
    document.getElementById("pc").value = page;
    document.getElementById("tc").value = text;
    document.getElementById("bc").value = boxc;
  }

  function resetAll() {
    size = 20;
    box.style.cssText = "";
    document.body.style.backgroundColor = "#ffffff";
    show();
  }

  function show() {
    document.getElementById("info").innerHTML =
      "Font: " + box.style.fontSize + " | Width: " + box.style.width +
      " | Height: " + box.style.height + " | Colour: " + box.style.color;
  }
<\/script>
</body>
</html>
`)
    ),
    section('3. Explanation of the Program',
      ol([
        '<b>HTML</b> provides the box, buttons, sliders and colour pickers.',
        '<b>CSS</b> gives the initial look; <code class="inline">transition</code> makes changes smooth.',
        '<b>Events</b> (<code class="inline">onclick</code>, <code class="inline">oninput</code>, <code class="inline">onchange</code>) call JavaScript functions.',
        '<b>DOM</b> methods (<code class="inline">getElementById</code>) select elements, and the <code class="inline">style</code> object modifies size and colour instantly.',
        'No page reload or server request is needed. The change happens on the client side.'
      ])
    ),
    section('4. Advantages and Limitations of DHTML',
      table(['Advantages','Limitations'],[
        ['Fast, no server round trip','Depends on browser support and JavaScript being enabled'],
        ['Interactive and attractive pages','Changes are lost on page reload unless stored'],
        ['Reduces server load','Code is visible to users (client side)'],
        ['Animations, menus, drag-and-drop possible','Debugging differences between browsers']
      ])
    )
  ],
  rapid: [
    'DHTML = HTML + CSS + JavaScript + DOM; page changes after loading, on the client.',
    'Use element.style.fontSize / color / backgroundColor / width in event handlers.',
    'Events used: onclick, oninput, onchange. Methods: getElementById.'
  ]
},

/* ---------- 4. JS Regular Expression ---------- */
{
  id: 'u2q4',
  title: 'JavaScript Regular Expressions',
  tags: ['regex','regexp','test','match','replace','pattern','validation'],
  intro:
    p('A <b>Regular Expression (RegExp)</b> is a sequence of characters that defines a <b>search pattern</b>. In JavaScript it is an object used for pattern matching and text manipulation, mainly for <b>form validation</b> (email, phone, password), searching, extracting and replacing text.'),
  sections: [
    section('1. Creating a Regular Expression',
      code('', `
// 1. Literal notation (preferred)
var re1 = /hello/i;

// 2. Constructor
var re2 = new RegExp("hello", "i");
`) +
      p('Syntax: <code class="inline">/pattern/flags</code>')
    ),
    section('2. Flags (Modifiers)',
      table(['Flag','Meaning'],[
        ['i','Case-insensitive'],
        ['g','Global: find all matches, not only the first'],
        ['m','Multiline: ^ and $ match at line boundaries'],
        ['s','Dot also matches newline'],
        ['u','Unicode support'],
        ['y','Sticky: match from lastIndex only']
      ])
    ),
    section('3. Pattern Syntax',
      h3('Character classes') +
      table(['Pattern','Matches'],[
        ['<code class="inline">[abc]</code>','Any one of a, b, c'],
        ['<code class="inline">[^abc]</code>','Any char except a, b, c'],
        ['<code class="inline">[a-z] [A-Z] [0-9]</code>','Ranges'],
        ['<code class="inline">.</code>','Any character except newline'],
        ['<code class="inline">\\d</code> / <code class="inline">\\D</code>','Digit / non-digit'],
        ['<code class="inline">\\w</code> / <code class="inline">\\W</code>','Word char [A-Za-z0-9_] / non-word'],
        ['<code class="inline">\\s</code> / <code class="inline">\\S</code>','Whitespace / non-whitespace']
      ]) +
      h3('Quantifiers') +
      table(['Pattern','Meaning'],[
        ['<code class="inline">*</code>','0 or more'],
        ['<code class="inline">+</code>','1 or more'],
        ['<code class="inline">?</code>','0 or 1 (optional)'],
        ['<code class="inline">{n}</code>','Exactly n'],
        ['<code class="inline">{n,}</code>','n or more'],
        ['<code class="inline">{n,m}</code>','Between n and m']
      ]) +
      h3('Anchors, groups and alternation') +
      table(['Pattern','Meaning'],[
        ['<code class="inline">^</code> / <code class="inline">$</code>','Start / end of string'],
        ['<code class="inline">\\b</code>','Word boundary'],
        ['<code class="inline">( )</code>','Capturing group'],
        ['<code class="inline">(?: )</code>','Non-capturing group'],
        ['<code class="inline">a|b</code>','a or b'],
        ['<code class="inline">(?=...)</code>, <code class="inline">(?!...)</code>','Lookahead (positive, negative)']
      ])
    ),
    section('4. RegExp and String Methods',
      table(['Method','Description','Returns'],[
        ['<code class="inline">regex.test(str)</code>','Checks if the pattern exists','true / false'],
        ['<code class="inline">regex.exec(str)</code>','Finds a match with details (groups, index)','Array or null'],
        ['<code class="inline">str.match(regex)</code>','Gets matches','Array or null'],
        ['<code class="inline">str.matchAll(regex)</code>','All matches with groups (needs g)','Iterator'],
        ['<code class="inline">str.search(regex)</code>','Index of first match','Number (-1 if none)'],
        ['<code class="inline">str.replace(regex, new)</code>','Replace matches','New string'],
        ['<code class="inline">str.split(regex)</code>','Split by pattern','Array']
      ])
    ),
    section('5. Example Program: Form Validation',
      code('regex-validation.html', `
<!DOCTYPE html>
<html>
<head>
<title>Regex Form Validation</title>
<style>
  body{font-family:Arial;padding:20px}
  input{display:block;margin:6px 0;padding:6px;width:280px}
  .ok{color:green} .bad{color:red}
</style>
</head>
<body>
<h2>Registration Form</h2>
<form id="reg">
  <input id="name"  placeholder="Name (letters only)">
  <input id="email" placeholder="Email">
  <input id="phone" placeholder="Mobile (10 digits)">
  <input id="pass"  type="password" placeholder="Password">
  <input id="pin"   placeholder="PIN code (6 digits)">
  <button>Register</button>
</form>
<ul id="result"></ul>

<script>
  var rules = {
    name:  { re: /^[A-Za-z ]{3,30}$/,                         msg: "Name: 3-30 letters" },
    email: { re: /^[\\w.%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,  msg: "Email: valid format needed" },
    phone: { re: /^[6-9]\\d{9}$/,                              msg: "Mobile: 10 digits starting 6-9" },
    pass:  { re: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$/,
             msg: "Password: 8+ chars, upper, lower, digit, symbol" },
    pin:   { re: /^[1-9][0-9]{5}$/,                           msg: "PIN: 6 digits, not starting 0" }
  };

  document.getElementById("reg").addEventListener("submit", function (e) {
    e.preventDefault();
    var list = document.getElementById("result");
    list.innerHTML = "";
    var allOk = true;
    for (var id in rules) {
      var value = document.getElementById(id).value;
      var ok = rules[id].re.test(value);
      if (!ok) allOk = false;
      var li = document.createElement("li");
      li.className = ok ? "ok" : "bad";
      li.textContent = (ok ? "Valid - " : "Invalid - ") + rules[id].msg;
      list.appendChild(li);
    }
    if (allOk) alert("All fields valid!");
  });

  // other useful examples
  var text = "Call 98765 43210 or 91234 56789";
  console.log(text.match(/\\d{5} \\d{5}/g));        // ["98765 43210", "91234 56789"]
  console.log("2026-11-10".replace(/(\\d+)-(\\d+)-(\\d+)/, "$3/$2/$1")); // 10/11/2026
  console.log("a1b22c333".split(/\\d+/));          // ["a","b","c",""]
  console.log(/^hello/i.test("Hello World"));      // true
<\/script>
</body>
</html>
`) +
      note('Inside a JS regex literal a backslash is written as <code class="inline">\\d</code>. The code above is shown exactly as it should be typed in the file.')
    ),
    section('6. Pattern Explanations',
      table(['Pattern','Explanation'],[
        ['<code class="inline">/^[6-9]\\d{9}$/</code>','Starts with 6-9, followed by exactly 9 digits, then end'],
        ['<code class="inline">/^[\\w.%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/</code>','Local part, @, domain, dot, 2+ letter TLD'],
        ['<code class="inline">(?=.*\\d)</code>','Lookahead: must contain at least one digit']
      ])
    )
  ],
  rapid: [
    'RegExp = pattern for matching text. Create using /pattern/flags or new RegExp().',
    'Flags: i (ignore case), g (global), m (multiline).',
    'Classes: \\d \\w \\s [a-z]; quantifiers: * + ? {n,m}; anchors: ^ $.',
    'Methods: test, exec, match, replace, search, split.',
    'Main use: client-side form validation.'
  ]
}

]);
