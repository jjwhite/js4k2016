var sack;
document.addEventListener("DOMContentLoaded", function (event) {
    var g = new game(home, away);    

    $('#button')[0].addEventListener('click', function () {
        g.point();

    }, false);

    sack = $('#sack')[0];
});

function game(t1, t2) {
    t = this;
    t.ht = t1;
    t.at = t2;
    t.hs = 0;
    t.as = 0;
    t.hg = 0;
    t.ag = 0;
    t.hset = 0;
    t.aset = 0;
    $('#hp')[0].textContent = t.ht.p1 + '/' + t.ht.p2;
    $('#ap')[0].innerHTML += t.at.p1 + '/' + t.at.p2;
}

game.prototype.point = function () {
    t = this;
    var winner = (Math.random() >= 0.5) ? "h" : "a";
    var wa = (winner == "h") ? t.setScore(t.hs, t.as) : t.setScore(t.as, t.hs);
    switch (winner) {
        case "h":
            if (wa[0] == "w") {
                t.hg++;
                t.hasWinner('#hg', t.hg);
                t.hset++
                return;
            }
            t.hs = wa[0];
            t.as = wa[1];
            break;
        case "a":
            if (wa[0] == "w") {
                t.ag++;
                t.hasWinner('#ag', t.ag);
                t.aset++;
                return;
            }
            t.as = wa[0];
            t.hs = wa[1];
            break;
    }

    //winner found now determine a summary
    t.getSummary(winner);
    $('#hpt')[0].textContent = this.hs;
    $('#apt')[0].textContent = this.as;
    //setTimeout(function () { t.point(); }, 1000);
}

game.prototype.setScore = function (w, l) {
    t = this;
    var r = [w, l];

    if (w == "a") {
        r[0] = "w"
    }
    else if (w == 40 && l < 40) {
        r[0] = "w"
    }
    else if (w == "d") {
        r[0] = "a";
        r[1] = "na";
    }
    else if (w == "na") {
        r[0] = "d";
        r[1] = "d";
    }
    else if (w < 40) {
        r[0] = this.doScore(w);
        if (r[0] == 40 && l == 40) {
            r[0] = "d";
            r[1] = "d";
        }
    }
    return r;
}

game.prototype.doScore = function (curScore) {
    return (curScore < 30) ? curScore + 15 : curScore + 10;
}

game.prototype.hasWinner = function (w, v) {
    $(w)[0].textContent = v;
    if (v < 4) {
        this.rGame();
        //this.point();
    }
}

game.prototype.updateSB = function () {

}

game.prototype.rGame = function () {
    this.as = 0;
    this.hs = 0;
}

game.prototype.getSummary = function (w) {
    var wteam = (w == "h") ? this.ht : this.at;
    var lteam = (w == "h") ? this.at : this.ht;

    var ix = '#s' + getResult(4);
    var s = $(ix)[0].dataset.value;
    //string, point winner, person who failed, team who won
    var sum = buildSummary(s, wteam.p1, lteam.p1, wteam.p1+"/"+wteam.p2, verbGenerator());
    $('#summary')[0].innerHTML += ('<div class="summary-line">' + sum + '</div>')
    //sack.className = "";
    //sack.className = "serve-left-ace";
}





//utilities
function $(s) { return document.querySelectorAll(s); }

function verbGenerator() {return verbs[getResult(verbs.length) - 1];}

function getResult(max) {
    return Math.floor(Math.random() * max) + 1
}

function buildSummary(s, p1, p2, t, v) {
    return s.replace("{p1}", p1)
  	.replace("{p2}", p2)
    .replace("{t}", t)
    .replace("{v}", v);
}

//Data
var verbs = ['McNugget', 'Melvin', 'Sparkle Motion', 'Tricky Doodle', 'Taint Tickler', 'Gate Storm'];

var jon = {
    serve: 9,
    ret: 5,
    def: 5,
    off: 7
};

var eric = {
    serve: 7,
    ret: 7,
    def: 6,
    off: 7
};

var sam = {
    serve: 7,
    ret: 5,
    def: 9,
    off: 7
};

var deuce = {
    serve: 7,
    ret: 5,
    off: 8,
    def: 7
};

var home = {
    p1: "jon",
    p2: "eric"
};

var away = {
    p1: "sam",
    p2: "deuce"
}
