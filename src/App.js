import React, { useState } from 'react';
import TagView from './components/List';

const initialTree = {
   name: 'root',
  children: [
    {
      name:  'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

const App = () => {
  const [tree, setTree] = useState(initialTree);
  const [exportedTree, setExportedTree] = useState('');

  const handleAddChild = (parentTag) => {
    const newChild = { name: 'New Child', data: 'Data' };
    if (!parentTag.children) {
      parentTag.children = [];
    }
    parentTag.children.push(newChild);
    setTree({ ...tree });
  };

  const handleUpdateTag = (tagToUpdate, newData) => {
    const updatedTree = updateTagInTree(tree, tagToUpdate, newData);
    setTree(updatedTree);
  };

  const updateTagInTree = (root, tagToUpdate, newData) => {
    if (root === tagToUpdate) {
      return { ...root, ...newData };
    }

    if (root.children) {
      const updatedChildren = root.children.map((child) => updateTagInTree(child, tagToUpdate, newData));
      return { ...root, children: updatedChildren };
    }

    return root;
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTree = deleteTagFromTree(tree, tagToDelete);
    setTree(updatedTree);
  };

  const deleteTagFromTree = (root, tagToDelete) => {
    if (root.children) {
      const updatedChildren = root.children.filter((child) => child !== tagToDelete);
      return { ...root, children: updatedChildren };
    }

    return root;
  };

  const handleExport = () => {
    const exportedTree = JSON.stringify(tree, ['name', 'children', 'data']);
    setExportedTree(exportedTree);
  };

  return (
    <div className="App">
      <h1 style={{justifyItems:"center",justifyContent:"center",display:"flex",color:"Highlight"}}>Tag Trees</h1>
      <div style={{marginBottom:"12px",padding:"56px"}}>
      <TagView className="tag-content" style={{margin:"10px"}} tag={tree} onAddChild={handleAddChild} onUpdateTag={handleUpdateTag} onDelete={handleDeleteTag} />
      <button  style={{margin:"14px",backgroundColor:"blue",color:"white",borderRadius:"9px"}}onClick={handleExport}>Export</button>
      {exportedTree && <pre>{exportedTree}</pre>}
      </div>
    </div>
  );
};

export default App;