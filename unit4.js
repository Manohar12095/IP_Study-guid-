addUnit(4, 'PHP', [

/* ---------- 1. PHP Cookies & Session ---------- */
{
  id: 'u4q1',
  title: 'PHP Cookies and Sessions',
  tags: ['php','cookie','session','setcookie','session_start','state management','$_COOKIE','$_SESSION'],
  intro:
    p('HTTP is a <b>stateless</b> protocol, so the server cannot remember a user between requests. PHP provides two mechanisms for <b>state management</b>: <b>Cookies</b> (data stored in the user\'s browser) and <b>Sessions</b> (data stored on the server).'),
  sections: [
    section('1. Cookies',
      p('A <b>cookie</b> is a small piece of data (up to about 4 KB) that the server sends to the browser using the <code class="inline">Set-Cookie</code> header. The browser stores it and sends it back with every later request to the same site in the <code class="inline">Cookie</code> header.') +
      diagram(
        svg(560,200,
          svgBox(20,70,110,60,'Browser','bx') + svgBox(420,70,120,60,'PHP Server','bx3') +
          svgArrow(130,85,420,85,'1. Request') + svgArrow(420,105,130,105,'2. Response + Set-Cookie') +
          svgArrow(130,125,420,125,'3. Next request + Cookie') +
          '<text x="280" y="170" text-anchor="middle" font-size="12">Cookie stored on the client side</text>'
        ),
        'Figure 1: Cookie exchange') +
      h3('Creating a cookie') +
      code('Syntax', `setcookie(name, value, expire, path, domain, secure, httponly);`) +
      code('', `
<?php
// must be called BEFORE any HTML output
setcookie("username", "Manohar", time() + (86400 * 7), "/");   // valid for 7 days
?>
`) +
      h3('Reading, modifying and deleting') +
      code('', `
<?php
if (isset($_COOKIE["username"])) {
    echo "Welcome back, " . $_COOKIE["username"];
} else {
    echo "Cookie not set";
}

// modify: call setcookie again with a new value
setcookie("username", "Ravi", time() + 3600, "/");

// delete: set expiry time in the past
setcookie("username", "", time() - 3600, "/");
?>
`) +
      table(['Parameter','Meaning'],[
        ['name','Cookie name'],
        ['value','Cookie value (stored as text)'],
        ['expire','Unix timestamp; 0 = until browser closes'],
        ['path','"/" makes it available on the whole site'],
        ['domain','Domain where it is valid'],
        ['secure','Send only over HTTPS'],
        ['httponly','Not accessible to JavaScript (protects against XSS)']
      ])
    ),
    section('2. Sessions',
      p('A <b>session</b> stores user data on the <b>server</b>. The browser only keeps a unique <b>Session ID</b> (<code class="inline">PHPSESSID</code>) in a cookie (or the URL). With this ID, PHP finds the user\'s data in the <code class="inline">$_SESSION</code> superglobal array.') +
      diagram(
        svg(580,220,
          svgBox(20,70,110,60,'Browser\nPHPSESSID=abc','bx') +
          svgBox(420,30,140,50,'PHP script\nsession_start()','bx3') +
          svgBox(420,130,140,60,'Server storage\nsess_abc file\n$_SESSION data','bx2') +
          svgArrow(130,90,420,60,'request with ID') + svgArrow(490,80,490,130,'read/write') +
          svgArrow(420,45,130,105,'response')
        ),
        'Figure 2: Session mechanism') +
      h3('Session functions and usage') +
      code('session1.php (set session)', `
<?php
session_start();                       // must be the first statement, before any output

$_SESSION["user"]  = "Manohar";
$_SESSION["role"]  = "student";
$_SESSION["login"] = time();
echo "Session started. ID = " . session_id();
?>
<a href="session2.php">Go to page 2</a>
`) +
      code('session2.php (use session)', `
<?php
session_start();

if (isset($_SESSION["user"])) {
    echo "Hello " . $_SESSION["user"] . ", role: " . $_SESSION["role"];
} else {
    header("Location: login.php");
    exit();
}
?>
<a href="logout.php">Logout</a>
`) +
      code('logout.php (destroy session)', `
<?php
session_start();
session_unset();        // remove all session variables
session_destroy();      // destroy the session on the server
setcookie(session_name(), "", time() - 3600, "/");   // delete session cookie
header("Location: login.php");
exit();
?>
`) +
      table(['Function','Purpose'],[
        ['session_start()','Starts or resumes a session'],
        ['$_SESSION["key"]','Store/read session data'],
        ['session_id()','Get or set the session ID'],
        ['session_unset()','Remove all session variables'],
        ['session_destroy()','Destroy all session data'],
        ['session_regenerate_id(true)','New ID after login (prevents session fixation)']
      ])
    ),
    section('3. Complete Login Example Using Session and Remember-me Cookie',
      code('login.php', `
<?php
session_start();
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $u = trim($_POST["username"]);
    $p = $_POST["password"];

    // demo credentials (real apps check a database with password_verify)
    if ($u === "admin" && $p === "admin123") {
        session_regenerate_id(true);
        $_SESSION["user"] = $u;

        if (isset($_POST["remember"])) {
            setcookie("remember_user", $u, time() + 86400 * 30, "/", "", false, true);
        }
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Invalid username or password";
    }
}
$remembered = isset($_COOKIE["remember_user"]) ? $_COOKIE["remember_user"] : "";
?>
<form method="post">
  <input name="username" value="<?php echo htmlspecialchars($remembered); ?>" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <label><input type="checkbox" name="remember"> Remember me</label>
  <button>Login</button>
  <p style="color:red"><?php echo $error; ?></p>
</form>
`) +
      code('dashboard.php', `
<?php
session_start();
if (!isset($_SESSION["user"])) { header("Location: login.php"); exit(); }
echo "<h2>Welcome, " . htmlspecialchars($_SESSION["user"]) . "</h2>";
echo "<a href='logout.php'>Logout</a>";
?>
`)
    ),
    section('4. Cookies vs Sessions',
      table(['Feature','Cookie','Session'],[
        ['Storage location','Client browser','Server'],
        ['Security','Less secure (user can view/edit)','More secure'],
        ['Size limit','About 4 KB','Depends on server memory'],
        ['Lifetime','Until expiry date set','Until browser closes / timeout (default 24 minutes idle)'],
        ['Data type','Strings only','Any PHP data incl. arrays and objects'],
        ['Access','<code class="inline">$_COOKIE</code>','<code class="inline">$_SESSION</code>'],
        ['Start','<code class="inline">setcookie()</code>','<code class="inline">session_start()</code>'],
        ['Use','Remember me, preferences, tracking','Login state, shopping cart']
      ])
    )
  ],
  rapid: [
    'HTTP is stateless; cookies (client) and sessions (server) maintain state.',
    'setcookie() before any output; read via $_COOKIE; delete by setting past expiry.',
    'session_start() first, store in $_SESSION, session_unset() + session_destroy() to end.',
    'Session ID is kept in a PHPSESSID cookie; sessions are more secure than cookies.'
  ]
},

/* ---------- 2. Arrays in PHP ---------- */
{
  id: 'u4q2',
  title: 'Arrays in PHP',
  tags: ['php array','indexed','associative','multidimensional','sort','array functions','foreach'],
  intro:
    p('An <b>array</b> in PHP is a variable that stores <b>multiple values</b> under a single name. Internally, a PHP array is an <b>ordered map</b> that associates <b>keys</b> with <b>values</b>, so it can work as a list, dictionary, stack or queue. It can hold values of different types.'),
  sections: [
    section('1. Creating Arrays',
      code('', `
<?php
$a = array(10, 20, 30);      // old syntax
$b = [10, 20, 30];           // short syntax (PHP 5.4+)
?>
`)
    ),
    section('2. Types of Arrays',
      h3('(a) Indexed (numeric) array') +
      p('Keys are numbers starting from 0 (automatically assigned).') +
      code('', `
<?php
$fruits = ["Apple", "Banana", "Mango"];
echo $fruits[1];                 // Banana
$fruits[] = "Orange";            // append
echo count($fruits);             // 4

for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}
foreach ($fruits as $f) { echo $f . "<br>"; }
?>
`) +
      h3('(b) Associative array') +
      p('Keys are named strings that you choose.') +
      code('', `
<?php
$student = [
    "name"  => "Manohar",
    "dept"  => "CSE",
    "year"  => 3
];
echo $student["name"];                 // Manohar
$student["cgpa"] = 8.5;                // add

foreach ($student as $key => $value) {
    echo "$key : $value <br>";
}
?>
`) +
      h3('(c) Multidimensional array') +
      p('An array containing one or more arrays (like a table / matrix).') +
      code('', `
<?php
$marks = [
    ["Ravi",   85, 90],
    ["Kumar",  78, 82],
    ["Anitha", 92, 88]
];
echo $marks[2][0];                     // Anitha

$students = [
    ["name" => "Ravi",   "mark" => 85],
    ["name" => "Kumar",  "mark" => 78]
];
foreach ($students as $s) {
    echo $s["name"] . " scored " . $s["mark"] . "<br>";
}
?>
`) +
      diagram(
        svg(520,170,
          '<text x="10" y="20" font-size="12" font-weight="bold">Indexed</text>' +
          svgBox(10,30,70,30,'0 : Apple','bx') + svgBox(80,30,70,30,'1 : Banana','bx') + svgBox(150,30,70,30,'2 : Mango','bx') +
          '<text x="270" y="20" font-size="12" font-weight="bold">Associative</text>' +
          svgBox(270,30,110,30,'name : Manohar','bx3') + svgBox(380,30,100,30,'dept : CSE','bx3') +
          '<text x="10" y="95" font-size="12" font-weight="bold">Multidimensional (2D)</text>' +
          svgBox(10,105,70,28,'Ravi','bx2') + svgBox(80,105,50,28,'85','bx2') + svgBox(130,105,50,28,'90','bx2') +
          svgBox(10,133,70,28,'Kumar','bx2') + svgBox(80,133,50,28,'78','bx2') + svgBox(130,133,50,28,'82','bx2')
        ),
        'Figure 1: Types of PHP arrays')
    ),
    section('3. Important Array Functions',
      table(['Category','Function','Description'],[
        ['Size','count(), sizeof()','Number of elements'],
        ['Add/remove','array_push(), array_pop()','Add / remove at end'],
        ['','array_unshift(), array_shift()','Add / remove at beginning'],
        ['','unset($a[i])','Remove an element'],
        ['Search','in_array(val, arr)','Check if a value exists'],
        ['','array_key_exists(key, arr)','Check if key exists'],
        ['','array_search(val, arr)','Find key of a value'],
        ['Keys/values','array_keys(), array_values()','Get all keys / values'],
        ['Merge','array_merge(a, b)','Join arrays'],
        ['Slice','array_slice(), array_splice()','Extract / remove-replace part'],
        ['Transform','array_map(fn, arr)','Apply function to each element'],
        ['','array_filter(arr, fn)','Keep elements that pass test'],
        ['','array_reduce(arr, fn, init)','Reduce to a single value'],
        ['Maths','array_sum(), array_product()','Sum / product'],
        ['Order','array_reverse()','Reverse order'],
        ['Unique','array_unique()','Remove duplicates'],
        ['Convert','implode(sep, arr), explode(sep, str)','Array to string / string to array']
      ])
    ),
    section('4. Sorting Functions',
      table(['Function','Sorts by','Order','Keeps key association'],[
        ['sort()','Value','Ascending','No'],
        ['rsort()','Value','Descending','No'],
        ['asort()','Value','Ascending','Yes'],
        ['arsort()','Value','Descending','Yes'],
        ['ksort()','Key','Ascending','Yes'],
        ['krsort()','Key','Descending','Yes'],
        ['usort()','Custom function','User defined','No']
      ])
    ),
    section('5. Complete Example Program',
      code('arrays.php', `
<?php
// indexed
$nums = [45, 12, 78, 33, 90];
sort($nums);
echo "Sorted: " . implode(", ", $nums) . "<br>";
echo "Sum = " . array_sum($nums) . ", Max = " . max($nums) . ", Min = " . min($nums) . "<br>";

// associative
$marks = ["Ravi" => 85, "Kumar" => 72, "Anitha" => 91];
arsort($marks);                                   // by value, descending
echo "<h3>Rank list</h3>";
$rank = 1;
foreach ($marks as $name => $m) {
    echo $rank++ . ". $name - $m<br>";
}

// push, pop, search
$stack = ["PHP", "HTML"];
array_push($stack, "CSS", "JS");
echo array_pop($stack) . "<br>";                  // JS
var_dump(in_array("HTML", $stack));               // bool(true)

// array_map and array_filter
$squares = array_map(fn($n) => $n * $n, [1, 2, 3, 4]);
$even    = array_filter([1, 2, 3, 4, 5, 6], fn($n) => $n % 2 == 0);
print_r($squares);
print_r($even);

// 2D table
$table = [["Ravi", 85], ["Kumar", 72]];
echo "<table border='1'>";
foreach ($table as $row) {
    echo "<tr>";
    foreach ($row as $cell) { echo "<td>$cell</td>"; }
    echo "</tr>";
}
echo "</table>";

// print whole array
print_r($marks);
?>
`)
    )
  ],
  rapid: [
    'PHP array = ordered map of key and value; can hold mixed types.',
    'Types: indexed (0,1,2...), associative (named keys), multidimensional (arrays in arrays).',
    'Loop with for / foreach ($arr as $k => $v).',
    'Functions: count, array_push/pop/shift/unshift, in_array, array_merge, array_slice, array_map, array_filter, implode/explode.',
    'Sort: sort/rsort (value), asort/arsort (value + keys), ksort/krsort (key), usort (custom).'
  ]
},

/* ---------- 3. File handling in PHP ---------- */
{
  id: 'u4q3',
  title: 'File Handling in PHP',
  tags: ['php file','fopen','fread','fwrite','fclose','file upload','file_get_contents','unlink'],
  intro:
    p('<b>File handling</b> in PHP allows a script to create, open, read, write, append, close, rename and delete files on the server. It is used for storing data (logs, text records), reading configuration, and uploading files. The basic cycle is: <b>open, process (read/write), close</b>.'),
  sections: [
    section('1. File Handling Cycle',
      diagram(
        svg(560,110,
          svgBox(10,30,110,50,'fopen()','bx3') + svgBox(160,30,110,50,'fread() /\nfgets()','bx') + svgBox(300,30,110,50,'fwrite() /\nfputs()','bx') + svgBox(440,30,110,50,'fclose()','bx3') +
          svgArrow(120,55,160,55) + svgArrow(270,55,300,55) + svgArrow(410,55,440,55)
        ),
        'Figure 1: File operation sequence')
    ),
    section('2. Opening a File: fopen()',
      code('Syntax', `$handle = fopen("filename", "mode");   // returns false on failure`) +
      table(['Mode','Meaning','If file does not exist'],[
        ['r','Read only, pointer at start','Fails'],
        ['r+','Read and write','Fails'],
        ['w','Write only; <b>erases</b> existing content','Creates'],
        ['w+','Read and write; erases content','Creates'],
        ['a','Append; pointer at end','Creates'],
        ['a+','Read and append','Creates'],
        ['x','Create and write; fails if file exists','Creates'],
        ['b','Add for binary files, e.g. "rb", "wb"','']
      ])
    ),
    section('3. Reading a File',
      table(['Function','Description'],[
        ['<code class="inline">fread($h, $length)</code>','Reads given number of bytes'],
        ['<code class="inline">fgets($h)</code>','Reads one line'],
        ['<code class="inline">fgetc($h)</code>','Reads one character'],
        ['<code class="inline">feof($h)</code>','Checks end of file'],
        ['<code class="inline">file_get_contents($f)</code>','Reads the whole file into a string'],
        ['<code class="inline">file($f)</code>','Reads the file into an array (one line per element)'],
        ['<code class="inline">readfile($f)</code>','Reads and outputs the file directly'],
        ['<code class="inline">fgetcsv($h)</code>','Reads a CSV line into an array']
      ]) +
      code('read.php', `
<?php
$file = "data.txt";

// method 1: read whole file
$fh = fopen($file, "r") or die("Cannot open file");
echo fread($fh, filesize($file));
fclose($fh);

// method 2: read line by line
$fh = fopen($file, "r");
while (!feof($fh)) {
    echo fgets($fh) . "<br>";
}
fclose($fh);

// method 3: shortcut
echo file_get_contents($file);
?>
`)
    ),
    section('4. Writing to a File',
      table(['Function','Description'],[
        ['<code class="inline">fwrite($h, $text)</code> / <code class="inline">fputs()</code>','Writes text to the file'],
        ['<code class="inline">file_put_contents($f, $data, FILE_APPEND)</code>','Writes (or appends) in one call'],
        ['<code class="inline">fputcsv($h, $array)</code>','Writes an array as a CSV line']
      ]) +
      code('write.php', `
<?php
// overwrite
$fh = fopen("notes.txt", "w");
fwrite($fh, "First line\\n");
fwrite($fh, "Second line\\n");
fclose($fh);

// append
$fh = fopen("notes.txt", "a");
fwrite($fh, "Appended line\\n");
fclose($fh);

// shortcut with append and lock
file_put_contents("log.txt", date("Y-m-d H:i:s") . " - visited\\n", FILE_APPEND | LOCK_EX);
echo "Done";
?>
`)
    ),
    section('5. Other File Functions',
      table(['Function','Use'],[
        ['file_exists($f)','Check whether file exists'],
        ['is_file(), is_dir()','File or directory?'],
        ['is_readable(), is_writable()','Permission checks'],
        ['filesize($f)','Size in bytes'],
        ['filemtime($f)','Last modified time'],
        ['copy($src, $dst)','Copy a file'],
        ['rename($old, $new)','Rename or move'],
        ['unlink($f)','Delete a file'],
        ['mkdir(), rmdir()','Create / remove directory'],
        ['scandir($dir)','List files in a directory'],
        ['fseek(), ftell(), rewind()','Move / get file pointer'],
        ['flock($h, LOCK_EX)','Lock file to avoid concurrent write problems'],
        ['pathinfo($f)','Name, extension, directory']
      ]) +
      code('fileops.php', `
<?php
$f = "sample.txt";
if (file_exists($f)) {
    echo "Size: " . filesize($f) . " bytes<br>";
    copy($f, "backup.txt");
    rename("backup.txt", "backup_old.txt");
    unlink("backup_old.txt");
    echo "File copied, renamed and deleted";
} else {
    echo "File not found";
}
print_r(scandir("."));
?>
`)
    ),
    section('6. File Upload',
      p('Files are uploaded with an HTML form using <code class="inline">method="post"</code> and <code class="inline">enctype="multipart/form-data"</code>. PHP stores the upload in the <code class="inline">$_FILES</code> array and the script moves it from the temporary folder with <code class="inline">move_uploaded_file()</code>.') +
      code('upload.html', `
<form action="upload.php" method="post" enctype="multipart/form-data">
  <input type="file" name="myfile">
  <input type="submit" value="Upload">
</form>
`) +
      code('upload.php', `
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["myfile"])) {
    $name  = basename($_FILES["myfile"]["name"]);
    $tmp   = $_FILES["myfile"]["tmp_name"];
    $size  = $_FILES["myfile"]["size"];
    $error = $_FILES["myfile"]["error"];
    $ext   = strtolower(pathinfo($name, PATHINFO_EXTENSION));

    $allowed = ["jpg", "jpeg", "png", "pdf"];

    if ($error !== 0) {
        echo "Upload error";
    } elseif (!in_array($ext, $allowed)) {
        echo "Only JPG, PNG and PDF allowed";
    } elseif ($size > 2 * 1024 * 1024) {
        echo "File too large (max 2 MB)";
    } else {
        if (!is_dir("uploads")) { mkdir("uploads"); }
        $newName = uniqid() . "." . $ext;
        if (move_uploaded_file($tmp, "uploads/" . $newName)) {
            echo "Uploaded successfully as " . $newName;
        } else {
            echo "Could not move file";
        }
    }
}
?>
`) +
      table(['$_FILES key','Meaning'],[
        ['name','Original file name'],
        ['type','MIME type'],
        ['tmp_name','Temporary path on server'],
        ['size','Size in bytes'],
        ['error','Error code (0 = success)']
      ])
    ),
    section('7. Complete Program: Guest Book using File Handling',
      code('guestbook.php', `
<?php
$file = "guestbook.txt";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $msg  = htmlspecialchars(trim($_POST["msg"]));
    if ($name != "" && $msg != "") {
        $line = date("d-m-Y H:i") . " | " . $name . " | " . $msg . "\\n";
        file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
    }
}
?>
<form method="post">
  <input name="name" placeholder="Your name">
  <input name="msg"  placeholder="Message">
  <button>Post</button>
</form>
<h3>Messages</h3>
<?php
if (file_exists($file)) {
    $lines = array_reverse(file($file, FILE_IGNORE_NEW_LINES));
    foreach ($lines as $l) {
        echo "<p>" . $l . "</p>";
    }
} else {
    echo "<p>No messages yet.</p>";
}
?>
`)
    ),
    section('8. Error Handling and Good Practice',
      ul([
        'Always check the return value of <code class="inline">fopen()</code> (<code class="inline">or die()</code> or <code class="inline">if (!$fh)</code>).',
        'Always <b>fclose()</b> the file to free resources.',
        'Use <b>flock()</b> or <b>LOCK_EX</b> when many users write simultaneously.',
        'Validate file type, size and name for uploads; never trust the client file name.',
        'Store uploads outside the web root or disable script execution there.'
      ])
    )
  ],
  rapid: [
    'Cycle: fopen, read/write, fclose. Modes: r, w, a, x, r+, w+, a+.',
    'Read: fread, fgets, fgetc, file_get_contents, file(); loop with feof.',
    'Write: fwrite/fputs, file_put_contents (FILE_APPEND).',
    'Other: file_exists, copy, rename, unlink, mkdir, scandir, filesize.',
    'Upload: enctype multipart/form-data, $_FILES, move_uploaded_file().'
  ]
}

]);
