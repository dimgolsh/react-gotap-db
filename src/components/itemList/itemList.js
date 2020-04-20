import React, { useState, useEffect } from "react";
import "./itemList.css";
import Spinner from "../spinner";
function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, updateList] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      updateList(data);
    });
  },[]);

  function renderItems(arr) {
    return arr.map((item, i) => {
      const { id } = item;
      const { label } = renderItem(item);

      return (
        <li
          key={i}
          className="list-group-item"
          data-key={item.url}
          onClick={() => onItemSelected(item.url)}
        >
          {renderItem(item)}
        </li>
      );
    });
  }

  if (!itemList) {
    return <Spinner />;
  }

  const items = renderItems(itemList);

  return <ul className="item-list list-group">{items}</ul>;
}

export default ItemList;
