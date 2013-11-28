/*
 * noteflight.js Library v0.0.1
 *
 * Dependencies:
 * jquery-1.10.0.js
 *
 * luis@luisjoglar.com
 *
 * Date: 2013-09-18
 *
 * UNDER CONSTRUCTION
 */


function getMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
	return document.getElementById(movieName);
    }
    else {
	return document[movieName]
    }
}

function getScore(id){
    var score = getMovie(id).getScore();
    return score;
}

/*
 * returns a noteSet Object
 *	
 * @param score - object Score
 * @param stave -> int (array key)
 * @param measure -> int (array key)
 * @param noteSets -> int (array key)
 *	
 */
function getNoteSetObject(score, stave, measure, noteSet){
    var noteSet = score.staves[stave].measures[measure].noteSets[noteSet];
    return noteSet;
}
/*
 * returns a note Object
 *	
 * @param score - object Score
 * @param stave -> int (array key)
 * @param measure -> int (array key)
 * @param noteSets -> int (array key)
 * @param note -> int (array key)
 *	
 */
function getNoteObject(score, stave, measure, noteSet, note){
    var note = score.staves[stave].measures[measure].noteSets[noteSet].notes[note];
    return note;
}

function getNotesScore(score){
    var notes = new Array();
    for (var i = 0; i<score.staves.length; i++){
	for (var j = 0; j<score.staves[i].measures.length; j++){
	    for (var k = 0; k<score.staves[i].measures[j].noteSets.length; k++){
		for (var l = 0; l<score.staves[i].measures[j].noteSets[k].notes.length; l++){
		    notes.push(score.staves[i].measures[j].noteSets[k].notes[l]);
		}
	    }
	}
    }
    return notes;
}

function setNotesScore(score, notes){
    for (var i = 0; i<notes.length; i++){
	score.staves[0].measures[0].noteSets[0].notes[i] = notes[i];
    }
    return score;
}

/*
 * returns the name of a note (C, D, E, F, G, A, B) on a determinate position of a score
 *
 * @param score - object Score
 * @param stave -> int (array key)
 * @param measure -> int (array key)
 * @param noteSets -> int (array key)
 * @param note -> int (array key)
 *	
 */
function getNoteName(score, stave, measure, noteSet, note){
    var noteName;
    var note = getNoteObject(score, stave, measure, noteSet, note);
    noteName = getStepName(note.step);
    return noteName;
}

/* returns the name of a note (C, D, E, F, G, A, B)
 *
 * @param {int or string} step
 * @returns {string} name of the step
 */
function getStepName(step){
    if(typeof(step) === "string"){
	stepName = step;
    }else{
	if(step <= 4){
	    stepName = String.fromCharCode(67+step);
	}else{
	    stepName = String.fromCharCode(60+step);
	}
    }
    return stepName;
}

function getOctaveFromPitch(pitch){
    var octave = 0;
    if(12 <= pitch && pitch<= 23){
	octave = 1;
    }else if(24 <= pitch && pitch<= 35){
	octave = 2;
    }else if(36 <= pitch && pitch<= 47){
	octave = 3;
    }else if(48 <= pitch && pitch<= 59){
	octave = 4;
    }else if(60 <= pitch && pitch<= 71){
	octave = 5;
    }else if(72 <= pitch && pitch<= 83){
	octave = 6;
    }
    return octave;
}
/*
 * returns if a position is a rest
 *	
 * @param score - object Score
 * @param stave -> int (array key)
 * @param measure -> int (array key)
 * @param noteSets -> int (array key)
 * @param note -> int (array key)
 *	
 */
function isRest(score, stave, measure, noteSet){
    var noteSet = getNoteSetObject(score, stave, measure, noteSet);
    if(noteSet.notes.length == 0){
	return true;
    }else{
	return false;
    }
}

/*
 * returns if a position is a chord
 *	
 * @param score - object Score
 * @param stave -> int (array key)
 * @param measure -> int (array key)
 * @param noteSets -> int (array key)
 * @param note -> int (array key)
 *	
 */
function isChord(score, stave, measure, noteSet, note){
    var noteSet = getNoteSetObject(score, stave, measure, noteSet);
    if(noteSet.notes.length > 1 ){
	return true;
    }else{
	return false;
    }
}

function getChord(){
    
}


function getBar(){
    
}

/*
 * @param {type} qtype
 * @returns {String}
 */
function drawScore(qtype){
    // to do table to set the original qtype Scores
    switch(qtype){
	case "scaleText":
	    var score = '<center>'+
			   ' <object id="scaleScoreText" width="640" height="205" FlashVars="scale=1.5&role=template">'+
			   ' <param name="allowScriptAccess" value="always"></param>'+
			   ' <param name="movie" value="http://oxbridge-music-mate.sites.noteflight.com/scores/embed"></param>'+
			   ' <param name="FlashVars" value="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5"></param>'+
			  '  <embed name="scaleScoreText" src="http://oxbridge-music-mate.sites.noteflight.com/scores/embed" type="application/x-shockwave-flash" FlashVars="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5&role=template" width="640" height="205" allowScriptAccess="always"></embed>'+
			'</object>'+
			'</center>'
	    break;
	case "scaleAns":
	    var score = '<center>'+
			   ' <object id="scaleScoreAns" width="640" height="205" FlashVars="scale=1.5&role=template">'+
			   ' <param name="allowScriptAccess" value="always"></param>'+
			   ' <param name="movie" value="http://oxbridge-music-mate.sites.noteflight.com/scores/embed"></param>'+
			   ' <param name="FlashVars" value="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5"></param>'+
			  '  <embed name="scaleScoreAns" src="http://oxbridge-music-mate.sites.noteflight.com/scores/embed" type="application/x-shockwave-flash" FlashVars="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5&role=template" width="640" height="205" allowScriptAccess="always"></embed>'+
			'</object>'+'</br>'+
			'<input id="buttonAns" type="button" value="set answer"/>'+
			'</center>'
	    break;
	case "scoreQuestion":
	    var score = '<center>'+
			   ' <object id="scoreQuestion" width="640" height="205" FlashVars="scale=1.5&role=template">'+
			   ' <param name="allowScriptAccess" value="always"></param>'+
			   ' <param name="movie" value="http://oxbridge-music-mate.sites.noteflight.com/scores/embed"></param>'+
			   ' <param name="FlashVars" value="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5"></param>'+
			  '  <embed name="scoreQuestion" src="http://oxbridge-music-mate.sites.noteflight.com/scores/embed" type="application/x-shockwave-flash" FlashVars="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5&role=template" width="640" height="205" allowScriptAccess="always"></embed>'+
			'</object>'+
			'</center>'
	    break;
	case "scoreAns":
	    var score = '<center>'+
			   '<div><p>Your answer is</p></div>'+
			   ' <object id="scoreAns" width="640" height="205" FlashVars="scale=1.5&role=template">'+
			   ' <param name="allowScriptAccess" value="always"></param>'+
			   ' <param name="movie" value="http://oxbridge-music-mate.sites.noteflight.com/scores/embed"></param>'+
			   ' <param name="FlashVars" value="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5"></param>'+
			  '  <embed name="scoreAns" src="http://oxbridge-music-mate.sites.noteflight.com/scores/embed" type="application/x-shockwave-flash" FlashVars="id=4baad8d4806ec0fa77dc85142f620b122d292ab0&scale=1.5&role=template" width="640" height="205" allowScriptAccess="always"></embed>'+
			'</object>'+
			'</center>'
	    break;
    }
    return score
}

/*
 *
 * @param {type} xml
 * @param {type} sign
 * @param {type} line
 * @returns {XMLSerializer}
 */
function changeClefXML( xml, sign, line){
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(xml,"text/xml");

    xmlDoc.getElementsByTagName('clef')[0].getElementsByTagName('sign')[0].childNodes[0].nodeValue = sign;
    xmlDoc.getElementsByTagName('clef')[0].getElementsByTagName('line')[0].childNodes[0].nodeValue = line;

    var xmlText = new XMLSerializer().serializeToString(xmlDoc);
    return xmlText;
}

function changeClef(xmlMusic, clef){
  var sign;
  var line;
  switch(clef){
      case '':
	  sign = "G";
	  line = "2";
	  break;
      case 'treble':
	  sign = "G";
	  line = "2";
	  break;
      case 'bass':
	  sign = "F";
	  line = "4";
	  break;
      case 'alto':
	  sign = "C";
	  line = "3";
	  break;
      case 'tenor':
	  sign = "C";
	  line = "4";
	  break;
  }
  return changeClefXML( xmlMusic, sign, line)
}

/* Structure of the note in MusicXML
 * <measure number="1">
 * [...]
 * <note>
        <pitch>
          <step>A</step>
          <octave>4</octave>
        </pitch>
        <duration>64</duration>
        <voice>1</voice>
        <type>quarter</type>
	<accidental>flat</accidental> (optional)
   </note>
 *
 * @param {xmlDoc} xml
 * @param {int or string} step
 * @param {int} octave
 * @param {string} accidental
 * @returns {XMLSerializer().serializeToString}
 */
function setFirstNote (xml, step, octave, accidental){
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(xml,"text/xml");
    xmlDocNote = xmlDoc.getElementsByTagName('measure')[0].getElementsByTagName('note')[0];
    var stepName = getStepName(step);
    var accidentalString = getAccidentalString(accidental);

    // if there is no note
    if (!xmlDocNote.getElementsByTagName('step')[0]){
	newElPitch=xmlDoc.createElement('pitch');				    //<pitch>
	    newElStep = createXMLElement('step', stepName);				//<step></step>
	    newElPitch.appendChild(newElStep);
	    newElOctave = createXMLElement('octave', octave);				//<octave></octave>
	    newElPitch.appendChild(newElOctave);				    //</pitch>
	var before = xmlDocNote.getElementsByTagName('duration')[0];		    //<duration></duration>
	xmlDocNote.insertBefore(newElPitch, before);
	if(accidentalString != '-'){
	    newElAccidental = createXMLElement('accidental', accidentalString);	    //<accidental></accidental>
	    xmlDocNote.appendChild(newElAccidental);
	}
	var rest = xmlDocNote.getElementsByTagName('rest')[0];			    // remove   <rest></rest>
	xmlDocNote.removeChild(rest);
    }else{
	setStepOnXMLNote(xmlDocNote, stepName)
	setOctaveOnXMLNote(xmlDocNote, octave)
	setAccidentalOnXMLNote(xmlDocNote, accidentalString)
    }
	var xmlText = new XMLSerializer().serializeToString(xmlDoc);
	return xmlText;
}

/* Structure of the note in MusicXML
 * <measure number="1">
 * [...]
 * <note>
        <pitch>
          <step>A</step>
          <octave>4</octave>
        </pitch>
        <duration>64</duration>
        <voice>1</voice>
        <type>quarter</type>
	<accidental>flat</accidental> (optional)
   </note>
 *
 * @param {xmlDoc} xml
 * @param {int or string} step
 * @param {int} octave
 * @param {string} accidental
 * @param {int}	 measure
 * @param {int}  note
 * @returns {XMLSerializer().serializeToString}
 */
function setNoteIn (xml, step, octave, accidental, measure, note){
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(xml,"text/xml");
    var stepName = getStepName(step);
    var accidentalString = getAccidentalString(accidental);

    // if there is no measure
    if (!xmlDoc.getElementsByTagName('measure')[measure]){
	newElMeasure = createXMLElement('measure number="'+measure+'"');
	xmlDoc.getElementsByTagName('part')[0].appendChild(newElMeasure);
    }

    if (!xmlDoc.getElementsByTagName('measure')[measure].getElementsByTagName('note')[note]){
	newElNote = createXMLElement('note');
	newElDuration = createXMLElement('duration', '64');
	newElNote.appendChild(newElDuration);
	newElVoice = createXMLElement('voice', '1');
	newElNote.appendChild(newElVoice);
	newElType = createXMLElement('type', 'quarter');
	newElNote.appendChild(newElType);
	xmlDoc.getElementsByTagName('measure')[measure].appendChild(newElNote);
    }

    xmlDocNote = xmlDoc.getElementsByTagName('measure')[measure].getElementsByTagName('note')[note];
    
    // if there are no step
    if (!xmlDocNote.getElementsByTagName('step')[0]){
	newElPitch=xmlDoc.createElement('pitch');				    //<pitch>
	    newElStep = createXMLElement('step', stepName);				//<step></step>
	    newElPitch.appendChild(newElStep);
	    newElOctave = createXMLElement('octave', octave);				//<octave></step>
	    newElPitch.appendChild(newElOctave);				    //</pitch>
	var before = xmlDocNote.getElementsByTagName('duration')[0];		    //<duration></duration>
	xmlDocNote.insertBefore(newElPitch, before);

	if(accidentalString != '-'){
	    newElAccidental = createXMLElement('accidental', accidentalString);	    //<accidental></accidental>
	    xmlDocNote.appendChild(newElAccidental);
	}
	if(xmlDocNote.getElementsByTagName('rest')[0]){ // if there is a rest
	    xmlDocNote.removeChild(xmlDocNote.getElementsByTagName('rest')[0]);    // remove   <rest></rest>
	}
    }else{
	setStepOnXMLNote(xmlDocNote, stepName);
	setOctaveOnXMLNote(xmlDocNote, octave);
	setAccidentalOnXMLNote(xmlDocNote, accidentalString);
    }
	var xmlText = new XMLSerializer().serializeToString(xmlDoc);
	return xmlText;
}

function createXMLElement(elementName, value){
    	newElement=xmlDoc.createElement(elementName);
	if(value){
	    newElementText=xmlDoc.createTextNode(value);
	    newElement.appendChild(newElementText);
	}
	return newElement;
}

function setStepOnXMLNote(xmlDocNote, stepName){
    xmlDocNote.getElementsByTagName('step')[0].childNodes[0].nodeValue = stepName;
}

function setOctaveOnXMLNote(xmlDocNote, octave){
    xmlDocNote.getElementsByTagName('octave')[0].childNodes[0].nodeValue = octave;
}

function setAccidentalOnXMLNote(xmlDocNote, accidentalString){
    if(accidentalString != '-'){
	    if (xmlDocNote.getElementsByTagName('accidental')[0]) {
		xmlDocNote.getElementsByTagName('accidental')[0].childNodes[0].nodeValue = accidentalString;
	    }else{
		newElAccidental=xmlDoc.createElement('accidental');
		newElTextAcc=xmlDoc.createTextNode(accidentalString);
		newElAccidental.appendChild(newElTextAcc);
		xmlDocNote.appendChild(newElAccidental);
	    }
	}else if (xmlDocNote.getElementsByTagName('accidental')[0]) {
	    var rest = xmlDocNote.getElementsByTagName('accidental')[0];
	    xmlDocNote.removeChild(rest);
	}
}

/*
 *
 */
function getAccidentalString(accidental){
    switch (accidental){
	case "-":
	    return "-";
	    break;
	case "":
	    return "natural";
	    break;
	case "#":
	    return "sharp";
	    break;
	case "b":
	    return "flat";
	    break;
    }
}

// to complete.
function getNotePositionIn44(i){
    var position = new Array();
    var measure = Math.floor(i/4);
    var noteSet = i % 4;
    position.push(measure);
    position.push(noteSet);
    return position;
}

 function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}
