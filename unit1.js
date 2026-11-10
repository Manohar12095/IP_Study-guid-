addUnit(1, 'Web Basics, HTML & CSS', [

/* ---------- 1. HTTP Request and Response ---------- */
{
  id: 'u1q1',
  title: 'HTTP Request and Response',
  tags: ['http','request','response','status codes','methods','headers'],
  intro:
    p('<b>HTTP (HyperText Transfer Protocol)</b> is an application layer, stateless, request-response protocol used for communication between a web client (browser) and a web server. It runs over TCP, uses port <b>80</b> by default (HTTPS uses <b>443</b>) and is the foundation of data exchange on the World Wide Web.') +
    p('Every interaction has two parts: the client sends an <b>HTTP Request</b>, and the server replies with an <b>HTTP Response</b>.'),
  sections: [
    section('1. HTTP Communication Model',
      diagram(
        svg(640,200,
          svgBox(30,70,140,60,'Client\n(Browser)','bx') +
          svgBox(470,70,140,60,'Web Server','bx3') +
          svgArrow(170,90,470,90,'HTTP Request') +
          svgArrow(470,115,170,115,'HTTP Response') +
          '<text x="320" y="170" text-anchor="middle" font-size="12">Carried over TCP/IP connection</text>'
        ),
        'Figure 1: HTTP request-response cycle') +
      ol([
        'User types a URL or clicks a link in the browser.',
        'Browser resolves the domain name to an IP address (DNS) and opens a TCP connection to the server.',
        'Browser sends an HTTP request message.',
        'Server processes the request (static file, servlet, PHP script etc.).',
        'Server sends an HTTP response message back.',
        'Browser renders the content; the connection is closed or kept alive.'
      ])
    ),
    section('2. HTTP Request Message',
      p('A request has four parts: <b>request line</b>, <b>request headers</b>, a <b>blank line</b> and an optional <b>message body</b>.') +
      code('Sample HTTP request', `
POST /login HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Content-Type: application/x-www-form-urlencoded
Content-Length: 27

username=ravi&password=1234
`) +
      table(['Part','Description','Example'],[
        ['Request line','Method + URL path + HTTP version','<code class="inline">GET /index.html HTTP/1.1</code>'],
        ['Headers','Key-value pairs giving extra information','Host, User-Agent, Accept, Cookie'],
        ['Blank line','Separates headers from body','CRLF'],
        ['Body','Data sent to server (POST/PUT)','Form fields, JSON']
      ]) +
      h3('Common HTTP methods') +
      table(['Method','Purpose'],[
        ['GET','Retrieve a resource. Data is sent in URL query string. Safe and idempotent.'],
        ['POST','Submit data to the server (forms, uploads). Data is in the body.'],
        ['PUT','Create or replace a resource.'],
        ['DELETE','Delete a resource.'],
        ['HEAD','Same as GET but returns headers only.'],
        ['OPTIONS','Asks which methods the server supports.'],
        ['PATCH','Partially modify a resource.']
      ])
    ),
    section('3. HTTP Response Message',
      p('A response has a <b>status line</b>, <b>response headers</b>, a blank line and the <b>message body</b> (the actual HTML, image, JSON etc.).') +
      code('Sample HTTP response', `
HTTP/1.1 200 OK
Date: Tue, 10 Nov 2026 10:30:00 GMT
Server: Apache/2.4
Content-Type: text/html; charset=UTF-8
Content-Length: 1245
Set-Cookie: sessionId=abc123

<html>
  <body><h1>Welcome</h1></body>
</html>
`) +
      h3('HTTP status code classes') +
      table(['Range','Category','Examples'],[
        ['1xx','Informational','100 Continue'],
        ['2xx','Success','200 OK, 201 Created, 204 No Content'],
        ['3xx','Redirection','301 Moved Permanently, 302 Found, 304 Not Modified'],
        ['4xx','Client error','400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found'],
        ['5xx','Server error','500 Internal Server Error, 503 Service Unavailable']
      ])
    ),
    section('4. Important Headers',
      table(['Header','Type','Use'],[
        ['Host','Request','Domain name of the server'],
        ['User-Agent','Request','Identifies the browser/client'],
        ['Accept','Request','Content types the client can handle'],
        ['Cookie','Request','Sends stored cookies to the server'],
        ['Content-Type','Both','Media type of the body'],
        ['Content-Length','Both','Size of the body in bytes'],
        ['Set-Cookie','Response','Asks the browser to store a cookie'],
        ['Location','Response','Target URL for redirects'],
        ['Cache-Control','Both','Caching rules']
      ])
    ),
    section('5. GET vs POST',
      table(['Feature','GET','POST'],[
        ['Data location','URL query string','Request body'],
        ['Visibility','Visible in the address bar','Not visible in URL'],
        ['Size limit','Limited by URL length','No practical limit'],
        ['Security','Less secure','More secure (with HTTPS)'],
        ['Bookmarking','Possible','Not possible'],
        ['Use','Fetching data, search','Login, registration, uploads']
      ])
    ),
    section('6. HTTP Characteristics',
      ul([
        '<b>Stateless:</b> every request is independent, so the server does not remember earlier requests. Cookies and sessions are used to maintain state.',
        '<b>Connectionless (HTTP/1.0):</b> one connection per request. HTTP/1.1 adds <b>persistent connections</b> (keep-alive).',
        '<b>Media independent:</b> any type of data can be sent if both sides understand it.',
        '<b>HTTPS</b> adds TLS/SSL encryption for confidentiality and integrity.'
      ])
    )
  ],
  rapid: [
    'HTTP = stateless, application layer, request-response protocol over TCP, port 80.',
    'Request = request line + headers + blank line + body.',
    'Response = status line + headers + blank line + body.',
    'Status classes: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error.',
    'GET puts data in the URL; POST puts data in the body.'
  ]
},

/* ---------- 2. HTML Semantic Elements ---------- */
{
  id: 'u1q2',
  title: 'HTML Semantic Elements',
  tags: ['html5','semantic','header','footer','article','section','nav'],
  intro:
    p('<b>Semantic elements</b> are HTML5 tags whose names clearly describe the <i>meaning</i> and role of the content they hold. Non-semantic tags like <code class="inline">&lt;div&gt;</code> and <code class="inline">&lt;span&gt;</code> tell nothing about their content, whereas <code class="inline">&lt;header&gt;</code>, <code class="inline">&lt;nav&gt;</code> and <code class="inline">&lt;footer&gt;</code> do.'),
  sections: [
    section('1. Why Semantic Elements?',
      ul([
        '<b>Readability:</b> developers instantly understand the page structure.',
        '<b>SEO:</b> search engines understand which part is the main content, navigation etc.',
        '<b>Accessibility:</b> screen readers can jump between landmarks such as navigation and main content.',
        '<b>Maintainability:</b> less reliance on <code class="inline">div id="header"</code> style naming.',
        '<b>Consistency:</b> a common vocabulary across all websites.'
      ])
    ),
    section('2. Typical Semantic Page Layout',
      diagram(
        svg(520,330,
          svgBox(20,10,480,50,'&lt;header&gt; - logo, title, tagline'.replace(/&lt;/g,'<').replace(/&gt;/g,'>'),'bx') +
          svgBox(20,70,480,40,'<nav> - navigation links','bx2') +
          svgBox(20,120,320,140,'<main>\n<section> / <article>\ncontent','bx3') +
          svgBox(350,120,150,140,'<aside>\nsidebar, ads,\nrelated links','bx2') +
          svgBox(20,270,480,50,'<footer> - copyright, contact, links','bx')
        ),
        'Figure 1: Layout using semantic elements')
    ),
    section('3. Important Semantic Elements',
      table(['Element','Purpose'],[
        ['<code class="inline">&lt;header&gt;</code>','Introductory content or navigation aids for a page or section (logo, heading).'],
        ['<code class="inline">&lt;nav&gt;</code>','Block of major navigation links.'],
        ['<code class="inline">&lt;main&gt;</code>','Dominant, unique content of the page (only one per page).'],
        ['<code class="inline">&lt;section&gt;</code>','Thematic grouping of content, usually with a heading.'],
        ['<code class="inline">&lt;article&gt;</code>','Self-contained, independently distributable content (blog post, news item).'],
        ['<code class="inline">&lt;aside&gt;</code>','Content indirectly related to the main content (sidebar, pull quote).'],
        ['<code class="inline">&lt;footer&gt;</code>','Footer of a page or section (author, copyright, links).'],
        ['<code class="inline">&lt;figure&gt;</code> / <code class="inline">&lt;figcaption&gt;</code>','Image/diagram/code with a caption.'],
        ['<code class="inline">&lt;time&gt;</code>','A date/time in machine-readable form.'],
        ['<code class="inline">&lt;mark&gt;</code>','Highlighted/relevant text.'],
        ['<code class="inline">&lt;address&gt;</code>','Contact information of the author/owner.'],
        ['<code class="inline">&lt;details&gt;</code> / <code class="inline">&lt;summary&gt;</code>','Collapsible content widget.']
      ])
    ),
    section('4. Example Program',
      code('semantic.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Page</title>
</head>
<body>
  <header>
    <h1>Tech Blog</h1>
    <p>Learn web development</p>
  </header>

  <nav>
    <a href="#">Home</a> |
    <a href="#">Articles</a> |
    <a href="#">Contact</a>
  </nav>

  <main>
    <section>
      <h2>Latest Articles</h2>
      <article>
        <h3>Understanding HTTP</h3>
        <p>Published on <time datetime="2026-11-10">10 Nov 2026</time></p>
        <p>HTTP is a stateless request-response protocol.</p>
        <figure>
          <img src="http.png" alt="HTTP cycle">
          <figcaption>Fig: HTTP cycle</figcaption>
        </figure>
      </article>
    </section>
    <aside>
      <h3>Related</h3>
      <p>Read about DNS and CSS.</p>
    </aside>
  </main>

  <footer>
    <address>Contact: admin@example.com</address>
    <p>&copy; 2026 Tech Blog</p>
  </footer>
</body>
</html>
`)
    ),
    section('5. Semantic vs Non-semantic',
      table(['Semantic','Non-semantic'],[
        ['header, nav, main, article, section, footer','div, span'],
        ['Meaning is clear from the tag name','Meaning only through id/class names'],
        ['Better SEO and accessibility','No built-in meaning'],
        ['Cleaner and self-documenting code','Needs comments/classes to explain']
      ])
    ),
    section('6. section vs article',
      p('<b>article</b> is content that still makes sense on its own if copied to another site (a blog post). <b>section</b> groups related content under a heading and is a part of a larger whole (chapters of a page).')
    )
  ],
  rapid: [
    'Semantic elements describe their meaning: header, nav, main, section, article, aside, footer.',
    'Benefits: SEO, accessibility, readability, maintainability.',
    'Only one <main> per page. <article> is self-contained; <section> is a thematic group.',
    '<div> and <span> are non-semantic.'
  ]
},

/* ---------- 3. Working of DNS ---------- */
{
  id: 'u1q3',
  title: 'Working of DNS',
  tags: ['dns','domain name system','resolver','root server','tld','recursive','iterative'],
  intro:
    p('The <b>Domain Name System (DNS)</b> is a distributed, hierarchical database that translates human-friendly <b>domain names</b> (www.example.com) into machine-readable <b>IP addresses</b> (93.184.216.34). It is often called the <i>phone book of the Internet</i>. DNS uses <b>UDP port 53</b> (TCP for large responses and zone transfers).'),
  sections: [
    section('1. DNS Hierarchy',
      diagram(
        svg(560,260,
          svgBox(230,10,100,40,'Root (.)','bx') +
          svgBox(60,90,110,40,'.com','bx2') + svgBox(225,90,110,40,'.org','bx2') + svgBox(390,90,110,40,'.in','bx2') +
          svgBox(40,175,150,40,'example.com','bx3') + svgBox(370,175,150,40,'co.in','bx3') +
          svgArrow(280,50,115,90) + svgArrow(280,50,280,90) + svgArrow(280,50,445,90) +
          svgArrow(115,130,115,175) + svgArrow(445,130,445,175)
        ),
        'Figure 1: Domain name hierarchy') +
      table(['Level','Example','Role'],[
        ['Root servers','.','13 logical root server clusters (A to M); point to TLD servers'],
        ['TLD servers','.com, .org, .in, .edu','Know the authoritative servers for each domain'],
        ['Authoritative servers','ns1.example.com','Hold the actual DNS records for the domain']
      ])
    ),
    section('2. DNS Components',
      ul([
        '<b>DNS Resolver (recursive resolver):</b> run by the ISP or public DNS (8.8.8.8). Does the lookup work on behalf of the client.',
        '<b>Root name server:</b> directs the resolver to the right TLD server.',
        '<b>TLD name server:</b> directs the resolver to the domain authoritative server.',
        '<b>Authoritative name server:</b> gives the final answer (IP address).',
        '<b>Local cache:</b> browser, OS and resolver cache answers for the record TTL.'
      ])
    ),
    section('3. Step-by-step Resolution of www.example.com',
      diagram(
        svg(640,300,
          svgBox(10,110,100,50,'Browser /\nClient','bx') +
          svgBox(180,110,110,50,'Recursive\nResolver','bx2') +
          svgBox(400,10,110,45,'Root Server','bx3') +
          svgBox(400,105,110,45,'TLD (.com)','bx3') +
          svgBox(400,200,110,45,'Authoritative','bx3') +
          svgArrow(110,125,180,125,'1') + svgArrow(290,115,400,35,'2') + svgArrow(290,128,400,128,'4') + svgArrow(290,145,400,222,'6') +
          svgArrow(180,148,110,148,'8') +
          '<text x="530" y="35" font-size="11">3: refer to .com</text>' +
          '<text x="530" y="130" font-size="11">5: refer to NS</text>' +
          '<text x="530" y="225" font-size="11">7: IP address</text>'
        ),
        'Figure 2: Recursive resolver performing iterative queries') +
      ol([
        'User enters <b>www.example.com</b>. Browser checks its own cache, then the OS cache and the hosts file.',
        'If not found, the query goes to the <b>recursive resolver</b> (ISP/Google DNS).',
        'Resolver checks its cache; if missing it asks a <b>root server</b>.',
        'Root server replies with the address of the <b>.com TLD server</b>.',
        'Resolver asks the <b>TLD server</b>, which replies with the <b>authoritative name server</b> of example.com.',
        'Resolver asks the <b>authoritative server</b>, which returns the <b>IP address</b> (A record).',
        'Resolver caches the answer (according to TTL) and returns it to the browser.',
        'Browser opens a TCP connection to that IP and sends the HTTP request.'
      ])
    ),
    section('4. Types of DNS Queries',
      table(['Type','Description'],[
        ['Recursive','Client asks the resolver to return the final answer or an error. Resolver does all the work.'],
        ['Iterative','Server returns the best answer it has (usually a referral) and the asker continues the search.'],
        ['Non-recursive','Server answers from its cache or authoritative data without further queries.']
      ])
    ),
    section('5. Common DNS Record Types',
      table(['Record','Meaning','Example'],[
        ['A','Domain to IPv4 address','example.com to 93.184.216.34'],
        ['AAAA','Domain to IPv6 address','example.com to 2606:2800::1'],
        ['CNAME','Alias of another domain','www to example.com'],
        ['MX','Mail exchange server','mail.example.com'],
        ['NS','Authoritative name server','ns1.example.com'],
        ['TXT','Free text (SPF, verification)','v=spf1 ...'],
        ['PTR','Reverse lookup: IP to name','34.216.184.93.in-addr.arpa']
      ])
    ),
    section('6. Caching and TTL',
      p('Each DNS record has a <b>TTL (Time To Live)</b>. Resolvers and browsers store the answer until the TTL expires, which reduces traffic and speeds up repeated visits. A low TTL allows quick changes; a high TTL reduces load.')
    )
  ],
  rapid: [
    'DNS converts domain names to IP addresses; hierarchical and distributed; UDP port 53.',
    'Order: Browser cache, OS, Resolver, Root, TLD, Authoritative, IP returned.',
    'Records: A, AAAA, CNAME, MX, NS, TXT, PTR.',
    'Recursive vs iterative queries; caching controlled by TTL.'
  ]
},

/* ---------- 4. Types of CSS & Selectors ---------- */
{
  id: 'u1q4',
  title: 'Types of CSS and Selectors',
  tags: ['css','inline','internal','external','selectors','specificity','pseudo-class'],
  intro:
    p('<b>CSS (Cascading Style Sheets)</b> is a style sheet language used to control the presentation (colour, layout, fonts, spacing) of HTML documents, separating content from design. A CSS rule has a <b>selector</b> and a <b>declaration block</b> of property:value pairs.') +
    code('', `
selector {
  property: value;
  property: value;
}
`),
  sections: [
    section('1. Types of CSS (ways to add CSS)',
      h3('(a) Inline CSS') +
      p('Written inside the <code class="inline">style</code> attribute of a single element. Affects only that element.') +
      code('Inline', `<p style="color:red; font-size:18px;">Inline styled text</p>`) +
      h3('(b) Internal (Embedded) CSS') +
      p('Written in a <code class="inline">&lt;style&gt;</code> tag inside the <code class="inline">&lt;head&gt;</code>. Affects the whole page.') +
      code('Internal', `
<head>
  <style>
    h1 { color: blue; text-align: center; }
    p  { font-family: Arial; }
  </style>
</head>
`) +
      h3('(c) External CSS') +
      p('Written in a separate <code class="inline">.css</code> file and linked using <code class="inline">&lt;link&gt;</code>. One file can style many pages.') +
      code('External', `
<!-- in HTML -->
<link rel="stylesheet" href="style.css">

/* style.css */
body { background: #f4f4f4; }
`) +
      table(['Feature','Inline','Internal','External'],[
        ['Location','style attribute','style tag in head','Separate .css file'],
        ['Scope','One element','One page','Many pages'],
        ['Reusability','None','Within page','High'],
        ['Maintenance','Hard','Moderate','Easy'],
        ['Priority','Highest','Medium','Lowest (if same specificity, last one wins)']
      ]) +
      note('Cascading order: Inline &gt; Internal/External (by specificity, then by order) &gt; Browser default. <code class="inline">!important</code> overrides everything.')
    ),
    section('2. CSS Selectors',
      p('A selector chooses which HTML elements a rule applies to.') +
      h3('A. Basic selectors') +
      table(['Selector','Syntax','Meaning'],[
        ['Universal','<code class="inline">* { }</code>','All elements'],
        ['Type / Element','<code class="inline">p { }</code>','All p elements'],
        ['Class','<code class="inline">.box { }</code>','Elements with class="box"'],
        ['ID','<code class="inline">#main { }</code>','Element with id="main" (unique)'],
        ['Group','<code class="inline">h1, h2, p { }</code>','Several selectors, same rule']
      ]) +
      h3('B. Combinator selectors') +
      table(['Selector','Syntax','Meaning'],[
        ['Descendant','<code class="inline">div p</code>','All p inside div (any depth)'],
        ['Child','<code class="inline">div &gt; p</code>','p that is a direct child of div'],
        ['Adjacent sibling','<code class="inline">h1 + p</code>','p immediately after h1'],
        ['General sibling','<code class="inline">h1 ~ p</code>','All p siblings after h1']
      ]) +
      h3('C. Attribute selectors') +
      table(['Selector','Meaning'],[
        ['<code class="inline">[type]</code>','Elements having the attribute'],
        ['<code class="inline">[type="text"]</code>','Attribute equals value'],
        ['<code class="inline">[href^="https"]</code>','Value starts with'],
        ['<code class="inline">[href$=".pdf"]</code>','Value ends with'],
        ['<code class="inline">[class*="btn"]</code>','Value contains']
      ]) +
      h3('D. Pseudo-class selectors (state)') +
      table(['Selector','Meaning'],[
        ['<code class="inline">a:hover</code>','Mouse is over the element'],
        ['<code class="inline">a:visited</code>','Visited link'],
        ['<code class="inline">input:focus</code>','Element has focus'],
        ['<code class="inline">li:first-child</code>, <code class="inline">li:last-child</code>','First / last child'],
        ['<code class="inline">li:nth-child(2n)</code>','Even children'],
        ['<code class="inline">input:checked</code>, <code class="inline">:disabled</code>','Form states']
      ]) +
      h3('E. Pseudo-element selectors') +
      table(['Selector','Meaning'],[
        ['<code class="inline">p::first-line</code>','First line of text'],
        ['<code class="inline">p::first-letter</code>','First letter (drop cap)'],
        ['<code class="inline">h2::before</code>, <code class="inline">h2::after</code>','Insert generated content'],
        ['<code class="inline">::selection</code>','Selected text']
      ])
    ),
    section('3. Example Program',
      code('selectors.html', `
<!DOCTYPE html>
<html>
<head>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Arial; background:#f0f2f5; padding:20px; }
  h1, h2 { color:#1d3557; }                 /* group */
  #title { text-align:center; }             /* id */
  .card { background:#fff; padding:15px; margin:10px 0; border-radius:8px; }  /* class */
  .card > p { color:#555; }                 /* child */
  h2 + p { font-weight:bold; }              /* adjacent sibling */
  a[href^="https"] { color:green; }         /* attribute */
  a:hover { color:red; text-decoration:underline; }  /* pseudo-class */
  p::first-letter { font-size:140%; }       /* pseudo-element */
  li:nth-child(odd) { background:#e9ecef; } /* structural */
</style>
</head>
<body>
  <h1 id="title">CSS Selectors Demo</h1>
  <div class="card">
    <h2>Card One</h2>
    <p>This paragraph follows the h2.</p>
    <a href="https://example.com">Secure link</a>
  </div>
  <ul><li>One</li><li>Two</li><li>Three</li></ul>
</body>
</html>
`)
    ),
    section('4. Specificity (which rule wins)',
      table(['Selector type','Weight'],[
        ['Inline style','1000'],
        ['ID','100'],
        ['Class, attribute, pseudo-class','10'],
        ['Element, pseudo-element','1']
      ]) +
      p('Example: <code class="inline">#nav a.active</code> = 100 + 1 + 10 = 111, which beats <code class="inline">.menu a</code> = 11. When specificity is equal, the rule written last wins.')
    )
  ],
  rapid: [
    'Three types: Inline (style attribute), Internal (style tag), External (.css file via link).',
    'Selectors: universal, element, class (.), id (#), group, descendant, child (>), adjacent (+), sibling (~), attribute [ ], pseudo-class (:hover), pseudo-element (::before).',
    'Specificity: inline 1000, id 100, class 10, element 1.',
    'External CSS is best for maintainability and reuse.'
  ]
}

]);
