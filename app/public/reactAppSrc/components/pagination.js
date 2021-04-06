import React, { Component } from "react";

 class Pagination extends Component {
	constructor(props) {
		super(props);
		let { pageCurr, groupCount, pageCount } = this.props.config;
		this.state = {
			pageCurr: pageCurr || 1,
			startPage: 1,
			groupCount: 7,
			pageCount: pageCount || 30
		};
	}
	
	componentDidMount() {
		this.setState(
			{
				pageCountEle: document.querySelector("#pageCount"),
			}
		);
		setTimeout(()=>{
			document.addEventListener(
				"click",
				(e) => {
					if (e.target.id !== "pageCount") {
						this.state.pageCountEle.parentNode.className = 'hide';
					}
				},
				false
			);
		}, 0)
	}

	go(pageCurr, reset = false) {
		const { totalPage, paging } = this.props.config;
		const { groupCount } = this.state;

		if (totalPage - pageCurr < 2) {
			let newStartPage;
			if ( totalPage <= 2 * groupCount) {
				newStartPage = groupCount + 1;
			} else {
				newStartPage = Math.floor(totalPage / groupCount) * groupCount;
			}
			this.setState(
				{
					startPage:newStartPage
				}
			);
        }

		if (!(pageCurr % groupCount)) {
			this.setState(
				{
					startPage: (pageCurr <= groupCount) ? 1:pageCurr - groupCount + 1
				}
			);
		}
		
		if (reset === true) {
			this.setState(
				{
					pageCurr:1,
					startPage:1,
				}
			);
		} else {
			this.setState(
				{
					pageCurr
				}
			);
        }

		setTimeout(()=>{
			paging(
				{
					pageCount: this.state.pageCount,
					pageCurr: this.state.pageCurr
				}
			);
		}, 0);
	}
	
	goPrev() {
		let { pageCurr, startPage, groupCount } = this.state;
		const tmp = Number(pageCurr) - 1;
		if ( tmp <= 0 )
			return;
		if ( !( tmp % groupCount ) ) {
			this.setState(
				{
					startPage:pageCurr - groupCount
				}
			);
		}
		
		this.setState(
			{
				pageCurr: tmp
			}
		);
		
		this.go(tmp);
	}

	goNext() {
		const { totalPage } = this.props.config;
		let { pageCurr, startPage, groupCount } = this.state;
		
		const tmp = Number(pageCurr) + 1;
		if ( tmp > totalPage)
			return;

		if ( !( pageCurr % groupCount ) && totalPage - pageCurr > 2 ) {
			this.setState(
				{
					startPage: tmp
				}
			);
		}

		this.setState({
			pageCurr:tmp,
		});

		this.go(tmp);
	}

	create() {
		const { totalPage } = this.props.config;
		let { startPage, groupCount } = this.state;
		let pages = [];
		if ( totalPage <= 10 && totalPage > 1) {
			for (let i = 0;i < totalPage+2;i++) {
				if(i === 0) {
					pages.push(<li className = { this.state.pageCurr === 1? "nomore":"" } key={i} onClick = { this.goPrev.bind(this) }>Prev</li>);
					continue;
				}
				if (i === totalPage + 1) {
					pages.push(<li className = { this.state.pageCurr === totalPage? "nomore":"" } key={i} onClick = { this.goNext.bind(this) }>Next</li>);
					continue;
				}
				pages.push(<li className = { this.state.pageCurr === i? "active":""} key={i} onClick = { this.go.bind(this,i) }>{i}</li>);
			}
		}

		if ( totalPage > 10 ) {
			pages.push(<li className = { this.state.pageCurr === 1? "nomore":"" } key={ 0 } onClick = { this.goPrev.bind(this) }>Prev</li>);
			for (let i = startPage;i < startPage + groupCount;i ++) {
				if (i <= totalPage - 2)
					pages.push(<li className = { this.state.pageCurr === i? "active":""} key={i} onClick = { this.go.bind(this,i) }>{i}</li>);
			}
			
			if (totalPage - startPage >= 9) {
				pages.push(<li className = "ellipsis" key={ -1 }>···</li>);
			}
			
			pages.push(<li className = { this.state.pageCurr === totalPage -1 ? "active":""} key={ totalPage - 1 } onClick = { this.go.bind(this,totalPage - 1) }>{ totalPage -1 }</li>);
			pages.push(<li className = { this.state.pageCurr === totalPage ? "active":""} key={ totalPage } onClick = { this.go.bind(this,totalPage) }>{ totalPage }</li>);
			
			pages.push(<li className = { this.state.pageCurr === totalPage ? "nomore":"" } key={ totalPage + 1 } onClick = { this.goNext.bind(this) }>Next</li>);
			
		}
		return pages;
	}
	
	choosePageCount(e) {
		const { pading } = this.props.config;
		const parentUI = this.state.pageCountEle.parentNode;
		parentUI.className = (parentUI.className === "hide")?"":"hide";
	}
	
	confirmPageCount(pageCount) {
		const { pageCountEle, pageCurr } = this.state;
		this.setState(
			{
				pageCount
			}
		);
		localStorage.setItem('pageCountForTalk', pageCount);
		pageCountEle.innerHTML = pageCount;
		pageCountEle.parentNode.className = "hide";
		setTimeout(()=>{
			this.go(pageCurr, true);
		}, 0);
	}

	render() {
		let pages = this.create.bind(this)();
		return (
			<div className = "pagination" >
				<div className = "bar" >
					<span>Items Per Page</span>
					<div className = "select">
						<ul className = "hide">
							<li id="pageCount" onClick = { this.choosePageCount.bind(this) }>{this.state.pageCount}</li>
							<li onClick = { this.confirmPageCount.bind(this, 10) }>10</li>
							<li onClick = { this.confirmPageCount.bind(this, 20) }>20</li>
							<li onClick = { this.confirmPageCount.bind(this, 30) }>30</li>
							<li onClick = { this.confirmPageCount.bind(this, 50) }>50</li>
						</ul>
					</div>
				</div>
				<ul className = "page">
					{ pages }
				</ul>
			</div>
		);
	}
}

export default Pagination;