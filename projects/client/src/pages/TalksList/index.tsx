import * as React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Tag } from "@/components";

import "./index.css";
import api from "@/utils/api/api";
import TalkListItem from "./TalksListItem"
import { TalkType } from "@/type/type";

const { useState, useEffect, useCallback } = React;

const sortLabel=[
  {
    label: "Hotest",
    orderBy: 'poll',
    order: 'ASC'
  },
  {
    label: "Newest",
    orderBy: 'date_created',
    order: 'DESC'
  },
  {
    label: "Lastest",
    orderBy: 'date_created',
    order: 'DESC'
  },
  
]


export default function TalksList() {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState<TalkType[]>([]);
  const [sortType, setSortType] = useState("Hotest");

  const fetchList = useCallback(()=>{
    const sortObj=  sortLabel.find((el)=>el.label === sortType)
    const {orderBy, order} = sortObj
    api.get('/talks',{
      params: {
        orderBy,
        order
      }
    }).then(({data }: {data: TalkType[]})=>{
      setList(data)
    })
  },[sortType])

  useEffect(()=>{
    if(searchParams.get("type")  === "Newest" ) {
      setSortType("Newest")
      setSearchParams({});
    }
    fetchList();
  },[fetchList, searchParams, setSearchParams])

  const handleTagClick =  useCallback(({label}) => ()=>{
    setSortType(label);
    fetchList();
  }, [setSortType, fetchList]);

  const handleAddPoll = useCallback((id:number, polled_by_me:boolean) => async ()=>{
    if(polled_by_me) return 
    const {data} = await api.put(`/talk/${id}/poll`)
    if(data){
      let newList =   list.map((el)=>{
        if(el.id === id) {
          return {
            ...el,
            poll: el.poll+1,
            polled_by_me: true,
          }
        }
          return el;
      })
      if(sortType === "Hotest") {
        newList = newList.sort((a,b)=> b.poll - a.poll)
      }
      setList(newList)
    }
  },[list,setList])


  if(!list.length){
    return (
      <div className="talks-list-wapper">
        <div className="empty-list">
          <h1>There is no talks now.</h1>
          <h1>Go create one first!</h1>
          <Link to="/create">Add Now </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="talks-list-wapper">
      <div>
          <div className="label-wapper">
            {sortLabel.map((el)=>(
              <Tag key={el.label} onClick={handleTagClick(el)} label={el.label} actived={sortType === el.label}/>
            ))}
          </div>
          <div className="talks-list">
            {list.map((data)=>(
              <TalkListItem key={data.id} data={data} onAddPoll={handleAddPoll(data.id , data.polled_by_me)}/>
            ))}
          </div>
      </div>
    </div>
  );
}
