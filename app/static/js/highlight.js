let isHighlight = true;

function cancelBtnHandler() {
    cancelHighlighting();
    document.getElementById("text-content").removeEventListener("click", fillInWord, false);
    document.getElementById("text-content").removeEventListener("touchstart", fillInWord, false);
    document.getElementById("text-content").addEventListener("click", fillInWord2, false);
    document.getElementById("text-content").addEventListener("touchstart", fillInWord2, false);
}

function showBtnHandler() {
    document.getElementById("text-content").removeEventListener("click", fillInWord2, false);
    document.getElementById("text-content").removeEventListener("touchstart", fillInWord2, false);
    document.getElementById("text-content").addEventListener("click", fillInWord, false);
    document.getElementById("text-content").addEventListener("touchstart", fillInWord, false);
    highLight();
}

function getWord() {
    return window.getSelection ? window.getSelection() : document.selection.createRange().text;
}

function highLight() {
    if (!isHighlight) return;
    let articleContent = document.getElementById("article").innerText;
    let pickedWords = document.getElementById("selected-words");  // words picked to the text area
    let dictionaryWords = document.getElementById("selected-words2"); // words appearing in the user's new words list
    let allWords = pickedWords.value + " " + dictionaryWords.value;
    const list = allWords.split(" ");
    for (let i = 0; i < list.length; ++i) {
        list[i] = list[i].replace(/(^\s*)|(\s*$)/g, ""); //消除单词两边的空字符
        list[i] = list[i].replace('|', "");
        list[i] = list[i].replace('?', "");
        if (list[i] !== "" && "<mark>".indexOf(list[i]) === -1 && "</mark>".indexOf(list[i]) === -1) {
	    //将文章中所有出现该单词word的地方改为：" <mark>" + word + "<mark> "。 正则表达式RegExp()中，"\\s"代表单词前后必须要有空格，以防止只对单词中的部分字符高亮的情况出现。
            articleContent = articleContent.replace(new RegExp("\\s"+list[i]+"\\s", "g"), " <mark>" + list[i] + "</mark> ");
        }
    }
    document.getElementById("article").innerHTML = articleContent;
}

function cancelHighlighting() {
    let articleContent = document.getElementById("article").innerText;
    let pickedWords = document.getElementById("selected-words");
    const dictionaryWords = document.getElementById("selected-words2");    
    const list = pickedWords.value.split(" ");    
    if (pickedWords != null) {
        for (let i = 0; i < list.length; ++i) {
            list[i] = list[i].replace(/(^\s*)|(\s*$)/g, "");
            if (list[i] !== "") {
                articleContent = articleContent.replace("<mark>" + list[i] + "</mark>", "list[i]");
            }
        }
    }
    if (dictionaryWords != null) {
        let list2 = pickedWords.value.split(" ");
        for (let i = 0; i < list2.length; ++i) {
            list2 = dictionaryWords.value.split(" ");
            list2[i] = list2[i].replace(/(^\s*)|(\s*$)/g, "");
            if (list2[i] !== "") {
                articleContent = articleContent.replace("<mark>" + list[i] + "</mark>", "list[i]");
            }
        }
    }
    document.getElementById("article").innerHTML = articleContent;
}

function fillInWord() {
    highLight();
}

function fillInWord2() {
    cancelHighlighting();
}

function toggleHighlighting() {
    if (isHighlight) {
        isHighlight = false;
        cancelHighlighting();
    } else {
        isHighlight = true;
        highLight();
    }
}

showBtnHandler();
