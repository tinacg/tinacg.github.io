var newPostRef = postsRef.push({
  author: "Grace Hopper",
  title: "Announcing COBOL"
});

var postid = newPostRef.key();

// or name(), see http://stackoverflow.com/questions/16637035/in-firebase-when-using-push-how-do-i-pull-the-unique-id
