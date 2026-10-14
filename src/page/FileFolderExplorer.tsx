import React, { useState } from 'react';
import filefolderjson from "../json/filefolderData.json";
import { FaPlusCircle } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { FaFolderPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface IJsonData {
  id: number;
  name: string;
  isFolder: boolean;
  children?: IJsonData[]
}

interface IListData {
  nodeList: IJsonData[];
  addNodeToTheList: (parentID: number) => void;
  handleDelete: (deleteID: number) => void;
}

const List: React.FC<IListData> = ({ nodeList, addNodeToTheList, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState<Record<string | number, boolean>>({});

  return <div>
    {
      nodeList?.map((node) => {
        return <div key={node.id}>
          <div className='flex items-center gap-2'>
            {node.children && <span className='cursor-pointer'
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.id]: !prev[node.id],
                }))
              }
            >{isExpanded[node.id] ? <FiMinusCircle /> : <FaPlusCircle />}</span>}
            <span>{node.name}</span>
            <span onClick={() => handleDelete(node.id)}><MdDelete color='red' /></span>
            {node.isFolder && <span onClick={() => addNodeToTheList(node.id)}><FaFolderPlus /></span>}
          </div>
          {isExpanded[node.id] && <span className='pl-5! block'>
            {node.children && <List nodeList={node.children} addNodeToTheList={addNodeToTheList} handleDelete={handleDelete} />}
          </span>}
        </div>
      })
    }
  </div>
}

const FileFolderExplorer = () => {
  const [data, setData] = useState<IJsonData[]>(filefolderjson);

  const addNodeToTheList = (parentID: number) => {

    const name = prompt("Enter file or folder name:");
    if (!name?.trim()) return;

    const type = prompt("Enter type: file or folder");
    if (!type) return;

    const isFolder = type.toLowerCase() === "folder";

    const newNode: IJsonData = {
      id: Date.now(),
      name: name.trim(),
      isFolder,
      children: [],
    };

    const updateNodeList = (list: IJsonData[]): IJsonData[] => {
      return list?.map((node: IJsonData) => {
        if (node.id === parentID) {
          return {
            ...node,
            children: [
              ...(node?.children ?? []),
              {...newNode}
            ]
          }
        }

        if (node.children) {
          return { ...node, children: updateNodeList(node.children) }
        }
        return node;
      })
    }

    setData(prev => updateNodeList(prev))
  }

  const handleDelete = (id: number) => {

    const deleteNode = (list: IJsonData[]): IJsonData[] => {
      return list.filter((val) => val.id !== id).map((childval) => ({
        ...childval,
        children: childval.children ? deleteNode(childval.children) : []
      }))
    }

    setData(prev => deleteNode(prev))
  }

  return (
    <div>
      <h1>FileFolderExplorer</h1>
      <List nodeList={data} addNodeToTheList={addNodeToTheList} handleDelete={handleDelete} />
    </div>
  )
}

export default FileFolderExplorer