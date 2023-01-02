import Loading from '@components/loading';
import { Talk as TalkModel } from '@models/index';
import { getTalksData } from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Talk() {
  const { id } = useParams();

  const talks: TalkModel[] = useSelector((state: any) => state.talks.data);

  const dispatch = useDispatch<any>();

  if (talks.length === 0) {
    dispatch(getTalksData());
    return <Loading />;
  }

  const data = talks.find((talk: TalkModel) => talk.id === Number.parseInt(id!, 10));

  return <span>{data?.subject}</span>;
}

export default Talk;
