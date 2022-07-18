function familiar(index) {
    let username = $("#username").text();
    let word = $("#word_" + index).text();
    let freq = $("#freq_" + index).text();
    $.ajax({
        type:"GET",
        url:"/" + username + "/" + word + "/familiar",
        success:function(response){
            let new_freq = freq - 1;
            if(new_freq <1) {
                $("#p_" + index).remove();
            } else {
                $("#freq_" + index).text(new_freq);
            }
        }
    });
}

function unfamiliar(index) {
    let username = $("#username").text();
    let word = $("#word_" + index).text();
    let freq = $("#freq_" + index).text();
    $.ajax({
        type:"GET",
        url:"/" + username + "/" + word + "/unfamiliar",
        success:function(response){
            let new_freq = parseInt(freq) + 1;
            $("#freq_" + index).text(new_freq);
        }
    });
}

function delete_word(index) {
    let username = $("#username").text();
    let word = $("#word_" + index).text();
    $.ajax({
        type:"GET",
        url:"/" + username + "/" + word + "/del",
        success:function(response){
            $("#p_" + index).remove();
        }
    });
}
