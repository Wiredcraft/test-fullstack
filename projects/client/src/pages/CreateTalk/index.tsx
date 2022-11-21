import * as React from "react";
import "./index.css";
import { Input } from "@/components/";
import api from "@/utils/api/api";
import { TalkType } from "@/type/type";
import { useNavigate  } from "react-router-dom";

const { useState, useCallback, useMemo } = React;

type IFormData = Pick<TalkType, "author" | "title" | "content">;

type FieldType = keyof  IFormData; 


export default function CreateTalk() {
  const navigate = useNavigate();

  // form logic
  const [data, setData] = useState<IFormData>({
    author: "",
    content: "",
    title: "",
  });

  const handleChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setData({
      ...data,
      [field]: e.target.value,
    });
  }, [data]);

  const [loading, setLoading] = useState(false);

  const btnDisabled = useMemo(()=>Object.keys(data).some((key)=> !data[key as FieldType]) || loading ,[data, loading]);


  // submit logic
  const handleSubmit = async ()=>{
    setLoading(true);
    await api.post('/talk', data)
    setLoading(false);
    navigate("/?type=Newest")

  }

  return (
    <div className="create-talk-form"  data-testid="create-talk-form">
      <Input type="input" label="Author" value={data.author} onChange={handleChange("author")} isRequired />
      <Input type="input" label="Title" value={data.title} onChange={handleChange("title")} isRequired />
      <Input type="textarea" label="Talks Content" value={data.content} onChange={handleChange("content")} isRequired />
      <button type="button" disabled={btnDisabled} onClick={handleSubmit}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
