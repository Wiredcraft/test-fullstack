import styled from 'styled-components'

export const Toast = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -18px;
  align-items: center;
  justify-content: center;

  * {
    display: flex;
  }
`
export const ToastInner = styled.div`
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 5px;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 19px;
  padding-right: 19px;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`
export const ToastLine = styled.div`
  textAlign: center;
  color: #fff;
  fontSize: 16px;
`
