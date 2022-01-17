import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Posts.scss';
import { getPostList } from '../../api';

function getUrl(url) {
  if(!url) return;
  let ret;
  try {
    ret = new URL(item.url);
  }catch(e) {}

  return ret;
}

export function Posts({ postType }) {
  const [data, setData] = useState({
    page: 1,
    pageSize: 30,
    list: [],
  });
  useEffect(async ()=>{
    const data = await getPostList({postType: postType});
    // TODO 实现分页
    setData({
      page: 1,
      pageSize: 30,
      list: data,
    });
  }, []);

  return (
    <div className={styles.root}>
      {
        data.list.map((item, index)=>{
          const showIndex = (index + 1) + (data.page - 1)*data.pageSize;
          const url = getUrl(item.url);

          return <div key={item._id}>
            <div>
              <span className={styles.index}>{showIndex}.</span>
              <span className={styles.vote}></span>
              <a className={styles.title}>{item.title}</a>
              {url && <Link className={styles.from} to={`/from?site=${url.host}`}>({url.host})</Link>}
            </div>
            <div>{item.points} points by { item.username } <a>{ item.createdAt }</a> | <a>hide</a> | <a>{item.comments} comments</a></div>
          </div>
        })
      }
    </div>
  );
}

export default Posts;