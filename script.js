// function getUserRepos(username){
//     return fetch(`https://api.github.com/users/${username}/repos`)
//     .then((raw)=> raw.json());
// }

// getUserRepos("asynchronousjavascriptor").then(function(data){
//     console.log(data);
// });

let searchBtn= document.querySelector(".search");
let usernameinp= document.querySelector(".usernameinp");
let card= document.querySelector(".card");
let repo= document.querySelector(".repo");
let prof= document.querySelector(".prof");
let topRepos= document.querySelector(".topRepos");

function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw)=>{
        if(!raw.ok) throw new Error("User not found.");
        return raw.json();
    });
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=3`).then((raw)=>{
        if(!raw.ok) throw new Error("Failed to fetch repos..");
        return raw.json();
        });
}

getProfileData("async").then(function(data){
    console.log(data);
})

getRepos("async").then(function(data){
    console.log(data);
})

function decorateProfileData(details){
    console.log(details);
    let data= `<div class="flex flex-col items-center text-center">
            <img
              src="${details.avatar_url}"
              alt="GitHub Avatar"
              class="h-32 w-32 rounded-full border-4 border-cyan-400/40 bg-white object-cover p-2"
            />

            <h2 class="mt-6 text-2xl font-bold">${details.name}</h2>
            <p class="mt-1 text-cyan-300">@${details.login}</p>

            <p class="mt-5 text-sm leading-6 text-slate-400">
              ${details.bio? deatils.bio: ""}
            </p>

            <a
              href="#"
              class="mt-6 inline-flex w-full justify-center rounded-xl border border-cyan-400/40 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              View GitHub Profile
            </a>
          </div>`
          card.innerHTML=data;

}


function reposCnt(details){
  let data= ` 
            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p class="text-sm text-slate-400">Repositories</p>
              <h3 class="mt-2 text-3xl font-bold">${details.public_repos}</h3>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p class="text-sm text-slate-400">Followers</p>
              <h3 class="mt-2 text-3xl font-bold">${details.followers}</h3>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p class="text-sm text-slate-400">Following</p>
              <h3 class="mt-2 text-3xl font-bold">${details.following}</h3>
            </div>
            `
            repo.innerHTML= data;
}

function profile(details){
  let data= `<div class="rounded-xl bg-slate-900/70 p-5">
                <p class="text-sm text-slate-500">Company</p>
                <p class="mt-1 font-medium">${details.campany ? deatils.campany: "N/A"}</p>
              </div>

              <div class="rounded-xl bg-slate-900/70 p-5">
                <p class="text-sm text-slate-500">Location</p>
                <p class="mt-1 font-medium">${details.location}</p>
              </div>

              <div class="rounded-xl bg-slate-900/70 p-5">
                <p class="text-sm text-slate-500">Blog / Website</p>
                <p class="mt-1 font-medium text-cyan-300">${details.blog}</p>
              </div>

              <div class="rounded-xl bg-slate-900/70 p-5">
                <p class="text-sm text-slate-500">Twitter</p>
                <p class="mt-1 font-medium">${details.twitter_username}</p>
              </div>`

              prof.innerHTML= data;
}

function topRepo(details) {
  let data = `
    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-xl font-bold">Latest Repositories</h3>
      <span class="text-sm text-slate-400">Top results</span>
    </div>

    <div class="space-y-4">
  `;

  details.slice(0, 3).forEach(repo => {
    data += `
      <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-cyan-400/40">
        <a href="${repo.html_url}" target="_blank">
          <h4 class="font-semibold text-cyan-300">${repo.name}</h4>
        </a>
        <p class="mt-2 text-sm text-slate-400">
          ${repo.description || "No description available"}
        </p>
      </div>
    `;
  });

  data += `</div>`;

  topRepos.innerHTML = data;
}


searchBtn.addEventListener("click",function(){
    
   let username = usernameinp.value.trim();
   if(username.length> 0){
    getProfileData(username).then((data)=>{
        decorateProfileData(data);
        reposCnt(data);
        profile(data);
        
    });

    getRepos(username).then((repos) =>{
      topRepo(repos);
    })
  }
})