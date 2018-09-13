var friendsData = require("../data/friends");

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    })

    app.post("/api/friends", function(req, res){
        var bestFriend, compatability;
        friendsData.forEach(function(friend){
            if(!bestFriend){
                bestFriend = friend.name;
                compatability = compareScores(req.body.scores, friend.scores);
            }
            var checkComp = compareScores(req.body.scores, friend.scores);
            if(checkComp > compatability){
                bestFriend = friend.name;
                compatability = checkComp;
            }
        })
        friendsData.push(req.body);
        res.json(bestFriend);
    })

    function compareScores(user, friend){
        var diff = 0;
        for(var i = 0; i < user.length; i++){
            diff += Math.abs(user[i] - friend[i]);
        }
        return diff;
    }

}