songs = {"Back in the USSR" : 2.43, "Dear Prudence" : 3.55, "Glass Onion" : 2.17, "Ob-La-Di, Ob-La-Da" : 3.08, "Wild Honey Pie" : 0.52, "The Continuing Story of Bungalow Bill" : 3.14, "While My Guitar Gently Weeps" : 4.45, "Happiness is a Warm Gun" : 2.44, "Martha My Dear" : 2.28, "I`m So Tired" : 2.03, "Blackbird" : 2.18, "Piggies" : 2.04, "Rocky Raccoon" : 3.33, "Don`t Pass Me By" : 3.49, "Why Don`t We Do It in the Road?" : 1.41, "I Will" : 1.45, "Julia" : 2.56, "Birthday" : 2.43, "Yer Blues" : 4.01, "Mother Nature`s Son" : 2.48, "Everybody`s Got Something to Hide Except for Me and My Monkey" : 2.24, "Sexy Sadie" : 3.15, "Helter Skelter" : 4.29, "Long Long Long" : 3.06, "Revolution 1" : 4.15, "Honey Pie" : 2.41, "Savoy Truffle" : 2.54, "Cry Baby Cry" : 3.02, "Revolution 9" : 8.22, "Good Night" : 3.13};
var trackListComponent = document.getElementById("trackList");
var finalListComponent = document.getElementById("finalList");

var finalList = [];
timer = document.getElementById("timer");

time = 47.00;

initTrackList();

function initTrackList() {
    for (const [key, value] of Object.entries(songs)) {
        const el = document.createElement('li');
        el.innerHTML = `${key} (${value.toString().replace(/\./g, ":")})`;
        el.addEventListener('click', addToFinalList);
        el.setAttribute("id", `${key.replaceAll(' ','')}`);
        trackListComponent.appendChild(el);
    }
}

function subtractMinutes(time, timeToSubtract, format = "sub") {
    originalMin = parseInt(time.toString().split(".")[0]);
    originalSec = parseInt(time.toString().split(".")[1]);

    if(!originalSec)
    {
        originalSec = 0;
    }
    else {
        if(originalSec < 10 && (time.toString().split(".")[1]).length < 2)
        {
            console.log(originalSec);
            originalSec = originalSec * 10;
        }
    }

    timeToSubtractMin = parseInt(timeToSubtract.toString().split(".")[0]);
    timeToSubtractSec = parseInt(timeToSubtract.toString().split(".")[1]);

    if(!timeToSubtractSec)
    {
        timeToSubtractSec = 0;
    }
    
    console.log(originalMin, originalSec, timeToSubtractMin, timeToSubtractSec);

    totalOriginalSec = originalMin * 60 + originalSec;
    totalSubtractSec = timeToSubtractMin * 60 + timeToSubtractSec;

    console.log(totalOriginalSec, totalSubtractSec);

    if(format == "sub")
    {
        diffSec = totalOriginalSec - totalSubtractSec;
    }
    else
    {
        diffSec = totalOriginalSec + totalSubtractSec;
    }

    diffMin = 0;

    while(diffSec >= 60)
    {
        diffSec -= 60;
        diffMin += 1;
    }

    if(diffSec < 10)
    {
        return parseFloat(diffMin + ".0" + diffSec);
    }

    return parseFloat(diffMin + "." + diffSec);
}

function updateTimer()
{
    timer.innerHTML = time.toFixed(2).replace(/\./g, ":") + " remaining";
}

function addToFinalList() {
    songName = this.textContent.split("(")[0].trim();
    if(!finalList.includes(songName))
    {
        if(subtractMinutes(time, songs[songName]) > 0)
        {
            this.style.color = "#0000008d";
            finalList.push(songName);

            time = subtractMinutes(time, songs[songName]);


            const el = document.createElement('li');
            el.innerHTML = `${songName}`;
            el.addEventListener('click', deleteFromFinalList);
            finalListComponent.appendChild(el);
        }
    }
    updateTimer();
}

function deleteFromFinalList() {
    songName = this.textContent;
    finalList.splice(finalList.indexOf(songName), 1);
    item = document.getElementById(`${songName.replaceAll(' ','')}`);
    item.style.color = "#000000";
    console.log(item);
    time = subtractMinutes(time, songs[songName], "add");
    this.remove();
    updateTimer();
}

function shareAlbumFunction()
{
    songList = "";
    temp = 1;
    for(song in finalList)
    {
        songList += temp + ". " + finalList[song] + "\n";
        temp++;
    }
    msg = "Here Is My White Album As A Single Album List:\n" + songList + "\nWith A Total Time of " + (subtractMinutes(47.00, time).toString()).replace(/\./g, ":") + " Minutes\n" + "https://yardenfalik.github.io/mtwas/";
    navigator.clipboard.writeText(msg);
}
