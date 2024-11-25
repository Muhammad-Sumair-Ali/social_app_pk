

const Post = ({ user, content, likes }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg">
      <h3 className="font-bold">{user}</h3>
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">{likes} Likes</span>
        <button className="text-primary font-semibold hover:underline">Like</button>
      </div>
    </div>
  );
};

export default Post;
