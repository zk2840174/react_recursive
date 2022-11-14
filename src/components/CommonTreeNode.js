import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";


const getChildNode = async (upperDeptNo, depth) => {

    const res = await axios.get(`http://192.168.0.162:8080/api/dept2/list/${upperDeptNo}/${depth}`)

    return res.data
}

function CommonTreeNode({arr,changeTarget}) {

    const [subArr, setSubArr] = useState([])

    const buttonRef = useRef()

    const [icon, setIcon] = useState('+')

    const clickButton = (upperDeptNo, depth) => {

        if(icon === '-'){
            setSubArr([])
            setIcon('+')
        }else if (icon ==='+'){
            clickMore(upperDeptNo,depth)
        }
    }

    useEffect(() => {

        console.log("useEffect......")

        const button = buttonRef.current

        if(button){
            button.click()
        }

    },[])


    const clickMore = (upperDeptNo, depth) => {

        console.log("click more")

        getChildNode(upperDeptNo,depth).then(result => {

            //console.log(result)
            setSubArr(result)
            setIcon("-")
        })
    }



    if(!arr){
        return (<></>)
    }

    return (
        <ul>
            {arr.map(dept =>
            <li key={dept.deptNo}>
                <div> <button ref={buttonRef} onClick={()=> clickButton(dept.deptNo, dept.depth+1)}>{icon}</button> <span onClick={()=>changeTarget(dept.deptNo)}>{dept.deptNo} -- {dept.dname}</span></div>

                {subArr? subArr.map(dept => <CommonTreeNode key={dept.deptNo} arr={[dept]} changeTarget={changeTarget}></CommonTreeNode> ):<></> }

            </li>
            )}

        </ul>
    )

}

export default CommonTreeNode;