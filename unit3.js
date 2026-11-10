addUnit(3, 'Servlets & JSP', [

/* ---------- 1. Servlet Life Cycle ---------- */
{
  id: 'u3q1',
  title: 'Servlet Life Cycle',
  tags: ['servlet','life cycle','init','service','destroy','container'],
  intro:
    p('A <b>Servlet</b> is a Java class that runs on a web server (servlet container such as Apache Tomcat) and handles client requests, generating dynamic responses, usually HTML. It extends <code class="inline">HttpServlet</code> and is managed completely by the <b>servlet container</b>.') +
    p('The <b>servlet life cycle</b> is the series of stages from creation to destruction, controlled by the container through three life cycle methods: <b>init()</b>, <b>service()</b> and <b>destroy()</b>.'),
  sections: [
    section('1. Life Cycle Diagram',
      diagram(
        svg(600,300,
          svgBox(210,10,180,40,'Servlet class loaded','bx2') +
          svgBox(210,75,180,40,'Instance created','bx2') +
          svgBox(210,140,180,40,'init(ServletConfig)\n(called once)','bx3') +
          svgBox(210,205,180,50,'service(req, res)\n(called per request)','bx') +
          svgBox(430,205,150,50,'doGet() / doPost()','bx2') +
          svgBox(210,270,180,28,'destroy()  (once)','bx3') +
          svgArrow(300,50,300,75) + svgArrow(300,115,300,140) + svgArrow(300,180,300,205) +
          svgArrow(390,230,430,230) + svgArrow(300,255,300,270) +
          '<path class="ln" d="M210,230 C150,230 150,215 210,215" />' +
          '<text x="60" y="225" font-size="11">repeats for every request</text>'
        ),
        'Figure 1: Servlet life cycle')
    ),
    section('2. Phases in Detail',
      h3('Phase 1: Loading and Instantiation') +
      p('When the first request arrives (or at server start if <code class="inline">load-on-startup</code> is set), the container <b>loads the servlet class</b> and creates <b>one instance</b> using the no-argument constructor.') +
      h3('Phase 2: Initialization: init()') +
      ul([
        'Called <b>only once</b> after the instance is created.',
        'Used for one-time setup: opening database connections, reading configuration, initialising resources.',
        'Signature: <code class="inline">public void init(ServletConfig config) throws ServletException</code> (or the no-arg <code class="inline">init()</code> in GenericServlet).',
        'If it throws an exception, the servlet is not put into service.'
      ]) +
      h3('Phase 3: Request Handling: service()') +
      ul([
        'Called <b>for every client request</b>, each in a separate thread (one instance, many threads).',
        'Signature: <code class="inline">public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException</code>',
        'In <code class="inline">HttpServlet</code>, <code class="inline">service()</code> reads the HTTP method and calls <b>doGet(), doPost(), doPut(), doDelete()</b> and so on.',
        'The servlet reads data from <code class="inline">HttpServletRequest</code> and writes the result using <code class="inline">HttpServletResponse</code>.'
      ]) +
      h3('Phase 4: Destruction: destroy()') +
      ul([
        'Called <b>once</b> when the container removes the servlet (server shutdown, application undeploy or reload).',
        'Used for clean-up: close database connections, files, stop threads, save state.',
        'Signature: <code class="inline">public void destroy()</code>',
        'After this, the instance is eligible for garbage collection.'
      ])
    ),
    section('3. Summary Table',
      table(['Method','Called','Times','Purpose'],[
        ['init()','After instantiation','Once','Initialise resources'],
        ['service()','Every request','Many','Process request, produce response'],
        ['doGet()/doPost()','By service()','Many','Handle specific HTTP method'],
        ['destroy()','Before removal','Once','Release resources']
      ])
    ),
    section('4. Example Program',
      code('LifeCycleServlet.java', `
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LifeCycleServlet extends HttpServlet {
    private int hitCount;

    @Override
    public void init() throws ServletException {
        hitCount = 0;
        System.out.println("init(): servlet initialised");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        hitCount++;
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>Servlet Life Cycle Demo</h2>");
        out.println("<p>This servlet has been requested " + hitCount + " time(s).</p>");
        out.println("</body></html>");
    }

    @Override
    public void destroy() {
        System.out.println("destroy(): servlet is being destroyed, total hits = " + hitCount);
    }
}
`) +
      code('web.xml (deployment descriptor)', `
<web-app>
  <servlet>
    <servlet-name>LifeCycle</servlet-name>
    <servlet-class>LifeCycleServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>LifeCycle</servlet-name>
    <url-pattern>/life</url-pattern>
  </servlet-mapping>
</web-app>
`) +
      p('Instead of web.xml you can use the annotation <code class="inline">@WebServlet("/life")</code> above the class.')
    ),
    section('5. Important Points',
      ul([
        'Only <b>one instance</b> of a servlet exists; each request runs in its own <b>thread</b>. Instance variables are therefore shared and need synchronisation.',
        'The container, not the programmer, calls the life cycle methods.',
        'Servlets are loaded once and reused, hence faster than CGI (which creates a new process per request).'
      ])
    )
  ],
  rapid: [
    'Life cycle: load and instantiate, init() once, service() per request, destroy() once.',
    'service() dispatches to doGet() / doPost().',
    'One instance, multi-threaded; container manages everything.',
    'init = set up, destroy = clean up.'
  ]
},

/* ---------- 2. Servlet Architecture ---------- */
{
  id: 'u3q2',
  title: 'Servlet Architecture',
  tags: ['servlet architecture','container','request','response','servlet api','httpservlet','tomcat'],
  intro:
    p('<b>Servlet architecture</b> describes how a web client, a web server, the servlet container and the servlet classes cooperate to process HTTP requests and generate dynamic content. The servlet is the <b>middle tier</b> between the browser and back-end resources (database, files, other services).'),
  sections: [
    section('1. Architecture Diagram',
      diagram(
        svg(680,290,
          svgBox(10,100,100,60,'Client\n(Browser)','bx') +
          svgBox(170,100,110,60,'Web Server\n(HTTP)','bx2') +
          svgBox(330,30,220,230,'','bx2') +
          '<text x="440" y="50" text-anchor="middle" font-size="12" font-weight="bold">Servlet Container</text>' +
          svgBox(350,65,180,40,'Request / Response\nobjects','bx3') +
          svgBox(350,120,180,50,'Servlet 1 / 2 / 3\n(threads)','bx') +
          svgBox(350,190,180,50,'web.xml / annotations\nConfig, Filters, Session','bx3') +
          svgBox(590,100,85,60,'Database\n/ Files','bx2') +
          svgArrow(110,120,170,120,'1') + svgArrow(280,120,330,120,'2') +
          svgArrow(550,140,590,140,'3') + svgArrow(330,150,280,150,'4') + svgArrow(170,150,110,150,'5')
        ),
        'Figure 1: Servlet architecture (1 request, 2 forward to container, 3 business logic / DB, 4-5 response)') +
      ol([
        'Client sends an HTTP request to the web server.',
        'Web server forwards it to the servlet container.',
        'Container maps the URL to a servlet (using web.xml or @WebServlet), creates the <b>HttpServletRequest</b> and <b>HttpServletResponse</b> objects and allocates a thread.',
        'The servlet runs service() / doGet() / doPost(), may access the database, and writes the response.',
        'Container sends the response back through the web server to the client.'
      ])
    ),
    section('2. Components of Servlet Architecture',
      table(['Component','Role'],[
        ['Web client','Browser or app that sends HTTP requests'],
        ['Web server','Receives HTTP requests, serves static content (Apache HTTPD, nginx)'],
        ['Servlet container / engine','Runtime that loads servlets, manages life cycle, threads, security, sessions (Tomcat, Jetty, GlassFish)'],
        ['Servlet','Java class that processes the request and creates the response'],
        ['Deployment descriptor (web.xml)','Maps URLs to servlets, defines init params, filters, listeners, session timeout'],
        ['Back-end resources','Databases, files, web services accessed using JDBC etc.']
      ])
    ),
    section('3. Servlet API Hierarchy',
      diagram(
        svg(520,260,
          svgBox(170,5,180,40,'Servlet (interface)','bx') +
          svgBox(170,70,180,40,'GenericServlet (class)','bx2') +
          svgBox(170,135,180,40,'HttpServlet (class)','bx2') +
          svgBox(170,200,180,45,'MyServlet (user class)','bx3') +
          svgArrow(260,45,260,70) + svgArrow(260,110,260,135) + svgArrow(260,175,260,200) +
          '<text x="365" y="95" font-size="11">protocol independent</text>' +
          '<text x="365" y="160" font-size="11">HTTP specific</text>'
        ),
        'Figure 2: Servlet class hierarchy (packages javax.servlet and javax.servlet.http; Jakarta EE 9+ uses jakarta.servlet)') +
      table(['Interface / Class','Description'],[
        ['Servlet','Defines init(), service(), destroy(), getServletConfig(), getServletInfo()'],
        ['ServletConfig','Per-servlet configuration and init parameters'],
        ['ServletContext','Shared information for the whole web application'],
        ['ServletRequest / HttpServletRequest','Client request data: parameters, headers, cookies, session'],
        ['ServletResponse / HttpServletResponse','Used to set content type, status, headers and write output'],
        ['GenericServlet','Protocol independent abstract class'],
        ['HttpServlet','Adds doGet, doPost, doPut, doDelete'],
        ['RequestDispatcher','forward() or include() to another resource'],
        ['HttpSession','Maintains user state across requests']
      ])
    ),
    section('4. Request Processing Flow with Code',
      code('HelloServlet.java', `
import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String user = req.getParameter("user");
        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println("<h1>Hello, " + (user == null ? "Guest" : user) + "</h1>");
    }
}
`)
    ),
    section('5. Advantages of Servlets',
      ul([
        '<b>Performance:</b> loaded once, each request is a lightweight thread (CGI starts a new process).',
        '<b>Platform independent</b> (Java) and portable across servers.',
        '<b>Robust and secure:</b> Java memory management and security manager.',
        'Full access to the Java API (JDBC, networking, collections).',
        'Built-in session tracking, cookies and filters.'
      ])
    )
  ],
  rapid: [
    'Flow: Browser, Web server, Servlet container, Servlet, DB, back to the browser.',
    'Container manages life cycle, threads, request/response objects, sessions and security.',
    'Hierarchy: Servlet, GenericServlet, HttpServlet, user servlet.',
    'Mapping done by web.xml or @WebServlet.'
  ]
},

/* ---------- 3. JSP Architecture ---------- */
{
  id: 'u3q3',
  title: 'JSP Architecture',
  tags: ['jsp','java server pages','translation','jspservlet','jsp life cycle','directives','scriptlet'],
  intro:
    p('<b>JavaServer Pages (JSP)</b> is a server-side technology that allows Java code to be embedded in HTML pages to create dynamic web content. A JSP is <b>translated into a servlet</b> by the <b>JSP engine (Jasper in Tomcat)</b>, compiled and executed by the servlet container. JSP separates <i>presentation</i> (HTML) from <i>business logic</i> (Java).'),
  sections: [
    section('1. JSP Architecture Diagram',
      diagram(
        svg(700,300,
          svgBox(10,110,90,60,'Browser','bx') +
          svgBox(150,110,90,60,'Web\nServer','bx2') +
          svgBox(290,20,400,260,'','bx2') +
          '<text x="490" y="40" text-anchor="middle" font-size="12" font-weight="bold">JSP / Servlet Container</text>' +
          svgBox(310,55,110,50,'hello.jsp','bx') +
          svgBox(450,55,115,50,'JSP Engine\n(translate)','bx3') +
          svgBox(580,55,95,50,'hello_jsp\n.java','bx') +
          svgBox(580,135,95,50,'hello_jsp\n.class','bx3') +
          svgBox(450,135,115,50,'Servlet\nexecution','bx3') +
          svgBox(310,215,365,45,'Back-end: JavaBeans, Database, Files','bx2') +
          svgArrow(100,130,150,130,'request') + svgArrow(240,130,290,130) +
          svgArrow(420,80,450,80) + svgArrow(565,80,580,80) + svgArrow(627,105,627,135,'compile') +
          svgArrow(580,160,565,160) + svgArrow(507,185,507,215) +
          svgArrow(150,155,100,155,'HTML')
        ),
        'Figure 1: JSP architecture and translation process')
    ),
    section('2. JSP Life Cycle / Processing Phases',
      ol([
        '<b>Translation:</b> the JSP engine converts <code class="inline">hello.jsp</code> into a servlet source file <code class="inline">hello_jsp.java</code> (first request or after the page changes).',
        '<b>Compilation:</b> the servlet source is compiled into <code class="inline">hello_jsp.class</code>.',
        '<b>Class loading and instantiation:</b> the container loads the class and creates an instance.',
        '<b>Initialization:</b> <code class="inline">jspInit()</code> is called once.',
        '<b>Request processing:</b> <code class="inline">_jspService(request, response)</code> is called for every request.',
        '<b>Destruction:</b> <code class="inline">jspDestroy()</code> is called once when the page is removed.'
      ]) +
      note('Translation and compilation happen only for the first request (or after modification), so later requests are as fast as servlets.')
    ),
    section('3. JSP Elements',
      table(['Element','Syntax','Purpose'],[
        ['Comment','<code class="inline">&lt;%-- comment --%&gt;</code>','Hidden JSP comment'],
        ['Directive','<code class="inline">&lt;%@ page ... %&gt;</code>, <code class="inline">&lt;%@ include ... %&gt;</code>, <code class="inline">&lt;%@ taglib ... %&gt;</code>','Instructions to the container'],
        ['Declaration','<code class="inline">&lt;%! int count = 0; %&gt;</code>','Declare variables / methods (class level)'],
        ['Scriptlet','<code class="inline">&lt;% Java code %&gt;</code>','Java statements inside _jspService()'],
        ['Expression','<code class="inline">&lt;%= expression %&gt;</code>','Evaluates and prints a value'],
        ['Action tags','<code class="inline">&lt;jsp:include&gt;</code>, <code class="inline">&lt;jsp:forward&gt;</code>, <code class="inline">&lt;jsp:useBean&gt;</code>','Standard actions'],
        ['EL / JSTL','Expression Language and tag library','Script-free pages']
      ])
    ),
    section('4. Implicit Objects',
      table(['Object','Type','Use'],[
        ['request','HttpServletRequest','Request data'],
        ['response','HttpServletResponse','Response output'],
        ['out','JspWriter','Writes output to page'],
        ['session','HttpSession','User session'],
        ['application','ServletContext','Application-wide data'],
        ['config','ServletConfig','Servlet configuration'],
        ['pageContext','PageContext','Access to all scopes'],
        ['page','Object','Current page (this)'],
        ['exception','Throwable','In error pages only']
      ])
    ),
    section('5. Example JSP Program',
      code('hello.jsp', `
<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.Date" %>
<html>
<body>
  <%! int visits = 0; %>
  <% visits++; %>
  <h2>Welcome, <%= request.getParameter("name") == null ? "Guest" : request.getParameter("name") %></h2>
  <p>Current time: <%= new Date() %></p>
  <p>Page visits: <%= visits %></p>
  <% for (int i = 1; i <= 3; i++) { %>
      <p>Line <%= i %></p>
  <% } %>
</body>
</html>
`)
    ),
    section('6. JSP vs Servlet',
      table(['Servlet','JSP'],[
        ['Java code with HTML inside out.println()','HTML with Java code inside tags'],
        ['Best for logic/controller','Best for presentation/view'],
        ['Must be compiled manually','Auto translated and compiled by container'],
        ['Harder to maintain the UI','Easy for web designers'],
        ['Needs web.xml/annotation mapping','Accessible directly by URL']
      ]) +
      p('In the <b>MVC pattern</b>: Model = JavaBeans/DB, View = JSP, Controller = Servlet.')
    )
  ],
  rapid: [
    'JSP is translated to a servlet (Jasper), compiled, then executed by the container.',
    'Phases: translation, compilation, load, jspInit(), _jspService(), jspDestroy().',
    'Elements: directive, declaration, scriptlet, expression, action, comment.',
    'Implicit objects: request, response, out, session, application, config, pageContext, page, exception.'
  ]
},

/* ---------- 4. Servlet program to get details from HTML forms ---------- */
{
  id: 'u3q4',
  title: 'Servlet Program to Get Details from HTML Forms and Display in a Web Page',
  tags: ['servlet program','html form','getParameter','doPost','student details','web.xml'],
  intro:
    p('This program collects <b>student details</b> through an HTML form, sends them to a servlet using the <b>POST</b> method, and the servlet reads the data with <code class="inline">request.getParameter()</code> and displays it in a formatted web page.'),
  sections: [
    section('1. Working',
      diagram(
        svg(620,150,
          svgBox(10,45,130,60,'form.html\n(user fills form)','bx') +
          svgBox(240,45,140,60,'StudentServlet\ndoPost()','bx3') +
          svgBox(480,45,130,60,'Result page\n(HTML output)','bx2') +
          svgArrow(140,75,240,75,'POST /student') + svgArrow(380,75,480,75,'response')
        ),
        'Figure 1: Form data flow') +
      ol([
        'User opens <code class="inline">form.html</code> and fills in the details.',
        'On submit, browser sends an HTTP POST request to <code class="inline">/student</code>.',
        'The container calls <code class="inline">doPost()</code> of <code class="inline">StudentServlet</code>.',
        'The servlet reads values using <code class="inline">getParameter("fieldName")</code> (the name must match the form field <code class="inline">name</code>).',
        'The servlet builds an HTML page with <code class="inline">PrintWriter</code> and sends it back.'
      ])
    ),
    section('2. Step 1: HTML Form (form.html)',
      code('form.html', `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Student Registration</title>
  <style>
    body{font-family:Arial;background:#f2f4f8;display:flex;justify-content:center;padding:30px}
    form{background:#fff;padding:24px;border-radius:10px;width:340px;box-shadow:0 2px 8px #0002}
    label{display:block;margin-top:10px;font-weight:bold}
    input[type=text],input[type=email],input[type=number],select{width:100%;padding:7px;margin-top:4px}
    button{margin-top:16px;padding:8px 18px}
  </style>
</head>
<body>
  <form action="student" method="post">
    <h2>Student Registration</h2>

    <label>Name</label>
    <input type="text" name="name" required>

    <label>Register Number</label>
    <input type="text" name="regno" required>

    <label>Email</label>
    <input type="email" name="email" required>

    <label>Age</label>
    <input type="number" name="age" min="15" max="60">

    <label>Gender</label>
    <input type="radio" name="gender" value="Male"> Male
    <input type="radio" name="gender" value="Female"> Female

    <label>Department</label>
    <select name="dept">
      <option>CSE</option><option>IT</option><option>ECE</option><option>EEE</option><option>MECH</option>
    </select>

    <label>Skills</label>
    <input type="checkbox" name="skills" value="Java"> Java
    <input type="checkbox" name="skills" value="PHP"> PHP
    <input type="checkbox" name="skills" value="Python"> Python

    <button type="submit">Submit</button>
  </form>
</body>
</html>
`)
    ),
    section('3. Step 2: Servlet (StudentServlet.java)',
      code('StudentServlet.java', `
import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/student")
public class StudentServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        // 1. Read form data
        String name   = request.getParameter("name");
        String regno  = request.getParameter("regno");
        String email  = request.getParameter("email");
        String age    = request.getParameter("age");
        String gender = request.getParameter("gender");
        String dept   = request.getParameter("dept");
        String[] skills = request.getParameterValues("skills");   // multiple values

        String skillList = (skills == null) ? "None" : String.join(", ", skills);

        // 2. Write the response page
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Student Details</title>");
        out.println("<style>body{font-family:Arial;background:#f2f4f8;padding:30px}"
                  + "table{border-collapse:collapse;background:#fff}"
                  + "td,th{border:1px solid #999;padding:8px 14px;text-align:left}"
                  + "th{background:#3b5bdb;color:#fff}</style></head><body>");
        out.println("<h2>Submitted Student Details</h2>");
        out.println("<table>");
        out.println("<tr><th>Field</th><th>Value</th></tr>");
        out.println("<tr><td>Name</td><td>"            + escape(name)   + "</td></tr>");
        out.println("<tr><td>Register No</td><td>"     + escape(regno)  + "</td></tr>");
        out.println("<tr><td>Email</td><td>"           + escape(email)  + "</td></tr>");
        out.println("<tr><td>Age</td><td>"             + escape(age)    + "</td></tr>");
        out.println("<tr><td>Gender</td><td>"          + escape(gender) + "</td></tr>");
        out.println("<tr><td>Department</td><td>"      + escape(dept)   + "</td></tr>");
        out.println("<tr><td>Skills</td><td>"          + escape(skillList) + "</td></tr>");
        out.println("</table>");
        out.println("<p><a href='form.html'>Back to form</a></p>");
        out.println("</body></html>");
    }

    // If someone opens /student directly with GET
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("form.html");
    }

    // Prevent HTML injection (XSS)
    private String escape(String s) {
        if (s == null) return "-";
        return s.replace("&", "&amp;").replace("<", "&lt;")
                .replace(">", "&gt;").replace("\\"", "&quot;");
    }
}
`)
    ),
    section('4. Step 3: web.xml (only if not using @WebServlet)',
      code('WEB-INF/web.xml', `
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" version="4.0">
  <servlet>
    <servlet-name>StudentServlet</servlet-name>
    <servlet-class>StudentServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>StudentServlet</servlet-name>
    <url-pattern>/student</url-pattern>
  </servlet-mapping>
  <welcome-file-list>
    <welcome-file>form.html</welcome-file>
  </welcome-file-list>
</web-app>
`)
    ),
    section('5. Deployment and Execution Steps',
      ol([
        'Install JDK and Apache Tomcat.',
        'Create the folder structure: <code class="inline">StudentApp/form.html</code>, <code class="inline">StudentApp/WEB-INF/web.xml</code>, <code class="inline">StudentApp/WEB-INF/classes/StudentServlet.class</code>.',
        'Compile with the servlet API jar on the classpath: <code class="inline">javac -cp "TOMCAT/lib/servlet-api.jar" StudentServlet.java</code>',
        'Copy the <code class="inline">StudentApp</code> folder into <code class="inline">TOMCAT/webapps/</code> and start Tomcat.',
        'Open <code class="inline">http://localhost:8080/StudentApp/form.html</code>, fill the form and submit.'
      ]) +
      note('With Tomcat 10 and above, packages are renamed from <code class="inline">javax.servlet</code> to <code class="inline">jakarta.servlet</code>. Use the matching imports for your Tomcat version.')
    ),
    section('6. Key Methods Used',
      table(['Method','Purpose'],[
        ['<code class="inline">getParameter(name)</code>','Returns the single value of a form field'],
        ['<code class="inline">getParameterValues(name)</code>','Returns an array for multi-value fields (checkboxes)'],
        ['<code class="inline">setContentType("text/html")</code>','Tells the browser the response is HTML'],
        ['<code class="inline">getWriter()</code>','PrintWriter to write the response text'],
        ['<code class="inline">sendRedirect(url)</code>','Redirects the browser to another URL']
      ])
    )
  ],
  rapid: [
    'Form uses action="student" method="post"; each input has a name attribute.',
    'Servlet: doPost(), request.getParameter("name"), getParameterValues for checkboxes.',
    'Response: setContentType("text/html"), PrintWriter out = response.getWriter(), out.println(html).',
    'Mapping with @WebServlet("/student") or web.xml; deploy on Tomcat webapps.',
    'Escape user input to avoid XSS.'
  ]
}

]);
