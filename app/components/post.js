import React from 'react';

const Post = ({ post }) => {

  const handleFollow = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/${post.user._id}/follow`, {
        method: 'POST',
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Followed successfully:', result);
      } else {
        console.error('Failed to follow:', response.statusText);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      console.log(`${post._id}`);
      console.log(`${token}`);
      const response = await fetch(`http://localhost:5000/product/like/${post._id}`, {
        method: 'PUT',
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Liked successfully:', result);
        // Optionally, update the likes count in the UI here
      } else {
        console.error('Failed to like:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="postWrapper">
      <div className="userOptions">
        <div className="postUserDetails">
          <div className="userAvatar"><img src={post.user.avatar} alt="User Avatar" /></div>
          <div className="userName"><p>{post.user.firstName} {post.user.lastName}
          {/* <span>1 h</span> */}
          </p></div>
          {/* <button className="followPostBtn" onClick={handleFollow}>
            <span>Follow</span>
          </button> */}
          {/* <button className="followPostBtn">
            <span>Unfollow</span>
          </button> */}
        </div>
        <div className="more"><img src="/images/post/more.png" alt="More Options" /></div>
      </div>
      <div className="MainPostWrapper">
        <div className="MainPost">
          <div className="post">
            <img src={post.imageUrl} alt="Post Image" />
            <div className="post_caption">
              <p>Descriptions: {post.description}</p>
            </div>
          </div>
        </div>
        <div className="postReactions">
          <div className="likes">
            <a className="flex" href="#" onClick={handleLike}><img src="/images/post/heart.png" alt="Like" /><span>{post.likes.length} likes</span></a>
          </div>
          {/* <div className="share_save">
            <a href="#"><img src="/images/post/share.png" alt="Share With Friends" /></a>
            <a href="#"><img src="/images/post/save.png" alt="Save It" /></a>
            <a href="#"><img src="/images/post/cart.png" alt="Add To Cart" /></a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
