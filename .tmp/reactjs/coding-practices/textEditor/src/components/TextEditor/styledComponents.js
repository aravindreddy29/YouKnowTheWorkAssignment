import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: #25262c;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const TextEditorContainer = styled.div`
  background-color: #1b1c22;
  height: 80vh;
  display: flex;
  flex-direction: row;
  width: 80vw;
  padding: 20px;
`
export const BannerLeftPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50vw;
`
export const TextEditorHeading = styled.h1`
  color: #f1f5f9;
  font-family: 'Consolas';
  font-size: 25px;
  text-align: center;
`
export const TextEditorImage = styled.img`
  height: 320px;
  width: 320px;
`
export const BannerRightPart = styled.div`
  background-color: #25262c;
  border: solid 1px #334155;
  width: 50vw;
  border-radius: 10px;
`
export const InputStylesContainer = styled.ul`
  padding: 10px;
`
export const Button = styled.button`
  background-color: transparent;
  border-style: none;
  color: ${props => (props.color ? '#faff00' : '#f1f5f9')};
`
export const Separator = styled.hr`
  border: solid 1px #334155;
  margin: 0;
`
export const TextEditorInput = styled.textarea`
  background-color: transparent;
  border-style: none;
  outline: none;
  height: 60vh;
  width: 40vw;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-style: ${props => (props.italic ? 'italic' : 'normal')};
  text-decoration: ${props => (props.underline ? 'underline' : 'normal')};
  color: #f8fafc;
  font-family: 'Consolas';
  padding: 10px;
  font-size: 18px;
`
export const ListItem = styled.li``
