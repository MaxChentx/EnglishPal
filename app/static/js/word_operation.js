function familiar(theWord) {
    let username = $("#username").text();
    let word = $("#word_" + theWord).text();
    let freq = $("#freq_" + theWord).text();
    $.ajax({
        type:"GET",
        url:"/" + username + "/" + word + "/familiar",
        success:function(response){
            let new_freq = freq - 1;
            if(new_freq <1) {
                $("#p_" + theWord).remove();
            } else {
                $("#freq_" + theWord).text(new_freq);
            }
        }
    });
}

function unfamiliar(theWord) {
    let username = $("#username").text();
    let word = $("#word_" + theWord).text();
    let freq = $("#freq_" + theWord).text();
    $.ajax({
        type:"GET",
        url:"/" + username + "/" + word + "/unfamiliar",
        success:function(response){
            let new_freq = parseInt(freq) + 1;
            $("#freq_" + theWord).text(new_freq);
        }
    });
}

function delete_word(theWord) {
    let username = $("#username").text();
    let word = $("#word_" + theWord).text();
    $.ajax({
        type:"GET",
        url:"/" + username + "/" + word + "/del",
        success:function(response){
            $("#p_" + theWord).remove();
        }
    });
}
