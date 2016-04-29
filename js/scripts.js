var sack, summary;
document.addEventListener("DOMContentLoaded", function (event) {
    var g = new game(home, away);    

    $('#button')[0].addEventListener('click', function () {
        g.point();

    }, false);

    sack = $('#sack')[0];
    summary = $('#summary')[0];
    //sack.className = "h-v1";
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
    t.cset = 1;
    t.st = t.ht;
    $('#hp')[0].textContent = t.ht.p1 + '/' + t.ht.p2;
    $('#ap')[0].innerHTML += t.at.p1 + '/' + t.at.p2;
    $('#hp')[0].classList.add("serve");
}

game.prototype.point = function () {
   
    t = this;
    var winner = (Math.random() >= 0.5) ? "h" : "a";
    var wa = (winner == "h") ? t.setScore(t.hs, t.as) : t.setScore(t.as, t.hs);
    switch (winner) {
        case "h":
            if (wa[0] == "w") {
                t.hg++;
                if (t.hg == 4) t.hset++;
                t.hasWinner(t.hg, t.hset);
            } else {
                t.hs = wa[0];
                t.as = wa[1];
            }
            break;
        case "a":
            if (wa[0] == "w") {
                t.ag++;
                if (t.ag == 4) t.aset++;
                t.hasWinner(t.ag, t.aset);

            } else {
                t.as = wa[0];
                t.hs = wa[1];
            }
            break;
    }

    //winner found now determine a summary
    t.getSummary(winner);
    
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

game.prototype.hasWinner = function (v,sets) {
    this.as = 0;
    this.hs = 0;
    t.st = (t.st == t.ht) ? t.at : t.ht;
    
    if (sets == 1 && v == 3) alert("Scary Game");

    if (v == 4) {
        $('#as' + this.cset)[0].textContent = this.ag;
        $('#h' + this.cset)[0].textContent = this.hg;
        this.cset++;
        this.ag = 0;
        this.hg = 0;  
    }
    
    if (sets == 2) { alert("Game Over");}
}

game.prototype.updateSB = function () {
    $('#hg')[0].textContent = this.hg;
    $('#ag')[0].textContent = this.ag;
    $('#hpt')[0].textContent = this.hs;
    $('#apt')[0].textContent = this.as;
    $('#as')[0].textContent = this.aset;
    $('#hs')[0].textContent = this.hset;
    if (t.st == t.ht) {
        $('#ap')[0].classList.remove("serve");
        $('#hp')[0].classList.add("serve");
    } else {
        $('#hp')[0].classList.remove("serve");
        $('#ap')[0].classList.add("serve");
    }
}

game.prototype.getSummary = function (w) {
    var self = this;
    var css, t;
    var wteam = (w == "h") ? this.ht : this.at;
    var lteam = (w == "h") ? this.at : this.ht;
    var n = (wteam == this.st) ? 6 : 5;
    var ix = '#s' + getResult(n);
    var s = $(ix)[0].dataset.value;

    //string, point winner, person who failed, team who won
    var sum = (Math.random() >= 0.5) ? buildSummary(s, wteam.p1, lteam.p1, wteam.p1+"/"+wteam.p2, verbGenerator()) : buildSummary(s, wteam.p2, lteam.p2, wteam.p1+"/"+wteam.p2, verbGenerator()); 
    if (sum.includes("Ace")) { css = w + "-ace"; t = 500; }
    else { css = w + "-v1"; t = 2000;}

    sack.className = css;
    setTimeout(function () {
        if (self.hs == 0 && self.as == 0)
            sum += " - <strong>" + wteam.p1 + "/" + wteam.p2 + " wins!</strong>";
        else if (self.hs == "d")
            sum += " - <strong>Deuce!</strong>";
        else if (self.hs == "a" || self.as == "a")
            sum += "- <strong>Advantage " + wteam.p1 + "/" + wteam.p2;
        else
            sum += " - <strong>" + self.hs + ":" + self.as + "</strong>";
        summary.innerHTML += ('<div class="summary-line blink_me">' + sum + '</div>')
        summary.scrollTop = summary.scrollHeight;
        self.updateSB();
        sack.className = "none";
    }, t);

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

var htanm = [
    {
        css: "h-ace",
        time: 1
    }
]
var atanm = [
    {
        css: "a-ace",
        time: 1
    },
    {
        css: "a-v1",
        time: 2
    }
]

var home = {
    p1: "Jon",
    p2: "Eric"
};

var away = {
    p1: "Sam",
    p2: "Deuce"
}
