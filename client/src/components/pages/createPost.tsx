import PostForm from "../form/post.form"
import PostProvider from "../providers/posts/postProvider";

function CreatePost() {

  return (
    <>
    <PostProvider>
      <PostForm/>
    </PostProvider>
    </>
  )
}
export default  CreatePost;