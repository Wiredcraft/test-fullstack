import { addTalk, getTalksData } from '@redux/actions';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NewTalk() {
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();

  const navigate = useNavigate();

  const handleSubjectChange = useCallback((e: any) => {
    setSubject(e.target.value);
  }, []);
  const handleContentChange = useCallback((e: any) => {
    setContent(e.target.value);
  }, []);

  const dispatch = useDispatch<any>();
  const handleSubmit = useCallback(() => {
    const payload = { subject, content };
    dispatch(addTalk(payload))
      .then(() => dispatch(getTalksData()))
      .then(() => navigate('/'))
      .catch(() => {
        throw new Error('adding talk has error.');
      });
  }, [content, dispatch, navigate, subject]);

  return (
    <form>
      <div>
        <label htmlFor="subject" style={{ display: 'flex', width: 300, margin: 12 }}>
          <span style={{ width: 100 }}>Subject:</span>
          <input name="subject" type="text" style={{ width: 200 }} onChange={handleSubjectChange} />
        </label>
      </div>
      <div>
        <label htmlFor="content" style={{ display: 'flex', width: 300, margin: 12 }}>
          <span style={{ width: 100 }}>Content:</span>
          <textarea name="content" rows={10} style={{ width: 200 }} onChange={handleContentChange} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit} type="button" style={{ margin: 12 }}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewTalk;
