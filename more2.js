/* PART B additions - Unit 2 */
addUnit(2, 'JavaScript & DOM', [

/* ---------- Built-in objects ---------- */
{
  id: 'u2b1',
  title: 'Built-in Objects in JavaScript',
  tags: ['built-in objects','array','string','math','date','number','boolean','json','regexp','object','window','document'],
  intro:
    p('<b>Built-in (native) objects</b> are objects provided by the JavaScript language itself and are available in every environment without any extra code. They provide ready-made properties and methods for common tasks such as handling text, numbers, dates, collections, mathematics and patterns.'),
  sections: [
    section('1. List of Important Built-in Objects',
      table(['Object','Purpose'],[
        ['Object','Base of all objects; keys/values utility'],
        ['Array','Ordered list of values'],
        ['String','Text handling'],
        ['Number','Numeric values and formatting'],
        ['Boolean','true / false'],
        ['Math','Mathematical constants and functions (static object)'],
        ['Date','Date and time'],
        ['RegExp','Pattern matching'],
        ['JSON','Convert between objects and JSON text'],
        ['Function / Error / Map / Set / Promise','Functions, error handling, collections, async operations']
      ])
    ),
    section('2. String Object',
      table(['Member','Description','Example'],[
        ['length','Number of characters','"Hello".length gives 5'],
        ['charAt(i)','Character at index','"Hello".charAt(1) gives "e"'],
        ['indexOf(s) / lastIndexOf(s)','Position of substring (-1 if absent)','"Hello".indexOf("l") gives 2'],
        ['substring(a,b) / slice(a,b)','Extract part','"Hello".slice(1,3) gives "el"'],
        ['toUpperCase() / toLowerCase()','Change case','"abc".toUpperCase() gives "ABC"'],
        ['trim()','Remove surrounding spaces','"  hi ".trim() gives "hi"'],
        ['replace(a,b)','Replace text','"cat".replace("c","b") gives "bat"'],
        ['split(sep)','Split into array','"a,b,c".split(",")'],
        ['includes(), startsWith(), endsWith()','Search tests','"Hello".includes("ell") gives true'],
        ['concat(), repeat(), padStart()','Join, repeat, pad','"ab".repeat(2) gives "abab"']
      ])
    ),
    section('3. Number and Math Objects',
      table(['Number members','Description'],[
        ['toFixed(n)','Round to n decimals (returns string)'],
        ['toString(base)','Convert to string / other base'],
        ['Number.isInteger(x), isNaN(x)','Type checks'],
        ['parseInt(s), parseFloat(s)','Convert string to number'],
        ['Number.MAX_VALUE, MIN_VALUE','Limits']
      ]) +
      table(['Math members','Description'],[
        ['Math.PI, Math.E','Constants'],
        ['Math.round(), floor(), ceil(), trunc()','Rounding'],
        ['Math.max(), Math.min()','Largest / smallest'],
        ['Math.pow(a,b), Math.sqrt(x), Math.abs(x)','Power, root, absolute'],
        ['Math.random()','Random number from 0 up to but not including 1'],
        ['Math.sin(), cos(), tan(), log()','Trigonometric / logarithmic']
      ])
    ),
    section('4. Array Object',
      table(['Method','Description'],[
        ['push() / pop()','Add / remove at end'],
        ['unshift() / shift()','Add / remove at beginning'],
        ['splice(i, n, ...items)','Add/remove anywhere'],
        ['slice(a,b)','Copy a part'],
        ['concat()','Join arrays'],
        ['indexOf(), includes()','Search'],
        ['sort(), reverse()','Order'],
        ['join(sep)','Array to string'],
        ['forEach(), map(), filter(), reduce()','Iterate and transform'],
        ['find(), some(), every()','Searching / testing']
      ])
    ),
    section('5. Date Object',
      table(['Method','Description'],[
        ['new Date()','Current date and time'],
        ['getFullYear(), getMonth() (0-11), getDate()','Year, month, day of month'],
        ['getDay() (0 = Sunday)','Day of week'],
        ['getHours(), getMinutes(), getSeconds()','Time parts'],
        ['setFullYear(), setDate(), setHours()','Set parts'],
        ['getTime(), Date.now()','Milliseconds since 1 Jan 1970'],
        ['toDateString(), toLocaleString()','Formatted text']
      ])
    ),
    section('6. Other Objects: Boolean, RegExp, JSON',
      ul([
        '<b>Boolean:</b> <code class="inline">Boolean(0)</code> is false; values 0, "", null, undefined, NaN are falsy.',
        '<b>RegExp:</b> <code class="inline">/\\d+/.test("abc123")</code> gives true.',
        '<b>JSON:</b> <code class="inline">JSON.stringify(obj)</code> and <code class="inline">JSON.parse(text)</code>.'
      ])
    ),
    section('7. Example Program',
      code('builtin.html', `
<!DOCTYPE html>
<html>
<body>
<pre id="out"></pre>
<script>
  var out = "";
  function log(t) { out += t + "\\n"; }

  // String
  var s = "  Internet Programming  ";
  log("Trim: '" + s.trim() + "'");
  log("Upper: " + s.trim().toUpperCase());
  log("Length: " + s.trim().length);
  log("Index of 'net': " + s.indexOf("net"));
  log("Replace: " + s.trim().replace("Internet", "Web"));

  // Number & Math
  log("Fixed: " + (22 / 7).toFixed(2));
  log("Max: " + Math.max(4, 9, 2) + ", sqrt(49) = " + Math.sqrt(49));
  log("Random 1-10: " + (Math.floor(Math.random() * 10) + 1));
  log("Round 4.6: " + Math.round(4.6) + ", Floor: " + Math.floor(4.6) + ", Ceil: " + Math.ceil(4.2));

  // Array
  var a = [5, 3, 8, 1];
  a.push(10);  a.sort(function (x, y) { return x - y; });
  log("Sorted: " + a.join(", "));
  log("Doubled: " + a.map(function (n) { return n * 2; }));
  log("Even: " + a.filter(function (n) { return n % 2 === 0; }));
  log("Sum: " + a.reduce(function (t, n) { return t + n; }, 0));

  // Date
  var d = new Date();
  log("Today: " + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear());
  log("Time: " + d.getHours() + ":" + d.getMinutes());

  // JSON
  var obj = { name: "Ravi", age: 20 };
  var txt = JSON.stringify(obj);
  log("JSON text: " + txt);
  log("Parsed name: " + JSON.parse(txt).name);

  document.getElementById("out").textContent = out;
<\/script>
</body>
</html>
`)
    )
  ],
  rapid: [
    'Built-in objects: Object, Array, String, Number, Boolean, Math, Date, RegExp, JSON.',
    'String: length, indexOf, slice, replace, split, toUpperCase. Math: round, floor, max, random, sqrt.',
    'Array: push/pop, shift/unshift, splice, sort, map, filter, reduce. Date: getFullYear, getMonth (0-11), getHours.',
    'JSON.stringify / JSON.parse; Math is static (no new Math()).'
  ]
},

/* ---------- Program: HTML form with regex validation ---------- */
{
  id: 'u2b2',
  kind: 'Program',
  title: 'Program: HTML Form with Validation using JavaScript Regular Expression',
  tags: ['form validation','regular expression','regex','program','registration form','test'],
  intro:
    p('<b>Use case: Student registration form.</b> The form validates name, email, mobile number, date of birth, password (strength), confirm password and PIN code using JavaScript regular expressions. Errors are shown live below each field, and the form is submitted only when all fields are valid.'),
  sections: [
    section('1. Complete Program: validation.html',
      code('validation.html', `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Registration Form Validation</title>
<style>
  body{font-family:Arial,sans-serif;background:#eef2f7;display:flex;justify-content:center;padding:30px}
  form{background:#fff;padding:24px 28px;border-radius:10px;width:360px;box-shadow:0 2px 10px #0003}
  h2{text-align:center;color:#1d3557}
  label{display:block;margin-top:12px;font-weight:bold;font-size:14px}
  input{width:100%;padding:8px;margin-top:4px;border:2px solid #ccc;border-radius:6px;box-sizing:border-box}
  input.ok{border-color:#2b9348} input.bad{border-color:#d62828}
  .msg{font-size:12px;color:#d62828;min-height:16px}
  button{margin-top:16px;width:100%;padding:10px;background:#3b5bdb;color:#fff;border:0;border-radius:6px;font-size:16px;cursor:pointer}
  #success{color:#2b9348;text-align:center;font-weight:bold;margin-top:10px}
</style>
</head>
<body>
<form id="regForm" novalidate>
  <h2>Student Registration</h2>

  <label for="name">Full Name</label>
  <input type="text" id="name" placeholder="Letters and spaces only">
  <div class="msg" id="nameMsg"></div>

  <label for="email">Email</label>
  <input type="text" id="email" placeholder="you@example.com">
  <div class="msg" id="emailMsg"></div>

  <label for="mobile">Mobile Number</label>
  <input type="text" id="mobile" placeholder="10 digit number">
  <div class="msg" id="mobileMsg"></div>

  <label for="dob">Date of Birth (DD/MM/YYYY)</label>
  <input type="text" id="dob" placeholder="25/12/2004">
  <div class="msg" id="dobMsg"></div>

  <label for="pass">Password</label>
  <input type="password" id="pass" placeholder="Strong password">
  <div class="msg" id="passMsg"></div>

  <label for="cpass">Confirm Password</label>
  <input type="password" id="cpass">
  <div class="msg" id="cpassMsg"></div>

  <label for="pin">PIN Code</label>
  <input type="text" id="pin" placeholder="6 digit PIN">
  <div class="msg" id="pinMsg"></div>

  <button type="submit">Register</button>
  <div id="success"></div>
</form>

<script>
  // 1. Rules: regular expression + error message
  var rules = {
    name:   { re: /^[A-Za-z]+(?: [A-Za-z]+)*$/,                       msg: "Only letters and single spaces allowed" },
    email:  { re: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,   msg: "Enter a valid email (name@domain.com)" },
    mobile: { re: /^[6-9][0-9]{9}$/,                                 msg: "10 digits, starting with 6, 7, 8 or 9" },
    dob:    { re: /^(0[1-9]|[12][0-9]|3[01])\\/(0[1-9]|1[0-2])\\/(19|20)\\d{2}$/, msg: "Use format DD/MM/YYYY" },
    pass:   { re: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).{8,}$/,
              msg: "Min 8 chars with upper, lower, digit and special character" },
    pin:    { re: /^[1-9][0-9]{5}$/,                                 msg: "6 digits, cannot start with 0" }
  };

  // 2. Validate one field
  function validateField(id) {
    var input = document.getElementById(id);
    var msg   = document.getElementById(id + "Msg");
    var value = input.value.trim();
    var valid;

    if (id === "cpass") {
      valid = value !== "" && value === document.getElementById("pass").value;
      msg.textContent = valid ? "" : "Passwords do not match";
    } else {
      valid = rules[id].re.test(value);
      msg.textContent = valid ? "" : rules[id].msg;
    }
    input.className = valid ? "ok" : "bad";
    return valid;
  }

  // 3. Live validation on typing / leaving the field
  var ids = ["name", "email", "mobile", "dob", "pass", "cpass", "pin"];
  ids.forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener("input", function () { validateField(id); });
    el.addEventListener("blur",  function () { validateField(id); });
  });

  // 4. Validate everything on submit
  document.getElementById("regForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var allValid = true;
    ids.forEach(function (id) { if (!validateField(id)) allValid = false; });

    document.getElementById("success").textContent =
      allValid ? "Registration successful!" : "";
    if (allValid) { alert("Form submitted successfully"); /* this.submit() to send to the server */ }
  });
<\/script>
</body>
</html>
`)
    ),
    section('2. Regular Expressions Explained',
      table(['Field','Pattern','Explanation'],[
        ['Name','<code class="inline">/^[A-Za-z]+(?: [A-Za-z]+)*$/</code>','Words of letters separated by single spaces'],
        ['Email','<code class="inline">/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/</code>','local part, @, domain, dot, 2+ letter TLD'],
        ['Mobile','<code class="inline">/^[6-9][0-9]{9}$/</code>','First digit 6 to 9, then exactly 9 more digits'],
        ['DOB','<code class="inline">/^(0[1-9]|[12][0-9]|3[01])\\/(0[1-9]|1[0-2])\\/(19|20)\\d{2}$/</code>','Day 01-31, month 01-12, year 1900-2099'],
        ['Password','<code class="inline">/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&amp;#]).{8,}$/</code>','Lookaheads require lower, upper, digit and special; min length 8'],
        ['PIN','<code class="inline">/^[1-9][0-9]{5}$/</code>','Six digits, first not 0']
      ]) +
      note('<code class="inline">^</code> and <code class="inline">$</code> make the pattern match the <b>whole</b> input. Without them, "abc9876543210xyz" would pass a mobile check.')
    ),
    section('3. Working Steps',
      ol([
        'Every field has a rule (regular expression plus error message).',
        '<code class="inline">regex.test(value)</code> returns true if the text matches the pattern.',
        'Events <code class="inline">input</code> and <code class="inline">blur</code> validate while the user types.',
        'On <code class="inline">submit</code>, <code class="inline">preventDefault()</code> stops the form; all fields are re-validated.',
        'Only when every field is valid does the program accept the submission.'
      ]) +
      tip('Client-side validation improves usability but can be bypassed, so always validate again on the server (PHP/Servlet).')
    )
  ],
  rapid: [
    'Use /pattern/.test(value) with ^ and $ anchors for whole-field matching.',
    'Common patterns: mobile ^[6-9]\\d{9}$, PIN ^[1-9]\\d{5}$, email, strong password using lookaheads.',
    'Validate on input/blur events and again on submit; preventDefault() blocks invalid submit.',
    'Always repeat validation on the server.'
  ]
},

/* ---------- Program: DHTML events ---------- */
{
  id: 'u2b3',
  kind: 'Program',
  title: 'Program: DHTML (JavaScript) Demonstrating Various Events',
  tags: ['dhtml','events','onclick','ondblclick','onmouseover','onkeypress','onload','onfocus','onblur','onchange','program'],
  intro:
    p('This DHTML program demonstrates the events <b>onclick, ondblclick, onmouseover, onkeypress, onload, onfocus, onblur and onchange</b>. Each event changes the page dynamically (text, colour, size) and records itself in an event log.'),
  sections: [
    section('1. Complete Program: events.html',
      code('events.html', `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DHTML Events Demo</title>
<style>
  body{font-family:Arial,sans-serif;background:#f4f6fb;padding:20px;transition:background .4s}
  .card{background:#fff;border:1px solid #ccd;border-radius:8px;padding:14px;margin:12px 0;max-width:560px}
  .card h3{margin:0 0 8px;color:#1d3557}
  button{padding:8px 16px;cursor:pointer}
  #hoverBox{width:220px;height:70px;background:#a5d8ff;display:flex;align-items:center;justify-content:center;transition:all .3s}
  input,select{padding:7px;width:90%}
  #log{background:#111;color:#7CFC00;font-family:Consolas,monospace;padding:10px;height:150px;overflow:auto;max-width:560px;border-radius:6px}
</style>
</head>

<!-- onload: runs when the page has finished loading -->
<body onload="pageLoaded()">

  <h2>DHTML Events Demonstration</h2>
  <p id="status">Waiting for page load...</p>

  <div class="card">
    <h3>1. onclick</h3>
    <button onclick="changeBackground()">Change page background</button>
  </div>

  <div class="card">
    <h3>2. ondblclick</h3>
    <p id="dbl" ondblclick="doubleClicked(this)">Double-click this text to enlarge it</p>
  </div>

  <div class="card">
    <h3>3. onmouseover / onmouseout</h3>
    <div id="hoverBox" onmouseover="hoverIn(this)" onmouseout="hoverOut(this)">Hover here</div>
  </div>

  <div class="card">
    <h3>4. onkeypress</h3>
    <input type="text" id="typed" placeholder="Type something..." onkeypress="keyPressed(event)">
    <p>Last key: <b id="keyOut">-</b></p>
  </div>

  <div class="card">
    <h3>5. onfocus / onblur</h3>
    <input type="text" id="nameField" placeholder="Click inside, then click outside"
           onfocus="focused(this)" onblur="blurred(this)">
  </div>

  <div class="card">
    <h3>6. onchange</h3>
    <select id="colorSel" onchange="colorChanged(this)">
      <option value="">-- choose colour --</option>
      <option value="#ffd6d6">Pink</option>
      <option value="#d3f9d8">Green</option>
      <option value="#d0ebff">Blue</option>
    </select>
    <p id="chgOut"></p>
  </div>

  <h3>Event log</h3>
  <div id="log"></div>

<script>
  function log(msg) {
    var l = document.getElementById("log");
    var t = new Date().toLocaleTimeString();
    l.innerHTML += "[" + t + "] " + msg + "<br>";
    l.scrollTop = l.scrollHeight;
  }

  // onload
  function pageLoaded() {
    document.getElementById("status").innerHTML = "<b style='color:green'>Page loaded successfully (onload event)</b>";
    log("onload: page finished loading");
  }

  // onclick
  var colors = ["#fff3bf", "#d3f9d8", "#d0ebff", "#ffd8a8", "#f4f6fb"];
  var ci = 0;
  function changeBackground() {
    document.body.style.backgroundColor = colors[ci++ % colors.length];
    log("onclick: background changed");
  }

  // ondblclick
  function doubleClicked(el) {
    var big = el.style.fontSize === "30px";
    el.style.fontSize = big ? "16px" : "30px";
    el.style.color    = big ? "black" : "crimson";
    log("ondblclick: text size toggled");
  }

  // onmouseover / onmouseout
  function hoverIn(el) {
    el.style.background = "#ffa94d";
    el.style.transform  = "scale(1.1)";
    el.innerHTML = "Mouse is over me!";
    log("onmouseover: pointer entered box");
  }
  function hoverOut(el) {
    el.style.background = "#a5d8ff";
    el.style.transform  = "scale(1)";
    el.innerHTML = "Hover here";
    log("onmouseout: pointer left box");
  }

  // onkeypress
  function keyPressed(e) {
    document.getElementById("keyOut").textContent = e.key;
    log("onkeypress: key '" + e.key + "' pressed");
  }

  // onfocus / onblur
  function focused(el) {
    el.style.backgroundColor = "#fff3bf";
    el.style.border = "2px solid orange";
    log("onfocus: field got focus");
  }
  function blurred(el) {
    el.style.backgroundColor = "";
    el.style.border = "";
    log("onblur: field lost focus (value = '" + el.value + "')");
  }

  // onchange
  function colorChanged(sel) {
    if (sel.value) {
      document.body.style.backgroundColor = sel.value;
      document.getElementById("chgOut").textContent =
        "You selected: " + sel.options[sel.selectedIndex].text;
      log("onchange: selected " + sel.options[sel.selectedIndex].text);
    }
  }
<\/script>
</body>
</html>
`) +
      note('<code class="inline">onkeypress</code> is deprecated in modern browsers (it does not fire for keys like Backspace or arrows). It still works for typing characters and is used here because the question asks for it; <code class="inline">onkeydown</code> / <code class="inline">onkeyup</code> are the recommended replacements.')
    ),
    section('2. Events Used',
      table(['Event','Triggered when','Used on'],[
        ['onload','Page/element finished loading','&lt;body&gt;, &lt;img&gt;'],
        ['onclick','Element is clicked once','Buttons, any element'],
        ['ondblclick','Element is double-clicked','Any element'],
        ['onmouseover','Mouse pointer moves onto an element','Any element'],
        ['onmouseout','Mouse pointer leaves the element','Any element'],
        ['onkeypress','A character key is pressed','Input fields'],
        ['onfocus','Element receives focus (click or Tab)','Form fields'],
        ['onblur','Element loses focus','Form fields'],
        ['onchange','Value changed and committed (on blur/selection)','input, select, textarea']
      ])
    ),
    section('3. How it works',
      ol([
        'Each HTML element has an event attribute that names a JavaScript function.',
        'When the event occurs the browser calls the function and may pass <code class="inline">this</code> (the element) or the <code class="inline">event</code> object.',
        'The function changes the DOM and the <code class="inline">style</code> of elements, so the page updates instantly without reloading.'
      ])
    )
  ],
  rapid: [
    'onload (page ready), onclick, ondblclick, onmouseover/onmouseout, onkeypress, onfocus, onblur, onchange.',
    'Attribute calls a function; pass this or event; change DOM/style dynamically.',
    'onkeypress is deprecated; prefer onkeydown/onkeyup. onchange fires after the value is committed.'
  ]
}

]);
