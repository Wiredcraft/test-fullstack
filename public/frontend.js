/* global React, ReactDOM */

function request(path, options){
  return fetch(path, Object.assign({ credentials: 'same-origin' }, options || {}))
    .then(async function(res){
      let data;
      
      if(res.status !== 201){
        data = await res.json();
      }

      if(res.ok){
        return data ? data.data : null;
      }else{
        return Promise.reject(Error(data.error));
      }
    });
}

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      currentPage: 'list',
      sessionLoading: 0,
      talks: [],
      talksLoading: 0
    }

    this.go = this.go.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchTalks = this.fetchTalks.bind(this);
    this.toggleTalkDescription = this.toggleTalkDescription.bind(this);
  }

  go(page){
    this.setState({
      currentPage: page
    })
  }

  login(username) {
    this.setState({ username });
  }

  logout(){
    this.setState({
      sessionLoading: 1
    });
    request('/api/sessions', {
      method: 'DELETE'
    }).then(() => {
      this.setState({
        sessionLoading: 0,
        username: null
      });
    });
  }

  fetchTalks(){
    this.setState({
      talksLoading: 1
    });
    request('/api/talks')
      .then(data => {
        this.setState({
          talks: data,
          talksLoading: 0
        });
      });
  }

  toggleTalkDescription(index) {
    const talks = this.state.talks;
    talks[index].showDescription = !talks[index].showDescription;
    this.setState({
      talks
    });
  }

  componentDidMount() {
    this.setState({
      sessionLoading: 1,
      talksLoading: 1
    });
    request('/api/sessions')
      .then(data => {
        this.setState({
          username: data,
          sessionLoading: 0
        });
      });
    request('/api/talks')
      .then(data => {
        this.setState({
          talks: data,
          talksLoading: 0
        });
      });
  }

  render() {
    const els = [
      React.createElement('header',
        {
          key: 'header'
        },
        [
          React.createElement('a', {
            key: 'title',
            onClick: () => this.go('list')
          }, 'Lighting Talks'),
          this.state.username ? React.createElement('a', {
            key: 'submit',
            onClick: () => this.go('submit')
          }, 'submit') : null,
          React.createElement(Session, {
            key: 'session',
            sessionLoading: this.state.sessionLoading,
            login: this.login,
            logout: this.logout,
            username: this.state.username,
            go: this.go
          }),
        ])
    ];

    switch(this.state.currentPage){
      case 'list':
        els.push(React.createElement(PageList, {
          key: 'page',
          username: this.state.username,
          talksLoading: this.state.talksLoading,
          talks: this.state.talks,
          fetchTalks: this.fetchTalks,
          toggleTalkDescription: this.toggleTalkDescription
        }));
        break;
      case 'login':
        els.push(React.createElement(PageLogin, {
          key: 'page',
          login: this.login,
          go: this.go
        }));
        break;
      case 'submit':
        els.push(React.createElement(PageSubmit, {
          key: 'page',
          go: this.go,
          fetchTalks: this.fetchTalks
        }));
        break;
    }

    return els;
  }
}

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(e){
    e.preventDefault();
    this.props.go('login');
  }

  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  render(){
    if(this.props.username){
      return React.createElement('div', {
        className: 'session'
      }, [
        this.props.username + ' | ',
        React.createElement('a', {
          key: 'logout',
          onClick: this.logout,
          href: '#logout'
        }, 'logout')
      ]);
    }else if(!this.props.sessionLoading){
      return React.createElement('a', {
        key: 'login',
        onClick: this.login,
        href: '#login',
        className: 'session'
      }, 'login');
    }else{
      return null;
    }
  }
}

class PageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.vote = this.vote.bind(this);
  }

  vote(tid){
    return () => {
      request('/api/votes', {
        method: 'PUT',
        body: JSON.stringify({
          talk_id: tid
        })
      }).then(() => {
        this.props.fetchTalks();
      })
    }
  }

  toggle(index){
    return () => {
      this.props.toggleTalkDescription(index);
    }
  }

  render(){
    if(this.props.talks.length){
      return [
        React.createElement('ol', { key: 'talks' },
          this.props.talks.map((talk, i) => React.createElement('li', {
            key: i
          }, [
            React.createElement('div', {
              key: 'vote',
              className: talk.votes.includes(this.props.username) ? 'vote voted' : 'vote',
              onClick: this.vote(talk.id)
            }),
            React.createElement('div', {
              key: 'title',
              className: 'title',
              onClick: this.toggle(i)
            }, talk.title),
            talk.showDescription ? React.createElement('div', {
              key: 'description',
              className: 'description',
              onClick: this.toggle(i)
            }, talk.description) : null,
            React.createElement('div', {
              key: 'info',
              className: 'info'
            }, `${talk.votes.length} voted, created by ${talk.user} at ${new Date(talk.created_at).toLocaleString('en')}`)
          ]))
        )
      ]
    }else{
      return this.props.talksLoading ? React.createElement('p', null,  'loading..') : React.createElement('p', null,  'No talk now, do you want to submit something?');
    }
  }
}

class PageLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      error: null,
      loading: 0
    };

    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.submit = this.submit.bind(this);
  }

  onUsernameChanged(e){
    this.setState({
      username: e.target.value
    });
  }

  onPasswordChanged(e){
    this.setState({
      password: e.target.value
    });
  }

  submit(e){
    e.preventDefault();
    this.setState({
      loading: 1
    });

    request('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(()=> {
      this.props.login(this.state.username);
      this.props.go('list');
    }).catch(e => {
      this.setState({
        error: e.message,
        loading: 0
      });
    });
  }

  render(){
    return React.createElement('form', {
      className: 'form',
      autoComplete: 'off'
    }, [
      React.createElement('label', {
        key: 'username'
      }, [
        'Username',
        React.createElement('input', {
          key: 'inputUsername',
          autoComplete: 'off',
          required: true,
          onChange: this.onUsernameChanged
        }),
      ]),
      React.createElement('label', {
        key: 'password'
      }, [
        'Password',
        React.createElement('input', {
          key: 'inputPassword',
          type: 'password',
          autoComplete: 'new-password',
          required: true,
          onChange: this.onPasswordChanged
        })
      ]),
      React.createElement('p', {
        key: 'error',
        className: 'error',
        style: {
          display: this.state.error ? 'block' : 'none'
        }
      }, `Error: ${this.state.error}`),
      React.createElement('button', {
        key: 'submit',
        onClick: this.submit,
        disabled: this.state.loading
      }, 'Login')
    ])
  }
}

class PageSubmit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 0,
      title: null,
      description: null,
      error: null
    };

    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.submit = this.submit.bind(this);
  }

  onTitleChanged(e){
    this.setState({
      title: e.target.value
    });
  }

  onDescriptionChanged(e){
    this.setState({
      description: e.target.value
    });
  }

  submit(e){
    e.preventDefault();
    this.setState({
      loading: 1
    });

    request('/api/talks', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    }).then(()=> {
      this.props.fetchTalks();
      this.props.go('list');
    }).catch(e => {
      this.setState({
        error: e.message,
        loading: 0
      });
    });
  }

  render(){
    return React.createElement('div', {
      className: 'form'
    }, [
      React.createElement('label', {
        key: 'title'
      }, [
        'Title',
        React.createElement('input', {
          key: 'titleInput',
          required: true,
          onChange: this.onTitleChanged
        }),
      ]),
      React.createElement('label', {
        key: 'description'
      }, [
        'Description',
        React.createElement('textarea', {
          key: 'descriptionInput',
          required: true,
          onChange: this.onDescriptionChanged
        })
      ]),
      React.createElement('p', {
        key: 'error',
        className: 'error',
        style: {
          display: this.state.error ? 'block' : 'none'
        }
      }, `Error: ${this.state.error}`),
      React.createElement('button', {
        key: 'submitButton',
        onClick: this.submit,
        disabled: this.state.loading
      }, 'Submit')
    ])
  }
}


ReactDOM.render(React.createElement(Layout), document.getElementById('app'));
