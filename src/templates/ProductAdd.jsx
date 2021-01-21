import React, {useState, useCallback} from 'react';
import {PrimaryButton, SelectBox,TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import ImageArea from "../components/Products/ImageArea"


const ProductAdd = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    // [categories, setCategories] = useState([]),
    [images, setImages] = useState([]),
    [mission, setMission] = useState(""),
    [memo, setMemo] = useState(""),
    [tags, setTags] = useState("");


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
                    onClick={() => dispatch(saveProduct(title, description, category, tags, mission, memo, images))}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductAdd;
