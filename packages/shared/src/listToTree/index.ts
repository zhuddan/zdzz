export function listToTree<T>(
  data: TreeItem<T>[],
  options?: Partial<{
    id: string;
    parentId: string;
    children: string;
    withLevel: boolean;
  }>,
): TreeList<T> {
  const ID_KEY = options?.id || 'id';
  const PARENT_ID_KEY = options?.parentId || 'parentId';
  const CHILDREN_KEY = options?.children || 'children';

  const childrenListMap = {};
  const nodeIds = {};
  const tree: TreeList<T> = [];

  for (const d of data) {
    const parentId = d[PARENT_ID_KEY];
    if (childrenListMap[parentId] == null)
      childrenListMap[parentId] = [];

    nodeIds[d[ID_KEY]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[PARENT_ID_KEY];
    if (nodeIds[parentId] == null)
      tree.push(d);
  }

  for (const t of tree)
    adaptToChildrenList(t);

  function adaptToChildrenList(o: T) {
    if (childrenListMap[o[ID_KEY]]) {
      const key = CHILDREN_KEY;
      o[key] = childrenListMap[o[ID_KEY]];
    }
    if (o[CHILDREN_KEY]) {
      for (const c of o[CHILDREN_KEY])
        adaptToChildrenList(c);
    }
  }
  return options?.withLevel ? setTreeLevel(tree) : tree;
}

export function setTreeLevel<T>(tree: TreeList<T>, level = 0) {
  const result: TreeList<T> = [];
  tree.forEach((e) => {
    result.push({
      ...e,
      level,
      children: e.children ? setTreeLevel(e.children, level + 1) : undefined,
    });
  });
  return result;
}
