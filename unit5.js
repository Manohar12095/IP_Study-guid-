addUnit(5, 'AJAX & XML', [

/* ---------- 1. AJAX Architecture ---------- */
{
  id: 'u5q1',
  title: 'AJAX Architecture',
  tags: ['ajax','asynchronous','xmlhttprequest','fetch','json','ajax engine'],
  intro:
    p('<b>AJAX (Asynchronous JavaScript And XML)</b> is a web development technique for creating fast, dynamic pages by exchanging small amounts of data with the server <b>in the background</b>, without reloading the whole page. AJAX is not a language; it combines existing technologies: <b>HTML/CSS, DOM, JavaScript, XMLHttpRequest (or fetch), and XML/JSON</b>.'),
  sections: [
    section('1. Classic Web Model vs AJAX Model',
      table(['Classic (synchronous) model','AJAX (asynchronous) model'],[
        ['User action sends an HTTP request directly from the browser','User action calls JavaScript, which sends the request via the AJAX engine'],
        ['Server returns a <b>complete new HTML page</b>','Server returns only <b>data</b> (XML/JSON/text/HTML fragment)'],
        ['Whole page reloads; user waits and sees a blank flash','Only part of the page is updated through the DOM; no reload'],
        ['More bandwidth used','Less bandwidth, faster']
      ])
    ),
    section('2. AJAX Architecture Diagram',
      diagram(
        svg(680,330,
          svgBox(10,20,300,290,'','bx2') +
          '<text x="160" y="42" text-anchor="middle" font-size="12" font-weight="bold">Client (Web Browser)</text>' +
          svgBox(30,60,120,45,'User Interface\n(HTML/CSS)','bx') +
          svgBox(170,60,120,45,'JavaScript\nEvent handler','bx') +
          svgBox(100,135,120,50,'AJAX Engine\nXMLHttpRequest / fetch','bx3') +
          svgBox(30,225,120,45,'DOM update\n(callback)','bx') +
          svgBox(380,20,290,290,'','bx2') +
          '<text x="525" y="42" text-anchor="middle" font-size="12" font-weight="bold">Server</text>' +
          svgBox(400,70,100,50,'Web Server\n(HTTP)','bx3') +
          svgBox(530,70,125,50,'Server script\nPHP / Servlet','bx') +
          svgBox(530,160,125,50,'Database /\nFiles / API','bx2') +
          svgArrow(90,105,130,135,'1') + svgArrow(230,105,190,135) +
          svgArrow(220,160,400,95,'2 async request') +
          svgArrow(500,95,530,95) + svgArrow(592,120,592,160,'3') +
          svgArrow(400,110,220,175,'4 response (XML/JSON)') +
          svgArrow(150,185,100,225,'5') +
          svgArrow(60,225,60,105)
        ),
        'Figure 1: AJAX architecture (1 event, 2 async request, 3 server processing, 4 response, 5 partial page update)')
    ),
    section('3. Working Steps',
      ol([
        '<b>Event occurs</b> on the page (button click, key press, page load, timer).',
        'JavaScript creates an <b>XMLHttpRequest</b> object (or calls <code class="inline">fetch()</code>).',
        'The request is configured with <code class="inline">open()</code> and sent with <code class="inline">send()</code> <b>asynchronously</b>, so the user can keep working.',
        'The <b>server</b> processes the request (PHP, servlet, ASP etc.), queries the database if needed, and prepares data.',
        'The server returns the <b>response</b> as text, XML, JSON or HTML.',
        'A <b>callback function</b> (<code class="inline">onreadystatechange</code> / <code class="inline">onload</code> / promise) runs when the response arrives.',
        'JavaScript uses the <b>DOM</b> to update only the required part of the page.'
      ])
    ),
    section('4. Components of AJAX',
      table(['Technology','Role'],[
        ['HTML / CSS','Presentation of the page'],
        ['JavaScript','Controls everything; handles events and callbacks'],
        ['DOM','Dynamically updates part of the page'],
        ['XMLHttpRequest / fetch API','Sends asynchronous HTTP requests'],
        ['XML / JSON / plain text','Data interchange format'],
        ['Server-side script','PHP, JSP/Servlet, Node.js, ASP.NET returning data']
      ])
    ),
    section('5. Example: Live Search / Load Data without Reload',
      code('ajax.html', `
<!DOCTYPE html>
<html>
<body>
  <h3>Student lookup</h3>
  <input type="text" id="q" placeholder="Type a name..." onkeyup="search(this.value)">
  <div id="result"></div>

<script>
function search(text) {
  if (text.length === 0) {
    document.getElementById("result").innerHTML = "";
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("result").innerHTML = xhr.responseText;  // partial update
    }
  };
  xhr.open("GET", "search.php?q=" + encodeURIComponent(text), true);   // true = asynchronous
  xhr.send();
}
<\/script>
</body>
</html>
`) +
      code('search.php', `
<?php
$names = ["Anitha", "Arun", "Kumar", "Manohar", "Ravi", "Revathi"];
$q = strtolower($_GET["q"] ?? "");
$hits = [];
foreach ($names as $n) {
    if ($q !== "" && strpos(strtolower($n), $q) === 0) { $hits[] = htmlspecialchars($n); }
}
echo count($hits) ? implode("<br>", $hits) : "No suggestion";
?>
`) +
      h3('Same thing using the modern fetch API') +
      code('', `
fetch("search.php?q=" + encodeURIComponent(text))
  .then(function (res) { return res.text(); })
  .then(function (data) { document.getElementById("result").innerHTML = data; })
  .catch(function (err) { console.error(err); });
`)
    ),
    section('6. Advantages and Disadvantages',
      table(['Advantages','Disadvantages'],[
        ['No full page reload; faster, smoother user experience','Needs JavaScript enabled in the browser'],
        ['Reduced server load and bandwidth','Back button and bookmarking can break (URL does not change)'],
        ['Asynchronous: UI stays responsive','Harder to debug; more client-side code'],
        ['Used for auto-complete, live validation, chat, maps, notifications','Search engines may not index dynamically loaded content'],
        ['Works with existing technologies','Security: needs CSRF/XSS care; same-origin policy (CORS)']
      ])
    )
  ],
  rapid: [
    'AJAX = Asynchronous JavaScript And XML; updates part of a page without reload.',
    'Flow: event, JavaScript, XMLHttpRequest, server, response, callback, DOM update.',
    'Technologies: HTML/CSS, DOM, JavaScript, XHR/fetch, XML/JSON, server script.',
    'Examples: Google Suggest, live search, form validation, chat.'
  ]
},

/* ---------- 2. XMLHttpRequest Object ---------- */
{
  id: 'u5q2',
  title: 'XMLHttpRequest Object (Explain)',
  tags: ['xmlhttprequest','xhr','readystate','status','open','send','responsetext','onreadystatechange','ajax'],
  intro:
    p('The <b>XMLHttpRequest (XHR)</b> object is a built-in JavaScript browser object that lets a web page <b>send HTTP requests to a server and receive the response in the background</b> (asynchronously), without reloading the page. It is the core of AJAX and can fetch any type of data (text, XML, JSON, HTML), not only XML. It supports both GET and POST (and other methods).'),
  sections: [
    section('1. Creating the Object',
      code('', `
var xhr = new XMLHttpRequest();
`) +
      p('(Very old Internet Explorer 5/6 used <code class="inline">new ActiveXObject("Microsoft.XMLHTTP")</code>.)')
    ),
    section('2. Steps to Use XMLHttpRequest',
      diagram(
        svg(640,110,
          svgBox(5,30,115,50,'1. Create\nnew XMLHttpRequest()','bx3') +
          svgBox(135,30,115,50,'2. Set callback\nonreadystatechange','bx') +
          svgBox(265,30,115,50,'3. open(method,\nurl, async)','bx') +
          svgBox(395,30,115,50,'4. send(data)','bx') +
          svgBox(525,30,110,50,'5. Handle\nresponse','bx3') +
          svgArrow(120,55,135,55) + svgArrow(250,55,265,55) + svgArrow(380,55,395,55) + svgArrow(510,55,525,55)
        ),
        'Figure 1: Steps of an XHR request')
    ),
    section('3. Methods of XMLHttpRequest',
      table(['Method','Description'],[
        ['<code class="inline">open(method, url, async, user, password)</code>','Initialises the request. method = "GET"/"POST"; async = true (default) for asynchronous.'],
        ['<code class="inline">send()</code> / <code class="inline">send(data)</code>','Sends the request. For GET no body; for POST pass the data string/FormData.'],
        ['<code class="inline">setRequestHeader(name, value)</code>','Adds an HTTP header, e.g. Content-Type (call after open(), before send()).'],
        ['<code class="inline">abort()</code>','Cancels the current request.'],
        ['<code class="inline">getResponseHeader(name)</code>','Returns the value of a response header.'],
        ['<code class="inline">getAllResponseHeaders()</code>','Returns all response headers.'],
        ['<code class="inline">overrideMimeType(type)</code>','Overrides the response MIME type.']
      ])
    ),
    section('4. Properties of XMLHttpRequest',
      table(['Property','Description'],[
        ['<code class="inline">readyState</code>','State of the request (0 to 4)'],
        ['<code class="inline">status</code>','HTTP status code (200 OK, 404 Not Found, 500 Server Error)'],
        ['<code class="inline">statusText</code>','Status text ("OK", "Not Found")'],
        ['<code class="inline">responseText</code>','Response as a string'],
        ['<code class="inline">responseXML</code>','Response as an XML DOM document'],
        ['<code class="inline">response</code>','Response according to responseType (json, blob, arraybuffer)'],
        ['<code class="inline">responseType</code>','Type of expected response'],
        ['<code class="inline">timeout</code>','Time limit in milliseconds'],
        ['<code class="inline">onreadystatechange</code>','Function called whenever readyState changes'],
        ['<code class="inline">onload, onerror, onprogress, ontimeout</code>','Event handlers']
      ])
    ),
    section('5. readyState Values',
      table(['Value','Constant','Meaning'],[
        ['0','UNSENT','Object created; open() not called yet'],
        ['1','OPENED','open() has been called'],
        ['2','HEADERS_RECEIVED','send() called; headers and status are available'],
        ['3','LOADING','Response body is being downloaded (responseText partial)'],
        ['4','DONE','Operation complete; full response received']
      ]) +
      note('The usual check is <code class="inline">if (xhr.readyState == 4 &amp;&amp; xhr.status == 200)</code>, meaning the request is finished and successful.')
    ),
    section('6. GET Request Example',
      code('xhr-get.html', `
<!DOCTYPE html>
<html>
<body>
  <button onclick="loadData()">Load Message</button>
  <div id="demo"></div>
<script>
function loadData() {
  var xhr = new XMLHttpRequest();                       // 1. create

  xhr.onreadystatechange = function () {                // 2. callback
    if (this.readyState == 4) {
      if (this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      } else {
        document.getElementById("demo").innerHTML = "Error: " + this.status;
      }
    }
  };

  xhr.open("GET", "message.txt", true);                 // 3. open (async)
  xhr.send();                                           // 4. send
}
<\/script>
</body>
</html>
`)
    ),
    section('7. POST Request Example (send form data)',
      code('xhr-post.html', `
<script>
function saveStudent() {
  var name = document.getElementById("name").value;
  var dept = document.getElementById("dept").value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "save.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("msg").innerHTML = xhr.responseText;
    }
  };
  xhr.onerror = function () { alert("Network error"); };

  xhr.send("name=" + encodeURIComponent(name) + "&dept=" + encodeURIComponent(dept));
}
<\/script>
`) +
      code('save.php', `
<?php
$name = htmlspecialchars($_POST["name"] ?? "");
$dept = htmlspecialchars($_POST["dept"] ?? "");
echo "Saved: $name ($dept)";
?>
`)
    ),
    section('8. Reading XML and JSON Responses',
      code('', `
// XML response
xhr.onload = function () {
  var xml = xhr.responseXML;
  var items = xml.getElementsByTagName("student");
  for (var i = 0; i < items.length; i++) {
    console.log(items[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
  }
};

// JSON response
xhr.onload = function () {
  var data = JSON.parse(xhr.responseText);
  console.log(data.name);
};
`)
    ),
    section('9. Synchronous vs Asynchronous',
      table(['Asynchronous (async = true)','Synchronous (async = false)'],[
        ['Script continues while waiting; callback handles response','Script stops until the response arrives'],
        ['UI remains responsive','Browser freezes; deprecated on the main thread'],
        ['Recommended','Avoid']
      ])
    )
  ],
  rapid: [
    'XHR = JavaScript object to exchange data with a server in the background.',
    'Steps: new XMLHttpRequest(), onreadystatechange, open(method,url,true), send().',
    'readyState 0-4 (4 = DONE); status 200 = OK.',
    'Response in responseText / responseXML / response (json).',
    'POST needs setRequestHeader("Content-Type", ...) and send(data).'
  ]
},

/* ---------- 3. XML, DTD, XSD, XSLT ---------- */
{
  id: 'u5q3',
  title: 'XML, DTD, XSD and XSLT',
  tags: ['xml','dtd','xsd','xslt','xml schema','well-formed','valid','stylesheet','namespace'],
  intro:
    p('<b>XML (eXtensible Markup Language)</b> is a W3C standard, text-based markup language designed to <b>store and transport data</b>. Unlike HTML, which displays data, XML <b>describes</b> data, and the tags are user-defined. XML is platform and language independent, self-descriptive and human-readable.') +
    diagram(
      svg(640,160,
        svgBox(10,55,110,50,'XML document\n(data)','bx') +
        svgBox(190,10,130,45,'DTD / XSD\n(validates structure)','bx3') +
        svgBox(190,105,130,45,'XSLT\n(transforms)','bx3') +
        svgBox(400,55,120,50,'Valid XML','bx2') +
        svgBox(540,105,95,45,'HTML / XML\n/ text','bx2') +
        svgArrow(120,70,190,32) + svgArrow(320,32,400,70) + svgArrow(120,90,190,125) + svgArrow(320,128,540,128)
      ),
      'Figure 1: XML and its related technologies'),
  sections: [
    section('1. XML Syntax Rules (Well-formed XML)',
      ul([
        'Must have an optional XML declaration: <code class="inline">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</code>',
        'Exactly <b>one root element</b>.',
        'Every start tag must have an <b>end tag</b> (or be self-closing <code class="inline">&lt;br/&gt;</code>).',
        'Tags are <b>case sensitive</b>.',
        'Elements must be <b>properly nested</b>.',
        'Attribute values must be <b>quoted</b>.',
        'Special characters use entities: <code class="inline">&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;apos;</code>',
        'Comments: <code class="inline">&lt;!-- comment --&gt;</code>; CDATA: <code class="inline">&lt;![CDATA[ ... ]]&gt;</code>'
      ]) +
      code('students.xml', `
<?xml version="1.0" encoding="UTF-8"?>
<college>
  <student id="101">
    <name>Manohar</name>
    <dept>CSE</dept>
    <year>3</year>
    <marks>88</marks>
  </student>
  <student id="102">
    <name>Ravi</name>
    <dept>IT</dept>
    <year>2</year>
    <marks>74</marks>
  </student>
</college>
`) +
      table(['Term','Meaning'],[
        ['Well-formed XML','Obeys the XML syntax rules'],
        ['Valid XML','Well-formed <b>and</b> conforms to a DTD or XSD']
      ])
    ),
    section('2. DTD (Document Type Definition)',
      p('A <b>DTD</b> defines the <b>legal structure</b> of an XML document: which elements and attributes are allowed, their order, and how many times they may occur. It can be <b>internal</b> (inside the XML file) or <b>external</b> (separate .dtd file).') +
      code('students.dtd', `
<!ELEMENT college (student+)>
<!ELEMENT student (name, dept, year, marks)>
<!ATTLIST student id CDATA #REQUIRED>
<!ELEMENT name  (#PCDATA)>
<!ELEMENT dept  (#PCDATA)>
<!ELEMENT year  (#PCDATA)>
<!ELEMENT marks (#PCDATA)>
`) +
      code('Linking DTD in XML', `
<?xml version="1.0"?>
<!DOCTYPE college SYSTEM "students.dtd">
<college> ... </college>
`) +
      code('Internal DTD example', `
<?xml version="1.0"?>
<!DOCTYPE note [
  <!ELEMENT note (to, from, body)>
  <!ELEMENT to (#PCDATA)>
  <!ELEMENT from (#PCDATA)>
  <!ELEMENT body (#PCDATA)>
]>
<note><to>Ravi</to><from>Manohar</from><body>Hello</body></note>
`) +
      table(['DTD symbol','Meaning'],[
        ['<code class="inline">(a, b)</code>','Sequence: a followed by b'],
        ['<code class="inline">(a | b)</code>','Choice: a or b'],
        ['<code class="inline">+</code>','One or more'],
        ['<code class="inline">*</code>','Zero or more'],
        ['<code class="inline">?</code>','Zero or one'],
        ['<code class="inline">#PCDATA</code>','Parsed character data (text)'],
        ['<code class="inline">EMPTY / ANY</code>','No content / any content'],
        ['<code class="inline">#REQUIRED, #IMPLIED, #FIXED</code>','Attribute rules']
      ])
    ),
    section('3. XSD (XML Schema Definition)',
      p('<b>XML Schema (XSD)</b> is the more powerful, XML-based replacement of DTD. It describes the structure <b>and data types</b> of an XML document and supports namespaces.') +
      code('students.xsd', `
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="college">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="student" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="name"  type="xs:string"/>
              <xs:element name="dept"  type="xs:string"/>
              <xs:element name="year">
                <xs:simpleType>
                  <xs:restriction base="xs:integer">
                    <xs:minInclusive value="1"/>
                    <xs:maxInclusive value="4"/>
                  </xs:restriction>
                </xs:simpleType>
              </xs:element>
              <xs:element name="marks" type="xs:decimal"/>
            </xs:sequence>
            <xs:attribute name="id" type="xs:integer" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>
`) +
      code('Linking the schema in XML', `
<college xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="students.xsd">
  ...
</college>
`) +
      h3('Common XSD data types') +
      table(['Category','Types'],[
        ['Simple','xs:string, xs:integer, xs:decimal, xs:boolean, xs:date, xs:time'],
        ['Restrictions','minInclusive, maxInclusive, length, pattern, enumeration'],
        ['Complex','xs:complexType with xs:sequence, xs:choice, xs:all'],
        ['Occurrence','minOccurs, maxOccurs (default 1)']
      ])
    ),
    section('4. DTD vs XSD',
      table(['Feature','DTD','XSD'],[
        ['Syntax','Non-XML (SGML style)','XML syntax'],
        ['Data types','Only #PCDATA / CDATA (limited)','Rich: string, int, date, boolean and custom types'],
        ['Namespaces','Not supported','Supported'],
        ['Occurrence control','Only ? * +','Exact numbers with minOccurs / maxOccurs'],
        ['Extensibility','Limited','Highly extensible; type inheritance'],
        ['Parsing','Needs a separate parser','Parsed like any XML document'],
        ['Complexity','Simple','More verbose, more powerful']
      ])
    ),
    section('5. XSLT (Extensible Stylesheet Language Transformations)',
      p('<b>XSLT</b> is an XML-based language used to <b>transform</b> an XML document into another format such as <b>HTML, another XML, or plain text</b>. An XSLT processor reads the source XML and the XSLT stylesheet and produces the result tree. It uses <b>XPath</b> to select nodes.') +
      diagram(
        svg(600,110,
          svgBox(10,30,110,50,'XML source','bx') +
          svgBox(190,5,130,40,'XSLT stylesheet','bx3') +
          svgBox(190,60,130,45,'XSLT processor','bx2') +
          svgBox(400,30,120,50,'Output\n(HTML/XML/text)','bx') +
          svgArrow(120,55,190,80) + svgArrow(255,45,255,60) + svgArrow(320,82,400,60)
        ),
        'Figure 2: XSLT transformation') +
      code('students.xsl', `
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head><title>Student List</title></head>
      <body>
        <h2>Student Details</h2>
        <table border="1" cellpadding="6">
          <tr style="background:#3b5bdb;color:#fff">
            <th>ID</th><th>Name</th><th>Dept</th><th>Marks</th>
          </tr>
          <xsl:for-each select="college/student">
            <xsl:sort select="marks" data-type="number" order="descending"/>
            <tr>
              <td><xsl:value-of select="@id"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="dept"/></td>
              <td>
                <xsl:choose>
                  <xsl:when test="marks &gt;= 80">
                    <b><xsl:value-of select="marks"/></b>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="marks"/>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`) +
      code('Linking the stylesheet in XML', `
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="students.xsl"?>
<college> ... </college>
`) +
      table(['XSLT element','Purpose'],[
        ['<code class="inline">xsl:template match="..."</code>','Defines a rule for matching nodes'],
        ['<code class="inline">xsl:value-of select="..."</code>','Outputs the value of a node/attribute'],
        ['<code class="inline">xsl:for-each</code>','Loop over a node set'],
        ['<code class="inline">xsl:if</code>, <code class="inline">xsl:choose / when / otherwise</code>','Conditions'],
        ['<code class="inline">xsl:sort</code>','Sort nodes'],
        ['<code class="inline">xsl:apply-templates</code>','Apply other templates to child nodes'],
        ['<code class="inline">xsl:attribute</code>, <code class="inline">xsl:element</code>','Create attributes / elements']
      ])
    ),
    section('6. Comparison Summary',
      table(['Technology','Purpose','Describes'],[
        ['XML','Store and transport data','The data itself'],
        ['DTD','Validate structure (basic)','Allowed elements and attributes'],
        ['XSD','Validate structure and data types (advanced)','Elements, attributes, types, constraints'],
        ['XSLT','Transform XML to HTML / XML / text','How to present or convert the data']
      ])
    ),
    section('7. Applications of XML',
      ul([
        'Data exchange between different systems (web services: SOAP, RSS/Atom feeds).',
        'Configuration files (web.xml, Android manifest, pom.xml).',
        'Document formats (DOCX, SVG, XHTML).',
        'AJAX responses (responseXML).'
      ])
    )
  ],
  rapid: [
    'XML stores and transports data; user-defined tags; one root; case-sensitive; properly nested.',
    'Well-formed = syntax correct; Valid = also follows DTD/XSD.',
    'DTD: !ELEMENT, !ATTLIST; limited types; not XML syntax.',
    'XSD: XML syntax, data types, namespaces, minOccurs/maxOccurs.',
    'XSLT: transforms XML to HTML/other formats using templates and XPath.'
  ]
}

]);
