import { useState } from 'react';
import styles from './style.module.css';
import DeleteIcon from '../DeleteIcon';
import UpdateIcon from '../UpdateIcon';

interface FlashCardProps {
  data: {
    id: string;
    question: string;
    answer: string;
  };
  handleUpdate: () => void;
  handleDelete: () => void;
}


const FlashCard = ({ data, handleUpdate, handleDelete }: FlashCardProps) => {
  const [clicked, setClicked] = useState(false);

  console.log(clicked);

  return (
    <div className={styles.flipCard} onClick={() => setClicked(!clicked)}>
      <div className=' absolute z-10 top-5 right-5 flex items-center gap-3'>
        <span className='cursor-pointer '
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}>
          <DeleteIcon />
        </span>

        <span className='cursor-pointer' onClick={(e) => {
          e.stopPropagation();
          handleUpdate();
        }}>
          <UpdateIcon />
        </span>

      </div>
      <div className={`${styles.flipCardInner} ${clicked ? styles.rotate : ''}`}>
        <div className={styles.flipCardFront}>
          <p>
            {data.question}
          </p>
        </div>
        <div className={styles.flipCardBack}>
          <p>
            {data.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
