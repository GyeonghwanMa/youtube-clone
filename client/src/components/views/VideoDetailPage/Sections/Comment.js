import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import SingleComment from "./SingleComment";

function Comment(props) {
  const user = useSelector((state) => state.user); // redux에서 가져오기
  const videoId = props.postId;
  const [CommentValue, setCommentValue] = useState("");
  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                postId={props.postId}
                comment={comment}
                key={index}
                refreshFunction={props.refreshFunction}
              />
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
