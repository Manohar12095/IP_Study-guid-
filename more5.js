/* Unit 5 - additional Part B answers (XML, JSON, AJAX, XSL programs) */
addUnit(5, 'AJAX & XML', [

/* ---------- XML structure and components ---------- */
{
  id: 'u5b1',
  title: 'XML Structure and its Components',
  tags: ['xml structure','prolog','root element','attributes','cdata','namespace','well-formed','dom parser','sax parser','processing instruction'],
  intro:
    p('<b>XML (eXtensible Markup Language)</b> is a W3C standard markup language used to <b>store, structure and transport data</b>. Tags are defined by the author, so XML is self-describing, platform independent and both human and machine readable. An XML document is organised as a <b>tree</b> with one root element.'),
  sections: [
    section('1. Structure of an XML Document',
      diagram(
        svg(600,300,
          svgBox(10,10,220,34,'1. Prolog (XML declaration)','bx') +
          svgBox(10,52,220,34,'2. Comments / Processing instr.','bx2') +
          svgBox(10,94,220,34,'3. DOCTYPE (optional DTD)','bx2') +
          svgBox(10,136,220,150,'','bx3') +
          '<text x="120" y="156" text-anchor="middle" font-size="13" font-weight="bold">4. Root element</text>' +
          svgBox(30,168,180,34,'child element(s)','bx') +
          svgBox(30,208,180,34,'attributes, text, CDATA','bx') +
          svgBox(30,248,180,28,'nested elements','bx') +
          '<text x="260" y="30" font-size="12">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</text>' +
          '<text x="260" y="72" font-size="12">&lt;!-- comment --&gt;  &lt;?xml-stylesheet ...?&gt;</text>' +
          '<text x="260" y="114" font-size="12">&lt;!DOCTYPE college SYSTEM "college.dtd"&gt;</text>' +
          '<text x="260" y="160" font-size="12">&lt;college&gt; ... &lt;/college&gt;</text>'
        ),
        'Figure 1: Parts of an XML document') +
      code('college.xml', `
<?xml version="1.0" encoding="UTF-8"?>
<!-- Student list of CSE department -->
<?xml-stylesheet type="text/css" href="college.css"?>
<college name="Kamaraj College" xmlns:dept="http://example.com/dept">
  <dept:name>CSE</dept:name>
  <student id="101" status="active">
    <name>Manohar</name>
    <marks subject="PHP">88</marks>
    <remarks><![CDATA[Top scorer & class <leader>]]></remarks>
  </student>
  <student id="102" status="active">
    <name>Ravi</name>
    <marks subject="PHP">74</marks>
    <remarks/>
  </student>
</college>
`)
    ),
    section('2. Components of XML',
      table(['Component','Description','Example'],[
        ['XML declaration (prolog)','First line; gives version and encoding. Optional but recommended.','<code class="inline">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</code>'],
        ['Root element','Exactly one top-level element that contains all others.','<code class="inline">&lt;college&gt;...&lt;/college&gt;</code>'],
        ['Element','Start tag + content + end tag; can be nested.','<code class="inline">&lt;name&gt;Ravi&lt;/name&gt;</code>'],
        ['Empty element','No content; self-closing.','<code class="inline">&lt;remarks/&gt;</code>'],
        ['Attribute','Name="value" pair inside the start tag; value must be quoted.','<code class="inline">id="101"</code>'],
        ['Text (character data)','Content inside an element.','Manohar'],
        ['Comment','Ignored by the parser.','<code class="inline">&lt;!-- note --&gt;</code>'],
        ['CDATA section','Text that the parser should not interpret as markup.','<code class="inline">&lt;![CDATA[ a &lt; b ]]&gt;</code>'],
        ['Processing instruction','Instruction for an application, e.g. attach a stylesheet.','<code class="inline">&lt;?xml-stylesheet href="a.xsl"?&gt;</code>'],
        ['Entity reference','Escapes special characters.','<code class="inline">&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;apos;</code>'],
        ['Namespace','Avoids name conflicts using a prefix and URI.','<code class="inline">xmlns:dept="http://..."</code>'],
        ['DOCTYPE / Schema','Defines the legal structure (DTD or XSD).','<code class="inline">&lt;!DOCTYPE college SYSTEM "c.dtd"&gt;</code>']
      ])
    ),
    section('3. XML Tree Representation',
      diagram(
        svg(560,230,
          svgBox(215,5,130,34,'college','bx') +
          svgBox(60,80,130,34,'student id=101','bx2') + svgBox(370,80,130,34,'student id=102','bx2') +
          svgBox(10,160,80,32,'name','bx3') + svgBox(100,160,80,32,'marks','bx3') + svgBox(190,160,80,32,'remarks','bx3') +
          svgBox(320,160,80,32,'name','bx3') + svgBox(410,160,80,32,'marks','bx3') +
          svgArrow(250,39,125,80) + svgArrow(310,39,435,80) +
          svgArrow(110,114,50,160) + svgArrow(125,114,140,160) + svgArrow(140,114,230,160) +
          svgArrow(420,114,360,160) + svgArrow(450,114,450,160)
        ),
        'Figure 2: The example document as a tree (parents and children)')
    ),
    section('4. Rules of Well-formed XML',
      ol([
        'Exactly <b>one root element</b>.',
        'Every start tag has a matching <b>end tag</b> (or is self-closing).',
        'Tags are <b>case sensitive</b>: <code class="inline">&lt;Name&gt;</code> and <code class="inline">&lt;name&gt;</code> differ.',
        'Elements must be <b>properly nested</b>: <code class="inline">&lt;a&gt;&lt;b&gt;&lt;/b&gt;&lt;/a&gt;</code>.',
        'Attribute values must be <b>enclosed in quotes</b>.',
        'Special characters must be escaped using entity references.',
        'Names cannot start with a number or contain spaces.'
      ]) +
      table(['Well-formed','Valid'],[
        ['Follows the XML syntax rules','Well-formed <b>and</b> follows a DTD or XSD'],
        ['Required by every XML parser','Checked by a validating parser']
      ])
    ),
    section('5. XML Parsers',
      table(['Feature','DOM parser','SAX parser'],[
        ['Full form','Document Object Model','Simple API for XML'],
        ['Approach','Loads the whole document as a tree in memory','Event driven; reads sequentially and fires events (startElement, characters, endElement)'],
        ['Memory','High','Low'],
        ['Access','Random access, can modify the tree','Forward only, read only'],
        ['Speed','Slower for large files','Faster'],
        ['Use','Small files that need editing','Large files that need one pass']
      ])
    ),
    section('6. XML vs HTML',
      table(['XML','HTML'],[
        ['Stores and transports data','Displays data'],
        ['Tags are user defined','Tags are predefined'],
        ['Case sensitive, strict rules','Case insensitive, forgiving'],
        ['Closing tag compulsory','Some tags need no end tag'],
        ['Focus on what the data is','Focus on how the data looks']
      ])
    ),
    section('7. Uses of XML',
      ul([
        'Data exchange between applications (SOAP, RSS and Atom feeds).',
        'Configuration files (web.xml, pom.xml, AndroidManifest.xml).',
        'Document formats (SVG, DOCX, XHTML).',
        'Storing structured data that is validated with a DTD or XSD and transformed with XSLT.'
      ])
    )
  ],
  rapid: [
    'XML document = prolog + (comments, PIs, DOCTYPE) + one root element with nested elements.',
    'Components: declaration, element, attribute, text, comment, CDATA, PI, entity, namespace.',
    'Well-formed = syntax correct; Valid = also follows DTD/XSD.',
    'DOM = tree in memory; SAX = event driven, low memory.'
  ]
},

/* ---------- XML application ---------- */
{
  id: 'u5b2',
  kind: 'Program',
  title: 'Program: XML Application (Document) to Store Information for a Use Case',
  tags: ['xml document','library','books','dtd','css','domparser','xml program','program'],
  intro:
    p('<b>Use case: Library Catalogue.</b> The program stores book information in an XML document, validates it with a DTD, shows it in the browser using CSS, and also reads it with JavaScript (DOM) to display a table.'),
  sections: [
    section('1. XML Document (library.xml)',
      code('library.xml', `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE library SYSTEM "library.dtd">
<?xml-stylesheet type="text/css" href="library.css"?>
<library name="Central Library">
  <book id="B101" available="yes">
    <title>Internet Programming</title>
    <author>Deitel</author>
    <category>Computer Science</category>
    <price currency="INR">650</price>
    <year>2020</year>
  </book>
  <book id="B102" available="no">
    <title>Database System Concepts</title>
    <author>Silberschatz</author>
    <category>Computer Science</category>
    <price currency="INR">720</price>
    <year>2019</year>
  </book>
  <book id="B103" available="yes">
    <title>Wings of Fire</title>
    <author>A. P. J. Abdul Kalam</author>
    <category>Biography</category>
    <price currency="INR">250</price>
    <year>1999</year>
  </book>
</library>
`)
    ),
    section('2. DTD to Validate the Document (library.dtd)',
      code('library.dtd', `
<!ELEMENT library (book+)>
<!ATTLIST library name CDATA #REQUIRED>
<!ELEMENT book (title, author, category, price, year)>
<!ATTLIST book id ID #REQUIRED
               available (yes|no) "yes">
<!ELEMENT title    (#PCDATA)>
<!ELEMENT author   (#PCDATA)>
<!ELEMENT category (#PCDATA)>
<!ELEMENT price    (#PCDATA)>
<!ATTLIST price currency CDATA #REQUIRED>
<!ELEMENT year     (#PCDATA)>
`)
    ),
    section('3. CSS to Display the XML in a Browser (library.css)',
      code('library.css', `
library  { display: block; font-family: Arial; background: #f2f4f8; padding: 20px; }
book     { display: block; background: #fff; margin: 10px 0; padding: 12px; border-left: 5px solid #3b5bdb; }
title    { display: block; font-size: 20px; font-weight: bold; color: #1d3557; }
author   { display: block; color: #555; font-style: italic; }
category { display: inline; color: #0b7285; }
price    { display: inline; font-weight: bold; margin-left: 10px; }
year     { display: inline; margin-left: 10px; color: #777; }
`) +
      p('Open <code class="inline">library.xml</code> directly in Chrome or Firefox: the browser applies the CSS and shows the formatted catalogue.')
    ),
    section('4. Reading the XML with JavaScript (Runnable Demo)',
      p('The page below holds the same XML, parses it with <code class="inline">DOMParser</code>, and builds an HTML table using DOM methods. Press <b>Run</b> to see it.') +
      code('library-view.html', `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>XML Library Viewer</title>
<style>
  body{font-family:Arial;padding:20px;background:#f2f4f8}
  table{border-collapse:collapse;background:#fff}
  td,th{border:1px solid #999;padding:8px 14px;text-align:left}
  th{background:#3b5bdb;color:#fff}
  .no{color:#c92a2a}
</style>
</head>
<body>
<h2>Library Catalogue (read from XML)</h2>
<table id="t"><tr><th>ID</th><th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Available</th></tr></table>
<p id="info"></p>

<script type="text/xml" id="src">
<?xml version="1.0" encoding="UTF-8"?>
<library name="Central Library">
  <book id="B101" available="yes"><title>Internet Programming</title><author>Deitel</author><category>Computer Science</category><price currency="INR">650</price><year>2020</year></book>
  <book id="B102" available="no"><title>Database System Concepts</title><author>Silberschatz</author><category>Computer Science</category><price currency="INR">720</price><year>2019</year></book>
  <book id="B103" available="yes"><title>Wings of Fire</title><author>A. P. J. Abdul Kalam</author><category>Biography</category><price currency="INR">250</price><year>1999</year></book>
</library>
</script>

<script>
  var text = document.getElementById("src").textContent.trim();
  var xml  = new DOMParser().parseFromString(text, "application/xml");
  var books = xml.getElementsByTagName("book");
  var table = document.getElementById("t");
  var total = 0;

  function val(book, tag) { return book.getElementsByTagName(tag)[0].textContent; }

  for (var i = 0; i < books.length; i++) {
    var b = books[i];
    var tr = document.createElement("tr");
    var cells = [
      b.getAttribute("id"), val(b,"title"), val(b,"author"), val(b,"category"),
      val(b,"price") + " " + b.getElementsByTagName("price")[0].getAttribute("currency"),
      b.getAttribute("available")
    ];
    cells.forEach(function (c, idx) {
      var td = document.createElement("td");
      td.textContent = c;
      if (idx === 5 && c === "no") td.className = "no";
      tr.appendChild(td);
    });
    table.appendChild(tr);
    total += Number(val(b, "price"));
  }
  document.getElementById("info").textContent =
    "Library: " + xml.documentElement.getAttribute("name") +
    " | Books: " + books.length + " | Total price: " + total;
</script>
</body>
</html>
`)
    ),
    section('5. Explanation',
      ul([
        '<b>library.xml</b> stores data with one root (<code class="inline">library</code>), repeated <code class="inline">book</code> elements, attributes (id, available) and child elements.',
        '<b>library.dtd</b> forces the structure: at least one book (<code class="inline">book+</code>), fixed child order, required id.',
        '<b>library.css</b> styles the XML elements directly (XML has no built-in look).',
        '<b>DOMParser</b> turns XML text into a DOM document; <code class="inline">getElementsByTagName</code>, <code class="inline">getAttribute</code> and <code class="inline">textContent</code> read the data.'
      ])
    )
  ],
  rapid: [
    'Use case: library with root library and repeated book elements (attributes id, available).',
    'Validate with DTD (DOCTYPE SYSTEM) and display with CSS or XSLT.',
    'Read in JavaScript: new DOMParser().parseFromString(text, "application/xml").'
  ]
},

/* ---------- JSON application ---------- */
{
  id: 'u5b3',
  kind: 'Program',
  title: 'Program: JSON Application (Document) to Store Information for a Use Case',
  tags: ['json','json.parse','json.stringify','object','array','json document','json program','program'],
  intro:
    p('<b>JSON (JavaScript Object Notation)</b> is a lightweight, text-based data interchange format that is easy for humans to read and for machines to parse. <b>Use case: Online Store</b> storing customer, product and order information in a JSON document and displaying it with JavaScript.'),
  sections: [
    section('1. JSON Syntax and Data Types',
      ul([
        'Data is in <b>name : value</b> pairs; names are <b>strings in double quotes</b>.',
        'Objects are enclosed in <code class="inline">{ }</code>; arrays in <code class="inline">[ ]</code>; items separated by commas.',
        'No comments and no trailing commas.'
      ]) +
      table(['JSON type','Example'],[
        ['String','<code class="inline">"Manohar"</code>'],
        ['Number','<code class="inline">25, 99.5</code>'],
        ['Boolean','<code class="inline">true, false</code>'],
        ['null','<code class="inline">null</code>'],
        ['Object','<code class="inline">{"id": 1, "name": "Pen"}</code>'],
        ['Array','<code class="inline">["CSE", "IT", "ECE"]</code>']
      ])
    ),
    section('2. JSON Document (store.json)',
      code('store.json', `
{
  "store": "Campus Mart",
  "open": true,
  "customer": {
    "id": 1001,
    "name": "Manohar",
    "email": "manohar@example.com",
    "address": { "city": "Madurai", "pincode": "625009" }
  },
  "products": [
    { "id": 1, "name": "Notebook", "price": 60.0,  "stock": 120 },
    { "id": 2, "name": "Pen",      "price": 10.0,  "stock": 500 },
    { "id": 3, "name": "Calculator","price": 450.0, "stock": 0 }
  ],
  "orders": [
    { "orderId": "O1", "items": [1, 2], "paid": true },
    { "orderId": "O2", "items": [3],    "paid": false }
  ],
  "discount": null
}
`)
    ),
    section('3. Reading and Displaying JSON (Runnable Demo)',
      code('json-demo.html', `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSON Application</title>
<style>
  body{font-family:Arial;padding:20px;background:#f2f4f8}
  table{border-collapse:collapse;background:#fff;margin:10px 0}
  td,th{border:1px solid #999;padding:8px 14px;text-align:left}
  th{background:#3b5bdb;color:#fff}
  pre{background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px}
  .out{color:#c92a2a}
</style>
</head>
<body>
<h2 id="title"></h2>
<p id="cust"></p>
<table id="tbl"><tr><th>ID</th><th>Product</th><th>Price</th><th>Stock</th></tr></table>
<button onclick="addProduct()">Add product</button>
<h3>Updated JSON (JSON.stringify)</h3>
<pre id="json"></pre>

<script>
  // JSON text (normally received from a file or server)
  var jsonText = '{"store":"Campus Mart","customer":{"id":1001,"name":"Manohar","address":{"city":"Madurai"}},' +
    '"products":[{"id":1,"name":"Notebook","price":60,"stock":120},{"id":2,"name":"Pen","price":10,"stock":500},' +
    '{"id":3,"name":"Calculator","price":450,"stock":0}]}';

  var data = JSON.parse(jsonText);            // text -> JavaScript object

  document.getElementById("title").textContent = data.store;
  document.getElementById("cust").textContent =
    "Customer: " + data.customer.name + ", " + data.customer.address.city;

  function render() {
    var t = document.getElementById("tbl");
    t.innerHTML = "<tr><th>ID</th><th>Product</th><th>Price</th><th>Stock</th></tr>";
    data.products.forEach(function (p) {
      var tr = t.insertRow();
      tr.insertCell().textContent = p.id;
      tr.insertCell().textContent = p.name;
      tr.insertCell().textContent = "Rs. " + p.price;
      var c = tr.insertCell();
      c.textContent = p.stock > 0 ? p.stock : "Out of stock";
      if (p.stock === 0) c.className = "out";
    });
    document.getElementById("json").textContent = JSON.stringify(data, null, 2);  // object -> text
  }

  function addProduct() {
    var n = data.products.length + 1;
    data.products.push({ id: n, name: "Item " + n, price: n * 15, stock: 10 });
    render();
  }
  render();
</script>
</body>
</html>
`)
    ),
    section('4. JSON in JavaScript, PHP and AJAX',
      table(['Task','JavaScript','PHP'],[
        ['Text to object','<code class="inline">JSON.parse(text)</code>','<code class="inline">json_decode($text, true)</code>'],
        ['Object to text','<code class="inline">JSON.stringify(obj)</code>','<code class="inline">json_encode($arr)</code>']
      ]) +
      code('PHP sending JSON (api.php)', `
<?php
header("Content-Type: application/json");
$data = ["name" => "Manohar", "dept" => "CSE", "skills" => ["PHP", "Java"]];
echo json_encode($data);
?>
`) +
      code('Receiving JSON using AJAX', `
fetch("api.php")
  .then(function (r) { return r.json(); })
  .then(function (d) { console.log(d.name, d.skills[0]); });
`)
    ),
    section('5. JSON vs XML',
      table(['Feature','JSON','XML'],[
        ['Syntax','Key-value pairs, arrays','Tags and attributes'],
        ['Size','Lighter, less verbose','Larger because of closing tags'],
        ['Parsing','Native in JavaScript (JSON.parse)','Needs an XML parser (DOM / SAX)'],
        ['Data types','String, number, boolean, null, object, array','Everything is text; types by schema'],
        ['Comments','Not supported','Supported'],
        ['Schema / validation','JSON Schema','DTD, XSD'],
        ['Best for','Web APIs and AJAX','Documents, configuration, SOAP']
      ])
    )
  ],
  rapid: [
    'JSON: name-value pairs; {} object, [] array; strings in double quotes; no comments.',
    'Types: string, number, boolean, null, object, array.',
    'JavaScript: JSON.parse (text to object), JSON.stringify (object to text); PHP: json_decode, json_encode.',
    'JSON is lighter and faster to parse than XML; common in AJAX and REST APIs.'
  ]
},

/* ---------- AJAX program: text file and XML file ---------- */
{
  id: 'u5b4',
  kind: 'Program',
  title: 'Program: AJAX to Get the Response from a Text File and an XML File',
  tags: ['ajax program','xmlhttprequest','text file','xml file','responsetext','responsexml','program'],
  intro:
    p('<b>Problem:</b> Develop an AJAX program that loads data from a <b>text file</b> and from an <b>XML file</b> on the server using <code class="inline">XMLHttpRequest</code> and displays it on the page <b>without reloading</b>.') +
    diagram(
      svg(640,140,
        svgBox(5,45,130,50,'index.html\nbuttons','bx') + svgBox(190,45,130,50,'XMLHttpRequest\nGET','bx3') + svgBox(380,10,120,40,'data.txt','bx2') + svgBox(380,90,120,40,'students.xml','bx2') + svgBox(540,45,95,50,'DOM\nupdate','bx') +
        svgArrow(135,70,190,70) + svgArrow(320,60,380,30) + svgArrow(320,80,380,110) + svgArrow(500,30,540,60,'text') + svgArrow(500,110,540,80,'XML')
      ),
      'Figure 1: Loading a text file and an XML file with AJAX'),
  sections: [
    section('1. Files Required (same folder)',
      code('data.txt', `
Welcome to the AJAX demo!
This text was loaded from data.txt without reloading the page.
`) +
      code('students.xml', `
<?xml version="1.0" encoding="UTF-8"?>
<students>
  <student>
    <id>101</id>
    <name>Manohar</name>
    <dept>CSE</dept>
    <marks>88</marks>
  </student>
  <student>
    <id>102</id>
    <name>Ravi</name>
    <dept>IT</dept>
    <marks>74</marks>
  </student>
  <student>
    <id>103</id>
    <name>Anitha</name>
    <dept>ECE</dept>
    <marks>91</marks>
  </student>
</students>
`)
    ),
    section('2. Program (index.html)',
      code('index.html', `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AJAX - Text and XML</title>
  <style>
    body{font-family:Arial;padding:20px;background:#f2f4f8}
    button{padding:8px 16px;margin-right:8px;cursor:pointer}
    #output{margin-top:16px;background:#fff;padding:14px;border-radius:8px;min-height:60px}
    table{border-collapse:collapse}
    td,th{border:1px solid #999;padding:8px 14px}
    th{background:#3b5bdb;color:#fff}
  </style>
</head>
<body>
  <h2>AJAX Demo</h2>
  <button onclick="loadText()">Load Text File</button>
  <button onclick="loadXML()">Load XML File</button>
  <div id="output">Click a button to load data.</div>

<script>
  /* ---------- 1. TEXT FILE ---------- */
  function loadText() {
    var xhr = new XMLHttpRequest();                       // create object
    xhr.onreadystatechange = function () {                // callback
      if (xhr.readyState === 4) {                         // request complete
        if (xhr.status === 200) {                         // success
          document.getElementById("output").innerHTML =
            "<pre>" + xhr.responseText + "</pre>";        // plain text response
        } else {
          document.getElementById("output").innerHTML = "Error: " + xhr.status;
        }
      }
    };
    xhr.open("GET", "data.txt", true);                    // asynchronous GET
    xhr.send();
  }

  /* ---------- 2. XML FILE ---------- */
  function loadXML() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var xml = xhr.responseXML;                        // XML DOM document
        var students = xml.getElementsByTagName("student");

        var html = "<table><tr><th>ID</th><th>Name</th><th>Dept</th><th>Marks</th></tr>";
        for (var i = 0; i < students.length; i++) {
          var s = students[i];
          html += "<tr>" +
            "<td>" + s.getElementsByTagName("id")[0].childNodes[0].nodeValue + "</td>" +
            "<td>" + s.getElementsByTagName("name")[0].childNodes[0].nodeValue + "</td>" +
            "<td>" + s.getElementsByTagName("dept")[0].childNodes[0].nodeValue + "</td>" +
            "<td>" + s.getElementsByTagName("marks")[0].childNodes[0].nodeValue + "</td>" +
            "</tr>";
        }
        html += "</table>";
        document.getElementById("output").innerHTML = html;
      } else if (xhr.readyState === 4) {
        document.getElementById("output").innerHTML = "Error: " + xhr.status;
      }
    };
    xhr.open("GET", "students.xml", true);
    xhr.send();
  }
</script>
</body>
</html>
`)
    ),
    section('3. Same Program using the fetch API (modern)',
      code('', `
// text file
fetch("data.txt")
  .then(function (r) { return r.text(); })
  .then(function (t) { document.getElementById("output").innerText = t; });

// XML file
fetch("students.xml")
  .then(function (r) { return r.text(); })
  .then(function (t) {
    var xml = new DOMParser().parseFromString(t, "application/xml");
    var names = xml.getElementsByTagName("name");
    var list = "";
    for (var i = 0; i < names.length; i++) list += names[i].textContent + "<br>";
    document.getElementById("output").innerHTML = list;
  });
`)
    ),
    section('4. Important Points',
      ul([
        '<b>responseText</b> returns the response as a string (used for the text file).',
        '<b>responseXML</b> returns a parsed XML DOM (used for the XML file), so DOM methods work on it.',
        '<b>readyState 4</b> means the request is complete and <b>status 200</b> means success.',
        'The third argument of <code class="inline">open()</code> is <code class="inline">true</code> for an asynchronous request.',
        'The page is never reloaded; only the <code class="inline">output</code> div changes.'
      ]) +
      note('<b>Run it through a web server</b>, not by double-clicking the file. Browsers block XMLHttpRequest on <code class="inline">file://</code> pages. Use XAMPP (<code class="inline">htdocs</code>), or run <code class="inline">python -m http.server</code> in the folder and open <code class="inline">http://localhost:8000</code>.')
    )
  ],
  rapid: [
    'Steps: new XMLHttpRequest(), onreadystatechange, open("GET", file, true), send().',
    'Text file: use responseText. XML file: use responseXML with getElementsByTagName.',
    'Check readyState === 4 and status === 200.',
    'Needs a web server (not file://).'
  ]
},

/* ---------- XSL program ---------- */
{
  id: 'u5b5',
  kind: 'Program',
  title: 'Program: XSL to Display the Details of an XML File and Transform into HTML',
  tags: ['xsl','xslt','xml to html','stylesheet','for-each','value-of','template','xsl program','program'],
  intro:
    p('<b>Problem:</b> Write an XSLT stylesheet that reads an XML file of student details and transforms it into an HTML table. <b>XSLT</b> uses <b>templates</b> and <b>XPath</b> expressions to select XML nodes and produce HTML output.') +
    diagram(
      svg(620,120,
        svgBox(5,35,120,50,'students.xml','bx') + svgBox(175,35,130,50,'XSLT processor\n(browser)','bx3') + svgBox(355,35,120,50,'students.xsl','bx') + svgBox(525,35,90,50,'HTML\ntable','bx2') +
        svgArrow(125,60,175,60) + svgArrow(355,60,305,60) + svgArrow(305,75,525,75)
      ),
      'Figure 1: XML plus XSL gives HTML'),
  sections: [
    section('1. XML File (students.xml)',
      p('The <code class="inline">xml-stylesheet</code> processing instruction links the XSL file, so the browser transforms the XML automatically.') +
      code('students.xml', `
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="students.xsl"?>
<college name="Kamaraj College of Engineering and Technology">
  <student id="101">
    <name>Manohar</name>
    <dept>CSE</dept>
    <marks>88</marks>
  </student>
  <student id="102">
    <name>Ravi</name>
    <dept>IT</dept>
    <marks>74</marks>
  </student>
  <student id="103">
    <name>Anitha</name>
    <dept>ECE</dept>
    <marks>45</marks>
  </student>
  <student id="104">
    <name>Kumar</name>
    <dept>CSE</dept>
    <marks>91</marks>
  </student>
</college>
`)
    ),
    section('2. XSL File (students.xsl)',
      code('students.xsl', `
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Student Details</title>
        <style>
          body { font-family: Arial; background: #f2f4f8; padding: 20px; }
          table { border-collapse: collapse; background: #fff; }
          th, td { border: 1px solid #999; padding: 8px 16px; text-align: left; }
          th { background: #3b5bdb; color: #fff; }
          .fail { color: #c92a2a; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2><xsl:value-of select="college/@name"/></h2>
        <table>
          <tr><th>S.No</th><th>ID</th><th>Name</th><th>Department</th><th>Marks</th><th>Result</th></tr>

          <xsl:for-each select="college/student">
            <xsl:sort select="marks" data-type="number" order="descending"/>
            <tr>
              <td><xsl:value-of select="position()"/></td>
              <td><xsl:value-of select="@id"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="dept"/></td>
              <td><xsl:value-of select="marks"/></td>
              <td>
                <xsl:choose>
                  <xsl:when test="marks &gt;= 50">Pass</xsl:when>
                  <xsl:otherwise><span class="fail">Fail</span></xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </table>

        <p>Total students: <xsl:value-of select="count(college/student)"/></p>
        <p>Average marks: <xsl:value-of select="sum(college/student/marks) div count(college/student)"/></p>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`)
    ),
    section('3. Try it: Transformation in the Browser (Runnable Demo)',
      p('This page holds the same XML and XSL, and applies them using the browser\'s <code class="inline">XSLTProcessor</code>. Press <b>Run</b> to see the transformed output.') +
      code('xslt-demo.html', `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>XSLT Demo</title></head>
<body>
<div id="result">Transforming...</div>

<script type="text/xml" id="xmlsrc">
<?xml version="1.0" encoding="UTF-8"?>
<college name="Kamaraj College of Engineering and Technology">
  <student id="101"><name>Manohar</name><dept>CSE</dept><marks>88</marks></student>
  <student id="102"><name>Ravi</name><dept>IT</dept><marks>74</marks></student>
  <student id="103"><name>Anitha</name><dept>ECE</dept><marks>45</marks></student>
  <student id="104"><name>Kumar</name><dept>CSE</dept><marks>91</marks></student>
</college>
</script>

<script type="text/xml" id="xslsrc">
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <div style="font-family:Arial;padding:16px">
      <h2><xsl:value-of select="college/@name"/></h2>
      <table border="1" cellpadding="8" style="border-collapse:collapse">
        <tr style="background:#3b5bdb;color:#fff"><th>No</th><th>ID</th><th>Name</th><th>Dept</th><th>Marks</th><th>Result</th></tr>
        <xsl:for-each select="college/student">
          <xsl:sort select="marks" data-type="number" order="descending"/>
          <tr>
            <td><xsl:value-of select="position()"/></td>
            <td><xsl:value-of select="@id"/></td>
            <td><xsl:value-of select="name"/></td>
            <td><xsl:value-of select="dept"/></td>
            <td><xsl:value-of select="marks"/></td>
            <td><xsl:choose>
              <xsl:when test="marks &gt;= 50">Pass</xsl:when>
              <xsl:otherwise><b style="color:#c92a2a">Fail</b></xsl:otherwise>
            </xsl:choose></td>
          </tr>
        </xsl:for-each>
      </table>
      <p>Total students: <xsl:value-of select="count(college/student)"/></p>
    </div>
  </xsl:template>
</xsl:stylesheet>
</script>

<script>
  var parser = new DOMParser();
  var xml = parser.parseFromString(document.getElementById("xmlsrc").textContent.trim(), "application/xml");
  var xsl = parser.parseFromString(document.getElementById("xslsrc").textContent.trim(), "application/xml");

  var proc = new XSLTProcessor();
  proc.importStylesheet(xsl);
  var fragment = proc.transformToFragment(xml, document);

  var box = document.getElementById("result");
  box.innerHTML = "";
  box.appendChild(fragment);
</script>
</body>
</html>
`)
    ),
    section('4. Explanation of XSL Elements Used',
      table(['Element / function','Purpose'],[
        ['<code class="inline">xsl:stylesheet</code>','Root element of the stylesheet; declares the XSL namespace'],
        ['<code class="inline">xsl:output method="html"</code>','Output is HTML'],
        ['<code class="inline">xsl:template match="/"</code>','Template applied to the root of the XML document'],
        ['<code class="inline">xsl:for-each select="college/student"</code>','Loops over every student node (XPath)'],
        ['<code class="inline">xsl:value-of select="name"</code>','Prints the text of a node; <code class="inline">@id</code> reads an attribute'],
        ['<code class="inline">xsl:sort</code>','Sorts the nodes (here by marks, descending)'],
        ['<code class="inline">xsl:choose / when / otherwise</code>','If / else logic (Pass or Fail)'],
        ['<code class="inline">position(), count(), sum()</code>','XPath functions for serial number, total and average']
      ])
    ),
    section('5. How to Run',
      ol([
        'Save <code class="inline">students.xml</code> and <code class="inline">students.xsl</code> in the same folder.',
        'Open <code class="inline">students.xml</code> in Firefox or Edge. The browser applies the XSL and shows the HTML table. (Chrome blocks local XSL on file:// pages, so use a local server such as <code class="inline">python -m http.server</code>.)',
        'Alternative: use the XSLT processor from Java (Transformer), PHP (XSLTProcessor) or an online XSLT tester.'
      ])
    )
  ],
  rapid: [
    'XML links the stylesheet with: &lt;?xml-stylesheet type="text/xsl" href="students.xsl"?&gt;.',
    'XSL: template match="/", for-each select="college/student", value-of select="name", sort, choose/when/otherwise.',
    'XPath: @attr for attributes, count(), sum(), position().',
    'Output method html gives a browser-viewable table.'
  ]
}

]);
