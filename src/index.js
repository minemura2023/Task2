import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得
  const inputText = document.getElementById("add-text").value;

  if (inputText == "") {
    alert("文字を入力してください");
    return;
  }

  document.getElementById("add-text").value = "";

  addFromIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加
const addFromIncompleteList = (text) => {
  //liタグ生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p生成
  const p = document.createElement("p");
  p.innerText = text;

  //button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押下された完了ボタンの親タグを未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode.parentNode);

    //未完了リストから完了リストへ
    const addTarget = completeButton.parentNode;
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "list-row";
    const p = document.createElement("p");
    p.innerText = text;
    //buttonタグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    //戻すボタンのイベント付与
    backButton.addEventListener("click", () => {
      //押下された戻すボタンの親タグを完了リストから削除
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;

      addFromIncompleteList(text);
    });

    //divタグに要素を追加
    div.appendChild(p);
    div.appendChild(backButton);
    //liタグにdivタグを追加
    li.appendChild(div);
    //uiタグにliタグを追加
    document.getElementById("complete-list").appendChild(li);
  });

  //button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押下された削除ボタンの親タグを未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  //divタグにpタグを追加
  div.appendChild(p);
  //divタグに完了ボタンを追加
  div.appendChild(completeButton);
  //divタグに削除ボタンを追加
  div.appendChild(deleteButton);

  //liタグにdivタグを追加
  li.appendChild(div);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
