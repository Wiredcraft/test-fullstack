import FeedListItem from 'components/FeedItem/FeedListItem'
import FlexWrapper from 'containers/BaseWrappers/FlexWrapper'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Feed } from 'store/mst/feedx-store/feed.model'
import { FeedListFilterDateRangeToken } from 'store/mst/feedx-store/feedx-store'
import { useMobxStates } from 'store/mst/root-state-context'

type FeedListParams = {
  sorting?: "latest" | "trending"
}

const FeedListPage = observer(() => {
  const { feedxStore } = useMobxStates()
  const params = useParams<FeedListParams>()
  const [dateRangeToken, setDateRangeToken] = useState(FeedListFilterDateRangeToken.ALL)
  const [feedList, setFeedList] = useState<Feed[]>([])
  const [nextPagination, setNextPagination] = useState(0);
  // const [dateRange, dateRangeToken, setDateRange] = useFilterDateRange()

  // fetch new feeds while:
  // - feedxStore first get created
  // - pagination updates
  // - dateRangeToken changes
  useEffect(() => {
    // feedxStore?.fetchFeeds()
  }, [feedxStore, dateRangeToken, nextPagination])

  // read update feedList from store while:
  // - feedxStore has been lastUpdated, due to new fetches
  useEffect(() => {
    if (feedxStore?.lastUpdated === null) return;
    const currentList = feedxStore?.trendingFeeds(dateRangeToken) || [];
    setFeedList(currentList);
  }, [feedxStore, dateRangeToken, feedxStore?.lastUpdated])

  return (
    <main>
      <FlexWrapper tagName="header">
        <span>{params.sorting || "trending"}</span>
      </FlexWrapper>
      <ul>
        {feedList.map(feed => <FeedListItem feed={feed} />)}
      </ul>
    </main>
  )
})

export default FeedListPage;
