/*jshint devel:true */

$( document ).ready(function() {

  var lyricsOff = $('.micro-off');
  var lyricsOn = $('.micro-on');
  var cover = $('.artwork-container');
  var lyrics = $('.lyrics-container');

  var transEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

  var lyricsRaw = [
    { milliseconds: 400, line: "Is this the real life?" },
    { milliseconds: 4650, line: "Is this just fantasy?" },
    { milliseconds: 8040, line: "Caught in a landslide,"},
    { milliseconds: 10960, line: "No escape from reality."},
    { milliseconds: 15600, line: "Open your eyes"},
    { milliseconds: 18580, line: "Look up to the skies and see"},
    { milliseconds: 25860, line: "I'm just a poor boy, I need no sympathy"},
    { milliseconds: 31460, line: "Because I'm easy come, easy go"},
    { milliseconds: 35860, line: "A little high, little low"},
    { milliseconds: 39260, line: "Anyway the wind blows, doesn't really matter to me, to me"},
    { milliseconds: 56250, line: "Mama, just killed a man"},
    { milliseconds: 62600, line: "Put a gun against his head"},
    { milliseconds: 66050, line: "Pulled my trigger, now he's dead"},
    { milliseconds: 69770, line: "Mama, life had just begun"},
    { milliseconds: 76090, line: "But now I've gone and thrown it all away"},
    { milliseconds: 83330, line: "Mama, ooo"},
    { milliseconds: 89770, line: "Didn't mean to make you cry"},
    { milliseconds: 93380, line: "If I'm not back again this time tomorrow"},
    { milliseconds: 98120, line: "Carry on, carry on, as if nothing really matters"},
    { milliseconds: 115560, line: "Too late, my time has come"},
    { milliseconds: 121930, line: "Sends shivers down my spine"},
    { milliseconds: 124920, line: "Body's aching all the time"},
    { milliseconds: 129110, line: "Goodbye everybody I've got to go"},
    { milliseconds: 135470, line: "Gotta leave you all behind and face the truth"},
    { milliseconds: 142700, line: "Mama, ooo (anyway the wind blows)"},
    { milliseconds: 149540, line: "I don't want to die"},
    { milliseconds: 152710, line: "I sometimes wish I'd never been born at all"},
    { milliseconds: 186700, line: "I see a little silhouetto of a man"},
    { milliseconds: 189560, line: "Scaramouch, scaramouch will you do the Fandango?"},
    { milliseconds: 193170, line: "Thunderbolt and lightning very very frightening me"},
    { milliseconds: 196720, line: "Gallileo, Gallileo,"},
    { milliseconds: 198310, line: "Gallileo, Gallileo,"},
    { milliseconds: 199890, line: "Gallileo Figaro - Magnifico"},
    { milliseconds: 203670, line: "But I'm just a poor boy and nobody loves me"},
    { milliseconds: 206590, line: "He's just a poor boy from a poor family"},
    { milliseconds: 209680, line: "Spare him his life from this monstrosity"},
    { milliseconds: 214550, line: "Easy come easy go will you let me go"},
    { milliseconds: 217350, line: "Bismillah! No we will not let you go - Let him go"},
    { milliseconds: 221350, line: "Bismillah! We will not let you go - Let him go"},
    { milliseconds: 224580, line: "Bismillah! We will not let you go - Let me go"},
    { milliseconds: 226770, line: "Will not let you go let me go (never)"},
    { milliseconds: 229290, line: "Never let you go let me go"},
    { milliseconds: 230570, line: "Never let me go ooo"},
    { milliseconds: 232410, line: "No, no, no, no, no, no, no"},
    { milliseconds: 234890, line: "Oh mama mia, mama mia, mama mia let me go"},
    { milliseconds: 238020, line: "Beelzebub has a devil put aside for me"},
    { milliseconds: 242890, line: "For me"},
    { milliseconds: 244560, line: "For me"},
    { milliseconds: 255720, line: "So you think you can stone me and spit in my eye?"},
    { milliseconds: 261760, line: "So you think you can love me and leave me to die?"},
    { milliseconds: 266690, line: "Oh baby can't do this to me baby"},
    { milliseconds: 273660, line: "Just gotta get out just gotta get right outta here"},
    { milliseconds: 296120, line: "Ooh yeah, ooh yeah"},
    { milliseconds: 315050, line: "Nothing really matters"},
    { milliseconds: 316980, line: "Anyone can see"},
    { milliseconds: 320480, line: "Nothing really matters nothing really matters to me"},
    { milliseconds: 344420, line: "Anyway the wind blows"}
  ];

  var lyricsArray = [];

  lyricsRaw.forEach(function(lyric, index) {
    $( ".lyrics-container" ).append( "<p class='unvisible-lines lyrics-default' id='lyrics-" + (index + 1) + "' ></p>" );

    var previousTime = lyricsRaw[index - 1] ? lyricsRaw[index - 1].milliseconds : 0;
    var nextTime = lyricsRaw[index + 1] ? (lyricsRaw[index + 1].milliseconds - 1500) : null;

    var realTime = lyricsRaw[index].milliseconds - 1500;

    if (realTime < 0) {
      realTime = 0;
    }

    var lyricFull = {
      displayTime: previousTime,
      activeTime: realTime,
      removeTime: nextTime,
      line: lyricsRaw[index].line
    };

    lyricsArray.push(lyricFull);
  });

  var standardFade = function(firstElement, secondElement, displayTime, activeTime, removeTime) {
    window.setTimeout(function() {
      firstElement.removeClass("unvisible-lines").addClass("second-line");
    }, displayTime);
    window.setTimeout(function() {
      firstElement.removeClass("second-line").addClass("current-line");
      var secondTop = firstElement.height() + 50 + 40;
      secondElement.removeClass("unvisible-lines").addClass("second-line");
      secondElement.css( "top", secondTop);
    }, activeTime);

    if (removeTime !== null) {
      window.setTimeout(function() {
        firstElement.addClass("finished");
      }, removeTime);
    }
  };

  lyricsOff.click(function() {
    lyricsArray.forEach(function(lyric, index) {
      var firstElement = $('#lyrics-' + (index + 1));
      var secondElement = $('#lyrics-' + (index + 2));
      firstElement.text( lyric.line );
      standardFade(firstElement, secondElement, lyric.displayTime, lyric.activeTime, lyric.removeTime);
    });

    $('#song').get(0).play();

  });

  // From here
  lyricsOff.click(function(){
    lyricsOff.css("display", "none"); // Disparition icone off-mode
    lyricsOn.css("display", "block"); // Apparition icone on-mode
    cover.addClass("artwork-fade-out");

    cover.one(transEnd, function() {
      lyrics.addClass("lyrics-fade-in");
      cover.removeClass("artwork-fade-in");
      $( this ).off(transEnd);
    });
  });
  
  lyricsOn.click(function(){
    lyricsOn.css("display", "none"); // Disparition icone on-mode
    lyricsOff.css("display", "block"); // Apparition icone off-mode
    lyrics.addClass("lyrics-fade-out");
    lyrics.removeClass("lyrics-fade-in");
    
    lyrics.one(transEnd, function() {
      cover.addClass("artwork-fade-in");
      cover.removeClass("artwork-fade-out");
      lyrics.removeClass("lyrics-fade-out");
      $( this ).off(transEnd);
    });
  });

});