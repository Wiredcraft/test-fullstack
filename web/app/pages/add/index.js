import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import { Button } from '../../components/form';
import Widget from '../../components/widget';
import Editor from '../../components/mde';
import util from '../../util';
import styles from './style.less';

function TopicSelect(props) {
  const [ value, setValue ] = useState(props.value);
  const [ topics, setTopics ] = useState([]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value])

  useEffect(() => {
    util.request.get('/api/suggest', { type: 'TOPIC', keyword: '' })
      .then(list => {
        setTopics(list.map(item => item.name));
      })
  }, []);

  function onChange(e) {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  function onSelect(item) {
    return () => {
      onChange({ target: { value: item } });
    }
  }

  const items = topics.filter(item => {
    return item.indexOf(value) !== -1
  });

  return (
    <div className={styles.topicSelect}>
      <input value={value} onChange={onChange} placeholder="话题" />
      {items.length > 0 && (
        <div className={styles.list}>
          <ul>
            {items.map(item => (
              <li onMouseDown={onSelect(item)}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

Add.getInitialProps = async function(ctx) {
  return {
    query: ctx.query,
    layout:  await Layout.getInitialProps(ctx)
  }
}

function Add(props) {
  const [ data, setData ] = useState({ topic: props.query.topic, title: '', content: '' });
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    if (localStorage.getItem('add_post_data')) {
      const savedData = JSON.parse(localStorage.getItem('add_post_data'));
      if (savedData.topic === data.topic) {
        setData(savedData);
      } else {
        localStorage.removeItem('add_post_data');
      }
    }
  }, [])

  function onFieldChange(field) {
    return function(e) {
      const value =  e.target ? e.target.value : e;
      setData(oldData => {
        const newData = { ...oldData, [field]: value };
        localStorage.setItem('add_post_data', JSON.stringify(newData));
        return newData;
      })
    }
  }

  function onSubmit(e) {
    setMessage('');
    util.request.post('/api/addPost', data)
      .then(body => {
        localStorage.removeItem('add_post_data');
        location.href=`/post/${body.id}`;
      })
      .catch(e => {
        setMessage(e.message);
      })
  }

  return (
    <>
      <Head>
        <title>发布主题</title>
        <link rel="stylesheet" href="/libs/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/libs/simplemde.min.css"/>
        <script src="/libs/simplemde.min.js"></script>
      </Head>
      <Layout {...props.layout}>
        <Layout.Left>
          <Panel title="发布主题">
            <div className={styles.add}>
              <div className={styles.topic}>
                <TopicSelect value={data.topic} onChange={onFieldChange('topic')}  />
              </div>
              <div className={styles.title}>
                <input value={data.title} onChange={onFieldChange('title')} placeholder="标题" />
              </div>
              <div className={styles.content}>
                <Editor value={data.content} onChange={onFieldChange('content')} />
              </div>
              <div className={styles.bottom}>
                <span className={styles.error}>{message}</span>
                <Button type="primary" onClick={onSubmit}>发布</Button>
              </div>
            </div>
          </Panel>
        </Layout.Left>
      <Layout.Right>
          <Widget title="发帖须知" className={styles.guide}>
            <ul>
              <li>1. 您可以发布您感兴趣的任何主题 </li>
              <li>2. 您发布的任何主题都将由社区用户进行评价，并决定是否屏蔽该主题</li>
              <li>3. 关于社区的运行规则，请参考 <a href="/guide">新手入门</a></li>
            </ul>
          </Widget>
      </Layout.Right>
    </Layout>
    </>
  )
}

export default Add;