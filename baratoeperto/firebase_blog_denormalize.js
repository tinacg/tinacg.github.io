{
  users: {
    user1: {
      name: "alice"

      // add comment list to user 
      comments: {
        comment1: true
      }
    }
  },
  links: {
    link1: {
      title: "My link",
      submitted: "user1"

      // explicitly store list of comments with each link
      comments: {
        comment1: true
      }
    }
  },
  comments: {
    comment1: {
      link: "link1",
      body: "this is great",
      author: "user2"
    }
  }
}
