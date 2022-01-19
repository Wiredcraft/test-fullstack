import React, {ReactElement} from 'react';

interface RankingProps {
    ranking: number;
}

const TalkRanking = (props: RankingProps): ReactElement => {
  return (
    <div style={{
      flex: '1 0 auto',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      {props.ranking}
    </div>
  );
};

export default TalkRanking;
