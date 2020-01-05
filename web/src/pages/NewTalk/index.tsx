import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useTitle } from "react-use";
import request from "../../utils/request";
import useInput from "../../hooks/useInput";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Caption } from "../../components/ui/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin: 0 auto;
  padding: 16px;
  align-items: center;
`;

const ItemContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const NewTalk: FC = () => {
  useTitle("New Talk - Talk Polling");
  const { value: title, bind: titleBind } = useInput("");
  const { value: description, bind: descriptionBind } = useInput("");
  const history = useHistory();
  const handleSubmit = async (): Promise<void> => {
    if (!title || !description) {
      return;
    }
    try {
      const { data } = await request.post("/talks", {
        title,
        description
      });
      // TODO: toast success
      history.push("/", data);
    } catch (reason) {
      alert(reason); // TODO: wait for toast component
    }
  };
  return (
    <Container>
      <ItemContainer>
        <Caption>Title</Caption>
        <Input {...titleBind} />
      </ItemContainer>
      <ItemContainer>
        <Caption>Description</Caption>
        {/* TODO: wait for textarea component */}
        <Input {...descriptionBind} />
      </ItemContainer>
      <Button onClick={handleSubmit} disabled={!title || !description}>
        Submit
      </Button>
    </Container>
  );
};

export default NewTalk;
