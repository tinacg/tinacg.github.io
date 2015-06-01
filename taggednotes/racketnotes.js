var notes = {
note0: { 
id: "note0", 
title: "The 'unless' form is the opposite of \"when\"",
tags: ['unless'],
reference: "21 apr 2015, Realm, p. 63",
body: "<br>(unless predicate expressions) is the opposite of &quot;when&quot;.<br><br>(unless (&gt; temperature 212) 'not-yet-boiling)<br>" },

note1: { 
id: "note1", 
title: "Only #f is considered to be false",
tags: ['booleans', 'false'],
reference: "21 apr 2015; Realm, p. 57",
body: "<br>Everything except #f counts as #t<br>" },

note2: { 
id: "note2", 
title: "Empty, null, and '() are interchangeable",
tags: ['empty', 'null', 'lists'],
reference: "21 apr 2015, Realm, p. 44",
body: "<br>empty, null, and '() can all be interchanged<br>" },

note3: { 
id: "note3", 
title: "Boolean true and false values",
tags: ['booleans', 'true', 'false'],
reference: "21 apr 2015, Realm, p. 52",
body: "<br>The Booleans #t, #true, true, also, #f, #false, false are interchangeable<br>" },

note4: { 
id: "note4", 
title: "Equality testing",
tags: ['equality', 'predicates'],
reference: "21 apr 2015, Realm, p. 65-67",
body: "<br>(equal? x y) is updated whenever a struct is defined. equal? compares<br><br>(eq? x y) tests for object identity. It will be true for two references to the<br>same object.<br><br>eq? compares whether changing one structure will change the other structure<br>" },

note5: { 
id: "note5", 
title: "Reading out loud",
tags: ['reading'],
reference: "21 apr 2015, Realm, p. 33, 52",
body: "<br>set! is &quot;set bang&quot;<br>student? is &quot;student, huh?&quot;<br>" },

note6: { 
id: "note6", 
title: "Testing with rackunit",
tags: ['testing', 'rackunit'],
reference: "21 apr 2015, Realm, p. 68-70",
body: "<br>(require rackunit)<br><br>Commonly used functions are:<br><br>check-equal?<br>check-not-equal?<br>check-true<br>check-false<br>check-not-false<br>(check-pred number? 2)<br>(check-= m n epsilon) checks that m and n are within epsilon of each other<br>" },

numNotes: 7
};
