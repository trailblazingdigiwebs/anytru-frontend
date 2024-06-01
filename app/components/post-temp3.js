import React from "react";
import Link from "next/link";


const PostTempThree = () => {
  return (
    <>
        <div className="postWrapper">
            <div className="userOptions">
                <div className="postUserDetails">
                    <div className="userAvatar"><img src="/images/temp/temp4.png" /></div>
                    <div className="userName"><p>Avanti.2020<span>1 h</span></p></div>
                    <button className="followPostBtn">
                        <span>Follow</span>
                    </button>
                </div>
                <div className="more"><img src="/images/post/more.png" /></div>
            </div>
            <div className="MainPostWrapper">
                <div className="MainPost">
                    <div className="post">
                    <img src="/images/temp/post-temp4.jpg" />
                        {/* <div className="post_caption">
                            <p>Descriptions : White leather made laptop bag with two handle. Brown horse printed as a pattern on the bag. Use brass or rose gold metal.</p>
                        </div> */}
                    </div>
                </div>
                <div className="postReactions">
                        <div className="likes">
                            <a className="flex" href="#"><img src="/images/post/heart.png" alt="Like" /><span>543 likes</span></a> 
                        </div>
                        <div className="share_save">
                            <a href="#"><img src="/images/post/share.png" alt="Share With Friends" /></a>
                            <a href="#"><img src="/images/post/save.png" alt="Save It" /></a>
                            <a href="#"><img src="/images/post/cart.png" alt="Add To Cart" /></a>
                        </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default PostTempThree;