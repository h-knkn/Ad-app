import React , {useEffect} from 'react';
import styled , { css } from 'styled-components';
import {push} from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {deleteProduct} from "../../reducks/products/operations";
import {getUserRole} from "../../reducks/users/selectors";
import NoImage from '../../assets/img/src/no-image.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(100% / 4)',
        }
    },
    content: {
        display: 'flex',
        padding: '16 8',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    icon: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    category: {
        fontSize: 14,
        fontWeight: "bold"
    },

    productTitle: {
        boxOrient: 'vertical',
        display: '-webkit-box',
        fontSize: 16,
        lineHeight: '18px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 36,
            lineClamp: 2,
        },
        [theme.breakpoints.up('md')]: {
            height: 18,
            lineClamp: 1,
        }
    }
}));


const ProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // カテゴリー名を色分けする
    useEffect(() => {

    if(props.category === "youtube"){
        document.getElementById('category').classList.add("youtube");
    }
    if(props.category === "blog"){
        document.getElementById('category').classList.add("blog");
    }
    if(props.category === "instagram"){
        document.getElementById('category').classList.add("instagram");
    }
    if(props.category === "twitter"){
        document.getElementById('category').classList.add("twitter");
    }
    }, []);


     const images = (props.images.length > 0) ? props.images : [NoImage]
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={images[0].path}
                onClick={() => dispatch(push('/product/'+props.id))}
            />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/'+props.id))}>
                <Typography id="category"　className={classes.category} component="p">
                    {props.category}
                </Typography>
                <Typography className={classes.productTitle} component="p">
                    {props.title}
                </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard


const STitle = styled.p`
  margin: 30px 0;
`;

