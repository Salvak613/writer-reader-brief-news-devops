import { useNavigate } from "react-router-dom";

type EditButtonProps = {
  articleId: number; 
};

export default function EditButton({ articleId }: EditButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit/${articleId}`);
  };

  return (
    <button className="edit-button" onClick={handleClick}>
      ✏️
    </button>
  );
}

