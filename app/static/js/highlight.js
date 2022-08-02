let isHighlight = true;

function cancelBtnHandler() {
    cancel_highLight();
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
    let txt = document.getElementById("article").innerText;
    let sel_word1 = document.getElementById("selected-words");
    let sel_word2 = document.getElementById("selected-words2");
    if (sel_word1 != null) {
        const list = sel_word1.value.split(" ");
        for (let i = 0; i < list.length; ++i) {
            list[i] = list[i].replace(/(^\s*)|(\s*$)/g, ""); //消除字符串两边空字符
            if (list[i] !== "" && "<mark>".indexOf(list[i]) === -1 && "</mark>".indexOf(list[i]) === -1) {
                //将正则表达式进行修改 表示搜索的是两端带有空格的list[i] 那么搜索的便为一个完整单词  然后在mark标签的前后各加了一个空格对其进行替换
                txt = txt.replace(new RegExp("\\s"+list[i]+"\\s", "g"), " <mark>" + list[i] + "</mark> ");
            }
        }
    }
    if (sel_word2 != null) {
        const list2 = sel_word2.value.split(" ");
        for (let i = 0; i < list2.length; ++i) {
            list2[i] = list2[i].replace(/(^\s*)|(\s*$)/g, "");
            if (list2[i] !== "" && "<mark>".indexOf(list2[i]) === -1 && "</mark>".indexOf(list2[i]) === -1) {
                //将正则表达式进行修改 表示搜索的是两端带有空格的list2[i] 那么搜索的便为一个完整单词  然后在mark标签的前后各加了一个空格对其进行替换
                txt = txt.replace(new RegExp("\\s"+list2[i]+"\\s", "g"), " <mark>" + list2[i] + "</mark> ");
            }
        }
    }
    document.getElementById("article").innerHTML = txt;
}

function cancel_highLight() {
    const list = sel_word1.value.split(" ");
    let txt = document.getElementById("article").innerText;
    let sel_word1 = document.getElementById("selected-words");
    const sel_word2 = document.getElementById("selected-words2");
    if (sel_word1 != null) {
        for (let i = 0; i < list.length; ++i) {
            list[i] = list[i].replace(/(^\s*)|(\s*$)/g, "");
            if (list[i] !== "") {
                txt = txt.replace("<mark>" + list[i] + "</mark>", "list[i]");
            }
        }
    }
    if (sel_word2 != null) {
        let list2 = sel_word1.value.split(" ");
        for (let i = 0; i < list2.length; ++i) {
            list2 = sel_word2.value.split(" ");
            list2[i] = list2[i].replace(/(^\s*)|(\s*$)/g, "");
            if (list2[i] !== "") {
                txt = txt.replace("<mark>" + list[i] + "</mark>", "list[i]");
            }
        }
    }
    document.getElementById("article").innerHTML = txt;
}

function fillInWord() {
    highLight();
}

function fillInWord2() {
    cancel_highLight();
}

function ChangeHighlight() {
    if (isHighlight) {
        isHighlight = false;
        cancel_highLight();
    } else {
        isHighlight = true;
        highLight();

    }
}

showBtnHandler();
