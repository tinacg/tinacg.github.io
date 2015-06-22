var notes = {
note0: { 
id: "note0", 
title: "Scrambling sequences",
tags: ['sequences'],
reference: "22 jun 2015 LP5E (Learning Python 5th ed.) p. 609",
body: "<br>Move the front item to the end on each loop iteration<br><br>S = 'spam'<br>for i in range(len(S)):<br>    S = S[1:] + S[:1]<br>    print(S, end=' ')<br><br># pams amsp mspa spam<br><br>// JS<br><br>var s = 'spam';<br>for (var i = 0; i &lt; s.length; i++) {<br>    s = s.slice(1) + s.slice(0, 1);<br>    console.log(s);<br>}<br>" },

note1: { 
id: "note1", 
title: "Deeply nested function",
tags: ['functions'],
reference: "22 jun 2015",
body: "<br>def f(x):<br>    if x:<br>        y<br>    else:<br>        z<br><br>// JS<br><br>function f(x) {<br>    if (x) {<br>        y;<br>    } else {<br>        z;<br>    }<br>}<br>" },

numNotes: 2
};
