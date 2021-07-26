$(function(w){

    const populateWordLists = function(){

        const success = function(d){
            const formalMaleWordList = $("#maleFormalWordList");
            const formalFemaleWordList = $("#femaleFormalWordList");
            const formalDict = d["formalDict"];


            // place items in the formal word lists.
            var formalKey;
            var newListItem;
            for(formalKey in formalDict){
                newListItem = $("<li></li>");
                newListItem.text(formalKey);
                // console.log("formal word: " + formalKey + " value: " + formalDict[formalKey]);
                if(formalDict[formalKey] >= 0){
                    formalMaleWordList.append(newListItem);
                }
                else{
                    formalFemaleWordList.append(newListItem);
                }
            }


            // place items in the informal word lists.
            var informalKey;
            var newListItem;
            const informalDict = d["informalDict"];
            const informalMaleWordList = $("#maleInformalWordList");
            const informalFemaleWordList = $("#femaleInformalWordList");

            for(informalKey in informalDict){
                newListItem = $("<li></li>");
                newListItem.text(informalKey);

                if(informalDict[informalKey] >= 0){
                    informalMaleWordList.append(newListItem);
                }
                else{
                    informalFemaleWordList.append(newListItem);
                }
            }

        };

        const url = "/wordlists"
        const promise = $.ajax(url);
        promise.then(success);

    };

    populateWordLists();



    const refreshScore = function(){
        const jsonData = {
            "textToAnalyze": $("#inputText").val()
        };

        const success = function(d){
            let maleFormalScore = d["male_formal"];
            let femaleFormalScore = d["female_formal"];
            let maleInformalScore = d["male_informal"];
            let femaleInformalScore = d["female_informal"];
            let wordCount = d["word_count"];

            $("#maleFormalScore").text(maleFormalScore);
            $("#femaleFormalScore").text(femaleFormalScore);
            $("#maleInformalScore").text(maleInformalScore);
            $("#femaleInformalScore").text(femaleInformalScore);
            $("#wordCount").text(wordCount);

            // score
            let informalDifference = maleInformalScore - femaleInformalScore;
            let formalDifference = maleFormalScore - femaleFormalScore;
            $("#informalDifference").text(informalDifference);
            $("#formalDifference").text(formalDifference);
            if(informalDifference <= 0){
                $("#informalVerdict").text("Female");
            }
            else{
                $("#informalVerdict").text("Male");
            }

            if(formalDifference <= 0){
                $("#formalVerdict").text("Female");
            }
            else{
                $("#formalVerdict").text("Male");
            }
        };

        const failure = function(msg){
            console.log("Something went wrong with the /genderwriting request.");
            console.log(msg);
        };

        const requestOb = {
            url: "/genderwriting",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(jsonData)
        };
        const promise = $.ajax(requestOb);
        promise.then(success, failure);
    };

    w.setInterval(refreshScore, 3000);
}(window));