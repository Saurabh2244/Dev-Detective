const modeBtn = document.querySelector(".mode-container");
const modeText = document.querySelector("[data-modeText]");
const modeIcon = document.querySelector("[data-modeIcon]");

const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector("[searchBtn]");

const noResults=document.querySelector('#noResult');

//url
const url = "https://api.github.com/users/";

// initilize
fetchProfileInfo(url + "Saurabh2244");

// listener on searchBtn
searchBtn.addEventListener("click", function () {
    if (searchInput.value != "") {
        fetchProfileInfo(url + searchInput.value);
        searchInput.value = "";
    } else {
        return;
    }
});

// searchform me enter dabaye to search ho
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (searchInput.value != "") {
            fetchProfileInfo(url + searchInput.value);
            searchInput.value = "";
        }
        else {
            return;
        }
    }
});

// fetch profile info
async function fetchProfileInfo(gitLink) {
    try {
        let content = await fetch(`${gitLink}`);

        if (!content.ok) {
            throw new Error(`Error:${content.statusText}`);
        }

        let output = await content.json();

        renderProfileInfo(output);
    }
    catch (error) {
        console.log("Profile not found");
        //no result visible
        noResults.style.opacity = 1;

        //remove no result block
        setTimeout(function () {
            noResults.style.opacity = 0;
        }, 2000);
    }
}

// get month name
function getMonthName(monthNumber) {
    switch (monthNumber) {
        case "01":
            return "January";
        case "02":
            return "February";
        case "03":
            return "March";
        case "04":
            return "April";
        case "05":
            return "May";
        case "06":
            return "June";
        case "07":
            return "July";
        case "08":
            return "August";
        case "09":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
        default:
            return "Invalid month number";
    }
}

// render profile info on UI
function renderProfileInfo(profileInfo) {
    //function to check if userData is null or not
    function checkNULL(apiItem, domItem) {
        if (apiItem === "" || apiItem == null) {
            domItem.style.opacity = 0.5;
            domItem.previousElementSibling.style.opacity = 0.5;
            return false;
        } else {
            return true;
        }
    }

    // fetch all elements which will updates dynamically
    const profileImg = document.querySelector("[data-profileImg]");

    const profileName = document.querySelector("[data-profileName]");
    const profileID = document.querySelector("[data-profileID]");

    const profileJoinDate = document.querySelector("[data-joinDate]");

    const profileBio = document.querySelector("[data-profileBio]");

    const reposCnt = document.querySelector("[ data-repos]");
    const followersCnt = document.querySelector("[data-followers]");
    const followingsCnt = document.querySelector("[data-followings]");

    const location = document.querySelector("[data-profileLocation]");
    const website = document.querySelector("[data-profileWebsite]");
    const twitter = document.querySelector("[data-profileTwitter]");
    const company = document.querySelector("[data-profileCompany]");

    let dateArray = profileInfo?.created_at.split("T");
    const date = dateArray[0];

    // console.log(date);
    // console.log(typeof date);
    
    const onlyDateArray = date.split("-");
    
    // console.log(onlyDateArray);
    
    const month = getMonthName(onlyDateArray[1]);

    // updates all fetch elements using profileInfo obj
    profileImg.src = profileInfo?.avatar_url;

    profileName.innerText = profileInfo?.name;
    profileID.innerText = `@${profileInfo?.login}`;
    profileID.href = checkNULL(profileInfo?.html_url, profileID)
        ? profileInfo?.html_url
        : "#";

    profileJoinDate.innerText = `Joined ${onlyDateArray[2]} ${month} ${onlyDateArray[0]}`;

    profileBio.innerText = profileInfo?.bio || `This profile does not have a Bio`;

    reposCnt.innerText = profileInfo?.public_repos;
    followersCnt.innerText = profileInfo?.followers;
    followingsCnt.innerText = profileInfo?.following;

    location.innerText = checkNULL(profileInfo?.location, location)
        ? profileInfo?.location
        : "Not Available";

    website.innerText = checkNULL(profileInfo?.blog, website)
        ? profileInfo?.blog
        : "Not Avilable";
    website.href = checkNULL(profileInfo?.blog, website)
        ? profileInfo?.blog
        : "#";

    twitter.innerText = checkNULL(profileInfo?.twitter_username, twitter)
        ? profileInfo?.twitter_username
        : "Not Available";
    twitter.href = checkNULL(profileInfo?.twitter_username, twitter)
        ? `https://twitter.com/${profileInfo?.twitter_username}`
        : "#";

    company.innerText = checkNULL(profileInfo?.company, company)
        ? profileInfo?.company
        : "Not Available";
}

// ----------------------------------------------------------------------------------------------------------

// handle dark and light mode functionality
let root = document.documentElement.style;
let darkMode = false;

// Function to turn on dark mode
function enableDarkMode() {
    darkMode = true;
    root.setProperty("--lm-bg", "#141D2F"); // Set dark background color
    root.setProperty("--lm-bg-content", "#1E2A47"); // Set content background color
    root.setProperty("--lm-text", "white"); // Set text color
    root.setProperty("--lm-text-alt", "white"); // Set alternate text color
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)"); // Set shadow color
    modeText.innerText = "LIGHT"; // Change button text to "LIGHT"
    modeIcon.src = "./Images/sun-icon.svg"; // Change button icon to sun
    root.setProperty("--lm-icon-bg", "brightness(1000%)"); // Adjust icon brightness
    localStorage.setItem("dark-mode", true); // Save dark mode in browser storage
}

// Function to turn on light mode
function enableLightMode() {
    darkMode = false;
    root.setProperty("--lm-bg", "#F6F8FF"); // Set light background color
    root.setProperty("--lm-bg-content", "#FEFEFE"); // Set content background color
    root.setProperty("--lm-text", "#4B6A9B"); // Set text color
    root.setProperty("--lm-text-alt", "#2B3442"); // Set alternate text color
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)"); // Set shadow color
    modeText.innerText = "DARK"; // Change button text to "DARK"
    modeIcon.src = "./Images/moon-icon.svg"; // Change button icon to moon
    root.setProperty("--lm-icon-bg", "brightness(100%)"); // Adjust icon brightness
    localStorage.setItem("dark-mode", false); // Save light mode in browser storage
}

// When the mode button is clicked, toggle between dark mode and light mode
modeBtn.addEventListener("click", () => {
    if (!darkMode) {
        enableDarkMode(); // Turn on dark mode
    } else {
        enableLightMode(); // Turn on light mode
    }
});

// Check if the device prefers dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if the user has saved a mode preference in the browser
if (localStorage.getItem("dark-mode") === null) {
    // If no saved preference, use the device's preference
    if (prefersDarkMode) {
        enableDarkMode(); // Turn on dark mode
    }
    else {
        enableLightMode(); // Turn on light mode
    }
}
else {
    // If there is a saved preference, use it
    if (localStorage.getItem("dark-mode") === "true") {
        enableDarkMode(); // Turn on dark mode
    }
    else {
        enableLightMode(); // Turn on light mode
    }
}
