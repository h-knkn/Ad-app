import React, {useState, useCallback, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

import {db} from '../firebase/index'
import {PrimaryButton, SelectBox,TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import {ImageArea} from "../components/Products";



const ProductEdit = () => {

    const dispatch = useDispatch();
    let id = window.location.pathname.split('product/edit')[1];

    if(id !== "") {
        id = id.split('/')[1]
        console.log(id);
    }

    const [startDate, setStartDate] = useState(new Date());

    const [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    // [categories, setCategories] = useState([]),
    [images, setImages] = useState([]),
    [mission, setMission] = useState(""),
    [memo, setMemo] = useState(""),
    [tags, setTags] = useState(""),
    [recruitmentNumbers, setRecruitmentNumbers] = useState(0),
    [campaignAddTime, setCampaignAddTime] = useState(""),
    [announceDay, setAnnounceDay] = useState(""),
    [contensAddTime, setContensAddTime] = useState("");


    const inputTitle = useCallback((event) => {
        setTitle(event.target.value)
    }, [setTitle])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputTags = useCallback((event) => {
        setTags(event.target.value)
    }, [setTags])

    const inputMission = useCallback((event) => {
        setMission(event.target.value)
    }, [setMission])

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value)
    }, [setMemo])


    const categories = [
        {id: "youtube", name: "Youtube"},
        {id: "instagram", name: "Instagram"},
        {id: "twitter", name: "Twitter"},
        {id: "Blog", name: "Blog"}
    ];


    useEffect(() => {
       if(id !== ""){
           db.collection('products').doc(id).get()
           .then(snapshot => {
               const data = snapshot.data();
               console.log(data);
               setTitle(data.title);
               setDescription(data.description);
               setCategory(data.category);
               setImages(data.images);
               setMission(data.mission);
               setMemo(data.memo);
               setTags(data.tags);
           })
       }
    }, [id])





    return(
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages}/>
                <TextInput
                    fullWidth={true} label={"タイトル"} multiline={false} required={true}
                    onChange={inputTitle} rows={1} value={title} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"概要"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                />
                <SelectBox
                   label={"カテゴリー"} required={true}　options={categories} select={setCategory} value={category} 
                />
                <SMargin>
                    <SText>キャンペーン結果発表</SText>
                {/* <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    value={startDate}
                    onChange={date => setStartDate(date)}
                /> */}
                </SMargin>
                <TextInput
                    fullWidth={true} label={"ハッシュタグ"} multiline={true} required={false}
                    onChange={inputTags} rows={1} value={tags} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"ミッション"} multiline={true} required={true}
                    onChange={inputMission} rows={5} value={mission} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"その他"} multiline={true} required={true}
                    onChange={inputMemo} rows={5} value={memo} type={"text"}
                />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                    label={"保存する"}
                    onClick={() => dispatch(saveProduct(id, title, description, category, tags, mission, memo, images))}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductEdit;


const SMargin = styled.div`
  margin: 30px 0;
`;

const SText = styled.p`
  margin-bottom: 7px;
`;
