import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleClick = async () => {
    if (!post || !post._id) {
      console.error('Post or post._id is undefined');
      return;
    }

    const finalComment = `${user.result.name}: ${comment}`;
    try {
      const newComments = await dispatch(commentPost(finalComment, post._id));
      setComments(newComments);
      setComment('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField 
            fullWidth 
            minRows={4} 
            variant="outlined" 
            label="Comment" 
            multiline 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
          <br />
          <Button 
            style={{ marginTop: '10px' }} 
            fullWidth 
            disabled={!comment.length} 
            color="primary" 
            variant="contained" 
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
