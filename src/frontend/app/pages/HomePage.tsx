import * as React from 'react'
import { connect } from 'react-redux'
import * as Elements from './HomePageStyles'
import {
  getPosts,
  createPost,
  userReg,
  userLogin,
  updateUserInfo,
  userVote,
  updatePosts,
} from '../actions/talksActions'
import { onToast } from '../actions/toastActions'
import { handleLogout } from '../utils/executeActions'
import {
  compareDate,
  validate,
  handleUserCookies,
  deepClone,
  getValue,
} from '../utils/utils'

const _ = require('../utils/underscore')
const DomEls: any = Elements

interface Props {
  dispatch: any,
  getPosts: any,
  userInfo: any,
  createPost: any,
  userVote: any,
  makeReqing: any,
}

interface State {
  [key: string]: any,
  width: number,
  height: number,
  makeReqing: boolean,
  modal: {
    openModal: boolean,
    type: string,
    submitLabel: string,
    afterLogin: string,
  },
  modalCompose: [
    {
      label: 'Title',
      type: 'input',
      value: '',
      validateType: 'strContent',
      errmsg: '',
      strMin: 1,
      strMax: 30,
    },
    {
      label: 'Description',
      type: 'textarea',
      value: '',
      validateType: 'strContent',
      errmsg: '',
      strMin: 15,
      strMax: 120,
    }
  ],
  modalLogin: [
    {
      label: 'Username',
      type: 'input',
      value: '',
      validateType: 'strContent',
      errmsg: '',
      strMin: 2,
      strMax: 24,
    },
    {
      label: 'Password',
      type: 'input',
      inputType: 'password',
      value: '',
      validateType: 'password',
      errmsg: '',
    }
  ],
  modalRegister: [
    {
      label: 'Username',
      type: 'input',
      value: '',
      validateType: 'strContent',
      errmsg: '',
      strMin: 2,
      strMax: 24,
    },
    {
      label: 'Password',
      type: 'input',
      inputType: 'password',
      value: '',
      validateType: 'password',
      errmsg: '',
    }
  ],
}

type Post = {
  articleCreatedAt: string,
  articleDescription: string,
  articleId: string,
  articleSlug: string,
  articleTitle: string,
  articleUpdatedAt: string,
  authorId: string,
  authorUsername: string,
  upvotes: number,
}

interface CreatePostParams {
  article: {
    title: string,
    description: string,
  }
}

interface UserRegParams {
  user: {
    username: string,
    password: string,
  }
}

interface UseLoginParams {
  user: {
    username: string,
    password: string,
  }
}

interface VoteParams {
  voting: {
    articleId: string,
  }
}

class HomePage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      makeReqing: false,
      modal: {
        openModal: false,
        type: '',
        submitLabel: 'submit',
        afterLogin: '',
      },
      modalCompose: [
        {
          label: 'Title',
          type: 'input',
          value: '',
          validateType: 'strContent',
          errmsg: '',
          strMin: 1,
          strMax: 30,
        },
        {
          label: 'Description',
          type: 'textarea',
          value: '',
          validateType: 'strContent',
          errmsg: '',
          strMin: 15,
          strMax: 120,
        }
      ],
      modalLogin: [
        {
          label: 'Username',
          type: 'input',
          value: '',
          validateType: 'strContent',
          errmsg: '',
          strMin: 2,
          strMax: 24,
        },
        {
          label: 'Password',
          type: 'input',
          inputType: 'password',
          value: '',
          validateType: 'password',
          errmsg: '',
        }
      ],
      modalRegister: [
        {
          label: 'Username',
          type: 'input',
          value: '',
          validateType: 'strContent',
          errmsg: '',
          strMin: 2,
          strMax: 24,
        },
        {
          label: 'Password',
          type: 'input',
          inputType: 'password',
          value: '',
          validateType: 'password',
          errmsg: '',
        }
      ],
    }

    this.postContainerRef = React.createRef()
  }

  postContainerRef: any
  voteItem: any

  componentDidMount () {
    const userCookieData = handleUserCookies('get')
    if (userCookieData) {
      this.props.dispatch(updateUserInfo(userCookieData))
    }
    this.reqGetPosts()
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  componentDidUpdate (prevProps: any, prevState: any) {
    const { isLoggedIn: prevLoginState } = prevProps.userInfo
    const { isLoggedIn, through, username } = this.props.userInfo
    const isThroughLogin = (through === 'login')
    const isThroughRegister = (through === 'register')
    const { afterLogin } = prevState.modal
    const tModal = this.state.modal

    let toastMsg = ''

    if (!prevLoginState && isLoggedIn && through) {

      const userInfoClone = _.clone(this.props.userInfo)
      userInfoClone.through = ''
      handleUserCookies('set', userInfoClone)

      if (isThroughLogin) {
        toastMsg = `You've logged in successfully`
      }

      if (isThroughRegister) {
        toastMsg = `Welcome our dear new member: ${username}`
      }

      this.onCompose(_.clone(tModal))

      if (afterLogin) {
        if (afterLogin === 'modalCompose') {
          tModal.type = afterLogin
          tModal.openModal = true
          tModal.submitLabel = 'Submit'
          this.setState({ modal: _.clone(tModal) })
        }

        if (afterLogin === 'userVote' && this.voteItem) {
          this.reqVote({ voting: { articleId: this.voteItem.articleId }})
        }

      }

    }

    toastMsg && this.sendToast(toastMsg)
    this.updatePosts(prevProps)
    this.updateVote(prevProps)
  }

  reqGetPosts = () => {
    return this.props.dispatch(getPosts())
  }

  reqCreatePost = (params: CreatePostParams) => {
    return this.props.dispatch(createPost(params))
  }

  reqUserLogin = (params: UseLoginParams) => {
    return this.props.dispatch(userLogin(params))
  }

  reqUserReg = (params: UserRegParams) => {
    return this.props.dispatch(userReg(params))
  }

  reqVote = (params: VoteParams) => {
    return this.props.dispatch(userVote(params))
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  updatePosts = (prevProps: any) => {
    const { createPost: prevCreatePost } = prevProps
    const { createPost: currentCreatePost } = this.props

    if (!_.isObject(currentCreatePost)) return false
    if (!_.isObject(currentCreatePost.article)) return false

    if (_.isObject(prevCreatePost) && _.isObject(prevCreatePost.article)) {
      if (prevCreatePost.article.id === currentCreatePost.article.id) return false
    }

    this.onCompose(this.state.modal)
    this.reqGetPosts()
    return true
  }

  updateVote = (prevProps: any) => {
    const { userVote: prevUserVote } = prevProps
    const { userVote: currentUserVote } = this.props

    if (!_.isObject(currentUserVote)) return false
    if (!_.isObject(currentUserVote.voting)) return false

    const { articleid: currentArticleId } = currentUserVote.voting

    if (_.isObject(prevUserVote) && _.isObject(prevUserVote.voting)) {
      if (prevUserVote.voting.articleid === currentArticleId) return false
    }

    const posts = this.props.getPosts

    if (_.isObject(posts) && _.isArray(posts.articles) && posts.articles.length) {
      const postsClone = deepClone(posts)
      postsClone.articles.forEach((tItem: any) => {
        if (tItem.articleId === currentArticleId) {
          tItem.upvotes += 1
        }
      })
      postsClone.articles = this.sortPostsByVoting(postsClone.articles)
      this.props.dispatch(updatePosts(postsClone))
    }

    return true
  }

  sortPostsByVoting = (list: any[]) => {
    return list.sort((aItem: any, bItem: any) => bItem.upvotes - aItem.upvotes)
  }
  sendToast = (msg: string) => {
    this.props.dispatch(onToast({
      showToast: true,
      message: msg,
    }))
    return true
  }

  onCompose = (params: any, extra?: any) => {

    if (_.isObject(extra)) {
      extra.requireLogin && this.sendToast('You need to login first to perform this action')
    }
    const { openModal } = params
    params.openModal = !openModal
    this.setState({ modal: params })
  }

  onValueChange = (params: any) => {
    const {
      type,
      evt,
      modal,
      item,
    } = params
    const value = evt.target.value
    const modalObj = _.clone(modal)
    const findItem = modalObj.filter((m: any) => m.label === item.label)

    if (!findItem.length) return false
    const tItem = findItem[0]
    tItem.value = value
    this.setState({ [type]: modalObj })
    return true
  }

  onSubmit = (params: any) => {
    const { type } = params
    const tModal = this.state[type]
    const vObj: any = validate
    const availableValidations = Object.keys(vObj)
    const isComposing = (type === 'modalCompose')
    const payload: any = isComposing ?
      {
        title: '',
        description: '',
      } :
      {
        username: '',
        password: '',
      }

    tModal.forEach((tItem: any) => {
      const tType = tItem.validateType
      const vArgus = (tType === 'password') ?
        tItem.value :
        {
          val: tItem.value,
          prop: tItem.label,
          strMin: tItem.strMin,
          strMax: tItem.strMax,
        }

      if (availableValidations.includes(tType)) {
        tItem.errmsg = vObj[tType](vArgus)
      }

      payload[tItem.label.toLowerCase()] = tItem.value
    })

    const findErrFields = tModal.filter((tItem: any) => tItem.errmsg.trim() !== '')

    if (findErrFields.length) {
      const firstItem = findErrFields[0]
      this.sendToast(firstItem.errmsg)
      return false
    }
    // console.log(payload)
    switch (type) {
      case 'modalCompose':
        this.reqCreatePost({ article: payload })
        return
      case 'modalLogin':
        this.reqUserLogin({ user: payload })
        return
      case 'modalRegister':
        this.reqUserReg({ user: payload })
        return
    }

    return true
  }

  onLogout = () => {
    return handleLogout()
  }

  onVote = (item: any) => {
    const { articleId } = item
    const { isLoggedIn } = this.props.userInfo
    const tModal = this.state.modal

    if (!isLoggedIn) {
      tModal.type = 'modalLogin'
      tModal.afterLogin = 'userVote'
      tModal.submitLabel = 'Login'
      this.voteItem = _.clone(item)
      this.onCompose(tModal, { requireLogin: true })
      return
    }

    this.reqVote({ voting: { articleId }})
  }

  render () {
    // console.log('PAGE PROPS & STATES==========', this.props, this.state, handleUserCookies('get'))
    const { width, height } = this.state
    const subtractLayout = (width - 670)
    const biggerThanLayout = subtractLayout > 0
    const btnPosRight = (biggerThanLayout) ? subtractLayout / 2 : 5
    const btnPosTop = height > 0 ? height - 110 : 0
    return (
      <DomEls.Container>
        { this.renderEmptyTip() }
        { this.renderPosts() }
        { this.renderLoader({ right: btnPosRight + 'px' }) }
        { this.renderModalForNewPost() }
        { this.renderFooter() }
        {
          this.renderButton({
            btnLabel: '+',
            btnLabelAfterPressing: 'x',
            type: 'modalCompose',
            styles: {
              position: 'fixed',
              right: `${btnPosRight}px`,
              top: `${btnPosTop}px`,
              width: '60px',
              height: '60px',
              borderRadius: '60px',
              fontSize: '34px',
              color: '#fff',
              bgColor: '#17A2FF',
              textAlign: 'center',
            }
          })
        }
      </DomEls.Container>
    )
  }

  renderPosts = () => {
    const getPostsData = this.props.getPosts
    if (!_.isObject(getPostsData)) return null
    const { articles }: { articles: Post[] } = getPostsData
    if (!articles.length) return null
    return (
      <DomEls.PostContainer ref={this.postContainerRef}>
        { articles.map(this.renderPost) }
      </DomEls.PostContainer>
    )
  }

  renderPost = (item: Post, itemKey: number) => {
    const {
      articleTitle,
      articleDescription,
      articleCreatedAt,
      authorUsername,
      upvotes,
    } = item
    const lastReplyTime = compareDate(articleCreatedAt, Date.now()) || ''
    const handleVoting = () => this.onVote(item)
    return (
      <DomEls.PostWrapper key={itemKey}>
        <DomEls.PostTitle>
          { articleTitle }
        </DomEls.PostTitle>

        <DomEls.PostDesc>
          { articleDescription }
        </DomEls.PostDesc>

        <DomEls.PostInfo>
          <DomEls.PostDate>
            <DomEls.PostPropLabel>
              date:
            </DomEls.PostPropLabel>
            { lastReplyTime }
          </DomEls.PostDate>
          <DomEls.PostAuthor>
            <DomEls.PostPropLabel>
              author:
            </DomEls.PostPropLabel>
            { authorUsername }
          </DomEls.PostAuthor>
          <DomEls.PostUpvotes onClick={handleVoting}>
            { `↑ ${upvotes}` }
          </DomEls.PostUpvotes>
        </DomEls.PostInfo>
      </DomEls.PostWrapper>
    )
  }

  renderFooter = () => {
    const { isLoggedIn, username } = this.props.userInfo
    const footerConf: any = {
      login: {
        renderLabel: isLoggedIn ? null : () => this.renderButton({
          btnLabel: 'Login',
          type: 'modalLogin',
          submitLabel: 'Login'
        })
      },
      welcome: {
        label: isLoggedIn ? `Welcome back, ${username}` : null,
        extraField: {
          render: !isLoggedIn ?
            null :
            () => <DomEls.Logout onClick={this.onLogout}>{`, Logout`}</DomEls.Logout>
        }
      },
      register: {
        renderLabel: isLoggedIn ? null : () => this.renderButton({
          btnLabel: 'Register',
          type: 'modalRegister',
          submitLabel: 'Register'
        })
      }
    }
    return (
      <DomEls.Footer className='footer'>
        <DomEls.FooterIntro>
          {
            Object.keys(footerConf).map(tKey => {
              const tItem = footerConf[tKey]
              const isLabelFunc = (typeof tItem.renderLabel === 'function')
              const { extraField } = tItem
              const isExtraValid = (_.isObject(extraField) && extraField.render)
              return (
                <div key={tKey}>
                  { isLabelFunc ? tItem.renderLabel() : tItem.label || '' }
                  { isExtraValid && extraField.render() }
                </div>
               )
            })
          }
        </DomEls.FooterIntro>
      </DomEls.Footer>
    )
  }

  renderButton = (btnConf: any) => {
    const modalState = _.clone(this.state.modal)
    const { openModal } = modalState
    const { isLoggedIn } = this.props.userInfo
    const {
      btnLabel,
      btnLabelAfterPressing,
      type,
      submitLabel,
      styles = {},
    } = btnConf
    const isComposing = (type === 'modalCompose')
    const requireLogin = (!isLoggedIn && isComposing && !openModal)

    modalState.afterLogin = requireLogin ? type : ''
    modalState.type = requireLogin ? 'modalLogin' : type
    modalState.submitLabel = requireLogin ? 'Login' : submitLabel

    const tAction = () => this.onCompose(modalState, { requireLogin })
    return (
      <DomEls.ButtonUniverse
        onClick={tAction}
        styles={styles}
      >
        { openModal ? btnLabelAfterPressing || btnLabel : btnLabel }
      </DomEls.ButtonUniverse>
    )
  }

  renderModalForNewPost = () => {
    const modal = this.state.modal
    const { openModal, type, submitLabel } = modal
    if (!openModal) return null
    const tState: any = this.state
    const tModal = _.clone(tState[type])
    if (!tModal) return null
    const handleSubmit = () => this.onSubmit(modal)
    return (
      <DomEls.NewPostModal>
        <DomEls.NewPostWrapper>
          <DomEls.NewPostInner>
            { tModal.map((item: any, itemKey: any) => {

              return (
                <DomEls.NewPostRow key={itemKey}>
                  <DomEls.NewPostLabel>
                    { item.label }
                  </DomEls.NewPostLabel>

                  {
                    item.type === 'input' &&
                      <DomEls.NewPostInput
                        type={item.inputType || 'input'}
                        value={item.value || ''}
                        onChange={(evt: any) => this.onValueChange({ // tslint:disable-line
                          type,
                          evt,
                          item,
                          modal: tModal,
                        })}
                      />
                  }
                  {
                    item.type === 'textarea' &&
                      <DomEls.NewPostTextArea
                        value={item.value || ''}
                        onChange={(evt: any) => this.onValueChange({ // tslint:disable-line
                          type,
                          evt,
                          item,
                          modal: tModal,
                        })}
                      />
                  }

                </DomEls.NewPostRow>
              )
            })}

            <DomEls.NewPostSubmit
              onClick={handleSubmit}
            >
              { submitLabel || 'Submit' }
            </DomEls.NewPostSubmit>
          </DomEls.NewPostInner>

        </DomEls.NewPostWrapper>
      </DomEls.NewPostModal>
    )
  }

  renderEmptyTip = () => {
    const postList: any = getValue(this.props, ['getPosts', 'articles'])
    if (_.isArray(postList) && postList.length) return null
    return (
      <div
        style={{
          padding: '15px',
          color: '#8c8c8c',
          fontSize: '12px'
        }}
      >
        Be the first one to present a light talk by click the + button
      </div>
    )
  }

  renderLoader = (params: any) => {
    const { makeReqing } = this.props
    if (!makeReqing) return null
    return (
      <DomEls.LoadingWrapper right={params.right}>
        <DomEls.Loading />
      </DomEls.LoadingWrapper>
    )
  }

}

const mapStateToProps = (state: any) => ({
  getPosts: state.talks.getPosts,
  makeReqing: state.talks.makeReqing,
  userInfo: state.talks.userInfo,
  createPost: state.talks.createPost,
  userVote: state.talks.userVote,
})

export default connect(mapStateToProps)(HomePage)
