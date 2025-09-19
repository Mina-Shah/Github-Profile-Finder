const input = document.querySelector('.input')
const search = document.querySelector('.search')
const avatar = document.querySelector(".avatar")
const nameEl = document.querySelector(".name")   
const bio = document.querySelector(".bio")
const followers = document.querySelector(".followers")
const following = document.querySelector(".following")
const publicRepos = document.querySelector(".public")
const error = document.querySelector(".error")

// Main function to fetch profiles
const getProfileData = async (username) => { // Parameters are used when a function needs different inputs each time.
    const apiURL = `https://api.github.com/users/${username}`;
    
    try {
        let response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        let data = await response.json();

        if (data.message === "Not Found") {
            error.textContent = "Profile not found. Please try again.";
            avatar.src = "";
            nameEl.textContent = "";         
            bio.textContent = "";
            followers.textContent = "";
            following.textContent = "";
            publicRepos.textContent = "";
            return;
        }

        // Display results
            error.textContent = "";
            avatar.src = data.avatar_url;
            nameEl.textContent = data.name || data.login;        
            bio.textContent = data.bio || "No bio available."
            followers.textContent = "Followers: " + data.followers;
            following.textContent = "Following: " + data.following;
            publicRepos.textContent = "Public Repos: " + data.public_repos;
    } catch (err) {
        error.textContent = "Something went wrong. Please try again.";
    }
};

search.addEventListener('click', () => {
  const username = input.value.trim()
  if (username) {
    getProfileData(username)
  } else {
    error.textContent = "Please enter a username."
  }
})

// Enter key press
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const username = input.value.trim()
  if (username) {
    getProfileData(username)
  } else {
    error.textContent = "Please enter a username."
  }
  }
})