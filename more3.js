/* Unit 3 - additional Part B answers (JSTL, session management, JDBC programs) */
addUnit(3, 'Servlets & JSP', [

/* ---------- JSTL ---------- */
{
  id: 'u3b1',
  title: 'Function of JSTL in JSP Applications',
  tags: ['jstl','jsp standard tag library','core tags','c:foreach','el','expression language','fmt','taglib'],
  intro:
    p('<b>JSTL (JSP Standard Tag Library)</b> is a collection of ready-made custom tags that provide common functionality needed in JSP pages: iteration, conditions, formatting, database access, XML processing and string functions. JSTL lets you write JSP pages with <b>tags and Expression Language (EL) instead of Java scriptlets</b>, so the page stays clean and easy for web designers to maintain.'),
  sections: [
    section('1. Why JSTL?',
      table(['Scriptlets','JSTL + EL'],[
        ['<code class="inline">&lt;% for(...){ %&gt; ... &lt;% } %&gt;</code> mixes Java and HTML','<code class="inline">&lt;c:forEach&gt;</code> tag, looks like HTML'],
        ['Hard to read, test and reuse','Readable, reusable, standard'],
        ['Needs Java knowledge','Designers can use it'],
        ['Errors found at run time','Easier error handling']
      ]) +
      diagram(
        svg(640,130,
          svgBox(10,40,120,50,'Servlet\n(Controller)','bx') +
          svgBox(190,40,130,50,'Request attribute\n(list / bean)','bx2') +
          svgBox(380,40,120,50,'JSP page\nJSTL + EL','bx3') +
          svgBox(550,40,85,50,'HTML','bx2') +
          svgArrow(130,65,190,65) + svgArrow(320,65,380,65) + svgArrow(500,65,550,65)
        ),
        'Figure 1: Servlet prepares data, JSP with JSTL/EL displays it (MVC style)')
    ),
    section('2. Setting up JSTL',
      ol([
        'Place the JSTL jar (for example <code class="inline">jstl-1.2.jar</code>) in <code class="inline">WEB-INF/lib</code>.',
        'Declare the library in the JSP using the <code class="inline">taglib</code> directive.'
      ]) +
      code('JSP taglib directives', `
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="x"   uri="http://java.sun.com/jsp/jstl/xml" %>
`) +
      note('With Jakarta EE 10 (Tomcat 10.1) the URIs change to <code class="inline">jakarta.tags.core</code>, <code class="inline">jakarta.tags.fmt</code> and so on.')
    ),
    section('3. The Five JSTL Libraries',
      table(['Library','Prefix','URI (JSTL 1.2)','Function'],[
        ['Core','c','http://java.sun.com/jsp/jstl/core','Variables, conditions, loops, URL handling, output'],
        ['Formatting (i18n)','fmt','.../jstl/fmt','Format numbers, dates, currency; locale and messages'],
        ['SQL','sql','.../jstl/sql','Connect to a database, run queries and updates'],
        ['XML','x','.../jstl/xml','Parse and transform XML using XPath'],
        ['Functions','fn','.../jstl/functions','String functions: length, contains, toUpperCase, substring']
      ])
    ),
    section('4. Core Tags',
      table(['Tag','Purpose'],[
        ['<code class="inline">&lt;c:out value="..."/&gt;</code>','Prints a value (escapes HTML, prevents XSS)'],
        ['<code class="inline">&lt;c:set var="x" value="10" scope="session"/&gt;</code>','Creates or sets a variable'],
        ['<code class="inline">&lt;c:remove var="x"/&gt;</code>','Removes a variable'],
        ['<code class="inline">&lt;c:if test="..."&gt;</code>','Conditional (no else)'],
        ['<code class="inline">&lt;c:choose&gt; &lt;c:when&gt; &lt;c:otherwise&gt;</code>','If / else if / else'],
        ['<code class="inline">&lt;c:forEach items="..." var="i"&gt;</code>','Loop over a collection or a number range'],
        ['<code class="inline">&lt;c:forTokens&gt;</code>','Loop over tokens of a string'],
        ['<code class="inline">&lt;c:import&gt;</code>','Include content from a URL'],
        ['<code class="inline">&lt;c:redirect url="..."/&gt;</code>','Redirect to another page'],
        ['<code class="inline">&lt;c:url value="..."/&gt;</code>','Builds a URL (adds session ID if needed)'],
        ['<code class="inline">&lt;c:catch var="e"&gt;</code>','Catches exceptions']
      ])
    ),
    section('5. Expression Language (EL)',
      p('EL is used inside JSTL tags and plain JSP text with the syntax <code class="inline">${expression}</code>.') +
      table(['EL feature','Example'],[
        ['Bean property','<code class="inline">${student.name}</code> calls getName()'],
        ['Request parameter','<code class="inline">${param.user}</code>'],
        ['Scopes','<code class="inline">${requestScope.x}</code>, <code class="inline">${sessionScope.x}</code>, <code class="inline">${applicationScope.x}</code>'],
        ['Operators','<code class="inline">+ - * / % == != &lt; &gt; &amp;&amp; || ! empty</code>'],
        ['Collections','<code class="inline">${list[0]}</code>, <code class="inline">${map.key}</code>'],
        ['Empty check','<code class="inline">${empty list}</code>']
      ])
    ),
    section('6. Example Program',
      code('Student.java (JavaBean)', `
public class Student {
    private int id;
    private String name;
    private int marks;
    public Student(int id, String name, int marks) { this.id = id; this.name = name; this.marks = marks; }
    public int getId()      { return id; }
    public String getName() { return name; }
    public int getMarks()   { return marks; }
}
`) +
      code('ListServlet.java', `
import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/students")
public class ListServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        List<Student> list = new ArrayList<>();
        list.add(new Student(1, "Manohar", 88));
        list.add(new Student(2, "Ravi", 74));
        list.add(new Student(3, "Anitha", 45));
        req.setAttribute("students", list);
        req.setAttribute("college", "Kamaraj College");
        req.getRequestDispatcher("students.jsp").forward(req, res);
    }
}
`) +
      code('students.jsp', `
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<body>
  <h2><c:out value="\${college}"/> - Result</h2>

  <c:set var="pass" value="50"/>

  <c:if test="\${empty students}">
      <p>No students found.</p>
  </c:if>

  <table border="1" cellpadding="6">
    <tr><th>#</th><th>ID</th><th>Name</th><th>Marks</th><th>Result</th></tr>
    <c:forEach var="s" items="\${students}" varStatus="st">
      <tr>
        <td>\${st.count}</td>
        <td>\${s.id}</td>
        <td>\${fn:toUpperCase(s.name)}</td>
        <td><fmt:formatNumber value="\${s.marks}" minFractionDigits="1"/></td>
        <td>
          <c:choose>
            <c:when test="\${s.marks >= 80}">Distinction</c:when>
            <c:when test="\${s.marks >= pass}">Pass</c:when>
            <c:otherwise>Fail</c:otherwise>
          </c:choose>
        </td>
      </tr>
    </c:forEach>
  </table>

  <p>Total students: \${fn:length(students)}</p>
  <p>Today: <fmt:formatDate value="<%= new java.util.Date() %>" pattern="dd-MM-yyyy"/></p>
</body>
</html>
`)
    ),
    section('7. SQL Tags (for demonstration only)',
      code('', `
<sql:setDataSource var="db" driver="com.mysql.cj.jdbc.Driver"
    url="jdbc:mysql://localhost:3306/college" user="root" password="root"/>
<sql:query var="rs" dataSource="\${db}">SELECT id, name FROM student</sql:query>
<c:forEach var="row" items="\${rs.rows}">
    \${row.id} - \${row.name}<br>
</c:forEach>
`) +
      note('SQL tags mix data access into the view layer, so real applications use a servlet/DAO with JDBC instead.')
    ),
    section('8. Advantages of JSTL',
      ul([
        'Removes Java code from JSP pages (clean separation of logic and presentation).',
        'Standard tags are portable across all servlet containers.',
        'Simplifies loops, conditions, formatting and internationalisation.',
        'Works with EL, so bean properties are accessed easily.',
        '<code class="inline">c:out</code> escapes output by default, which reduces XSS risk.'
      ])
    )
  ],
  rapid: [
    'JSTL = standard tag library for JSP; replaces scriptlets with tags + EL.',
    'Five libraries: core (c), fmt, sql, xml (x), functions (fn); declared with the taglib directive.',
    'Core tags: out, set, remove, if, choose/when/otherwise, forEach, forTokens, import, redirect, url, catch.',
    'EL syntax is dollar-brace: ${bean.property}, ${param.x}, ${sessionScope.x}.'
  ]
},

/* ---------- Session management ---------- */
{
  id: 'u3b2',
  title: 'Session Management Techniques with Example Programs',
  tags: ['session','session tracking','cookies','url rewriting','hidden form field','httpsession','state'],
  intro:
    p('HTTP is <b>stateless</b>: the server treats every request as new and does not remember the user. <b>Session management (session tracking)</b> is the set of techniques used to <b>identify a user across multiple requests</b> and keep their data (login status, shopping cart) during one visit. The Servlet API supports four techniques.'),
  sections: [
    section('1. Overview of the Four Techniques',
      diagram(
        svg(640,120,
          svgBox(5,35,140,50,'1. Cookies','bx') + svgBox(165,35,150,50,'2. Hidden form fields','bx') + svgBox(335,35,140,50,'3. URL rewriting','bx') + svgBox(495,35,140,50,'4. HttpSession','bx3')
        ),
        'Figure 1: Session tracking techniques (HttpSession internally uses cookie or URL rewriting)')
    ),
    section('2. Cookies',
      p('A <b>cookie</b> is a small piece of data created by the server and stored in the browser. The browser returns it with every request to the same site.') +
      code('CookieServlet.java', `
import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/cookie")
public class CookieServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        String user = null;
        Cookie[] cookies = req.getCookies();               // read cookies
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals("user")) user = c.getValue();
            }
        }
        if (user == null) {
            Cookie c = new Cookie("user", "Manohar");      // create cookie
            c.setMaxAge(60 * 60 * 24);                     // 1 day
            res.addCookie(c);                              // send to browser
            out.println("First visit: cookie created.");
        } else {
            out.println("Welcome back, " + user);
        }
    }
}
`) +
      p('<b>Advantages:</b> simple, persistent. <b>Disadvantages:</b> user can disable or edit cookies, size limit about 4 KB, stored only as text.')
    ),
    section('3. Hidden Form Fields',
      p('The server stores data in a hidden input of the HTML form it returns. The data goes back to the server when the form is submitted. It works only with form submissions.') +
      code('Servlet 1 writes a hidden field', `
out.println("<form action='step2' method='post'>");
out.println("<input type='hidden' name='userId' value='" + userId + "'>");
out.println("Address: <input type='text' name='address'>");
out.println("<input type='submit' value='Next'>");
out.println("</form>");
`) +
      code('Servlet 2 reads it', `
String userId  = request.getParameter("userId");
String address = request.getParameter("address");
`) +
      p('<b>Advantages:</b> works even if cookies are disabled. <b>Disadvantages:</b> only for forms, visible in page source, not secure.')
    ),
    section('4. URL Rewriting',
      p('The session data or ID is appended to the URL as a query string, for example <code class="inline">page2?user=Manohar</code> or <code class="inline">page2;jsessionid=ABC123</code>.') +
      code('', `
String user = request.getParameter("user");
out.println("<a href='second?user=" + user + "'>Go to next page</a>");

// container adds the session ID automatically when cookies are off
String url = response.encodeURL("second");
out.println("<a href='" + url + "'>Next</a>");
`) +
      p('<b>Advantages:</b> works when cookies are disabled. <b>Disadvantages:</b> long ugly URLs, data exposed in the URL, every link must be rewritten.')
    ),
    section('5. HttpSession (Recommended)',
      p('The container creates an <code class="inline">HttpSession</code> object on the <b>server</b> for each user and sends only a unique <b>session ID (JSESSIONID)</b> to the browser (in a cookie, or in the URL if cookies are off). Data is stored in the session object as attributes.') +
      diagram(
        svg(600,190,
          svgBox(10,60,120,60,'Browser\nJSESSIONID=A1B2','bx') +
          svgBox(240,20,150,50,'Servlet\ngetSession()','bx3') +
          svgBox(240,110,150,60,'Session store\nA1B2: {user, cart}','bx2') +
          svgBox(470,60,120,60,'Next request\nsame ID','bx') +
          svgArrow(130,80,240,45,'request') + svgArrow(315,70,315,110) + svgArrow(240,50,130,105,'response') + svgArrow(390,140,470,100)
        ),
        'Figure 2: HttpSession working') +
      table(['HttpSession method','Purpose'],[
        ['<code class="inline">request.getSession()</code>','Get existing session or create a new one'],
        ['<code class="inline">request.getSession(false)</code>','Get existing session, return null if none'],
        ['<code class="inline">setAttribute(name, value)</code>','Store data'],
        ['<code class="inline">getAttribute(name)</code>','Read data'],
        ['<code class="inline">removeAttribute(name)</code>','Remove data'],
        ['<code class="inline">getId()</code>','Session ID'],
        ['<code class="inline">isNew()</code>','True if session was just created'],
        ['<code class="inline">setMaxInactiveInterval(sec)</code>','Session timeout'],
        ['<code class="inline">invalidate()</code>','Destroy the session (logout)'],
        ['<code class="inline">getCreationTime(), getLastAccessedTime()</code>','Session times']
      ]) +
      code('LoginServlet.java', `
import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String user = req.getParameter("username");
        String pass = req.getParameter("password");

        if ("admin".equals(user) && "admin123".equals(pass)) {
            HttpSession session = req.getSession();        // create session
            session.setAttribute("user", user);
            session.setAttribute("visits", 0);
            session.setMaxInactiveInterval(15 * 60);       // 15 minutes
            res.sendRedirect("profile");
        } else {
            res.setContentType("text/html");
            res.getWriter().println("Invalid login. <a href='login.html'>Try again</a>");
        }
    }
}
`) +
      code('ProfileServlet.java', `
@WebServlet("/profile")
public class ProfileServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);       // do not create new
        if (session == null || session.getAttribute("user") == null) {
            res.sendRedirect("login.html");                // not logged in
            return;
        }
        int visits = (Integer) session.getAttribute("visits") + 1;
        session.setAttribute("visits", visits);

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        out.println("<h2>Welcome " + session.getAttribute("user") + "</h2>");
        out.println("<p>Session ID: " + session.getId() + "</p>");
        out.println("<p>Page visits in this session: " + visits + "</p>");
        out.println("<a href='logout'>Logout</a>");
    }
}
`) +
      code('LogoutServlet.java', `
@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);
        if (session != null) session.invalidate();         // destroy session
        res.sendRedirect("login.html");
    }
}
`) +
      code('Session timeout in web.xml (minutes)', `
<session-config>
  <session-timeout>30</session-timeout>
</session-config>
`)
    ),
    section('6. Comparison',
      table(['Feature','Cookies','Hidden field','URL rewriting','HttpSession'],[
        ['Stored at','Client','Page (client)','URL (client)','Server'],
        ['Works if cookies disabled','No','Yes','Yes','Yes (uses URL rewriting)'],
        ['Data size','About 4 KB','Small','URL length limit','Large'],
        ['Data type','String','String','String','Any Java object'],
        ['Security','Low','Low','Lowest','Highest'],
        ['Persistent after browser close','Yes (if maxAge set)','No','No','No'],
        ['Use','Remember me','Multi-step forms','Fallback','Login, cart']
      ])
    )
  ],
  rapid: [
    'HTTP is stateless, so we track users using: Cookies, Hidden form fields, URL rewriting, HttpSession.',
    'HttpSession stores data on the server; only JSESSIONID goes to the client.',
    'Methods: getSession(), setAttribute(), getAttribute(), invalidate(), setMaxInactiveInterval().',
    'HttpSession is the most secure and flexible technique.'
  ]
},

/* ---------- PNR program ---------- */
{
  id: 'u3b3',
  kind: 'Program',
  title: 'Program: Servlet to Display Status for a PNR Number (JDBC)',
  tags: ['pnr','servlet jdbc','database','preparedstatement','resultset','mysql','railway','program'],
  intro:
    p('<b>Problem:</b> A database table has the schema <code class="inline">(PNRNumber, status)</code>. Develop a Java Servlet that accepts a PNR number from an HTML form, searches the table and displays the ticket status.') +
    diagram(
      svg(660,130,
        svgBox(5,40,110,50,'pnr.html\n(form)','bx') + svgBox(165,40,130,50,'PNRServlet\ndoPost()','bx3') + svgBox(345,40,120,50,'JDBC\nPreparedStatement','bx2') + svgBox(515,40,140,50,'MySQL table\npnr','bx') +
        svgArrow(115,65,165,65) + svgArrow(295,65,345,65) + svgArrow(465,65,515,65)
      ),
      'Figure 1: Flow of the PNR status application'),
  sections: [
    section('1. Database Setup (MySQL)',
      code('pnr.sql', `
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

CREATE TABLE pnr (
    PNRNumber VARCHAR(10) PRIMARY KEY,
    status    VARCHAR(40) NOT NULL
);

INSERT INTO pnr VALUES ('1234567890', 'CONFIRMED - S5, Seat 32');
INSERT INTO pnr VALUES ('9876543210', 'WAITING LIST - WL 12');
INSERT INTO pnr VALUES ('1122334455', 'RAC - 5');
INSERT INTO pnr VALUES ('5566778899', 'CANCELLED');
`)
    ),
    section('2. HTML Form (pnr.html)',
      code('pnr.html', `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>PNR Status</title>
  <style>
    body{font-family:Arial;background:#eef2f7;display:flex;justify-content:center;padding:40px}
    form{background:#fff;padding:24px;border-radius:10px;box-shadow:0 2px 8px #0002;width:320px}
    input{width:100%;padding:8px;margin:8px 0}
  </style>
</head>
<body>
  <form action="pnrstatus" method="post">
    <h2>Check PNR Status</h2>
    <input type="text" name="pnr" maxlength="10" pattern="[0-9]{10}"
           placeholder="Enter 10 digit PNR" required>
    <input type="submit" value="Get Status">
  </form>
</body>
</html>
`)
    ),
    section('3. Servlet (PNRStatusServlet.java)',
      code('PNRStatusServlet.java', `
import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/pnrstatus")
public class PNRStatusServlet extends HttpServlet {

    private static final String URL  = "jdbc:mysql://localhost:3306/railway";
    private static final String USER = "root";
    private static final String PASS = "root";

    @Override
    public void init() throws ServletException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");      // 1. load driver
        } catch (ClassNotFoundException e) {
            throw new ServletException("MySQL driver not found", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String pnr = request.getParameter("pnr");

        out.println("<html><body style='font-family:Arial;padding:30px'>");
        out.println("<h2>PNR Status</h2>");

        if (pnr == null || !pnr.matches("\\\\d{10}")) {
            out.println("<p style='color:red'>Please enter a valid 10 digit PNR number.</p>");
        } else {
            String sql = "SELECT status FROM pnr WHERE PNRNumber = ?";

            // try-with-resources closes the connection automatically
            try (Connection con = DriverManager.getConnection(URL, USER, PASS);   // 2. connect
                 PreparedStatement ps = con.prepareStatement(sql)) {               // 3. statement

                ps.setString(1, pnr);
                try (ResultSet rs = ps.executeQuery()) {                           // 4. execute
                    if (rs.next()) {                                               // 5. process
                        out.println("<table border='1' cellpadding='8'>");
                        out.println("<tr><th>PNR Number</th><td>" + pnr + "</td></tr>");
                        out.println("<tr><th>Status</th><td><b>" + rs.getString("status") + "</b></td></tr>");
                        out.println("</table>");
                    } else {
                        out.println("<p style='color:red'>No record found for PNR " + pnr + "</p>");
                    }
                }
            } catch (SQLException e) {
                out.println("<p style='color:red'>Database error: " + e.getMessage() + "</p>");
            }
        }
        out.println("<p><a href='pnr.html'>Check another PNR</a></p>");
        out.println("</body></html>");
    }
}
`) +
      note('In a Java string the regular expression for ten digits is written <code class="inline">"\\\\d{10}"</code>, which means <code class="inline">\\d{10}</code>.')
    ),
    section('4. JDBC Steps Used',
      table(['Step','Code'],[
        ['1. Load the driver','<code class="inline">Class.forName("com.mysql.cj.jdbc.Driver")</code>'],
        ['2. Open the connection','<code class="inline">DriverManager.getConnection(url, user, pass)</code>'],
        ['3. Create the statement','<code class="inline">con.prepareStatement(sql)</code>'],
        ['4. Execute the query','<code class="inline">ps.executeQuery()</code> (SELECT) / <code class="inline">executeUpdate()</code> (INSERT, UPDATE, DELETE)'],
        ['5. Process the ResultSet','<code class="inline">while(rs.next()) rs.getString("col")</code>'],
        ['6. Close resources','<code class="inline">rs.close(), ps.close(), con.close()</code> (automatic with try-with-resources)']
      ])
    ),
    section('5. How to Run',
      ol([
        'Run <code class="inline">pnr.sql</code> in MySQL.',
        'Copy <code class="inline">mysql-connector-j.jar</code> into <code class="inline">WEB-INF/lib</code> of the web application.',
        'Place <code class="inline">pnr.html</code> in the web app root and the compiled servlet in <code class="inline">WEB-INF/classes</code>.',
        'Deploy to Tomcat and open <code class="inline">http://localhost:8080/PNRApp/pnr.html</code>.',
        'Enter <b>1234567890</b>; the page shows <i>CONFIRMED - S5, Seat 32</i>.'
      ]) +
      tip('<b>PreparedStatement</b> is used instead of Statement so the user input cannot cause <b>SQL injection</b>, and the query is precompiled for speed.')
    )
  ],
  rapid: [
    'Flow: HTML form (pnr), doPost, getParameter("pnr"), JDBC query, ResultSet, HTML output.',
    'JDBC steps: load driver, getConnection, prepareStatement, executeQuery, rs.next(), close.',
    'Use PreparedStatement with ? placeholder to avoid SQL injection.',
    'Add the MySQL connector jar to WEB-INF/lib.'
  ]
},

/* ---------- CRUD program ---------- */
{
  id: 'u3b4',
  kind: 'Program',
  title: 'Program: Servlet Database Application (Insert, Delete, Update, Display) using JDBC',
  tags: ['crud','insert','update','delete','display','jdbc','servlet database','student table','program'],
  intro:
    p('<b>Problem:</b> Develop a Java Servlet application that performs <b>Insert, Update, Delete and Display</b> operations on a <code class="inline">student</code> table using JDBC.') +
    diagram(
      svg(660,150,
        svgBox(5,50,130,50,'index.html\n(forms)','bx') + svgBox(185,50,140,50,'StudentServlet\naction = ?','bx3') + svgBox(375,10,110,36,'INSERT','bx2') + svgBox(375,57,110,36,'UPDATE','bx2') + svgBox(375,104,110,36,'DELETE / SELECT','bx2') + svgBox(535,50,120,50,'MySQL\nstudent','bx') +
        svgArrow(135,75,185,75) + svgArrow(325,65,375,28) + svgArrow(325,75,375,75) + svgArrow(325,85,375,122) + svgArrow(485,75,535,75)
      ),
      'Figure 1: One servlet chooses the operation using the action parameter'),
  sections: [
    section('1. Database Table',
      code('student.sql', `
CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE student (
    id    INT PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    dept  VARCHAR(20),
    marks INT
);
`)
    ),
    section('2. HTML Page (index.html)',
      code('index.html', `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Student CRUD</title>
  <style>
    body{font-family:Arial;background:#f2f4f8;padding:20px}
    fieldset{background:#fff;margin:12px 0;padding:14px;border-radius:8px;max-width:420px}
    input{padding:6px;margin:4px 0;width:95%}
    legend{font-weight:bold}
  </style>
</head>
<body>
  <h2>Student Management (Servlet + JDBC)</h2>

  <form action="student" method="post">
    <fieldset><legend>Insert</legend>
      <input type="hidden" name="action" value="insert">
      <input type="number" name="id" placeholder="ID" required>
      <input type="text" name="name" placeholder="Name" required>
      <input type="text" name="dept" placeholder="Department">
      <input type="number" name="marks" placeholder="Marks">
      <input type="submit" value="Insert">
    </fieldset>
  </form>

  <form action="student" method="post">
    <fieldset><legend>Update</legend>
      <input type="hidden" name="action" value="update">
      <input type="number" name="id" placeholder="ID of student to update" required>
      <input type="text" name="name" placeholder="New name" required>
      <input type="text" name="dept" placeholder="New department">
      <input type="number" name="marks" placeholder="New marks">
      <input type="submit" value="Update">
    </fieldset>
  </form>

  <form action="student" method="post">
    <fieldset><legend>Delete</legend>
      <input type="hidden" name="action" value="delete">
      <input type="number" name="id" placeholder="ID of student to delete" required>
      <input type="submit" value="Delete">
    </fieldset>
  </form>

  <p><a href="student">Display all students</a></p>
</body>
</html>
`)
    ),
    section('3. Servlet (StudentServlet.java)',
      code('StudentServlet.java', `
import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/student")
public class StudentServlet extends HttpServlet {

    private static final String URL  = "jdbc:mysql://localhost:3306/college";
    private static final String USER = "root";
    private static final String PASS = "root";

    @Override
    public void init() throws ServletException {
        try { Class.forName("com.mysql.cj.jdbc.Driver"); }
        catch (ClassNotFoundException e) { throw new ServletException(e); }
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }

    /* DISPLAY: GET request shows all rows */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println("<html><body style='font-family:Arial;padding:20px'>");
        out.println("<h2>Student List</h2>");
        showTable(out);
        out.println("<p><a href='index.html'>Back</a></p></body></html>");
    }

    /* INSERT, UPDATE, DELETE: POST request */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        String action = req.getParameter("action");
        String message;

        try (Connection con = getConnection()) {
            int rows;
            switch (action) {
                case "insert": {
                    PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO student(id, name, dept, marks) VALUES (?,?,?,?)");
                    ps.setInt(1, Integer.parseInt(req.getParameter("id")));
                    ps.setString(2, req.getParameter("name"));
                    ps.setString(3, req.getParameter("dept"));
                    ps.setInt(4, Integer.parseInt(req.getParameter("marks")));
                    rows = ps.executeUpdate();
                    message = rows + " record inserted.";
                    break;
                }
                case "update": {
                    PreparedStatement ps = con.prepareStatement(
                        "UPDATE student SET name=?, dept=?, marks=? WHERE id=?");
                    ps.setString(1, req.getParameter("name"));
                    ps.setString(2, req.getParameter("dept"));
                    ps.setInt(3, Integer.parseInt(req.getParameter("marks")));
                    ps.setInt(4, Integer.parseInt(req.getParameter("id")));
                    rows = ps.executeUpdate();
                    message = (rows > 0) ? "Record updated." : "No student with that ID.";
                    break;
                }
                case "delete": {
                    PreparedStatement ps = con.prepareStatement("DELETE FROM student WHERE id=?");
                    ps.setInt(1, Integer.parseInt(req.getParameter("id")));
                    rows = ps.executeUpdate();
                    message = (rows > 0) ? "Record deleted." : "No student with that ID.";
                    break;
                }
                default:
                    message = "Unknown action.";
            }
        } catch (SQLIntegrityConstraintViolationException e) {
            message = "Error: ID already exists.";
        } catch (SQLException | NumberFormatException e) {
            message = "Error: " + e.getMessage();
        }

        out.println("<html><body style='font-family:Arial;padding:20px'>");
        out.println("<h3>" + message + "</h3>");
        showTable(out);                                   // show updated table
        out.println("<p><a href='index.html'>Back</a></p></body></html>");
    }

    private void showTable(PrintWriter out) {
        try (Connection con = getConnection();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM student ORDER BY id")) {

            out.println("<table border='1' cellpadding='8' style='border-collapse:collapse'>");
            out.println("<tr style='background:#3b5bdb;color:#fff'><th>ID</th><th>Name</th><th>Dept</th><th>Marks</th></tr>");
            while (rs.next()) {
                out.println("<tr><td>" + rs.getInt("id") + "</td><td>" + escape(rs.getString("name"))
                    + "</td><td>" + escape(rs.getString("dept")) + "</td><td>" + rs.getInt("marks") + "</td></tr>");
            }
            out.println("</table>");
        } catch (SQLException e) {
            out.println("<p style='color:red'>Error: " + e.getMessage() + "</p>");
        }
    }

    private String escape(String s) {
        return s == null ? "" : s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
}
`)
    ),
    section('4. JDBC API Used',
      table(['Interface / Class','Purpose'],[
        ['DriverManager','Creates the database connection'],
        ['Connection','Session with the database'],
        ['Statement','Runs static SQL'],
        ['PreparedStatement','Precompiled SQL with ? parameters (safe and fast)'],
        ['ResultSet','Table of rows returned by SELECT'],
        ['executeQuery()','For SELECT; returns ResultSet'],
        ['executeUpdate()','For INSERT, UPDATE, DELETE; returns number of rows changed']
      ]) +
      table(['Operation','SQL','Servlet method'],[
        ['Insert','INSERT INTO student VALUES(?,?,?,?)','doPost, action=insert'],
        ['Update','UPDATE student SET ... WHERE id=?','doPost, action=update'],
        ['Delete','DELETE FROM student WHERE id=?','doPost, action=delete'],
        ['Display','SELECT * FROM student','doGet']
      ])
    ),
    section('5. How to Run',
      ol([
        'Create the table using <code class="inline">student.sql</code>.',
        'Put <code class="inline">mysql-connector-j.jar</code> in <code class="inline">WEB-INF/lib</code>.',
        'Compile the servlet and deploy the folder in Tomcat <code class="inline">webapps</code>.',
        'Open <code class="inline">index.html</code>, then insert, update, delete or click Display.'
      ])
    )
  ],
  rapid: [
    'One servlet handles all operations: hidden field action = insert / update / delete; doGet displays.',
    'executeUpdate() for INSERT, UPDATE, DELETE; executeQuery() for SELECT.',
    'Always use PreparedStatement and try-with-resources.',
    'JDBC steps: load driver, connect, prepare, execute, process results, close.'
  ]
}

]);
