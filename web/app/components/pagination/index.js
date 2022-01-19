import React from 'react';
import { range } from 'lodash';
import styles from './style.less';

class Pagination extends React.Component {
    buildLink(page) {
        const query = { ...this.props.query, page };
        const queryString = Object.keys(query)
                        .map(key => encodeURIComponent(key)+ '=' +encodeURIComponent(query[key]))
                        .join('&');

        return this.props.path + '?' + queryString;
    }

    onChange = page => {
        const { onChange } = this.props;
        return (e) => {
            page && onChange && (onChange(page), e.preventDefault());
        }
    }

    render() {
        let { total, current = 1, pageSize = 10, itemSize = 9 } = this.props;

        total = parseInt(total);
        current = parseInt(current);

        if (total <= pageSize) {
            return null;
        }

        let all = Math.ceil(total / pageSize);

        if (current < 1) {
            current = 1;
        }
        if (current > all) {
            current = total;
        }

        let first = Math.max(1, current - Math.floor(itemSize / 2));
        let last = Math.min(all, current + Math.floor(itemSize / 2));

        if (last - first + 1 < itemSize) {
            if (current < (all / 2)) {
                last = Math.min(all, last + (itemSize - (last - first)));
            } else {
                first = Math.max(1, first - (itemSize - (last - first)));
            }
        }

        if (last - first + 1 > itemSize) {
            if (current > (all / 2)) {
                first++;
            } else {
                last--;
            }
        }

        let hasPrev = current > 1;
        let hasNext = current < all;
        let prev = current - 1;
        let next = current + 1;

        return (
            <div className={styles.pagination}>
                <ul>
                    <li className={`${styles.prev} ${!hasPrev && styles.disabled}`}>
                        <a href={`${hasPrev ? this.buildLink(prev) : 'javascript:;'}`} onClick={this.onChange(hasPrev && prev)}>上一页</a>
                    </li>
                    {range(first, last+1).map((page) => (
                        <li key={page} className={`${page == current && styles.cur}`}>
                            <a href={`${page == current ? "javascript:;" : this.buildLink(page)}`} onClick={this.onChange(page)}>{page}</a>
                        </li>
                    ))}
                    <li className={`${styles.next} ${!hasNext && styles.disabled}`}>
                        <a href={`${hasNext ? this.buildLink(next) : 'javascript:;'}`} onClick={this.onChange(hasNext && next)}>下一页</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Pagination;