import Loading from '@components/loading';
import { Talk as TalkModel } from '@models/index';
import { getTalksData } from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function Talk() {
  const { id } = useParams();

  const talks: TalkModel[] = useSelector((state: any) => state.talks.data);

  const dispatch = useDispatch<any>();

  if (talks.length === 0) {
    dispatch(getTalksData());
    return <Loading />;
  }

  const data = talks.find((talk: TalkModel) => talk.id === Number.parseInt(id!, 10));

  return (
    <div>
      <Link to="/">Back</Link>
      <div
        style={{
          padding: 12,
          margin: 12,
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #ccc',
          borderRadius: 8,
        }}
      >
        {data?.subject}
      </div>
      <div
        style={{
          padding: 12,
          margin: 12,
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #ccc',
          borderRadius: 8,
        }}
      >
        {data?.content}
      </div>
    </div>
  );
}

export default Talk;
