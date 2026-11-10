/* Unit 4 - additional Part B answers (PHP) */
addUnit(4, 'PHP', [

/* ---------- Associative array, variables, data types ---------- */
{
  id: 'u4b1',
  title: 'Associative Array, Variables and Data Types in PHP',
  tags: ['php variables','data types','constants','associative array','scope','superglobals','type casting'],
  intro:
    p('<b>PHP</b> (Hypertext Preprocessor) is an open-source, server-side scripting language embedded in HTML. PHP is <b>loosely typed</b>: a variable\'s data type is decided automatically from the value stored in it. This answer explains <b>variables</b>, <b>constants</b>, <b>data types</b> and <b>associative arrays</b>.'),
  sections: [
    section('1. Variables',
      p('A variable is a named memory location that stores a value. In PHP every variable starts with a <b>$</b> sign.') +
      ul([
        'Name starts with a letter or underscore, never a digit: <code class="inline">$name</code>, <code class="inline">$_total</code>',
        'Can contain letters, digits and underscore; <b>case sensitive</b> (<code class="inline">$a</code> and <code class="inline">$A</code> differ).',
        'No need to declare the type; it is created when first assigned.',
        'Assign by value (<code class="inline">$b = $a;</code>) or by reference (<code class="inline">$b = &amp;$a;</code>).'
      ]) +
      code('variables.php', `
<?php
$name  = "Manohar";      // string
$age   = 20;             // integer
$cgpa  = 8.5;            // float
$pass  = true;           // boolean
$x = 10;
$y = &$x;                // reference
$y = 99;
echo "$name is $age years old. x = $x";   // x becomes 99
?>
`) +
      h3('Variable scope') +
      table(['Scope','Description','Example'],[
        ['Local','Declared inside a function; visible only there','<code class="inline">function f(){ $a=1; }</code>'],
        ['Global','Declared outside functions; use <code class="inline">global $a</code> or <code class="inline">$GLOBALS["a"]</code> inside a function','<code class="inline">global $total;</code>'],
        ['Static','Keeps its value between function calls','<code class="inline">static $count = 0;</code>'],
        ['Parameter','Variables in the function parameter list','<code class="inline">function add($a,$b)</code>']
      ]) +
      code('scope.php', `
<?php
$total = 100;                    // global
function show() {
    global $total;               // access global variable
    static $calls = 0;           // retains value
    $calls++;
    echo "Total=$total, call number $calls<br>";
}
show(); show(); show();          // call number 1, 2, 3
?>
`) +
      h3('Superglobal variables') +
      p('<code class="inline">$_GET, $_POST, $_REQUEST, $_SERVER, $_SESSION, $_COOKIE, $_FILES, $_ENV, $GLOBALS</code> are built-in arrays available everywhere without <code class="inline">global</code>.')
    ),
    section('2. Constants',
      p('A constant is a name whose value <b>cannot change</b> after it is defined. It has <b>no $ sign</b> and is global in scope.') +
      code('constants.php', `
<?php
define("COLLEGE", "Kamaraj College");     // define() function
const PI = 3.14159;                       // const keyword
echo COLLEGE . " " . PI;
echo PHP_VERSION;                         // predefined constant
echo __LINE__ . " " . __FILE__;           // magic constants
?>
`) +
      table(['Variable','Constant'],[
        ['Starts with $','No $ sign'],
        ['Value can change','Value cannot change'],
        ['Scope follows rules','Always global'],
        ['<code class="inline">$a = 5;</code>','<code class="inline">define("A", 5);</code> or <code class="inline">const A = 5;</code>']
      ])
    ),
    section('3. Data Types',
      diagram(
        svg(640,190,
          svgBox(240,5,160,36,'PHP Data Types','bx') +
          svgBox(10,80,170,60,'Scalar\nstring, integer,\nfloat, boolean','bx3') +
          svgBox(235,80,170,60,'Compound\narray, object','bx3') +
          svgBox(460,80,170,60,'Special\nNULL, resource','bx3') +
          svgArrow(280,41,95,80) + svgArrow(320,41,320,80) + svgArrow(360,41,545,80)
        ),
        'Figure 1: Classification of PHP data types') +
      table(['Type','Description','Example'],[
        ['string','Sequence of characters in single or double quotes','<code class="inline">$s = "Hello";</code>'],
        ['integer','Whole number (decimal, 0x hex, 0b binary, 0 octal)','<code class="inline">$i = 42;</code>'],
        ['float / double','Number with decimal point','<code class="inline">$f = 3.14;</code>'],
        ['boolean','true or false','<code class="inline">$b = true;</code>'],
        ['array','Collection of values (indexed, associative, multidimensional)','<code class="inline">$a = [1,2,3];</code>'],
        ['object','Instance of a class','<code class="inline">$o = new Student();</code>'],
        ['NULL','Variable with no value','<code class="inline">$n = null;</code>'],
        ['resource','Reference to an external resource (file handle, DB connection)','<code class="inline">$fh = fopen("a.txt","r");</code>']
      ]) +
      code('datatypes.php', `
<?php
$a = "Hello";  $b = 25;  $c = 9.99;  $d = false;  $e = [1, 2];  $f = null;

var_dump($a);        // string(5) "Hello"
var_dump($b);        // int(25)
var_dump($c);        // float(9.99)
var_dump($d);        // bool(false)
echo gettype($e);    // array
var_dump(is_null($f));           // bool(true)

// type casting
$n = (int) "123abc";             // 123
$m = (float) "5.5";              // 5.5
$s = (string) 100;               // "100"
$z = "5" + 3;                    // 8  (type juggling: string converted to int)
?>
`) +
      table(['Function','Use'],[
        ['var_dump($v)','Type and value'],
        ['gettype($v)','Type name'],
        ['is_int(), is_string(), is_array(), is_bool(), is_null()','Check type'],
        ['intval(), floatval(), strval(), settype()','Convert type'],
        ['isset(), empty(), unset()','Check or remove variable']
      ])
    ),
    section('4. Associative Arrays',
      p('An <b>associative array</b> uses <b>named keys</b> (usually strings) instead of numeric indexes to identify each value, so data is stored as <b>key => value</b> pairs.') +
      code('assoc.php', `
<?php
// creating
$student = array("name" => "Manohar", "dept" => "CSE", "year" => 3);
$marks   = ["Maths" => 85, "Physics" => 78, "PHP" => 92];

// accessing, adding, modifying, removing
echo $student["name"];             // Manohar
$student["cgpa"] = 8.5;            // add new pair
$student["year"] = 4;              // modify
unset($student["dept"]);           // remove

// looping
foreach ($marks as $subject => $score) {
    echo "$subject : $score <br>";
}

// checking
if (isset($marks["PHP"]))           echo "PHP mark found";
if (array_key_exists("Chem", $marks)) echo "Chem found"; else echo "Chem not found";

// useful functions
print_r(array_keys($marks));        // [Maths, Physics, PHP]
print_r(array_values($marks));      // [85, 78, 92]
echo array_sum($marks) / count($marks);   // average
arsort($marks);                     // sort by value, descending, keep keys
ksort($marks);                      // sort by key
echo array_search(92, $marks);      // PHP  (key of value 92)

// nested associative array
$college = [
    "CSE" => ["hod" => "Dr. Kumar", "students" => 120],
    "IT"  => ["hod" => "Dr. Priya", "students" => 90]
];
echo $college["CSE"]["hod"];        // Dr. Kumar
?>
`) +
      table(['Indexed array','Associative array'],[
        ['Keys are numbers 0, 1, 2...','Keys are names (strings)'],
        ['<code class="inline">$a[0]</code>','<code class="inline">$a["name"]</code>'],
        ['Access by position','Access by meaningful key'],
        ['Use: lists','Use: records, settings, form data (e.g. $_POST)']
      ])
    )
  ],
  rapid: [
    'Variables start with $, are case sensitive and loosely typed; scopes: local, global, static, parameter.',
    'Constants: define("NAME", value) or const NAME = value; no $ sign; cannot change.',
    'Types: string, integer, float, boolean, array, object, NULL, resource.',
    'Associative array = key => value pairs; loop with foreach ($a as $k => $v); isset, array_key_exists, unset.'
  ]
},

/* ---------- PHP form program ---------- */
{
  id: 'u4b2',
  kind: 'Program',
  title: 'Program: Simple PHP Web Application to Get and Display Data from an HTML Form',
  tags: ['php form','post','get','$_post','validation','htmlspecialchars','filter_var','sticky form','program'],
  intro:
    p('<b>Problem:</b> Create a simple PHP application that accepts student details through an HTML form, validates them on the server, and displays the submitted data.') +
    diagram(
      svg(620,130,
        svgBox(5,40,120,50,'HTML form\n(browser)','bx') + svgBox(190,40,130,50,'PHP script\n$_POST','bx3') + svgBox(385,40,110,50,'Validate\n& sanitise','bx2') + svgBox(540,40,75,50,'Display','bx') +
        svgArrow(125,65,190,65,'POST') + svgArrow(320,65,385,65) + svgArrow(495,65,540,65)
      ),
      'Figure 1: Form processing flow'),
  sections: [
    section('1. Step 1: HTML Form (form.html)',
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
  <form action="process.php" method="post">
    <h2>Student Registration</h2>
    <label>Name</label>      <input type="text"   name="name"  required>
    <label>Email</label>     <input type="email"  name="email" required>
    <label>Age</label>       <input type="number" name="age">
    <label>Gender</label>
      <input type="radio" name="gender" value="Male"> Male
      <input type="radio" name="gender" value="Female"> Female
    <label>Department</label>
    <select name="dept"><option>CSE</option><option>IT</option><option>ECE</option></select>
    <label>Skills</label>
      <input type="checkbox" name="skills[]" value="PHP"> PHP
      <input type="checkbox" name="skills[]" value="Java"> Java
      <input type="checkbox" name="skills[]" value="Python"> Python
    <label>Comments</label>  <input type="text" name="comments">
    <button type="submit">Submit</button>
  </form>
</body>
</html>
`)
    ),
    section('2. Step 2: PHP Script (process.php)',
      code('process.php', `
<?php
// Allow only POST access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: form.html");
    exit();
}

// helper to clean input
function clean($data) {
    return htmlspecialchars(trim(stripslashes($data)));
}

$errors = [];

// 1. read and sanitise
$name     = clean($_POST["name"]  ?? "");
$email    = clean($_POST["email"] ?? "");
$age      = clean($_POST["age"]   ?? "");
$gender   = clean($_POST["gender"] ?? "");
$dept     = clean($_POST["dept"]  ?? "");
$comments = clean($_POST["comments"] ?? "");
$skills   = isset($_POST["skills"]) ? array_map("clean", $_POST["skills"]) : [];

// 2. server side validation
if ($name === "" || !preg_match("/^[A-Za-z ]{3,40}$/", $name)) {
    $errors[] = "Name must be 3 to 40 letters.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Enter a valid email address.";
}
if ($age !== "" && (!ctype_digit($age) || $age < 15 || $age > 60)) {
    $errors[] = "Age must be between 15 and 60.";
}
if ($gender === "") {
    $errors[] = "Select a gender.";
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Result</title>
  <style>
    body{font-family:Arial;background:#f2f4f8;padding:30px}
    table{border-collapse:collapse;background:#fff}
    td,th{border:1px solid #999;padding:8px 14px;text-align:left}
    th{background:#3b5bdb;color:#fff}
    .err{color:#c92a2a}
  </style>
</head>
<body>
<?php if (!empty($errors)): ?>
    <h2 class="err">Please correct the following:</h2>
    <ul class="err">
      <?php foreach ($errors as $e): ?>
        <li><?php echo $e; ?></li>
      <?php endforeach; ?>
    </ul>
    <a href="javascript:history.back()">Go back</a>
<?php else: ?>
    <h2>Submitted Details</h2>
    <table>
      <tr><th>Field</th><th>Value</th></tr>
      <tr><td>Name</td><td><?php echo $name; ?></td></tr>
      <tr><td>Email</td><td><?php echo $email; ?></td></tr>
      <tr><td>Age</td><td><?php echo $age ?: "-"; ?></td></tr>
      <tr><td>Gender</td><td><?php echo $gender; ?></td></tr>
      <tr><td>Department</td><td><?php echo $dept; ?></td></tr>
      <tr><td>Skills</td><td><?php echo $skills ? implode(", ", $skills) : "None"; ?></td></tr>
      <tr><td>Comments</td><td><?php echo $comments ?: "-"; ?></td></tr>
    </table>
    <p><a href="form.html">Back to form</a></p>
<?php endif; ?>
</body>
</html>
`)
    ),
    section('3. Key Points',
      table(['Item','Explanation'],[
        ['<code class="inline">method="post"</code>','Data is sent in the request body and available in <code class="inline">$_POST</code> (GET uses <code class="inline">$_GET</code>)'],
        ['<code class="inline">name</code> attribute','The key used in <code class="inline">$_POST["name"]</code>'],
        ['<code class="inline">skills[]</code>','Checkboxes with the same name arrive as an array'],
        ['<code class="inline">??</code>','Null coalescing: default value if the key is missing'],
        ['<code class="inline">htmlspecialchars()</code>','Escapes &lt; &gt; &amp; to prevent XSS'],
        ['<code class="inline">filter_var()</code>','Built-in validation for email, URL, integers'],
        ['<code class="inline">preg_match()</code>','Regular expression validation'],
        ['Server side validation','Always required, because client side checks can be bypassed']
      ]) +
      tip('To run: install XAMPP/WAMP, put <code class="inline">form.html</code> and <code class="inline">process.php</code> in <code class="inline">htdocs</code>, start Apache, and open <code class="inline">http://localhost/form.html</code>.')
    )
  ],
  rapid: [
    'HTML form action="process.php" method="post"; PHP reads $_POST["field"].',
    'Sanitise with trim, stripslashes, htmlspecialchars; validate with filter_var and preg_match.',
    'Checkbox group name must end with [] to arrive as an array.',
    'Always validate on the server, even if the client validates.'
  ]
},

/* ---------- PHP database program ---------- */
{
  id: 'u4b3',
  kind: 'Program',
  title: 'Program: PHP Database Application (Insert, Delete, Update, Display)',
  tags: ['php mysql','pdo','mysqli','crud','insert','update','delete','display','database','program'],
  intro:
    p('<b>Problem:</b> Develop a PHP application that connects to a MySQL database and performs <b>Insert, Update, Delete and Display</b> operations on a student table. The program uses <b>PDO with prepared statements</b>, which protect against SQL injection.') +
    diagram(
      svg(640,150,
        svgBox(5,50,120,50,'Browser\n(form + table)','bx') + svgBox(180,50,140,50,'students.php\n(PDO)','bx3') + svgBox(375,10,110,36,'INSERT','bx2') + svgBox(375,57,110,36,'UPDATE / DELETE','bx2') + svgBox(375,104,110,36,'SELECT','bx2') + svgBox(535,50,100,50,'MySQL','bx') +
        svgArrow(125,75,180,75) + svgArrow(320,65,375,28) + svgArrow(320,75,375,75) + svgArrow(320,85,375,122) + svgArrow(485,75,535,75)
      ),
      'Figure 1: PHP CRUD application'),
  sections: [
    section('1. Database Setup',
      code('student.sql', `
CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE student (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    dept  VARCHAR(20),
    marks INT
);
`)
    ),
    section('2. Database Connection (db.php)',
      code('db.php', `
<?php
$host = "localhost";
$db   = "college";
$user = "root";
$pass = "";                     // empty password in default XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
`) +
      code('MySQLi alternative', `
<?php
$conn = mysqli_connect("localhost", "root", "", "college");
if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }
?>
`)
    ),
    section('3. Complete Program (students.php)',
      p('A single page handles all four operations. The same form is used for insert and update (edit mode).') +
      code('students.php', `
<?php
require "db.php";

$msg = "";
$edit = ["id" => "", "name" => "", "dept" => "", "marks" => ""];

/* ---------- INSERT and UPDATE ---------- */
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id    = $_POST["id"] ?? "";
    $name  = trim($_POST["name"]);
    $dept  = trim($_POST["dept"]);
    $marks = (int) $_POST["marks"];

    if ($name === "") {
        $msg = "Name is required.";
    } elseif ($id === "") {
        // INSERT
        $st = $pdo->prepare("INSERT INTO student (name, dept, marks) VALUES (?, ?, ?)");
        $st->execute([$name, $dept, $marks]);
        $msg = "Record inserted.";
    } else {
        // UPDATE
        $st = $pdo->prepare("UPDATE student SET name=?, dept=?, marks=? WHERE id=?");
        $st->execute([$name, $dept, $marks, $id]);
        $msg = "Record updated.";
    }
}

/* ---------- DELETE ---------- */
if (isset($_GET["delete"])) {
    $st = $pdo->prepare("DELETE FROM student WHERE id = ?");
    $st->execute([$_GET["delete"]]);
    $msg = "Record deleted.";
}

/* ---------- LOAD ROW FOR EDITING ---------- */
if (isset($_GET["edit"])) {
    $st = $pdo->prepare("SELECT * FROM student WHERE id = ?");
    $st->execute([$_GET["edit"]]);
    $row = $st->fetch(PDO::FETCH_ASSOC);
    if ($row) { $edit = $row; }
}

/* ---------- DISPLAY ---------- */
$rows = $pdo->query("SELECT * FROM student ORDER BY id")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Student CRUD</title>
  <style>
    body{font-family:Arial;background:#f2f4f8;padding:20px}
    form,table{background:#fff;padding:14px;border-radius:8px;margin-bottom:16px}
    input{padding:6px;margin:4px}
    table{border-collapse:collapse}
    td,th{border:1px solid #999;padding:8px 12px}
    th{background:#3b5bdb;color:#fff}
    .msg{color:#2b8a3e;font-weight:bold}
  </style>
</head>
<body>
  <h2>Student Management (PHP + MySQL)</h2>
  <p class="msg"><?php echo htmlspecialchars($msg); ?></p>

  <form method="post" action="students.php">
    <h3><?php echo $edit["id"] === "" ? "Add Student" : "Edit Student"; ?></h3>
    <input type="hidden" name="id" value="<?php echo htmlspecialchars($edit["id"]); ?>">
    <input type="text"   name="name"  placeholder="Name"  value="<?php echo htmlspecialchars($edit["name"]); ?>" required>
    <input type="text"   name="dept"  placeholder="Dept"  value="<?php echo htmlspecialchars($edit["dept"]); ?>">
    <input type="number" name="marks" placeholder="Marks" value="<?php echo htmlspecialchars($edit["marks"]); ?>">
    <input type="submit" value="<?php echo $edit["id"] === "" ? "Insert" : "Update"; ?>">
    <?php if ($edit["id"] !== ""): ?><a href="students.php">Cancel</a><?php endif; ?>
  </form>

  <table>
    <tr><th>ID</th><th>Name</th><th>Dept</th><th>Marks</th><th>Action</th></tr>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?php echo $r["id"]; ?></td>
        <td><?php echo htmlspecialchars($r["name"]); ?></td>
        <td><?php echo htmlspecialchars($r["dept"]); ?></td>
        <td><?php echo $r["marks"]; ?></td>
        <td>
          <a href="?edit=<?php echo $r["id"]; ?>">Edit</a> |
          <a href="?delete=<?php echo $r["id"]; ?>" onclick="return confirm('Delete this record?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; ?>
    <?php if (!$rows): ?><tr><td colspan="5">No records found.</td></tr><?php endif; ?>
  </table>
</body>
</html>
`)
    ),
    section('4. Operations Summary',
      table(['Operation','SQL','PHP code'],[
        ['Insert','INSERT INTO student (name,dept,marks) VALUES (?,?,?)','<code class="inline">$st->execute([...])</code>'],
        ['Update','UPDATE student SET ... WHERE id=?','<code class="inline">prepare() and execute()</code>'],
        ['Delete','DELETE FROM student WHERE id=?','<code class="inline">prepare() and execute()</code>'],
        ['Display','SELECT * FROM student','<code class="inline">query()->fetchAll(PDO::FETCH_ASSOC)</code>']
      ]) +
      table(['PDO / MySQLi function','Purpose'],[
        ['<code class="inline">new PDO(dsn, user, pass)</code>','Connect to the database'],
        ['<code class="inline">prepare($sql)</code>','Create a prepared statement'],
        ['<code class="inline">execute([params])</code>','Run the statement with values'],
        ['<code class="inline">fetch() / fetchAll()</code>','Read one row / all rows'],
        ['<code class="inline">mysqli_connect(), mysqli_query(), mysqli_fetch_assoc(), mysqli_close()</code>','MySQLi equivalents']
      ]) +
      tip('Prepared statements keep SQL and data separate, so user input can never change the query (prevents <b>SQL injection</b>). <code class="inline">htmlspecialchars()</code> prevents <b>XSS</b> when printing data.')
    ),
    section('5. How to Run',
      ol([
        'Install XAMPP and start <b>Apache</b> and <b>MySQL</b>.',
        'Open phpMyAdmin and run <code class="inline">student.sql</code>.',
        'Copy <code class="inline">db.php</code> and <code class="inline">students.php</code> into <code class="inline">htdocs/crud/</code>.',
        'Open <code class="inline">http://localhost/crud/students.php</code>.'
      ])
    )
  ],
  rapid: [
    'Connect with PDO (or mysqli_connect); use prepare() and execute() with ? placeholders.',
    'Insert = INSERT, Update = UPDATE ... WHERE id, Delete = DELETE ... WHERE id, Display = SELECT then foreach.',
    'htmlspecialchars() when printing; prepared statements against SQL injection.',
    'Run in XAMPP: Apache + MySQL, files in htdocs.'
  ]
}

]);
