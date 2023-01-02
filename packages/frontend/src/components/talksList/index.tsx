import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Talk } from '@models/index';
import utils from '@utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { putTalkVote } from '@redux/actions';

interface TalksListItemPropTypes {
  data: Talk;
}

function TalksListItem(props: TalksListItemPropTypes) {
  const { data } = props;
  const createdTime = utils.formatTime(data.created_time);
  const { token } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<any>();
  const handleVoteClick = useCallback(() => {
    if (!token) {
      alert('Please Login!');
    } else {
      dispatch(putTalkVote(data.id));
    }
  }, [data.id, dispatch, token]);

  return (
    <li style={{ padding: '8px 12px', margin: '8px 12px', border: '1px solid #ccc', borderRadius: 8 }}>
      <h4 style={{ display: 'flex' }}>
        <span style={{ fontSize: 12, fontWeight: 400, color: '#333', width: 32 }}>
          <button type="button" className="icon-btn" onClick={handleVoteClick}>
            ★
          </button>
          <span>{data.voted}</span>
        </span>
        <Link to={`/${data.id}`} style={{ padding: '0 15px', flex: 2 }}>
          {data.subject}
        </Link>
        <span style={{ fontSize: 12, fontWeight: 400, color: '#333', flex: 1, textAlign: 'right' }}>{createdTime}</span>
      </h4>
    </li>
  );
}

interface TalksListPropTypes {
  data: Talk[];
}

function TalksList(props: TalksListPropTypes) {
  const { data } = props;

  const newData = useMemo(() => {
    const newOne = [...data];
    newOne.sort((a, b) => (a.voted > b.voted ? -1 : 1));
    return newOne;
  }, [data]);

  return (
    <ul>
      {newData.map((item) => (
        <TalksListItem key={item.id} data={item} />
      ))}
    </ul>
  );
}

export default TalksList;
