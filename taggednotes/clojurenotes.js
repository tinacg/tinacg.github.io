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
reference: "13 apr 2015, Joy 2nd, p. 28",
body: "<br>Symbols are objects in their own right but mostly used to represent<br>another value:<br><br>(def rational-pi 22/7)<br><br>Evaluating a symbol returns whatever value the symbol is referring to<br>in the current context. Typical uses of symbols are to refer to function<br>parameters, local variables, globals, and Java classes.<br>" },

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
tags: ['forms', 'objects'],
reference: "13 apr 2015, Joy 2nd, p. 29",
body: "<br>A form is any object meant to be evaluated, such as lists, vectors, maps,<br>numbers, keywords, and symbols.<br><br>A special form has special syntax or special evaluation rules. An example<br>is the dot operator for Java interoperability.<br>" },

note17: { 
id: "note17", 
title: "Vectors",
tags: ['vectors', 'collections'],
reference: "13 apr 2015, Joy 2nd, p. 30",
body: "<br>The literal syntax for vectors uses square brackets [1 2 :c]<br><br>Vectors evaluate each item in order. No function or macro call is done<br>on the vector itself, although if a list is inside the vector, that list<br>is evaluated with normal rules for a list.<br><br>The empty vector, [], is not the same as nil.<br>" },

note18: { 
id: "note18", 
title: "Maps",
tags: ['maps', 'collections'],
reference: "13 apr 2015, Joy 2nd, p. 30",
body: "<br>Maps store unique keys and one value per key. They are similar to hashes<br>or dictionaries in other languages.<br><br>There are several types of maps with different properties.<br><br>The literal syntax is curly braces with alternating keys and values.<br>Commas are considered whitespace (they are optional, but frequently used)<br><br>{1 &quot;one&quot;, 2 &quot;two&quot;, 3 &quot;three&quot;}<br><br>Keys and values are evaluated before the result is stored in the map.<br>The order in which the elements are evaluated is not guaranteed.<br><br>The empty map, {}, is not the same as nil.<br>" },

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

numNotes: 22
};
