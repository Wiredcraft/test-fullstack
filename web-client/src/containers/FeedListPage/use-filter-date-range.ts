import { useState } from "react";
import {
  FeedListDateRange,
  FeedListFilterDateRangeToken
} from "store/mst/feedx-store/feedx-store";

/**
 * set filter date range from token
 * 
 * this logic lives inside mobx state tree
 *
 * @export
 * @param {*} [token=FeedListFilterDateRangeToken.ALL]
 * @returns
 */
export function useFilterDateRange(token = FeedListFilterDateRangeToken.ALL) {
  const [rangeToken, setRangeToken] = useState(token);
  const [dateRange, setDateRangeInner] = useState<FeedListDateRange>({});

  function setDateRange(token: FeedListFilterDateRangeToken) {
    setRangeToken(token);
    setDateRangeInner({});
  }

  return [dateRange, rangeToken, setDateRange];
}
