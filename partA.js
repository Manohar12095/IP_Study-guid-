/* PART A: 2 mark questions for all five units */

addUnit(1, 'Web Basics, HTML & CSS', [{
  id: 'pa1', part: 'A', title: 'Part A - Unit 1',
  qa: [
    { q: 'What is Domain Name System (DNS)?',
      a: p('<b>DNS</b> is a distributed, hierarchical naming system that <b>translates human-readable domain names</b> (e.g. www.google.com) into <b>IP addresses</b> (e.g. 142.250.77.36) that computers use to locate each other. It works like the phone book of the Internet and uses <b>UDP/TCP port 53</b>.') +
         p('<b>Resolution order:</b> Browser cache, OS cache, Resolver, Root server, TLD server, Authoritative server, IP address returned.') },
    { q: 'What is World Wide Web (WWW)?',
      a: p('The <b>World Wide Web</b> is a global system of interlinked <b>hypertext documents and resources</b> identified by <b>URLs</b>, transferred using <b>HTTP</b>, written in <b>HTML</b> and viewed using a <b>web browser</b>. It was invented by <b>Tim Berners-Lee</b> at CERN in 1989.') +
         p('The Web is a <i>service that runs on</i> the Internet; the Internet is the underlying network of networks.') },
    { q: 'List out the advantages and limitations of CSS.',
      a: table(['Advantages','Limitations'],[
          ['Separates content (HTML) from presentation','Browser compatibility differences'],
          ['One external file styles many pages (reuse, easy maintenance)','Different CSS levels (CSS1/2/3) are supported differently'],
          ['Faster page loading (file is cached)','Cannot perform logic or calculations; no variables in plain old CSS'],
          ['Consistent look; precise layout control (Flexbox, Grid)','Security: no way to hide CSS source; cannot style by parent selection (older CSS)'],
          ['Supports responsive design and media queries','Complex style sheets are hard to debug']
        ]) },
    { q: 'Name the three ways of inserting a style sheet.',
      a: ol([
          '<b>Inline CSS</b>: <code class="inline">&lt;p style="color:red;"&gt;</code>',
          '<b>Internal CSS</b>: <code class="inline">&lt;style&gt; p{color:red;} &lt;/style&gt;</code> in the head section',
          '<b>External CSS</b>: <code class="inline">&lt;link rel="stylesheet" href="style.css"&gt;</code>'
        ]) },
    { q: 'Demonstrate how to play an Audio and Video using HTML.',
      a: p('HTML5 provides the <code class="inline">&lt;audio&gt;</code> and <code class="inline">&lt;video&gt;</code> tags. The <code class="inline">controls</code> attribute shows play/pause/volume buttons and <code class="inline">&lt;source&gt;</code> gives alternative formats.') +
         code('media.html', `
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Your browser does not support audio.
</audio>

<video width="480" height="270" controls autoplay muted loop poster="thumb.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser does not support video.
</video>
`) },
    { q: 'HTML Table Row span and Column span.',
      a: p('<code class="inline">rowspan</code> merges cells <b>vertically</b> across rows; <code class="inline">colspan</code> merges cells <b>horizontally</b> across columns.') +
         code('span.html', `
<table border="1">
  <tr>
    <th colspan="3">Marks Statement</th>
  </tr>
  <tr>
    <td rowspan="2">Ravi</td>
    <td>Maths</td><td>90</td>
  </tr>
  <tr>
    <td>Physics</td><td>85</td>
  </tr>
</table>
`) }
  ]
}]);

addUnit(2, 'JavaScript & DOM', [{
  id: 'pa2', part: 'A', title: 'Part A - Unit 2',
  qa: [
    { q: 'What are the different types of objects in JavaScript?',
      a: table(['Type','Description','Examples'],[
          ['Built-in (native) objects','Provided by the JavaScript language','Object, Array, String, Number, Boolean, Date, Math, RegExp, JSON, Error, Function'],
          ['Host (browser) objects','Provided by the browser environment (BOM/DOM)','window, document, navigator, location, history, screen'],
          ['User-defined objects','Created by the programmer','Object literal <code class="inline">{name:"Ravi"}</code>, constructor function, class, <code class="inline">Object.create()</code>']
        ]) },
    { q: 'Compare DHTML and HTML.',
      a: table(['HTML','DHTML'],[
          ['Markup language for static content','Combination of HTML + CSS + JavaScript + DOM'],
          ['Page content does not change after loading','Page content and style change dynamically after loading'],
          ['No interaction without server request','Interactive; handles events on the client side'],
          ['Simple, fast to create','More complex, needs scripting knowledge'],
          ['Not a technology set, just a language','Not a language; a technique/collection of technologies']
        ]) },
    { q: 'Name the JavaScript method to retrieve the date and time.',
      a: p('The <b>Date object</b> is used: <code class="inline">new Date()</code> returns the current date and time. Useful methods: <code class="inline">getDate()</code>, <code class="inline">getMonth()</code> (0-11), <code class="inline">getFullYear()</code>, <code class="inline">getDay()</code>, <code class="inline">getHours()</code>, <code class="inline">getMinutes()</code>, <code class="inline">getSeconds()</code>, <code class="inline">getTime()</code>, <code class="inline">Date.now()</code>, <code class="inline">toLocaleString()</code>.') +
         code('', `
var d = new Date();
document.write(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
document.write(" " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
`) },
    { q: 'Explain the need for client side scripting.',
      a: ul([
          '<b>Faster response:</b> code runs in the browser, so no round trip to the server for simple tasks.',
          '<b>Reduces server load and bandwidth.</b>',
          '<b>Form validation</b> before data is sent to the server.',
          '<b>Interactivity:</b> menus, animations, sliders, dynamic content (DHTML, AJAX).',
          '<b>Better user experience:</b> page updates without reloading.'
        ]) + p('Examples: JavaScript, VBScript, TypeScript.') },
    { q: 'Interpret how exceptions are handled in JavaScript.',
      a: p('JavaScript uses <b>try, catch, finally</b> and <b>throw</b>. Code that may fail is placed in <code class="inline">try</code>; if an error occurs, control moves to <code class="inline">catch</code>; <code class="inline">finally</code> always runs; <code class="inline">throw</code> creates a custom error.') +
         code('', `
try {
  var age = -5;
  if (age < 0) throw new Error("Age cannot be negative");
  undefinedFunction();            // ReferenceError
} catch (err) {
  console.log(err.name + ": " + err.message);
} finally {
  console.log("Always executed");
}
`) }
  ]
}]);

addUnit(3, 'Servlets & JSP', [{
  id: 'pa3', part: 'A', title: 'Part A - Unit 3',
  qa: [
    { q: 'Compare GET and POST methods.',
      a: table(['GET','POST'],[
          ['Data appended to URL (query string)','Data sent in the request body'],
          ['Visible in address bar; less secure','Not visible; more secure'],
          ['Limited length (URL limit)','No size limit'],
          ['Can be bookmarked and cached','Cannot be bookmarked; not cached'],
          ['Used to retrieve data (idempotent)','Used to submit/modify data']
        ]) },
    { q: 'Compare Servlet and JSP.',
      a: table(['Servlet','JSP'],[
          ['Java code with HTML inside <code class="inline">out.println()</code>','HTML with Java code in special tags'],
          ['Good for business logic (controller)','Good for presentation (view)'],
          ['Compiled manually, mapped in web.xml','Translated to a servlet and compiled automatically'],
          ['Harder for designers to maintain','Easy for web designers'],
          ['Faster for first request','First request slower (translation), later same speed']
        ]) },
    { q: 'Compare client side and server side scripting.',
      a: table(['Client side','Server side'],[
          ['Runs in the user\'s browser','Runs on the web server'],
          ['JavaScript, VBScript, HTML/CSS','PHP, JSP/Servlets, ASP.NET, Node.js, Python'],
          ['Code visible to the user','Code hidden; only output (HTML) is sent'],
          ['No access to server database or files','Can access databases and files'],
          ['Used for validation, effects, interactivity','Used for authentication, DB operations, business logic'],
          ['Less secure','More secure']
        ]) },
    { q: 'Compare doGet and doPost methods in Servlet.',
      a: table(['doGet()','doPost()'],[
          ['Handles HTTP GET requests','Handles HTTP POST requests'],
          ['Parameters come from the URL query string','Parameters come from the request body'],
          ['Limited data size, data visible','Large data, data hidden'],
          ['Idempotent: safe to repeat','Not idempotent: may change server state'],
          ['Signature: <code class="inline">protected void doGet(HttpServletRequest req, HttpServletResponse res)</code>','Signature: <code class="inline">protected void doPost(HttpServletRequest req, HttpServletResponse res)</code>']
        ]) },
    { q: 'Summarize various JSP scripting components (JSP tags).',
      a: table(['Component','Syntax','Purpose'],[
          ['Scriptlet','<code class="inline">&lt;% code %&gt;</code>','Java statements placed in _jspService()'],
          ['Expression','<code class="inline">&lt;%= expr %&gt;</code>','Evaluates and prints a value'],
          ['Declaration','<code class="inline">&lt;%! int x=0; %&gt;</code>','Declares variables/methods at class level'],
          ['Directive','<code class="inline">&lt;%@ page ... %&gt;</code>','Instructions to the container'],
          ['Comment','<code class="inline">&lt;%-- ... --%&gt;</code>','JSP comment, not sent to the browser'],
          ['Action','<code class="inline">&lt;jsp:include .../&gt;</code>','Standard actions at request time']
        ]) },
    { q: 'List the JSP Directives and its purpose.',
      a: table(['Directive','Purpose','Example'],[
          ['page','Defines page-level attributes (language, import, contentType, errorPage, session)','<code class="inline">&lt;%@ page import="java.util.*" %&gt;</code>'],
          ['include','Includes another file at translation time (static include)','<code class="inline">&lt;%@ include file="header.jsp" %&gt;</code>'],
          ['taglib','Declares a custom tag library (e.g. JSTL)','<code class="inline">&lt;%@ taglib uri="..." prefix="c" %&gt;</code>']
        ]) },
    { q: 'What is meant by Scriptlet?',
      a: p('A <b>scriptlet</b> is a block of <b>Java code embedded in a JSP page</b> between <code class="inline">&lt;%</code> and <code class="inline">%&gt;</code>. It is copied into the <code class="inline">_jspService()</code> method of the generated servlet and runs on every request.') +
         code('', `
<% int a = 10, b = 20;
   out.println("Sum = " + (a + b)); %>
`) }
  ]
}]);

addUnit(4, 'PHP', [{
  id: 'pa4', part: 'A', title: 'Part A - Unit 4',
  qa: [
    { q: 'What is Server side validation?',
      a: p('<b>Server-side validation</b> checks the data submitted by the user <b>on the web server</b> (using PHP, JSP etc.) before it is processed or stored. It cannot be bypassed by disabling JavaScript, so it is <b>secure and mandatory</b>, whereas client-side validation only improves user experience.') +
         code('', `
<?php
if (empty($_POST["email"]) || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email";
}
?>
`) },
    { q: 'Explain Cookies in PHP.',
      a: p('A <b>cookie</b> is a small text file (about 4 KB) stored in the <b>user\'s browser</b> by the server to remember information between requests. Created with <code class="inline">setcookie(name, value, expire, path)</code> before any output, read using <code class="inline">$_COOKIE</code>, and deleted by setting a past expiry.') +
         code('', `
<?php
setcookie("user", "Manohar", time() + 86400, "/");   // 1 day
echo $_COOKIE["user"];                               // from the next request
setcookie("user", "", time() - 3600, "/");           // delete
?>
`) },
    { q: 'Illustrate the use of associative array in PHP.',
      a: p('An <b>associative array</b> uses <b>named keys</b> (strings) instead of numeric indexes to access values.') +
         code('', `
<?php
$marks = ["Maths" => 90, "Physics" => 85, "Chemistry" => 78];
echo $marks["Physics"];                 // 85
$marks["English"] = 88;                 // add
foreach ($marks as $subject => $score) {
    echo "$subject : $score <br>";
}
?>
`) },
    { q: 'What is the syntax of foreach statement in PHP with example?',
      a: code('Syntax', `
foreach ($array as $value) { /* statements */ }
foreach ($array as $key => $value) { /* statements */ }
`) +
         code('Example', `
<?php
$colors = ["Red", "Green", "Blue"];
foreach ($colors as $c) { echo $c . "<br>"; }

$stu = ["name" => "Ravi", "dept" => "CSE"];
foreach ($stu as $k => $v) { echo "$k = $v<br>"; }
?>
`) },
    { q: 'How to define the variable and constant in PHP?',
      a: ul([
          '<b>Variable:</b> starts with <code class="inline">$</code>, case sensitive, no type declaration needed. Example: <code class="inline">$name = "Ravi"; $age = 20;</code>',
          '<b>Constant:</b> value cannot change once defined; no <code class="inline">$</code> sign. Defined by <code class="inline">define("PI", 3.14);</code> or <code class="inline">const PI = 3.14;</code>'
        ]) +
         code('', `
<?php
$city = "Madurai";
define("COLLEGE", "KCET");
const YEAR = 2026;
echo $city . " " . COLLEGE . " " . YEAR;
?>
`) },
    { q: 'How to define the User Defined function in PHP? Give an example.',
      a: code('Syntax', `
function functionName($param1, $param2 = default) {
    // statements
    return $value;
}
`) +
         code('Example', `
<?php
function add($a, $b) {
    return $a + $b;
}
echo add(10, 20);     // 30
?>
`) },
    { q: 'List out the file operations in PHP.',
      a: table(['Operation','Functions'],[
          ['Open / close','fopen(), fclose()'],
          ['Read','fread(), fgets(), fgetc(), file_get_contents(), file(), readfile()'],
          ['Write / append','fwrite(), fputs(), file_put_contents()'],
          ['Check','file_exists(), is_file(), is_dir(), feof(), filesize()'],
          ['Manage','copy(), rename(), unlink() (delete), mkdir(), rmdir()'],
          ['Upload','$_FILES, move_uploaded_file()']
        ]) }
  ]
}]);

addUnit(5, 'AJAX & XML', [{
  id: 'pa5', part: 'A', title: 'Part A - Unit 5',
  qa: [
    { q: 'Explain about JSON.',
      a: p('<b>JSON (JavaScript Object Notation)</b> is a lightweight, text-based, language-independent <b>data interchange format</b> that is easy for humans to read and for machines to parse. It stores data as <b>key-value pairs</b> and arrays, and is widely used in web APIs and AJAX as a simpler alternative to XML.') +
         code('', `
{ "name": "Ravi", "age": 20, "skills": ["HTML", "PHP"] }
`) +
         p('Convert with <code class="inline">JSON.parse(text)</code> (string to object) and <code class="inline">JSON.stringify(obj)</code> (object to string); PHP uses <code class="inline">json_encode()</code> / <code class="inline">json_decode()</code>.') },
    { q: 'Summarize the XML Schema for the student marks details.',
      a: p('An <b>XML Schema (XSD)</b> defines the elements, attributes, structure and data types of the student marks XML.') +
         code('marks.xsd', `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="students">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="student" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="name"  type="xs:string"/>
              <xs:element name="regno" type="xs:string"/>
              <xs:element name="mark"  type="xs:integer"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
`) },
    { q: 'Why AJAX is used in web page creation?',
      a: ul([
          'To <b>update part of a page without reloading</b> the whole page.',
          'Gives a <b>faster, smoother, desktop-like</b> user experience.',
          'Reduces <b>bandwidth and server load</b> (only data is exchanged).',
          '<b>Asynchronous:</b> user can keep working while data loads.',
          'Used for live search, auto-complete, form validation, chat, maps.'
        ]) },
    { q: 'Define SAX parser.',
      a: p('<b>SAX (Simple API for XML)</b> is an <b>event-driven, sequential-access</b> XML parser. It reads the document from start to end and fires events (<code class="inline">startElement</code>, <code class="inline">characters</code>, <code class="inline">endElement</code>) to handler methods, without loading the entire document in memory.') +
         table(['SAX','DOM'],[
           ['Event based, read-only, forward only','Tree based, in memory, read/write'],
           ['Low memory, fast for large files','High memory use']
         ]) },
    { q: 'Define JSON structure.',
      a: p('JSON is built on two structures:') +
         ul([
           '<b>Object</b>: unordered collection of <b>"key": value</b> pairs inside <code class="inline">{ }</code>; keys are strings.',
           '<b>Array</b>: ordered list of values inside <code class="inline">[ ]</code>.',
           '<b>Values</b> can be: string, number, boolean (true/false), null, object, or array.'
         ]) +
         code('', `
{
  "college": "KCET",
  "year": 3,
  "active": true,
  "students": [
    { "name": "Ravi",  "marks": 85 },
    { "name": "Kumar", "marks": 78 }
  ]
}
`) },
    { q: 'List out the advantages and disadvantages of AJAX.',
      a: table(['Advantages','Disadvantages'],[
          ['Page updates without reload; faster','Needs JavaScript enabled'],
          ['Less bandwidth and server load','Back button / bookmarking problems'],
          ['Asynchronous, responsive UI','Hard to debug; more client code'],
          ['Better user experience','Not search-engine friendly; security risks (XSS, CSRF)']
        ]) },
    { q: 'Define DTD in XML.',
      a: p('A <b>DTD (Document Type Definition)</b> defines the <b>legal structure</b> of an XML document: allowed elements, their order and number, and attributes. An XML document that follows its DTD is called <b>valid</b>.') +
         code('', `
<!DOCTYPE note [
  <!ELEMENT note (to, from, body)>
  <!ELEMENT to (#PCDATA)>
  <!ELEMENT from (#PCDATA)>
  <!ELEMENT body (#PCDATA)>
]>
`) }
  ]
}]);
