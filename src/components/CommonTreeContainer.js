import React, {useEffect, useState} from 'react';
import CommonTreeNode from "./CommonTreeNode";
import axios from "axios";

const getChildNode = async (upperDeptNo, depth) => {

    const res = await axios.get(`http://192.168.0.162:8080/api/dept2/list/${upperDeptNo}/${depth}`)

    return res.data
}

function CommonTreeContainer({deptNo = 1, depth = 0}) {

    const [arr, setArr] = useState([])

    const [target, setTarget] = useState(0)

    const changeTarget = (target) => {

        setTarget(target)

        console.log("target", target)
    }


    useEffect(() => {

        getChildNode(deptNo,depth).then(arr => {
            //console.log(arr)
            setArr(arr)
        })

    },[deptNo,depth])



    return (
        <div>
            <h1>Common Tree Container</h1>

            <CommonTreeNode arr={arr} changeTarget={changeTarget} ></CommonTreeNode>
        </div>
    );
}

export default CommonTreeContainer;