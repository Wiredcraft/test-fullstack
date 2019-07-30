import styled, { keyframes } from 'styled-components'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`
export const Container = styled.div`
  paddingBottom: 38px;
`
export const PostContainer = styled.div`
  position: relative;
  padding: 0 0 130px;
  max-width: 670px;
  margin: 0 auto;
`
export const PostWrapper = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #e1e2e2;

  &:nth-child(even) {
    background-color: #f0f0f0;
    border-bottom-color: #dae2e6;
  }
`
export const PostInfo = styled(FlexRow)`
  align-items: center;

  * {
    font-size: 13px;
  }
`
export const PostPropLabel = styled.div`
  color: #9c9c9c;
  margin: 0 2px 0 0;
`
export const PostTitle = styled.div`
  padding: 0 0 5px 0;
  color: #333;
  font-weight: bold;
  font-size: 16px;
`
export const PostAuthor = styled(FlexRow)`
  margin: 0 10px 0 0;
`
export const PostDesc = styled(FlexRow)`
  font-size: 12px;
  margin: 0 0 6px 0;
  color: #8f8f8f;
`
export const PostDate = styled(FlexRow)`
  width: 150px;
  margin: 0 10px 0 0;
`
export const PostUpvotes = styled.div`
  margin: 0 0 0 auto;
  background-color: #000;
  color: #fff;
  min-width: 30px;
  border-radius: 15px;
  text-align: center;
  padding: 0 2px;
`
export const ButtonUniverse = styled.button`
  position: ${(props: any) => props.styles.position || 'relative'};
  right: ${(props: any) => props.styles.right || null};
  bottom: ${(props: any) => props.styles.bottom || null};
  top: ${(props: any) => props.styles.top || null};
  width: ${(props: any) => props.styles.width || 'auto'};
  height: ${(props: any) => props.styles.height || 'auto'};
  border-radius: ${(props: any) => props.styles.borderRadius || 0};
  background-color: ${(props: any) => props.styles.bgColor || 'transparent'};
  color: ${(props: any) => props.styles.color || null};
  font-size: ${(props: any) => props.styles.fontSize || '14px'};
  text-align: ${(props: any) => props.styles.textAlign || 'left'};;
  outline: none;
  border: none;
  font-family: Arial;
`
export const NewPostModal = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`
export const NewPostWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 0 15px;

  * {
    display: flex;
  }
`
export const NewPostInner = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 15px 0;
  flex-wrap: wrap;
  align-items: center;
`
export const NewPostRow = styled.div`
  padding: 0 20px;

  * {
    margin-top: 15px;
  }
`
export const NewPostLabel = styled.div`
  width: 100px;
`
export const NewPostInput = styled.input`
  flex: 1;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  height: 32px;
`
export const NewPostTextArea = styled.textarea`
  flex: 1;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  min-height: 72px;
`
export const NewPostSubmit = styled.button`
  width: 70%;
  height: 40px;
  border-radius: 6px;
  outline: none;
  border: none;
  background-color: #17A2FF;
  color: #fff;
  margin: 20px 0 0;
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
`
export const Footer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 38px;
  background-color: #000;
  padding: 0 15px;
`
export const FooterIntro = styled.div`
  color: #d0d0d0;
  display: flex;
  height: 100%;
  align-items: center;
  max-width: 670px;
  margin: 0 auto;

  * {
    color: #d0d0d0;
  }
`
const load0anime = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

export const Logout = styled.button`
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
`
const loadingColor = '#000'
export const LoadingWrapper = styled.div`
  position: fixed;
  top: 15px;
  right: ${(prop: any) => prop.right || 0};
  width: 18px;
  height: 18px;
`
export const Loading = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  text-indent: -9999em;
  border-radius: 50%;
  background: ${loadingColor};
  background: -moz-linear-gradient(left, ${loadingColor} 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, ${loadingColor} 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, ${loadingColor} 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, ${loadingColor} 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, ${loadingColor} 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: ${load0anime} 1.4s infinite linear;
  animation: ${load0anime} 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &::before {
    width: 50%;
    height: 50%;
    background: #000;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &::after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
`


