import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import {
  DataSuccessResponse,
  SimpleErrorResponse,
  SimpleSuccessResponse,
} from 'src/response.model';
import { talks as TALKS, votes as VOTES } from '../test.data';

const resolveToken = (token: string) => {
  const hash = token.split(' ')[1];
  const data = JSON.parse(Buffer.from(hash, 'base64').toString('ascii'));
  return data;
};

@Controller('talk')
export class TalkController {
  @Post()
  addOne(
    @Headers('Authorization') token: string,
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    const user = resolveToken(token);
    TALKS.push({
      id: TALKS[TALKS.length - 1]['id'] + 1,
      subject,
      content,
      author: user.name,
      author_id: user.id,
      voted: 0,
      created_time: 0,
    });
    return new SimpleSuccessResponse();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const result = TALKS.find((talk) => talk.id === parseInt(id));
    if (result) {
      return new DataSuccessResponse(result);
    } else {
      return new SimpleErrorResponse(404);
    }
  }

  @Put(':id/vote')
  voteOne(@Headers('Authorization') token: string, @Param('id') id: string) {
    const user = resolveToken(token);
    const talkId = parseInt(id);
    const index = VOTES.findIndex((vote) => vote.talk_id === talkId);
    if (index === -1) {
      return new SimpleErrorResponse(500);
    } else {
      VOTES.push({
        id: VOTES[VOTES.length - 1]['id'] + 1,
        talk_id: parseInt(id),
        user_id: user.id,
        created_time: 0,
      });
      const talk = TALKS.find((talk) => talk.id === talkId);
      talk.voted += 1;
      return new SimpleSuccessResponse();
    }
  }
}
