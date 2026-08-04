import { useState, type Dispatch, type SetStateAction } from "react";
import dataJson from "../json/nestedCheckData.json";
interface IDataNode {
    id: number;
    label: string;
    children?: IDataNode[];
}

interface CheckBoxesProps {
    data: IDataNode[];
    checked: Record<number, boolean>;
    setChecked: Dispatch<SetStateAction<Record<number, boolean>>>
}

const updatedChecked = (node: IDataNode, isChecked: boolean, newState: Record<number, boolean>) => {
    if (node.children) {
        node.children?.forEach(child => {
            newState[child.id] = isChecked
            { child.children && updatedChecked(child, isChecked, newState) }
        }
        )
    }
}

const verifyCheck = (node: IDataNode,newState: Record<number, boolean>): boolean => {
    if(!node.children) return newState[node.id] || false;
    const allChildChecked = node.children.every(el => verifyCheck(el,newState))
    newState[node.id] = allChildChecked
    return allChildChecked
}

const handleChange = (isChecked: boolean, node: IDataNode, setChecked: Dispatch<SetStateAction<Record<number, boolean>>>) => {
    setChecked(prev => {
        const newState = { ...prev, [node.id]: isChecked }
        updatedChecked(node, isChecked, newState);
        dataJson.forEach(parent => verifyCheck(parent,newState))
        return newState;
    })
}

const CheckBoxes = ({ data, checked, setChecked }: CheckBoxesProps) => {
    return <div>
        {
            data?.map((node) => {
                return <div key={node.id} style={{ paddingLeft: "20px" }}>
                    <input type="checkbox" checked={checked[node.id] || false}
                        onChange={e => handleChange(e.target.checked, node, setChecked)} />
                    <span>{node.label}</span>
                    {node.children && <CheckBoxes data={node?.children} checked={checked} setChecked={setChecked} />}
                </div>
            })
        }
    </div>
}

const NestedCheckBox = () => {
    const [checked, setChecked] = useState<Record<number, boolean>>({});
    console.log(checked)

    return (
        <div>
            <h1>Nested Checkbox</h1>
            <CheckBoxes data={dataJson} checked={checked} setChecked={setChecked} />
        </div>
    )
}
export default NestedCheckBox