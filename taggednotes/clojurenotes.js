var notes = {
note0: { 
id: "note0", 
title: "The Clojure Way",
tags: ['clojure'],
reference: "8 apr 2015, Joy 2nd, p. xxvii",
body: "<br>Leave all programming baggage behind<br><br>ability to create little languages<br>" },

note1: { 
id: "note1", 
title: "Clojure features",
tags: ['clojure'],
reference: "13 apr 2015, Joy 2nd, p. 3",
body: "<br>avoid complications of managing state<br><br>being a Lisp, it can manipulate data and code uniformly: as lists<br>" },

note2: { 
id: "note2", 
title: "McCarthy Lisp core",
tags: ['lisp', 'core'],
reference: "13 apr 2015, Joy 2nd, p. 9",
body: "<br>seven functions and two special forms:<br><br>atom, car, cdr, cons, eq, quote, label<br>cond, lambda<br>" },

note3: { 
id: "note3", 
title: "Notion of state",
tags: ['state', 'time', 'identity'],
reference: "13 apr 2015, Joy 2nd, p. 17",
body: "<br>Time refers to relative moments when events occur.<br>An entity's properties over time forms its identity.<br>At any given time, a snapshot, or state, can be taken.<br>This state is immutable, as a manifestation of its properties at a given<br>moment in time.<br><br>As an example, Clojure represents an entity as a flipbook.<br>The whole book is the identity. Changing the illustration is adding a<br>picture to the book, and flipping the pages represents states over time.<br><br>In contrast, a mutable picture conflates state and identity. Rather than<br>adding pictures to a flipbook, parts of the mutable picture are erased<br>and redrawn.<br>" },

note4: { 
id: "note4", 
title: "Functional programming and mathematics",
tags: ['functional programming'],
reference: "13 apr 2015, Joy 2nd, p. 24",
body: "<br>Mathematics view little, if anything, as objects. It is built on the<br>relationships between one set of elements and another through the<br>application of functions.<br>" },

note5: { 
id: "note5", 
title: "Valid expressions",
tags: ['expressions'],
reference: "13 apr 2015, Joy 2nd, p. 26",
body: "Valid Clojure expressions accepted by the REPL are:<br><br>numbers, symbols, keywords, Booleans, characters, strings, functions,<br>function calls, macros, literal maps, vectors, queues, records, and sets.<br><br>Numbers, strings, and keywords are self-evaluating.<br><br>Comments are indicated by a semicolon (or more)  ; my comment<br>" },

note6: { 
id: "note6", 
title: "Scalars",
tags: ['scalars', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 26",
body: "<br>Scalars are the base data types, including integers, floats, rationals,<br>symbols, keywords, strings, characters, Booleans, and regex patterns.<br>" },

note7: { 
id: "note7", 
title: "Integers",
tags: ['integers', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 27",
body: "<br>The size of integers is limited by the available memory.<br>Integers are Java longs up to its limit. Larger integers are BigInts,<br>and printed with a trailing N.<br><br>adding (+ 1 2N) results in 3N<br><br>binary, octal, and hex are written as 2r1001, 0177, and 0x7f.<br>integers in arbitrary radices are written as 17r80g.<br>" },

note8: { 
id: "note8", 
title: "Floats",
tags: ['floats', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 27-28",
body: "<br>floats can be written in exponential form.<br><br>Arbitrary precision floats have a trailing M.<br><br>adding (+ 1.1 2.2M) results in 3.3.<br>To preserve precision, both arguments must be M<br>" },

note9: { 
id: "note9", 
title: "Rationals",
tags: ['rationals', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 28",
body: "<br>Rational numbers are a precise representation, written as an integer<br>over another: 3/2. They are automatically simplified. They do not print N<br>" },

note10: { 
id: "note10", 
title: "Symbols",
tags: ['symbols', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 28, 41",
body: "<br>Symbols are objects in their own right but mostly used to represent<br>another value:<br><br>(def rational-pi 22/7)<br><br>Evaluating a symbol returns whatever value the symbol is referring to<br>in the current context. Typical uses of symbols are to refer to function<br>parameters, local variables, globals, and Java classes.<br><br>If a symbol begins with a namespace and a slash, it is a qualified symbol<br>" },

note11: { 
id: "note11", 
title: "Keywords",
tags: ['keywords', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 28",
body: "<br>Keywords always evaluate to themselves.<br>They are written as <b>:MySymbolName</b><br>" },

note12: { 
id: "note12", 
title: "Strings",
tags: ['strings', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 29",
body: "<br>Strings are written inside double quotes, and may include newlines as<br>part of the literal.<br><br>&quot;abc<br>def&quot;<br><br>&quot;he said \\&quot;hello\\&quot;&quot;<br>" },

note13: { 
id: "note13", 
title: "Characters",
tags: ['characters', 'data types'],
reference: "13 apr 2015, Joy 2nd, p. 29",
body: "<br>Characters are written with a literal syntax and are stored as Java<br>Characters. \\a, \\u30DE, and \\space are some examples.<br>" },

note14: { 
id: "note14", 
title: "Collections",
tags: ['collections'],
reference: "13 apr 2015, Joy 2nd, p. 29",
body: "<br>Collections include lists, vectors, maps, and sets<br>" },

note15: { 
id: "note15", 
title: "Lists",
tags: ['lists', 'collections'],
reference: "13 apr 2015, Joy 2nd, p. 29",
body: "<br>Literal lists are written with parentheses.<br><br>When evaluating a list, the first item is resolved to a function, macro,<br>or special operator. If it is a function, the remaining items are<br>evaluated in order, and passed as function parameters. Macros and special<br>operators have specific processing rules.<br><br>Lists can contain items of any type.<br>The empty list, (), is <b>not</b> the same as nil.<br>" },

note16: { 
id: "note16", 
title: "Forms",
tags: ['forms', 'objects', 'special forms'],
reference: "13 apr 2015, Joy 2nd, p. 29, 32",
body: "<br>A form is any object meant to be evaluated, such as lists, vectors, maps,<br>numbers, keywords, and symbols.<br><br>A special form has special syntax or special evaluation rules. An example<br>is the dot operator for Java interoperability.<br><br>A special form is part of the core language, but not created in terms of<br>functions, types, or macros.<br>" },

note17: { 
id: "note17", 
title: "Vectors",
tags: ['vectors', 'collections'],
reference: "13 apr 2015, Joy 2nd, p. 30",
body: "<br>The literal syntax for vectors uses square brackets [1 2 :c]<br><br>Vectors evaluate each item in order. No function or macro call is done<br>on the vector itself, although if a list is inside the vector, that list<br>is evaluated with normal rules for a list.<br><br>The empty vector, [], is not the same as nil.<br><br>A vector, like scalars and maps, evaluates to itself.<br>" },

note18: { 
id: "note18", 
title: "Maps",
tags: ['maps', 'collections'],
reference: "13 apr 2015, Joy 2nd, p. 30",
body: "<br>Maps store unique keys and one value per key. They are similar to hashes<br>or dictionaries in other languages.<br><br>There are several types of maps with different properties.<br><br>The literal syntax is curly braces with alternating keys and values.<br>Commas are considered whitespace (they are optional, but frequently used)<br><br>{1 &quot;one&quot;, 2 &quot;two&quot;, 3 &quot;three&quot;}<br><br>Keys and values are evaluated before the result is stored in the map.<br>The order in which the elements are evaluated is not guaranteed.<br><br>The empty map, {}, is not the same as nil.<br><br>A map, like a vector or scalar, evaluates to itself.<br>" },

note19: { 
id: "note19", 
title: "Sets",
tags: ['sets', 'collections'],
reference: "13 apr 2015, Joy 2nd, p. 30",
body: "<br>Sets store zero or more unique items. The literal syntax is curly braces<br>with a leading hash #{1 2 &quot;three}<br><br>The empty set, #{}, is not the same as nil.<br>" },

note20: { 
id: "note20", 
title: "Function properties",
tags: ['functions'],
reference: "13 apr 2015, Joy 2nd, p. 31",
body: "<br>Functions are a first-class type, meaning they can be used the same as<br>any value. They can be stored in vars (with def), held in lists and<br>other collections, passed as arguments to other functions, and returned<br>as the result of other functions.<br>" },

note21: { 
id: "note21", 
title: "Vars",
tags: ['vars'],
reference: "13 apr 2015, Joy 2nd, p. 31",
body: "<br>The closest analogy to other languages' variables is the <i>var</i>.<br><br>A var is named by a symbol and holds a single value. It may be shadowed<br>by function parameters and locals.<br><br>The most common way to create vars is with <b>def</b><br>(def x 17)<br>" },

note22: { 
id: "note22", 
title: "Anonymous functions",
tags: ['anonymous functions', 'functions'],
reference: "14 apr 2015, Joy 2nd, p. 32",
body: "<br>An anonymous function can be defined using the <b>fn</b> special form.<br><br>(fn [x y]<br>    (println &quot;making a set&quot;)<br>    #{x y})<br><br>The anonymous function can be called by making it the first item of a list<br><br>((fn [x y]<br>     (println &quot;making a set&quot;)<br>     #{x y})<br> 1 2)<br>" },

note23: { 
id: "note23", 
title: "The special form, def",
tags: ['def', 'special forms'],
reference: "14 apr 2015, Joy 2nd, p. 33",
body: "<br>The def special form assigns a symbolic name to a piece of data.<br>Because functions are first class, they are equal citizens with data.<br><br>To associate a name with a function:<br><br>(def make-set<br>    (fn [x y]<br>        (println &quot;making a set&quot;)<br>        #{x y}))<br><br>and the newly defined name can be called, (make-set 1 2)<br>" },

note24: { 
id: "note24", 
title: "The defn macro",
tags: ['defn', 'arity', 'overloading'],
reference: "14 apr 2015, Joy 2nd, p. 33",
body: "<br>defn defines a function more concisely than def. It also provides a way<br>to add a documentation string, and allows for arity overloading.<br><br>(defn make-set<br>    &quot;(optional doc string) Takes two values and makes a set&quot;<br>  [x y]<br>  #{x y})<br><br>Arity refers to the differences in the argument count that a function<br>will accept.<br><br>You can have any number of argument/body pairs<br><br>(defn make-set-varargs<br>    &quot;doc string for make set varargs&quot;<br>  ([x] #{x})<br>  ([x y] #{x y}))<br>" },

note25: { 
id: "note25", 
title: "Varargs with &",
tags: ['varargs', 'functions'],
reference: "14 apr 2015, Joy 2nd, p. 34",
body: "<br>To denote variable arguments, the & symbol is used in the argument list.<br>Arguments before the & symbol are bound one for one, and the remaining<br>arguments are collected in a sequence bound to the symbol after the &<br><br>(defn arity2+ [first second & more]<br>      (vector first second more))<br>" },

note26: { 
id: "note26", 
title: "In-place function definition shorthand",
tags: ['functions', 'shorthand', 'reader features'],
reference: "14 apr 2015, Joy 2nd, p. 34-35",
body: "<br>#() is a reader feature that is shorthand notation for <b>fn</b>.<br><br>Arguments are implicitly declared through special symbols prefixed with %<br><br>(def make-list2+ #(list %1 %2 %&))<br><br>% is the same as %1, but %1 is preferred. %& denotes variable arguments.<br>" },

note27: { 
id: "note27", 
title: "Treat a block of expressions as one with do",
tags: ['do', 'block', 'forms'],
reference: "14 apr 2015, Joy 2nd, p. 35",
body: "<br>Placing a block of expressions inside a <b>do</b> form will treat them<br>as one, but only the last one is returned. Do is typically used for the<br>purpose of creating side effects.<br>" },

note28: { 
id: "note28", 
title: "Create locals with let",
tags: ['locals', 'let', 'destructuring'],
reference: "14 apr 2015, Joy 2nd, p. 35-36",
body: "<br>Locals are not local variables because they can't vary. They are created<br>with a let form, which starts with a vector defining the bindings,<br>followed by any number of expressions in the body.<br><br>The vector consists of pairs of a binding form that is usually a symbol,<br>but can be a destructuring form, and the expression whose value is bound<br>to this new local.<br><br>A previously defined local may be used when defining new locals.<br><br>The body is described as an implicit do. Only the last value is returned.<br><br>(let [r 5<br>     pi 3.14<br>     r-squared (* r r)]<br>     (println &quot;radius is&quot; r)<br>     (* pi r-squared))<br>" },

note29: { 
id: "note29", 
title: "Tail recursion with recur",
tags: ['recur', 'recursion', 'tail recursion'],
reference: "14 apr 2015, Joy 2nd, p. 36-37",
body: "<br>recur will return to the top of the function and rebind the argument to<br>a new value. If the function has multiple arguments, the recur call must<br>as well, just like calling the function by name.<br><br>Arguments are first evaluated in order, then bound to the function<br>arguments simultaneously.<br><br>(defn print-down-from [x]<br>  (when (pos? x)<br>    (println x)<br>    (recur (dec x))))<br><br>(defn sum-down-from [sum x]<br>      (if (pos? x)<br>          (recur (+ sum x) (dec x))<br>          sum))<br>" },

note30: { 
id: "note30", 
title: "When to use when",
tags: ['when', 'conditionals'],
reference: "14 apr 2015, Joy 2nd, p. 38",
body: "<br>Use when in these cases:<br><br>- There is no <b>else</b> part associated with the conditional<br>- You require an implicit do to perform side effects.<br>" },

note31: { 
id: "note31", 
title: "Loop and recur",
tags: ['loop', 'recur'],
reference: "14 apr 2015, Joy 2nd, p. 38",
body: "<br>loop acts exactly like let, but also acts as a target for recur to jump<br>back to.<br><br>recur will always jump back to the closest enclosing loop or fn. Upon the<br>jump, the loop locals are re-bound to the values given in recur.<br><br>(defn sum-down-from [initial-x]<br>  (loop [sum 0, x initial-x]<br>     (if (pos? x)<br>         (recur (+ sum x) (dec x))<br>         sum)))<br>" },

note32: { 
id: "note32", 
title: "Tail position",
tags: ['tail position'],
reference: "14 apr 2015, Joy 2nd, p. 38",
body: "<br>An expression is in the tail position of an expression when its value<br>may be the return value of the entire expression.<br><br>(defn absolute-value [x]<br>  (if (pos? x)<br>      x  ; then<br>      (- x)))  ; else<br><br>the if, x (then) and (- x) (else) are all in a tail position because they<br>may all be the return value of the entire function.<br><br>the lone x in the else clause is not in a tail position because it is not<br>returned directly, only after (-) is applied to it.<br>" },

note33: { 
id: "note33", 
title: "Quote and syntax-quote",
tags: ['quote', 'syntax-quote', 'unquote', 'unquote-splicing'],
reference: "14 apr 2015, Joy 2nd, p. 39-42",
body: "<br>quote is a special operator, but using it is like calling a function.<br>It is placed as the first item of a list, or written as ' in front of a<br>list<br><br>(quote age)<br><br>The quote special operator prevents its argument from being evaluated at<br>all. It prevents arbitrarily complex structures from being evaluated.<br><br>The common use of quote is to use a literal list as a data collection.<br><br>The empty list, (), does not need to be quoted.<br><br>Syntax-quoting is written as a single back-quote `. It has extra features<br>that aid in constructing collections to be used as code.<br><br>Syntax-quoting will automatically qualify unqualified symbols, using the<br>current namespace if one doesn't already exist.<br><br>Inside a syntax-quoted form, unquoting a subform with ~ will evaluate it<br><br>Unquote-splicing with ~@ will evaluate the subform, then unpack the<br>resulting sequence and splicing it rather than inserting it as a nested<br>list.<br>" },

note34: { 
id: "note34", 
title: "Auto-gensym",
tags: ['gensym', 'auto-gensym'],
reference: "14 apr 2015, Joy 2nd, p. 42",
body: "<br>Inside a syntax-quote, appending a # to the end of a symbol name creates<br>a new, unique symbol name.<br><br>`myvar#<br>;;=> myvar__152__auto__<br>" },

note35: { 
id: "note35", 
title: "Accessing Java static class members",
tags: ['java', 'interop', 'static'],
reference: "14 apr 2015, Joy 2nd, p. 43",
body: "<br>accesing static class members is like accessing a namespace-qualified<br>var:<br><br>java.util.Locale/JAPAN<br><br>(Math/sqrt 81)<br>" },

note36: { 
id: "note36", 
title: "Create new Java instances with a dot at the end of class name",
tags: ['java', 'interop', 'instances'],
reference: "14 apr 2015, Joy 2nd, p. 43-44",
body: "<br>The special operator new creates an instace of the given class name with<br>the given parameters:<br><br>(new java.awt.Point 0 1)<br><br>Clojure core collection types can be used as arguments to Java<br>constructors for the purpose of initialization:<br><br>(new java.util.HashMap {&quot;a&quot; 1 &quot;b&quot; 2})<br><br>The preferred way of creating instances is to add a dot after the class<br>name: (java.util.HashMap. {&quot;a&quot; 1})<br>" },

note37: { 
id: "note37", 
title: "Accessing instance members",
tags: ['java', 'interop', 'instances'],
reference: "14 apr 2015, Joy 2nd, p. 44",
body: "<br>To access public instance variables, precede the field name with .-<br><br>(.-x (java.awt.Point. 10 20))<br><br>To access instance methods, the method name comes after a dot and the<br>instance you're accessing is explicitly given as the first argument to<br>the method call.<br><br>(.divide (java.math.BigDecimal. &quot;42&quot;) 2M)<br>" },

note38: { 
id: "note38", 
title: "Setting instance fields",
tags: ['java', 'interop', 'instances'],
reference: "14 apr 2015, Joy 2nd, p. 44",
body: "<br>Instance fields are set with the function set!<br><br>(let [origin (java.awt.Point. 0 0)]<br>     (set! (.-x origin) 15)<br>     (str origin))<br>" },

note39: { 
id: "note39", 
title: "The .. macro",
tags: ['macros', '..', 'chain'],
reference: "14 apr 2015, Joy 2nd, p. 45-46",
body: "<br>A chain of Java method calls is a sequence where a method uses the return<br>type of the previous method call, such as<br><br>new java.util.Date().toString().endsWith(&quot;2001&quot;);<br><br>which is equivalent to (.endsWith (.toString (java.util.Date.)) &quot;2001&quot;)<br><br>but is difficult to read. With the .. macro, the above becomes<br><br>(.. (java.util.Date.) toString (endsWith &quot;2001&quot;))<br><br>However, .. is not used very much in practice outside of macro<br>definitions. The macros -> and ->> are used in a similar manner and are<br>also useful in non-interop situations.<br>" },

note40: { 
id: "note40", 
title: "The doto macro",
tags: ['macros', 'java', 'interop'],
reference: "14 apr 2015, Joy 2nd, p. 45",
body: "<br>The doto macro is used when calling a set of mutators to a fresh instance<br><br>(doto (java.util.HashMap.)<br>      (.put &quot;HOME&quot; &quot;/home&quot;)<br>      (.put &quot;SRC&quot; &quot;/src&quot;)<br>      (.put &quot;BIN&quot; &quot;/usr/bin&quot;))<br>" },

note41: { 
id: "note41", 
title: "Throwing and catching",
tags: ['exceptions'],
reference: "14 apr 2015, Joy 2nd, p. 46",
body: "<br>Throwing and catching is similar to Java<br><br>(throw (Exception. &quot;This is throwed&quot;))<br><br>(try<br> (f)<br> (catch ArithmeticException ae &quot;no dividing by zero&quot;)<br> (catch Exception e (str &quot;exception &quot; (.getMessage e)))<br> (finally (println &quot;returning&quot;)))<br>" },

note42: { 
id: "note42", 
title: "Creating a namespace",
tags: ['namespaces', 'ns'],
reference: "14 apr 2015, Joy 2nd, p. 47",
body: "<br>Create and switch to namespaces with the ns macro:<br>(ns joy.ch2)<br><br>the *ns* var refers to the current namespace.<br>" },

note43: { 
id: "note43", 
title: "Loading other namespaces with :require",
tags: ['namespaces', 'directives', 'require'],
reference: "14 apr 2015, Joy 2nd, p. 48",
body: "<br>As part of the ns macro, :require will load a namespace.<br>The :as directive will create an alias<br><br>(ns joy.req<br>    (:require [clojure.set :as s]))<br><br>(s/intersection #{1 2 3} #{3 4 5})<br><br>superficially, using a namespaced function looks like a call to a static<br>method, but the namespace symbol is used only as a qualifier. The class<br>symbol references the class itself.<br>" },

note44: { 
id: "note44", 
title: "Loading and creating mappings in your own namespace with :refer",
tags: ['namespaces', 'directives', 'refer'],
reference: "14 apr 2015, Joy 2nd, p. 48-49",
body: "<br>To avoid having to call symbols by their qualified names, use the<br>:refer option of the :require directive.<br><br>(ns joy.use-ex<br>    (:require [clojure.string :refer (capitalize)]))<br>(map capitalize [&quot;joe&quot; &quot;trout&quot;])<br><br>:refer :all brings in all the public vars from the given namespace, but<br>is not recommended practice.<br>" },

note45: { 
id: "note45", 
title: "Create mappings with :refer",
tags: ['namespaces', 'directives', 'refer'],
reference: "14 apr 2015, Joy 2nd, p. 49",
body: "<br>:refer, when used as a directive of ns, works almost exactly like the<br>option given in the :require directive, except that it only creates<br>mappings for libraries that have already been loaded.<br><br>(ns joy.yet-another<br>    (:refer joy.ch2))<br>" },

note46: { 
id: "note46", 
title: "Renaming references and required names",
tags: ['namespaces', 'directives', 'rename'],
reference: "14 apr 2015, Joy 2nd, p. 49",
body: "<br>The :rename keyword sets up aliases, taking a map. It may be used with<br>:refer and :require<br><br>(ns joy.yet-another<br>    (:refer clojure.set :rename {union onion}))<br>" },

note47: { 
id: "note47", 
title: "Importing Java classes",
tags: ['namespaces', 'java', 'import'],
reference: "14 apr 2015, Joy 2nd, p. 49",
body: "<br>To use unqualified Java classes, import them with the :import directive<br><br>(ns joy.java<br>    (:import [java.util HashMap]<br>             [java.util.concurrent.atomic AtomicLong]))<br><br>(HashMap. {&quot;happy?&quot; true})<br><br>java.lang classes are automatically imported<br>" },

note48: { 
id: "note48", 
title: "Truthiness",
tags: ['truthiness', 'if'],
reference: "14 apr 2015, Joy 2nd, p. 52",
body: "<br>Forms that expect booleans are all macros built on top of if.<br><br>Every value has a &quot;true&quot; value except for false and nil. This means that<br>zero, '', (), and so on are all considered true.<br>" },

note49: { 
id: "note49", 
title: "Boolean object instances are truthy",
tags: ['truthiness', 'booleans', 'false'],
reference: "14 apr 2015, Joy 2nd, p. 53",
body: "<br>Clojure's true and false are the same as Java's Boolean/TRUE and FALSE.<br><br>Creating an instance of a Boolean &quot;false&quot; will be considered true by if.<br><br>(def evil-false (Boolean. &quot;false&quot;))  ; never do this<br><br>The correct way to parse a &quot;false&quot; string is (Boolean/valueOf &quot;false&quot;)<br><br>The correct way to check for false is (false? x)<br>" },

note50: { 
id: "note50", 
title: "Checking for nil and false",
tags: ['nil', 'false'],
reference: "14 apr 2015, Joy 2nd, p. 53",
body: "<br>If it is necessary to check for nil and false, use nil? and false?<br>" },

note51: { 
id: "note51", 
title: "Checking for an empty collection with seq",
tags: ['collections', 'nil', 'empty', 'seq'],
reference: "14 apr 2015, Joy 2nd, p. 53-54",
body: "<br>(seq x) will return nil if the collection is empty. It is used for testing<br>for termination, instead of (when-not (empty? s) ...)<br><br>(when (seq s)<br>  (prn (first s))<br>  (recur (rest s)))<br><br>since seq is being used in each iteration, rest should be used instead of<br>next. rest can return both empty and non-empty sequences, while next is<br>(seq (rest s)), so it will return nil instead of an empty sequence.<br><br>Note: Although this example looks like it is constructing a new seq on<br>each loop iteration, it runs faster than equivalent code using &quot;empty?&quot;<br>" },

note52: { 
id: "note52", 
title: "Printing the last stack trace in the REPL",
tags: ['stack trace', 'repl', 'exception', 'debugging'],
reference: "14 apr 2015, from older notes",
body: "<br>https://clojuredocs.org/clojure.core/use<br><br>(use '[clojure.stacktrace :only (e)])<br>(e)<br>" },

note53: { 
id: "note53", 
title: "Destructuring is positionally binding locals",
tags: ['destructuring', 'vector'],
reference: "15 apr 2015, Joy 2nd, p. 55",
body: "<br>Destructuring allows you to place a collecttion of names in a binding form<br>where you'd normally put a single name.<br><br>The simplest kind of destructuring is picking apart a vector:<br><br>(let [[f-name m-name l-name] whole-name]<br>     (str l-name &quot;, &quot; f-name &quot; &quot; m-name))<br><br>Using an ampersand indicates that remaining values will be collected into a seq<br><br>(let [[a b c & more] (range 10)])<br><br>The entire collection can be bound to a local with :as.<br><br>(let [[a b c & more :as all] range-vec])<br><br>all will remain a vector, while 'more' is a seq.<br><br>Destructuring works for 'let' locals and in function parameters. The ampersand<br>inside function arguments is not part of destructuring. It is part of the<br>general support for multiple function bodies.<br>" },

note54: { 
id: "note54", 
title: "Destructuring with a map",
tags: ['destructuring', 'map'],
reference: "15 apr 2015, Joy 2nd, p. 57",
body: "<br>If we wish to pull values from a map, a map of locals on the left obtaining<br>values of the keys to the right.<br><br>(def name-map {:f-name &quot;Guy&quot; :l-name &quot;Steele&quot;})<br>(let [{f-name :fname l-name :l-name} name-map])<br><br>To avoid this repetitive form, the directives :keys, :strs, and :syms can be<br>used, to indicate what kind of key is used in the target map.<br><br>(let [{:keys [f-name l-name]} name-map])<br><br>:as may also be used to keep the entire map.<br><br>The directive :or followed by a map provides default values:<br><br>(let [{:keys [title f-name],<br>     :or {title &quot;Mr.&quot;}} name-map])<br><br>These map destructuring features also work on lists, used when functions accept<br>keyword arguments:<br><br>(whole-name :f-name &quot;Guy&quot; :l-name &quot;Steele&quot;)<br>" },

note55: { 
id: "note55", 
title: "Associative destructuring",
tags: ['destructuring'],
reference: "15 apr 2015, Joy 2nd, p. 58-59",
body: "<br>A vector can be defstructured by providing a map declaring local names as<br>indices into the vector:<br><br>(let [{first-thing 0, last-thing 3} [1 2 3 4]]<br>     [first-thing last-thing])  ; [1 4]<br>" },

note56: { 
id: "note56", 
title: "Searching documentation",
tags: ['doc', 'find-doc', 'help'],
reference: "15 apr 2015, Joy 2nd, p. 60",
body: "<br>The find-doc function searches both function names and doc strings<br>" },

note57: { 
id: "note57", 
title: "For directives",
tags: ['for', 'directives', 'let', 'when'],
reference: "15 apr 2015, Joy 2nd, p. 61",
body: "<br>In a for form, :let works with a binding vector. :when limits the elements<br>used to only those returning a truthy value in the expression<br>" },

note58: { 
id: "note58", 
title: "Last exception in the REPL",
tags: ['exception', 'debugging', 'repl', 'stack trace'],
reference: "15 apr 2015, Joy 2nd, p. 63",
body: "<br>The last exception is stored in the *e variable.<br><br>(.printStackTrace *e) will print the stack trace.<br>" },

numNotes: 59
};
