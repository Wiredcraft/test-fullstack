import Bloc from "containers/BaseWrappers/Bloc"
import { observer } from "mobx-react-lite"
import { Feed } from "store/mst/feedx-store/feed.model"

interface FeedListItemProps {
  feed: Feed
}

export default observer(({ feed }: FeedListItemProps) => {
  // const mob = useMobxStates()
  return (
    <Bloc tagName="li">
      <h1>{feed.title}</h1>
    </Bloc>
  )
})
