import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useNavigate } from 'react-router-dom';
import ModalPost from '../ModalPost';

export default function MasonryImageList(user) {
  const postLists = user.user.posts;
  // console.log(postLists);

  // const navigate = useNavigate();

  // const handleOpenPost = (post) => {
  //   // navigate('/post/' + post._id);
  //   alert = ('modal');
  // };

  const [selectedPost, setSelectedPost] = useState(null);
  const handleOpenModal = (post) => {
    setSelectedPost(post);
  };
  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <ImageList variant="masonry" cols={3} gap={8}>
        {postLists.map((post) => (
          <ImageListItem key={post.imgUrl} onClick={() => handleOpenModal(post)}>
            <img
              src={`${post.imgUrl}?w=248&fit=crop&auto=format`}
              srcSet={`${post.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={post.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {selectedPost && (
        <ModalPost post={selectedPost} isOpen={true} handleClose={handleCloseModal} />
      )}
    </div>
  );
}
